import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { PiCaretUpDown } from "react-icons/pi";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";
import empty_img from "../assets/img/empty_img.png";

export const GridTable = ({
  user_lists,
  page_permission,
  brand,
  merchandise,
}) => {
  const navigate = useNavigate();
  const [user_data, setUserData] = useState(user_lists);
  const [modal_edit, setModalEdit] = useState(false);
  const [default_brand, setDefaultBrand] = useState([]);
  const [default_merchandise, setDefaultMerchandise] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  //edit
  const [edit_id, setEditId] = useState(null);
  const [edit_username, setEditUsername] = useState(null);
  const [edit_email, setEditEmail] = useState(null);
  const [edit_activate, setEditActivate] = useState(null);
  const [edit_rolename, setEditRolename] = useState(null);

  const [dump_email, setDumpEmail] = useState(null);
  const [dump_roleName, setDumpRoleName] = useState(null);
  const [dump_status, setDumpStatus] = useState(null);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [reg_brand, setRegBrand] = useState([]);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  const [oldModal, setOldModal] = useState(true);
  const { token } = User.getCookieData();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchRoleData();
  }, []);

  useEffect(() => {
    setData();
  }, [user_lists]);

  const fetchRoleData = async () => {
    const { token } = User.getCookieData();
    const roles = await User.getUserRoles(token);
    const brands = await User.getBrand(token);
    const merchandises = await User.getMerchandiseList(token);
    setDefaultBrand(brands);
    setDefaultRoles(roles);
    setDefaultMerchandise(merchandises);
  };

  const setData = async () => {
    const lists = await User.getUsersList(token);
    setUserData(lists);
  };

  const onSelectEdit = (id) => {
    const {
      UserID,
      Username,
      Email,
      Activated,
      RoleName,
      RoleID,
      AccessContent,
    } = user_data?.find((item) => item.UserID === id);

    setEditId(UserID);
    setEditUsername(Username);

    // const brandIDs = AccessContent?.brands.map((item) => item.BrandID);
    // setRegBrand(brandIDs);
    setRegBrand(AccessContent?.brands ? AccessContent.brands.map(Number) : []);
    setRegMerchandise(
      AccessContent?.merchandise ? AccessContent.merchandise.map(Number) : []
    );
    setEditEmail(Email);
    setDumpEmail(Email);
    setEditActivate(Activated);
    setDumpStatus(Activated);
    setEditRolename(RoleID);
    setDumpRoleName(RoleID);
    setOldModal(!oldModal);
    setModalEdit(!modal_edit);
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSaveEdit = async (id) => {
    Swal.fire({
      text: `คุณต้องการแก้ไข User : ${edit_username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3dabeb",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (edit_rolename) {
            const { token } = User.getCookieData();
            const obj = {
              userid: id,
              email: edit_email,
              activated: edit_activate,
              roleid: edit_rolename,
              accesscontent: {
                brands: reg_brand.map(String),
                merchandise: reg_merchandise,
              },
            };
            const encrypted = await Encryption.encryption(
              obj,
              "edit_user",
              false
            );
            const data = await User.updateUser(encrypted, token);

            if (data.code !== 404) {
              Swal.fire({
                icon: "success",
                title: "แก้ไขผู้ใช้งานสำเร็จ!",
                text: `แก้ไขผู้ใช้งานสำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  // window.location.reload();
                  setData();
                  // setModalEdit(!modal_edit);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data.message,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Register Failed ...",
              text: "กรุณาเลือก Role!",
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  };

  const handleCheckboxChange = (id, type) => {
    if (type === "brand") {
      const newCheckedItems = [...reg_brand];
      if (newCheckedItems.includes(id)) {
        const indexToRemove = newCheckedItems.indexOf(id);
        newCheckedItems.splice(indexToRemove, 1);
      } else {
        newCheckedItems.push(id);
      }
      setRegBrand(newCheckedItems);
    } else if (type === "merchandise") {
      const newCheckedItems = [...reg_merchandise];
      if (newCheckedItems.includes(id)) {
        const indexToRemove = newCheckedItems.indexOf(id);
        newCheckedItems.splice(indexToRemove, 1);
      } else {
        newCheckedItems.push(id);
      }
      setRegMerchandise(newCheckedItems);
    }
  };

  const saveBrandReg = () => {
    const sortBrand = reg_brand.slice().sort((a, b) => a - b);
    setRegBrand(sortBrand);
    setShowBrandModal(!showBrandModal);
  };

  const saveMerchandiseReg = () => {
    const sortMerch = reg_merchandise.slice().sort((a, b) => a - b);
    setRegMerchandise(sortMerch);
    setShowMerchandiseModal(!showMerchandiseModal);
  };

  const getImgBrand = (id) => {
    // const brand_img = brand.find((item) => item.BrandID === parseInt(id));
    // return brand_img ? brand_img.BrandLogo : empty_img;
    const brand_img = brand?.find((item) => item.BrandID === parseInt(id));
    return brand_img ? brand_img.BrandLogo : empty_img;
  };

  const getImgMerchandise = (id) => {
    if (merchandise) {
      const merchandise_data = merchandise?.find(
        (item) => item.AdvertiserID === parseInt(id)
      );

      return merchandise_data?.AdvertiserLogo
        ? merchandise_data.AdvertiserLogo
        : `https://ui-avatars.com/api/?name=${
            merchandise_data.AdvertiserName
          }&background=${"000000"}&color=fff`;
    } else {
      return null;
    }
  };

  const onClickDelete = async (id, name) => {
    Swal.fire({
      title: "คุณต้องการลบผู้ใช้งาน?",
      text: `คุณต้องการลบผู้ใช้งาน : ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { token } = User.getCookieData();
        const obj = {
          userid: id,
        };
        const encrypted = await Encryption.encryption(
          obj,
          "delete_user",
          false
        );
        const data = await User.deleteUser(encrypted, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "ลบผู้ใช้งาน!",
            text: `ลบผู้ใช้งาน ${name} สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              setData();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      }
    });
  };

  return (
    <>
      {oldModal && (
        <div className="w-auto h-[480px] overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Username
                </th>
                <th className="lg:px-6 px-8 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  BU
                </th>
                <th className="lg:px-6 px-9 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Status
                </th>
                <th className="lg:px-7 px-12 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user_data.length > 0 &&
                user_data.map((row, key) => (
                  <tr key={key}>
                    <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins text-xl">{row.UserID}</div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                      {page_permission.update ? (
                        <div className="font-poppins text-xl font-bold hover:text-[#6425FE] cursor-pointer">
                          <a onClick={() => onSelectEdit(row.UserID)}>
                            {row.Username}
                          </a>
                        </div>
                      ) : (
                        <div className="font-poppins text-xl font-bold">
                          <div>{row.Username}</div>
                        </div>
                      )}
                      <div className="font-poppins text-sm text-gray-500">
                        {row.Email ? row.Email : "-- No Email --"}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                      <div className="flex space-x-1 ">
                        {row.AccessContent?.brands &&
                        row.AccessContent?.brands.length > 0 ? (
                          row.AccessContent.brands.map((items) => (
                            <img
                              className="w-[50px] h-[50px] rounded-md object-contain border border-[#dedede]"
                              src={getImgBrand(items)}
                            />
                          ))
                        ) : (
                          <img
                            className="w-[50px] h-[50px] rounded-md"
                            src={empty_img}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins">
                        {row.Activated === 1 ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="px-7 py-2 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins">
                        {row.RoleName ? row.RoleName : "-- No Role --"}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200 space-x-5">
                      {page_permission.update ? (
                        <button
                          className="relative group"
                          onClick={() => onSelectEdit(row.UserID)}
                        >
                          <RiEditLine
                            size={20}
                            className="text-[#6425FE] hover:text-[#3b1694]"
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Edit User
                          </div>
                        </button>
                      ) : (
                        <></>
                      )}
                      {page_permission.delete ? (
                        <button
                          onClick={() =>
                            onClickDelete(row.UserID, row.Username)
                          }
                          className="relative group"
                        >
                          <RiDeleteBin5Line
                            size={20}
                            className="text-[#6425FE] hover:text-[#3b1694]"
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Delete User
                          </div>
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {modal_edit && (
        <a
          onClick={() => setModalEdit(!modal_edit)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modal_edit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-40`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => {
                    setOldModal(!oldModal);
                    setModalEdit(!modal_edit);
                  }}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Edit User</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Edit User To Unleash The Power Of Digital Advertising
              </div>
            </div>
            <div className="h-[550px] overflow-y-auto">
              <div className="mt-10 mx-40">
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Username :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={` lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => setEditUsername(e.target.value)}
                      type="text"
                      placeholder="Your Username"
                      defaultValue={edit_username}
                      value={edit_username}
                      required
                      disabled
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Email :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={` lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        if (dump_email !== e.target.value) {
                          setIsEdit(true);
                        } else {
                          setIsEdit(false);
                        }
                        setEditEmail(e.target.value);
                      }}
                      type="text"
                      placeholder="Your Email"
                      defaultValue={edit_email}
                      value={edit_email}
                      required
                      autoFocus
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Role :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <select
                      name="role"
                      id="role"
                      onClick={toggleStatusSelect}
                      onChange={(e) => {
                        if (dump_roleName !== parseInt(e.target.value)) {
                          setIsEdit(true);
                        } else {
                          setIsEdit(false);
                        }
                        setEditRolename(parseInt(e.target.value));
                      }}
                      value={edit_rolename}
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    >
                      <option value="null">-- Please Select Role ---</option>
                      {default_roles.map((items) => (
                        <option value={items.RoleID}>{items.RoleName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Status :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <select
                      name="status"
                      id="status"
                      onClick={toggleStatusSelect}
                      onChange={(e) => {
                        if (dump_status !== parseInt(e.target.value)) {
                          setIsEdit(true);
                        } else {
                          setIsEdit(false);
                        }
                        setEditActivate(parseInt(e.target.value));
                      }}
                      value={edit_activate}
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    >
                      <option value="1">Activated</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      BU :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="relative lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                      <button
                        onClick={() => setShowBrandModal(true)}
                        name="brand"
                        className="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                      >
                        Select BU
                      </button>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <PiCaretUpDown size={20} color="#6425FE" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right"></div>
                  </div>
                  <div className="col-span-8">
                    {reg_brand.length > 0 && (
                      <div className="flex items-center space-x-4">
                        {reg_brand.map((item, index) => (
                          <div key={index} className="flex">
                            <img
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg object-contain border border-[#dedede]"
                              src={getImgBrand(item)}
                              alt={item?.name}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Customer :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="relative lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                      <button
                        onClick={() => setShowMerchandiseModal(true)}
                        name="Customer"
                        className="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                      >
                        Select Customer
                      </button>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <PiCaretUpDown size={20} color="#6425FE" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right"></div>
                  </div>
                  <div className="col-span-8">
                    {reg_merchandise.length > 0 && (
                      <div className="flex items-center space-x-4">
                        {reg_merchandise.map((item, index) => (
                          <div key={index} className="flex">
                            <img
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg object-contain  border border-[#dedede] "
                              src={getImgMerchandise(item)}
                              alt={item?.name}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                onClick={() => handleSaveEdit(edit_id)}
                className={`w-[315px] h-[48px]  ${
                  isEdit
                    ? "bg-[#6425FE] hover:bg-[#6325fe86]"
                    : "bg-gray-500 hover:bg-gray-800"
                } text-white font-bold font-poppins rounded-lg`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showBrandModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-30`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setShowBrandModal(!showBrandModal)}>
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Select BU</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select BU To Unleash The Power Of Digital Advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[500px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {default_brand.length > 0 &&
                      default_brand.map((item, index) => (
                        <div key={index}>
                          <div className="h-64 w-64 relative">
                            <input
                              type="checkbox"
                              className="absolute top-0 left-0 mt-4 ml-4 w-5 h-5"
                              onChange={() =>
                                handleCheckboxChange(item.BrandID, "brand")
                              }
                              checked={reg_brand.includes(item.BrandID)}
                            />

                            <div className="w-full h-full flex items-center justify-center">
                              <img
                                className="block ml-auto mr-auto w-60 h-60 object-contain  border border-gray-200 rounded-lg" // Adjust the size as needed
                                src={
                                  item.BrandLogo
                                    ? item.BrandLogo
                                    : `https://ui-avatars.com/api/?name=${
                                        item.BrandName
                                      }&background=${"000000"}&color=fff`
                                }
                                alt={item.BrandName}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleCheckboxChange(item.BrandID, "brand")
                            }
                            className="w-full"
                          >
                            <div className="flex justify-center items-center">
                              <div className="font-poppins text-xl font-bold  hover:text-[#6425FE]">
                                {item.BrandName}
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              <div className="font-poppins text-[#6F6F6F] text-sm">
                                {item.BrandDesc}
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => saveBrandReg()}
                  className="w-52 h-10 bg-[#6425FE] hover:bg-[#3b1694] rounded-lg text-white font-poppins"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMerchandiseModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-30`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => setShowMerchandiseModal(!showMerchandiseModal)}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Select Customer
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select Customer to unleash the power of digital advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[500px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {default_merchandise.length > 0 &&
                      default_merchandise.map((item, index) => (
                        <div key={index}>
                          <div className="h-64 w-64 relative">
                            <input
                              type="checkbox"
                              className="absolute top-0 left-0 mt-4 ml-4 w-5 h-5"
                              onChange={() =>
                                handleCheckboxChange(
                                  item.AdvertiserID,
                                  "merchandise"
                                )
                              }
                              checked={reg_merchandise.includes(
                                item.AdvertiserID
                              )}
                            />

                            <div className="w-full h-full flex items-center justify-center border border-gray-200 rounded-lg">
                              <img
                                className="block ml-auto mr-auto w-60 h-60 rounded-3xl object-contain" // Adjust the size as needed
                                src={
                                  item.AdvertiserLogo
                                    ? item.AdvertiserLogo
                                    : `https://ui-avatars.com/api/?name=${
                                        item.AdvertiserName
                                      }&background=${"000000"}&color=fff`
                                }
                                alt={item.AdvertiserName}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleCheckboxChange(
                                item.AdvertiserID,
                                "merchandise"
                              )
                            }
                            className="w-full"
                          >
                            <div className="flex justify-center items-center">
                              <div className="font-poppins text-xl font-bold  hover:text-[#6425FE]">
                                {item.AdvertiserName}
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              <div className="font-poppins text-[#6F6F6F] text-sm">
                                {item.AccountCode}
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => saveMerchandiseReg()}
                  className="w-52 h-10 bg-[#6425FE] hover:bg-[#3b1694] rounded-lg text-white font-poppins"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
