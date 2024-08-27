import React, { useState, useEffect } from "react";

import { Header, Navbar } from "../../../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { PiCaretUpDown } from "react-icons/pi";
import User from "../../../libs/admin";

import { GridTable } from "../../../libs/user_grid";
import useCheckPermission from "../../../libs/useCheckPermission";
import Permission from "../../../libs/permission";
import Encryption from "../../../libs/encryption";
import Swal from "sweetalert2";

const User_Management = () => {
  useCheckPermission();
  const [brand, setBrand] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [filterActive, setFilterActive] = useState([]);
  const [filterRole, setFilterRole] = useState([]);

  const [user_lists, setUserLists] = useState([]);
  const [default_user_lists, set_default_user_lists] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);
  const [modalNewUser, setModalNewUser] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);

  const [reg_username, setRegUserName] = useState(null);
  const [reg_email, setRegEmail] = useState(null);
  const [reg_password, setRegPassword] = useState(null);
  const [reg_re_password, setRegRePassword] = useState(null);
  const [reg_role, setRegRole] = useState(null);
  const [reg_brand, setRegBrand] = useState([]);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  const [page_permission, setPagePermission] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchRoleData();
    fetchUsersList();
    setPermission();
    getBrandAndMerch();
  }, []);

  useEffect(() => {
    if (filterActive.length > 0 || filterRole.length > 0) {
      filterList();
    } else {
      fetchUsersList();
    }
  }, [filterActive, filterRole]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterList = () => {
    const mapFilterValues = (value) => {
      if (value === "Deactive") return 0;
      if (value === "Active") return 1;
      return value;
    };

    const filter = {
      Actived: filterActive.map(mapFilterValues),
      RoleName: filterRole,
    };

    const filterLists = default_user_lists.filter((user) => {
      const mappedActivated = mapFilterValues(user.Activated);

      const filterActived =
        filter.Actived.length === 0 || filter.Actived.includes(mappedActivated);
      const filterRoleName =
        filter.RoleName.length === 0 || filter.RoleName.includes(user.RoleName);

      return filterActived && filterRoleName;
    });

    setUserLists(filterLists);
  };

  const fetchUsersList = async () => {
    const lists = await User.getUsersList(token);
    set_default_user_lists(lists);
    setUserLists(lists);
  };

  const fetchRoleData = async () => {
    const roles = await User.getUserRoles(token);
    setDefaultRoles(roles);
  };

  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions.user);
  };

  const getBrandAndMerch = async () => {
    const { brand_code } = User.getBrandCode();
    const brand = await User.getBrand(token);
    const merchandise = await User.getMerchandiseList(token);
    setBrand(brand);
    setMerchandise(merchandise);
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleRoleSelect = () => {
    setIsRoleOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event, type) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      if (type === "Actived") {
        setFilterActive((prevFilter) => {
          if (prevFilter.includes(selectedValue)) {
            return prevFilter; // Already selected, no change
          } else {
            return [...prevFilter, selectedValue]; // Add the selected value to the filter state
          }
        });
      } else if (type === "RoleName") {
        setFilterRole((prevFilter) => {
          if (prevFilter.includes(selectedValue)) {
            return prevFilter; // Already selected, no change
          } else {
            return [...prevFilter, selectedValue]; // Add the selected value to the filter state
          }
        });
      }
    }
  };

  const removeFilter = (event, type) => {
    const selectedValue = event;
    if (type === "Actived") {
      const updatedFilter = filterActive.filter(
        (value) => value !== selectedValue
      );
      setFilterActive(updatedFilter);
    } else if (type === "RoleName") {
      const updatedFilter = filterRole.filter(
        (value) => value !== selectedValue
      );
      setFilterRole(updatedFilter);
    }
  };

  const clearFilter = () => {
    setFilterActive([]);
    setFilterRole([]);
  };

  const findBrandImg = (id) => {
    const brand_img = brand.find((item) => item.BrandID === id);
    return brand_img
      ? brand_img.BrandLogo ||
          `https://ui-avatars.com/api/?name=${
            brand_img.BrandName
          }&background=${"000000"}&color=fff`
      : null;
  };

  const findMerchImg = (id) => {
    const merchandise_img = merchandise.find(
      (item) => item.AdvertiserID === id
    );

    return merchandise_img.AdvertiserLogo
      ? merchandise_img.AdvertiserLogo
      : `https://ui-avatars.com/api/?name=${
          merchandise_img.AdvertiserName
        }&background=${"000000"}&color=fff`;
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
      if (reg_role) {
        const { account } = User.getAccount();

        const value = {
          username: reg_username,
          email: reg_email,
          password: reg_password,
          roleid: reg_role,
          accountcode: account.AccountCode,
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
        try {
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
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Register Failed ...",
          text: "กรุณาเลือก Role!",
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

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Setting"} lv2={"User Management"} lv3={"user"} />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">User</div>
          </div>
          {page_permission?.create ? (
            <button
              onClick={() => setModalNewUser(!modalNewUser)}
              className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] h-[45px] rounded-md"
            >
              New User +
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="relative flex flex-col min-w-0  w-full mb-6 ">
          {/* Select Menu */}
          <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-3/4 flex justify-between items-center">
                <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                  <select
                    name="actived"
                    id="actived"
                    onClick={toggleStatusSelect}
                    onChange={(e) => handleStatusChange(e, "Actived")}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="" disabled selected hidden>
                      Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
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
                    onChange={(e) => handleStatusChange(e, "RoleName")}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="" disabled selected hidden>
                      Role
                    </option>
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
            {/* <div className="relative w-full lg:w-full h-[40px] flex items-center justify-end font-bold text-sm lg:text-base ml-3 mb-3">
              <button
                onClick={() => showAllFilter()}
                className=" text-[#6425FE]text-sm font-poppins w-full lg:w-[50px] lg:h-[45px] rounded-md"
              >
                <PiSlidersHorizontalFill size={26} color="#6425FE" />
              </button>
            </div> */}
          </div>

          {/* Select Menu */}
        </div>

        <div className="flex flex-row mt-4">
          <div className="basis-11/12">
            {filterActive &&
              filterActive.map((items) => (
                <button onClick={() => removeFilter(items, "Actived")}>
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
            {filterRole &&
              filterRole.map((items) => (
                <button onClick={() => removeFilter(items, "RoleName")}>
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
            {filterRole.length > 0 || filterActive.length > 0 ? (
              <button onClick={() => clearFilter()}>
                <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE]  hover:bg-[#3b1694] border-gray-300 rounded-full">
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
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          {user_lists.length > 0 && (
            <GridTable
              user_lists={user_lists}
              page_permission={page_permission}
              brand={brand}
              merchandise={merchandise}
            />
          )}
        </div>
      </div>

      {modalNewUser && (
        <a
          onClick={() => setModalNewUser(!modalNewUser)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalNewUser && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-30`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setModalNewUser(!modalNewUser)}>
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

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
                <div className="grid grid-cols-12 space-x-2 mb-6">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right"></div>
                  </div>
                  <div className="col-span-8">
                    {reg_merchandise.length > 0 && (
                      <div className="flex  items-center space-x-4 ">
                        {reg_merchandise.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <img
                              className="block ml-auto mr-auto w-12 h-12 rounded-lg object-contain border border-[#dedede]"
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
              <div className="font-poppins text-5xl font-bold">
                Select Brands
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select Brands To Unleash The Power Of Digital Advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[500px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {brand.length > 0 &&
                      brand.map((item, index) => (
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
                Select Merchandise
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Select Merchandise to unleash the power of digital advertising
              </div>
            </div>

            <div className="mt-2 p-2">
              <div className="h-[500px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {merchandise.length > 0 &&
                      merchandise.map((item, index) => (
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
      )}
    </>
  );
};

export default User_Management;
