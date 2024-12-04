import React, { useState, useEffect } from "react";

import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { PiCaretUpDown } from "react-icons/pi";
import { GridTable } from "../libs/user_grid";
import Swal from "sweetalert2";
import Permission from "../libs/permission";
import Encryption from "../libs/encryption";
import User from "../libs/admin";
import Filter from "../components/Filter";

const User_Management = ({ setShowUserMng, showUserMng }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [filter, setFilter] = useState([]);

  const [user_lists, setUserLists] = useState([]);
  const [default_account, setDefaultAccount] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);
  const [default_brand, setDefaultBrand] = useState([]);
  const [default_merchandise, setDefaultMerchandise] = useState([]);

  //Register
  const [reg_username, setRegUserName] = useState(null);
  const [reg_email, setRegEmail] = useState(null);
  const [reg_name, setRegName] = useState(null);
  const [reg_lastname, setRegLastname] = useState(null);
  const [reg_password, setRegPassword] = useState(null);
  const [reg_re_password, setRegRePassword] = useState(null);
  const [reg_role, setRegRole] = useState(null);
  const [reg_account, setRegAccount] = useState(null);
  const [reg_brand, setRegBrand] = useState([]);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  const [showRegister, setShowRegister] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);
  const [page_permission, setPagePermission] = useState([]);

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [filter_screen, setFilterScreen] = useState([]);

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchBrandAndMerchandise();
    fetchRoleData();
    fetchAccount();
    setPermission();
  }, []);

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    const lists = await User.getUsersList(token);
    setUserLists(lists);
  };

  const findBrandByID = (brandID, brand) => {
    const value = brand.filter((brand) => brandID.includes(brand.BrandID));
    return value;
  };

  const fetchAccount = async () => {
    const lists = await User.getUserAccount(token);
    setDefaultAccount(lists);
  };

  const fetchRoleData = async () => {
    const roles = await User.getUserRoles(token);
    setDefaultRoles(roles);
  };

  const fetchBrandAndMerchandise = async () => {
    const brand = await User.getBrand(token);
    const merchandise = await User.getMerchandiseList(token);
    setDefaultBrand(brand);
    setDefaultMerchandise(merchandise);
  };

  const setPermission = async () => {
    const { user } = User.getCookieData();
    if (user.role === "Super Admin") {
      setIsSuperAdmin(true);
    }
    const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions?.user);
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleRoleSelect = () => {
    setIsRoleOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(selectedValue)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, selectedValue]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
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

  const saveBrandMerchandise = () => {
    const sortMerch = reg_merchandise.slice().sort((a, b) => a - b);
    setRegMerchandise(sortMerch);
    setShowMerchandiseModal(!showMerchandiseModal);
  };

  const findBrandImg = (id) => {
    const brand = default_brand?.find((item) => item.BrandID === id);
    return brand
      ? brand.BrandLogo ||
          `https://ui-avatars.com/api/?name=${
            brand.BrandName
          }&background=${"000000"}&color=fff`
      : null;
  };

  const findMerchImg = (id) => {
    const merchandise = default_merchandise?.find(
      (item) => item.AdvertiserID === id
    );
    return merchandise ? merchandise.AdvertiserLogo : null;
  };

  const registerNewUser = async () => {
    if (!reg_password) {
      Swal.fire({
        icon: "error",
        title: "Register Failed ...",
        text: "กรุณากรอกรหัสผ่าน!",
      });
    }

    if (reg_password === reg_re_password) {
      const value = {
        username: reg_username,
        firstname: reg_name,
        lastname: reg_lastname,
        email: reg_email,
        profileemail: reg_email,
        password: reg_password,
        roleid: reg_role,
        accountcode: reg_account,
        accesscontent: {
          brands: reg_brand.map(String),
          merchandise: reg_merchandise,
        },
      };

      const { token } = User.getCookieData();
      const encrypted = await Encryption.encryption(
        value,
        "create_user",
        false
      );

      const data = await User.createUser(encrypted, token);
      if (data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "สร้างผู้ใช้งานสำเร็จ!",
          text: `สร้างผู้ใช้งานสำเร็จ!`,
        }).then(async (result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            const freshToken = User.getCookieData().token;
            const lists = await User.getUsersList(freshToken);
            setUserLists(lists);
            setShowRegister(!showRegister);
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
        text: "กรุณากรอกรหัสผ่านให้เหมือนกัน!",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className={`absolute -top-4 -right-4 m-4 z-20`}>
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowUserMng(!showUserMng)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Content  */}
          <div className="font-poppins font-semibold text-2xl mt-10 ml-3">
            User
          </div>
          {/* Select Menu */}
          <div className="relative flex flex-col min-w-0  w-full">
            <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-sm">
              {/* Modal Page */}
              {page_permission?.create ? (
                <div className="relative w-full lg:w-full h-[40px] flex items-end justify-end font-bold text-sm lg:text-base ml-3 mb-3">
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[200px] lg:w-[300px] h-[45px] rounded-md mr-1 shadow-sm"
                  >
                    New User +
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Select Menu */}

          {/* Filter */}
          <Filter
            setFilterScreen={setFilterScreen}
            filter_screen={filter_screen}
            page_name={"userMgt"}
          />
          {/* Filter */}
          <div className="w-auto   rounded-lg p-2">
            {user_lists.length > 0 && (
              <GridTable
                user_lists={user_lists}
                page_permission={page_permission}
                brand={default_brand}
                merchandise={default_merchandise}
                bg={false}
              />
            )}
          </div>
        </div>
      </div>

      {showRegister && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className="sticky top-0 right-0 z-30 flex justify-end">
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setShowRegister(!showRegister)}>
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content  */}
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl font-bold">
                Create New User
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Create User To Unleash The Power Of Digital Advertising
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
                      className={` lg:w-[60%]  py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => setRegUserName(e.target.value)}
                      type="text"
                      placeholder="Your Username"
                      value={reg_username === null ? "" : reg_username}
                      required
                      autoFocus
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
                      onChange={(e) => setRegName(e.target.value)}
                      type="text"
                      placeholder="Your Name"
                      value={reg_name === null ? "" : reg_name}
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
                      onChange={(e) => setRegLastname(e.target.value)}
                      type="text"
                      placeholder="Your Lastname"
                      value={reg_lastname === null ? "" : reg_lastname}
                      required
                      autoComplete="lastname"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Email :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={` lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => setRegEmail(e.target.value)}
                      type="text"
                      placeholder="Your Email"
                      value={reg_email === null ? "" : reg_email}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Password :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => setRegPassword(e.target.value)}
                      type="password"
                      placeholder="Your Password"
                      value={reg_password === null ? "" : reg_password}
                      required
                      autoComplete="password"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Confirm Password :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => setRegRePassword(e.target.value)}
                      type="password"
                      placeholder="Confirm Password"
                      value={reg_re_password === null ? "" : reg_re_password}
                      required
                      autoComplete="password"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                      Role :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <select
                      name="role"
                      id="role"
                      onClick={toggleStatusSelect}
                      onChange={(e) => setRegRole(e.target.value)}
                      value={reg_role}
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    >
                      <option value={null}>-- Please Select Role ---</option>
                      {default_roles.map((items) => (
                        <option value={items.RoleID}>{items.RoleName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {isSuperAdmin ? (
                  <div className="grid grid-cols-12 space-x-2 mb-4">
                    <div className="col-span-4">
                      <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                        Account :
                      </div>
                    </div>
                    <div className="col-span-8">
                      <select
                        name="account"
                        id="account"
                        onClick={toggleStatusSelect}
                        onChange={(e) => setRegAccount(e.target.value)}
                        value={reg_account}
                        className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      >
                        <option value={null}>
                          -- Please Select Account ---
                        </option>
                        {default_account.map((items) => (
                          <option value={items.AccountCode}>
                            {items.AccountName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

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
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg object-contain"
                              src={findBrandImg(item)}
                              alt={item.name}
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
                    <div className="relative lg:w-[60%]  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                      <button
                        onClick={() => setShowMerchandiseModal(true)}
                        name="merchandise"
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
                <div className="grid grid-cols-12 space-x-2 mb:2 lg:mb-6">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right"></div>
                  </div>
                  <div className="col-span-8">
                    {reg_merchandise.length > 0 && (
                      <div className="flex  items-center space-x-4 ">
                        {reg_merchandise.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <img
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg object-contain"
                              src={findMerchImg(item)}
                              alt={item.name}
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
                onClick={() => registerNewUser()}
                className="w-[300px] bg-[#2f3847] hover:bg-[#445066] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
              >
                Create
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

            {/* Content  */}
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Select BU</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select BU To Unleash The Power Of Digital Advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[550px]  mt-8 overflow-y-auto">
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
                                className="block ml-auto mr-auto w-60 h-60  object-contain border border-gray-200 rounded-lg" // Adjust the size as needed
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
                              <div className="font-poppins text-xl font-bold hover:text-[#6425FE]">
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

            {/* Content  */}
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
                              <div className="font-poppins text-xl font-bold hover:text-[#6425FE]">
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

              <div className="mt-2">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => saveBrandMerchandise()}
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

export default User_Management;
