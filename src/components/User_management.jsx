import React, { useState, useEffect } from "react";

import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { PiCaretUpDown } from "react-icons/pi";
import { GridTable } from "../libs/user_grid";
import Swal from "sweetalert2";

import Encryption from "../libs/encryption";
import User from "../libs/admin";

const User_Management = ({ setShowUserMng }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [filter, setFilter] = useState(["Active", "Admin"]);

  const [user_lists, setUserLists] = useState([]);
  const [default_account, setDefaultAccount] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);
  const [default_brand, setDefaultBrand] = useState([]);
  const [default_merchandise, setDefaultMerchandise] = useState([]);

  //Register
  const [reg_username, setRegUserName] = useState(null);
  const [reg_email, setRegEmail] = useState(null);
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

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchBrandAndMerchandise();
    fetchRoleData();
    fetchAccount();
    setPermission();
  }, []);

  const fetchUsersList = async (brand) => {
    const lists = await User.getUsersList(token);

    // const updatedData = lists.map((item) => {
    //   if (item.AccessContent.brands && item.AccessContent.brands.length > 0) {
    //     const brandID = item.AccessContent.brands;
    //     const foundBrand = findBrandByID(brandID.map(Number), brand);
    //     if (foundBrand) {
    //       item.AccessContent.brands = foundBrand;
    //     }
    //   }
    //   return item;
    // });

    // setUserLists(updatedData);
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
    fetchUsersList(brand);
  };

  const setPermission = async () => {
    const { user } = User.getCookieData();
    if (user.role === "Super Admin") {
      setIsSuperAdmin(true);
    }
    const { permissions } = convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions.user);
  };

  const convertPermissionValuesToBoolean = (data) => {
    const convertedData = { permissions: {} };

    data.map((items) => {
      for (const resource in items.permissions) {
        const value = items.permissions[resource];

        const resourcePermissions = {
          view: (value & (2 ** 1)) !== 0, // Check if the "view" bit is set
          create: (value & (2 ** 2)) !== 0, // Check if the "create" bit is set
          update: (value & (2 ** 3)) !== 0, // Check if the "update" bit is set
          delete: (value & (2 ** 4)) !== 0, // Check if the "delete" bit is set
        };
        convertedData.permissions[resource] = resourcePermissions;
      }

      for (const permissions in items.other_permission) {
        const value = items.other_permission[permissions];
        convertedData.other_permission[permissions] =
          value === 1 || value === true;
      }
    });

    return convertedData;
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
    const brand = default_brand.find((item) => item.BrandID === id);
    return brand
      ? brand.BrandLogo ||
          `https://ui-avatars.com/api/?name=${
            brand.BrandName
          }&background=${"000000"}&color=fff`
      : null;
  };

  const findMerchImg = (id) => {
    const merchandise = default_merchandise.find(
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
        email: reg_email,
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
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "สร้างผู้ใช้งานสำเร็จ!",
          text: `สร้างผู้ใช้งานสำเร็จ!`,
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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setShowUserMng(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="font-poppins font-semibold text-2xl mt-10 ml-3">
            User
          </div>
          {/* Select Menu */}
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 flex justify-between items-center">
                  <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                    <select
                      name="status"
                      id="status"
                      onClick={toggleStatusSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none font-poppins w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isStatusOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="role"
                      id="role"
                      onClick={toggleRoleSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full font-poppins bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      {isRoleOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {page_permission?.create ? (
                <div className="relative w-full lg:w-full h-[40px] flex items-end justify-end font-bold text-sm lg:text-base ml-3 mb-3">
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[200px] lg:w-[300px] h-[45px] rounded-md mr-1"
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
          <div className="flex flex-row mt-4">
            <div className="basis-11/12">
              {filter &&
                filter.map((items) => (
                  <button onClick={() => removeFilter(items)}>
                    <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-300 rounded-full">
                      <div className="grid grid-cols-4">
                        <div className="col-span-1 mt-[6px]">
                          <div className="flex justify-end items-center">
                            <IoIosClose size="27" color="#6425FE" />
                          </div>
                        </div>
                        <div className="col-span-3 mt-[8px]">
                          <div className="flex justify-center items-center">
                            <div className="font-poppins text-sm">{items}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              {filter.length > 0 && (
                <button onClick={() => clearFilter()}>
                  <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] hover:bg-[#3b1694] border-gray-300 rounded-full">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 mt-[6px]">
                        <div className="flex justify-end items-center">
                          <IoIosClose size="27" color="#6425FE" />
                        </div>
                      </div>
                      <div className="col-span-11 mt-[8px]">
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-sm text-white">
                            Clear All
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
          {/* Filter */}
          <div className="w-auto mt-5  rounded-lg p-2">
            {user_lists.length > 0 && (
              <GridTable
                user_lists={user_lists}
                page_permission={page_permission}
                brand={default_brand}
                merchandise={default_merchandise}
              />
            )}
          </div>
        </div>
      </div>

      {showRegister && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowRegister(!showRegister)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Sign Up</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Sign Up To Unleash The Power Of Digital Advertising
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
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg"
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
                      Merchandise :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="relative lg:w-[60%]  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                      <button
                        onClick={() => setShowMerchandiseModal(true)}
                        name="merchandise"
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
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg"
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
                Sign Up
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
            <div className="flex flex-wrap justify-center items-center lg:space-x-[-100px] mt-5 h-[550px] overflow-y-auto">
              {default_brand.length > 0 &&
                default_brand.map((items, key) => (
                  <div
                    key={key}
                    className="sm:w-1/2 lg:w-[33%] h-[400px] p-2 flex flex-col items-center"
                  >
                    <div className="relative mb-4">
                      <img
                        className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-cover"
                        src={
                          items.BrandLogo
                            ? items.BrandLogo
                            : `https://ui-avatars.com/api/?name=${
                                items.BrandName
                              }&background=${"000000"}&color=fff`
                        }
                        alt={items.BrandName}
                      />
                      <div className="absolute top-2 right-2 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(items.BrandID, "brand")
                          }
                          className="w-[20px] h-[20px]"
                          checked={reg_brand.includes(items.BrandID)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCheckboxChange(items.BrandID, "brand")
                      }
                      className="w-full"
                    >
                      <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                        {items.BrandName}
                      </div>
                      <div className="text-[14px] text-slate-500 font-poppins">
                        {items.BrandDesc}
                      </div>
                    </button>
                  </div>
                ))}
            </div>
            <div className="mt-5">
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
                Select Merchandise to unleash the power of digital advertising
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

            <div className="flex flex-wrap justify-center items-center lg:space-x-[-100px] mt-5 h-[550px] overflow-y-auto">
              {default_merchandise.length > 0 &&
                default_merchandise.map((items, key) => (
                  <div
                    key={key}
                    className="sm:w-1/2 lg:w-[33%] h-[400px] p-2 flex flex-col items-center"
                  >
                    <div className="relative mb-4">
                      <img
                        className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-cover"
                        src={
                          items.AdvertiserLogo
                            ? items.AdvertiserLogo
                            : `https://ui-avatars.com/api/?name=${
                                items.AdvertiserName
                              }&background=${"000000"}&color=fff`
                        }
                        alt={items.AdvertiserName}
                      />
                      <div className="absolute top-2 right-2 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              items.AdvertiserID,
                              "merchandise"
                            )
                          }
                          className="w-[20px] h-[20px]"
                          checked={reg_merchandise.includes(items.AdvertiserID)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCheckboxChange(items.AdvertiserID, "merchandise")
                      }
                      className="w-full"
                    >
                      <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                        {items.AdvertiserName}
                      </div>
                      <div className="text-[14px] text-slate-500 font-poppins">
                        {items.Department}
                      </div>
                    </button>
                  </div>
                ))}
            </div>
            <div className="mt-5">
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
      )}
    </>
  );
};

export default User_Management;
