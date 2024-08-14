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

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [reg_brand, setRegBrand] = useState([]);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  useEffect(() => {
    fetchRoleData();
  }, []);

  const fetchRoleData = async () => {
    const { token } = User.getCookieData();
    const roles = await User.getUserRoles(token);
    const brands = await User.getBrand(token);
    const merchandises = await User.getMerchandiseList(token);
    setDefaultBrand(brands);
    setDefaultRoles(roles);
    setDefaultMerchandise(merchandises);
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
    } = user_lists.find((item) => item.UserID === id);

    setEditId(UserID);
    setEditUsername(Username);

    // const brandIDs = AccessContent?.brands.map((item) => item.BrandID);
    // setRegBrand(brandIDs);
    setRegBrand(AccessContent?.brands ? AccessContent.brands.map(Number) : []);
    setRegMerchandise(
      AccessContent?.merchandise ? AccessContent.merchandise.map(Number) : []
    );
    setEditEmail(Email);
    setEditActivate(Activated);
    setEditRolename(RoleID);
    setModalEdit(!modal_edit);
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSaveEdit = async (id) => {
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
        const encrypted = await Encryption.encryption(obj, "edit_user", false);
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
              navigate(0);
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
    const brand_img = brand.find((item) => item.BrandID === parseInt(id));
    return brand_img ? brand_img.BrandLogo : empty_img;
  };

  const getImgMerchandise = (id) => {
    const merchandise_data = merchandise.find(
      (item) => item.AdvertiserID === parseInt(id)
    );

    console.log("merchandise_data", merchandise_data);

    return merchandise_data.AdvertiserLogo
      ? merchandise_data.AdvertiserLogo
      : `https://ui-avatars.com/api/?name=${
          merchandise_data.AdvertiserName
        }&background=${"000000"}&color=fff`;
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
              window.location.reload();
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
      <div className="w-auto h-[520px] overflow-auto">
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
                Brand
              </th>
              {/* <th className="lg:px-6 px-14 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th> */}
              <th className="lg:px-6 px-9 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Status
              </th>
              <th className="lg:px-7 px-12 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Role
              </th>
              <th className="lg:px-7 px-12 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user_lists.length > 0 &&
              user_lists.map((row, key) => (
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
                            // src={getImgBrand(items.BrandID)}
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
                  {/* <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="flex space-x-1 ">
                      {row.merchandise.map((items) => (
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={getImg(items)}
                        />
                      ))}
                    </div>
                  </td> */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins">
                      {row.Activated === 1 ? "Active" : "Deactive"}
                    </div>
                    {/* <div className="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      defaultValue={row.status}
                    >
                      <option value="1">Active</option>
                      <option value="0">Deactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <PiCaretUpDown size="18" color="#6425FE" />
                    </div>
                  </div> */}
                  </td>
                  <td className="px-7 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins">
                      {row.RoleName ? row.RoleName : "-- No Role --"}
                    </div>
                  </td>

                  <td className="px-7 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins">
                      {row.AccountName ? row.AccountName : "-- No Account --"}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200 space-x-5">
                    {page_permission.update ? (
                      <button onClick={() => onSelectEdit(row.UserID)}>
                        <RiEditLine
                          size={20}
                          className="text-[#6425FE] hover:text-[#3b1694]"
                        />
                      </button>
                    ) : (
                      <></>
                    )}
                    {page_permission.delete ? (
                      <button
                        onClick={() => onClickDelete(row.UserID, row.Username)}
                      >
                        <RiDeleteBin5Line
                          size={20}
                          className="text-[#6425FE] hover:text-[#3b1694]"
                        />
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

      {modal_edit && (
        <a
          onClick={() => setModalEdit(!modal_edit)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modal_edit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setModalEdit(!modal_edit)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Edit User</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Edit User To Unleash The Power Of Digital Advertising
              </div>
            </div>

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
                    onChange={(e) => setEditEmail(e.target.value)}
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
                    onChange={(e) => setEditRolename(parseInt(e.target.value))}
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
                    onChange={(e) => setEditActivate(parseInt(e.target.value))}
                    value={edit_activate}
                    className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                  >
                    <option value="1">Activated</option>
                    <option value="0">Deactivated</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-12 space-x-2 mb-4">
                <div className="col-span-4">
                  <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                    Brand :
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="relative lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => setShowBrandModal(true)}
                      name="brand"
                      className="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                    >
                      Select Brand
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
                    Merchandise :
                  </div>
                </div>
                <div className="col-span-8">
                  <div className="relative lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => setShowMerchandiseModal(true)}
                      name="brand"
                      className="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                    >
                      Select Merchandise
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
            <div className="text-center">
              <button
                type="submit"
                onClick={() => handleSaveEdit(edit_id)}
                className="w-full lg:w-[300px] bg-[#2f3847] hover:bg-[#445066] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showBrandModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowBrandModal(!showBrandModal)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Select Brands
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select Brands To Unleash The Power Of Digital Advertising
              </div>
            </div>
            {/* <div className="mt-2 p-2">
              <div className="relative flex items-center justify-center">
                <input
                  className="w-[900px] h-10 border border-gray-300 rounded-md pl-10 pr-2 font-poppins"
                  placeholder="Search"
                />
                <span className="absolute inset-y-0 left-0 lg:left-80 flex items-center pl-2">
                  <AiOutlineSearch size={20} color="#DBDBDB" />
                </span>
              </div>
            </div> */}
            <div className="mt-2 p-2">
              <div className="h-[550px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {default_brand.map((item, index) => (
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
                              className="block ml-auto mr-auto w-60 h-60 rounded-3xl object-contain" // Adjust the size as needed
                              src={item.BrandLogo}
                              alt={item.BrandName}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-xl font-bold">
                            {item.BrandName}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-[#6F6F6F] text-sm">
                            {item.BrandDesc}
                          </div>
                        </div>
                      </div>
                    ))}
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
        </div>
      )}

      {showMerchandiseModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => setShowMerchandiseModal(!showMerchandiseModal)}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Select Merchandise
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select Merchandise To Unleash The Power Of Digital Advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[550px]  mt-8 overflow-y-auto">
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
                          <div className="flex justify-center items-center">
                            <div className="font-poppins text-xl font-bold">
                              {item.AdvertiserName}
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="font-poppins text-[#6F6F6F] text-sm">
                              {item.AccountCode}
                            </div>
                          </div>
                        </div>
                      ))}
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
        </div>
      )}
    </>
  );
};
