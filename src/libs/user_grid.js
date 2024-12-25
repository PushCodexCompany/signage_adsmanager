import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import { PiCaretUpDown } from "react-icons/pi";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";
import empty_img from "../assets/img/empty_img.png";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdKey,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";

export const GridTable = ({
  user_lists,
  page_permission,
  brand,
  merchandise,
  bg,
  filter_screen,
  searchTerm,
  all_pages,
  permission_reset_password,
  permission_change_password,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState(user_lists);
  const [modal_edit, setModalEdit] = useState(false);
  const [modal_change_password, setModalChangePassword] = useState(false);
  const [modal_reset_password, setModalResetPassword] = useState(false);
  const [default_brand, setDefaultBrand] = useState([]);
  const [default_merchandise, setDefaultMerchandise] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  //edit
  const [edit_id, setEditId] = useState(null);
  const [edit_username, setEditUsername] = useState(null);
  const [edit_name, setEditName] = useState(null);
  const [edit_lastname, setEditLastname] = useState(null);
  const [edit_email, setEditEmail] = useState(null);
  const [edit_activate, setEditActivate] = useState(null);
  const [edit_rolename, setEditRolename] = useState(null);

  const [dump_name, setDumpName] = useState(null);
  const [dump_lastname, setDumpLastname] = useState(null);
  const [dump_email, setDumpEmail] = useState(null);
  const [dump_roleName, setDumpRoleName] = useState(null);
  const [dump_status, setDumpStatus] = useState(null);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [reg_brand, setRegBrand] = useState([]);
  const [dumb_brand, setDumbBrand] = useState([]);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);
  const [reg_merchandise, setRegMerchandise] = useState([]);
  const [dumb_merchandise, setDumbMerchandise] = useState([]);

  const [oldModal, setOldModal] = useState(true);
  const { token } = User.getCookieData();
  const [isEdit, setIsEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;

  // Change Password
  const [chg_oldpasswordVisible, setChgOldPasswordVisible] = useState(false);
  const [chg_passwordVisible, setChgPasswordVisible] = useState(false);
  const [chg_confirmPasswordVisible, setChgConfirmPasswordVisible] =
    useState(false);
  const [chg_userid, setChgUserId] = useState();
  const [chg_username, setChgUserName] = useState();
  const [chg_oldPassword, setChgOldPassword] = useState();
  const [chg_password, setChgPassword] = useState();
  const [chg_confirmPassword, setChgConfirmPassword] = useState();

  // Reset Password
  const [re_passwordVisible, setRePasswordVisible] = useState(false);
  const [re_confirmPasswordVisible, setReConfirmPasswordVisible] =
    useState(false);
  const [re_userid, setReUserId] = useState();
  const [re_username, setReUserName] = useState();
  const [re_password, setRePassword] = useState();
  const [re_confirmPassword, setReConfirmPassword] = useState();

  useEffect(() => {
    fetchRoleData();
  }, []);

  useEffect(() => {
    setData(user_lists);
  }, [user_lists]);

  const fetchDataForPage = async (page) => {
    if (page) {
      if (filter_screen.length > 0) {
        const result = filter_screen.join(",");
        const obj = {
          filterfields: result,
        };
        const data = await User.getUsersList(
          token,
          page,
          searchTerm,
          JSON.stringify(obj)
        );
        return data;
      } else {
        const data = await User.getUsersList(token, page, searchTerm);
        return data;
      }
    }
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.users);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.users);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.users);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const data = await fetchDataForPage(page);
      setData(data.users);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

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
      Firstname,
      Lastname,
    } = data?.find((item) => item.UserID === id);

    setEditId(UserID);
    setEditUsername(Username);
    setEditName(Firstname);
    setDumpName(Firstname);
    setEditLastname(Lastname);
    setDumpLastname(Lastname);

    // const brandIDs = AccessContent?.brands.map((item) => item.BrandID);
    // setRegBrand(brandIDs);
    setRegBrand(AccessContent?.brands ? AccessContent.brands.map(Number) : []);
    setDumbBrand(AccessContent?.brands ? AccessContent.brands.map(Number) : []);
    setRegMerchandise(
      AccessContent?.merchandise ? AccessContent.merchandise.map(Number) : []
    );
    setDumbMerchandise(
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

  const onSelectChangePassword = (id) => {
    const { UserID, Username } = data?.find((item) => item.UserID === id);
    setChgUserId(UserID);
    setChgUserName(Username);
    setOldModal(!oldModal);
    setModalChangePassword(!modal_change_password);
  };

  const onSelectResetPassword = (id) => {
    const { UserID, Username } = data?.find((item) => item.UserID === id);
    setReUserId(UserID);
    setReUserName(Username);
    setOldModal(!oldModal);
    setModalResetPassword(!modal_reset_password);
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
              firstname: edit_name,
              lastname: edit_lastname,
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
            if (data.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไขผู้ใช้งานสำเร็จ!",
                text: `แก้ไขผู้ใช้งานสำเร็จ!`,
              }).then(async (result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  // window.location.reload();
                  const data = await fetchDataForPage(currentPage);
                  setData(data.users);
                  setModalEdit(!modal_edit);
                  setOldModal(!oldModal);
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

  const deepEqualArrayForEditMedia = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (
        !keys2.includes(key) ||
        !deepEqualArrayForEditMedia(obj1[key], obj2[key])
      ) {
        return false;
      }
    }

    return true;
  };

  const checkAreArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) =>
      deepEqualArrayForEditMedia(item, arr2[index])
    );
  };

  const saveBrandReg = () => {
    const sortBrand = reg_brand.slice().sort((a, b) => a - b);

    if (!checkAreArraysEqual(sortBrand, dumb_brand)) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setRegBrand(sortBrand);
    setShowBrandModal(!showBrandModal);
  };

  const saveMerchandiseReg = () => {
    const sortMerch = reg_merchandise.slice().sort((a, b) => a - b);

    if (!checkAreArraysEqual(sortMerch, dumb_merchandise)) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setRegMerchandise(sortMerch);
    setShowMerchandiseModal(!showMerchandiseModal);
  };

  const getImgBrand = (id) => {
    const brand_img = brand?.find((item) => item.BrandID === parseInt(id));
    return brand_img?.BrandLogo ? brand_img.BrandLogo : empty_img;
  };

  const getImgMerchandise = (id) => {
    if (merchandise) {
      const merchandise_data = merchandise.find(
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
        if (data.code === 200) {
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

  const renderTableData = () => {
    return (
      <>
        {data.length > 0 &&
          data.map((row, key) => (
            <tr key={key}>
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200">
                <div className="font-poppins text-xl">{row.UserID}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200">
                {page_permission?.update ? (
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
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200">
                <div className="flex space-x-1 ">
                  {row.AccessContent?.brands.length > 0 ? (
                    row.AccessContent.brands.map((items) => (
                      <img
                        className="w-[50px] h-[50px] rounded-md shadow-sm object-contain border border-[#dedede]"
                        src={getImgBrand(items)}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200">
                <div className="font-poppins">
                  {row.Activated === 1 ? "Active" : "Inactive"}
                </div>
              </td>
              <td className="px-7 py-2 whitespace-nowrap border-b  border-gray-200">
                <div className="font-poppins">
                  {row.RoleName ? row.RoleName : "-- No Role --"}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200">
                <div className="flex justify-center items-center font-poppins text-lg">
                  <div>{row.Firstname ? row.Firstname : "No Name"}</div>
                </div>
                <div className="flex justify-center items-center font-poppins text-sm">
                  {row.Lastname ? row.Lastname : "No Last Name"}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200 space-x-5">
                {permission_reset_password?.update ? (
                  <button
                    className="relative group"
                    onClick={() => onSelectResetPassword(row.UserID)}
                  >
                    <MdLockReset
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694]"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      Reset Password
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {permission_change_password?.update ? (
                  <button
                    className="relative group"
                    onClick={() => onSelectChangePassword(row.UserID)}
                  >
                    <IoMdKey
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694]"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      Change Password
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {page_permission?.update ? (
                  <button
                    className="relative group"
                    onClick={() => onSelectEdit(row.UserID)}
                  >
                    <RiEditLine
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694]"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      Edit User
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {page_permission?.delete ? (
                  <button
                    onClick={() => onClickDelete(row.UserID, row.Username)}
                    className="relative group"
                  >
                    <RiDeleteBin5Line
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694]"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    >
                      Delete User
                    </div>
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
      </>
    );
  };

  const renderPageNumbers = () => {
    let displayPages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        displayPages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        displayPages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        displayPages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        displayPages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return displayPages?.map((number, index) => (
      <button
        key={index}
        className={`px-3 py-1 mx-1 ${
          currentPage === number
            ? "text-[#6425FE] rounded-md border border-[#6425FE]"
            : "text-[#bfbfbf]"
        }  font-poppins font-bold`}
        onClick={() => number !== "..." && handleClick(number)}
        disabled={number === "..."}
      >
        {number}
      </button>
    ));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    Swal.fire({
      text: `คุณต้องการเปลี่ยนรหัสผ่านของ user : ${chg_username} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (chg_password !== chg_confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "รหัสผ่านไม่ตรงกัน",
            text: "กรุณากรอกรหัสผ่านให้เหมือนกัน!",
          });
          return;
        }

        try {
          const obj = {
            userid: chg_userid,
            currentpassword: chg_oldPassword,
            newpassword: chg_password,
          };

          const encrypted = await Encryption.encryption(
            obj,
            "updateUserpassword",
            false
          );

          const data = await User.updateUserpassword(encrypted, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "เปลี่ยนรหัสผ่าน!",
              text: `เปลี่ยนรหัสผ่าน ${chg_username} สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setOldModal(!oldModal);
                setModalChangePassword(!modal_change_password);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    Swal.fire({
      text: `คุณต้องการรีเซ็ตรหัสผ่านของ user : ${re_username} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (re_password !== re_confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "รหัสผ่านไม่ตรงกัน",
            text: "กรุณากรอกรหัสผ่านให้เหมือนกัน!",
          });
          return;
        }

        try {
          const obj = {
            userid: re_userid,
            newpassword: re_password,
          };

          const encrypted = await Encryption.encryption(
            obj,
            "resetUserpassword",
            false
          );

          const data = await User.resetUserpassword(encrypted, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "รีเซ็ตรหัสผ่าน!",
              text: `รีเซ็ตรหัสผ่าน ${re_username} สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setOldModal(!oldModal);
                setModalResetPassword(!modal_reset_password);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      {oldModal && (
        <div>
          <div className="w-auto h-[480px] overflow-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="sticky -top-1 bg-gray-200 z-10">
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
                  <th className="lg:px-7 px-12 py-3 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Name/Lastname
                  </th>
                  {page_permission?.update || page_permission?.delete ? (
                    <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                      Action
                    </th>
                  ) : (
                    <> </>
                  )}
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-6">
            <IoIosArrowBack
              onClick={handlePrevPage}
              size={26}
              className={`${
                currentPage === 1
                  ? "text-[#bfbfbf]"
                  : "cursor-pointer hover:text-[#bfbfbf]"
              }`}
            />
            {renderPageNumbers()}
            <IoIosArrowForward
              onClick={handleNextPage}
              size={26}
              className={`${
                currentPage === totalPages
                  ? "text-[#bfbfbf]"
                  : "cursor-pointer hover:text-[#bfbfbf]"
              }`}
            />
            <div className="font-poppins font-bold ml-2">Go to</div>
            <input
              type="number"
              min={1}
              value={pageInput}
              onKeyPress={handlePageInputKeyPress}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              className="w-[50px] h-[35px] ml-1 mr-1 border border-gray-300 rounded-sm pl-1 font-poppins"
            />
            <div className="font-poppins font-bold">Page</div>
          </div>
        </div>
      )}

      {modal_edit && (
        <>
          {bg ? (
            <a
              onClick={() => setModalEdit(!modal_edit)}
              className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
            />
          ) : (
            <></>
          )}
        </>
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
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Name :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        if (dump_name !== e.target.value) {
                          setIsEdit(true);
                        } else {
                          setIsEdit(false);
                        }
                        setEditName(e.target.value);
                      }}
                      type="text"
                      placeholder="Your Name"
                      defaultValue={edit_name}
                      value={edit_name}
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Last Name :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        if (dump_lastname !== e.target.value) {
                          setIsEdit(true);
                        } else {
                          setIsEdit(false);
                        }
                        setEditLastname(e.target.value);
                      }}
                      type="text"
                      placeholder="Your Lastname"
                      defaultValue={edit_lastname}
                      value={edit_lastname}
                      required
                      autoComplete="lastname"
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

      {modal_change_password && (
        <>
          {bg ? (
            <a
              onClick={() => setModalChangePassword(!modal_change_password)}
              className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
            />
          ) : (
            <></>
          )}
        </>
      )}

      {modal_change_password && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-40`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => {
                    setOldModal(!oldModal);
                    setModalChangePassword(!modal_change_password);
                  }}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Change Password
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Edit User Password
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
                      type="text"
                      placeholder="Your Username"
                      defaultValue={chg_username}
                      value={chg_username}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4 ">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Current Password :
                    </div>
                  </div>
                  <div className="col-span-8 flex items-center">
                    <input
                      className="lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                      onChange={(e) => {
                        setChgOldPassword(e.target.value);
                      }}
                      type={chg_oldpasswordVisible ? "text" : "password"}
                      placeholder="Your Old Password"
                      value={chg_oldPassword}
                      required
                      autoComplete="oldPassword"
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() =>
                        setChgOldPasswordVisible(!chg_oldpasswordVisible)
                      }
                    >
                      {chg_oldpasswordVisible ? (
                        <IoMdEyeOff
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      ) : (
                        <IoMdEye
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      New Password :
                    </div>
                  </div>
                  <div className="col-span-8 flex items-center">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setChgPassword(e.target.value);
                      }}
                      type={chg_passwordVisible ? "text" : "password"}
                      placeholder="Your New Password"
                      value={chg_password}
                      required
                      autoComplete="newPassword"
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() =>
                        setChgPasswordVisible(!chg_passwordVisible)
                      }
                    >
                      {chg_passwordVisible ? (
                        <IoMdEyeOff
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      ) : (
                        <IoMdEye
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Confirm New Password :
                    </div>
                  </div>
                  <div className="col-span-8 flex items-center">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setChgConfirmPassword(e.target.value);
                      }}
                      type={chg_confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm your Password"
                      value={chg_confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() =>
                        setChgConfirmPasswordVisible(
                          !chg_confirmPasswordVisible
                        )
                      }
                    >
                      {chg_confirmPasswordVisible ? (
                        <IoMdEyeOff
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      ) : (
                        <IoMdEye
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                onClick={(e) => handleChangePassword(e)}
                className={`w-[315px] h-[48px] bg-[#6425FE] hover:bg-[#6325fe86] text-white font-bold font-poppins rounded-lg`}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {modal_reset_password && (
        <>
          {bg ? (
            <a
              onClick={() => setModalResetPassword(!modal_reset_password)}
              className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
            />
          ) : (
            <></>
          )}
        </>
      )}

      {modal_reset_password && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-40`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => {
                    setOldModal(!oldModal);
                    setModalResetPassword(!modal_reset_password);
                  }}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Reset Password
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Reset User Password
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
                      type="text"
                      placeholder="Your Username"
                      defaultValue={re_username}
                      value={re_username}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      New Password :
                    </div>
                  </div>
                  <div className="col-span-8 flex items-center">
                    <input
                      className="lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                      type={re_passwordVisible ? "text" : "password"}
                      placeholder="Your New Password"
                      onChange={(e) => setRePassword(e.target.value)}
                      value={re_password}
                      required
                      autoComplete="newPassword"
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => setRePasswordVisible(!re_passwordVisible)}
                    >
                      {re_passwordVisible ? (
                        <IoMdEyeOff
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      ) : (
                        <IoMdEye
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Confirm New Password :
                    </div>
                  </div>
                  <div className="col-span-8 flex items-center">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setReConfirmPassword(e.target.value);
                      }}
                      type={re_confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm your Password"
                      value={re_confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() =>
                        setReConfirmPasswordVisible(!re_confirmPasswordVisible)
                      }
                    >
                      {re_confirmPasswordVisible ? (
                        <IoMdEyeOff
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      ) : (
                        <IoMdEye
                          className="text-[#6425FE] hover:text-[#3b1694]"
                          size={26}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                onClick={(e) => handleResetPassword(e)}
                className={`w-[315px] h-[48px] bg-[#6425FE] hover:bg-[#6325fe86] text-white font-bold font-poppins rounded-lg`}
              >
                Reset Password
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
            <div className="sticky top-0 right-0 z-30 flex justify-end">
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
            <div className="sticky top-0 right-0 z-30 flex justify-end">
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
