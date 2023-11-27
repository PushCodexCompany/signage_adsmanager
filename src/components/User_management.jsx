import React, { useState, useEffect } from "react";

import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { PiCaretUpDown, PiSlidersHorizontalFill } from "react-icons/pi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GridTable } from "../libs/user_grid";
import Swal from "sweetalert2";

import centralImg from "../assets/img/central.png";
import robinsonImg from "../assets/img/robinson.png";

import top_img from "../assets/img/merchandise/tops.png";
import matsumoto_img from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import powerbuy_img from "../assets/img/merchandise/Power_Buy.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import fila_img from "../assets/img/merchandise/Fila.png";
import alice_img from "../assets/img/merchandise/Alice.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import { Navbar } from "../components";
import Encryption from "../libs/encryption";
import User from "../libs/admin";
const mock_data_brands = [
  {
    id: 1,
    name: "CDS",
    img: centralImg,
    des: "Central Department Store",
  },
  {
    id: 2,
    name: "Robinson",
    img: robinsonImg,
    des: "Robinson Department Store",
  },
];

const mockup_merchandise = [
  {
    id: 1,
    name: "Tops",
    img: top_img,
    des: "Tops Supermarkety",
  },
  {
    id: 2,
    name: "Matsumoto KiYoshi",
    img: matsumoto_img,
    des: "Matsumoto KiYoshi",
  },
  {
    id: 3,
    name: "Super Sports",
    img: supersport_img,
    des: "Super Sports",
  },
  {
    id: 4,
    name: "Power Buy",
    img: powerbuy_img,
    des: "Power Buy",
  },
  {
    id: 5,
    name: "Evisu",
    img: evisu_img,
    des: "Evisu",
  },
  {
    id: 6,
    name: "Fila",
    img: fila_img,
    des: "Fila",
  },
  {
    id: 7,
    name: "Alice And Olivia",
    img: alice_img,
    des: "Alice And Olivia",
  },
  {
    id: 8,
    name: "KFC",
    img: kfc_img,
    des: "KFC",
  },
];

const User_Management = ({ setShowModal }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [filter, setFilter] = useState(["Active", "Admin"]);

  const [user_lists, setUserLists] = useState([]);
  const [default_roles, setDefaultRoles] = useState([]);

  //   const [showModal, setShowModal] = useState(false);

  //Register
  const [reg_email, setRegEmail] = useState(null);
  const [reg_password, setRegPassword] = useState(null);
  const [reg_re_password, setRegRePassword] = useState(null);
  const [reg_role, setRegRole] = useState(null);
  const [reg_brand, setRegBrand] = useState([]);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  const [showRegister, setShowRegister] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);
  const [page_permission, setPagePermission] = useState([]);

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchRoleData();
    fetchUsersList();
    setPermission();
  }, []);

  const fetchUsersList = async () => {
    const lists = await User.getUsersList(token);
    setUserLists(lists);
  };

  const fetchRoleData = async () => {
    const roles = await User.getUserRoles(token);
    setDefaultRoles(roles);
  };

  const setPermission = async () => {
    const { user } = User.getCookieData();
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

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
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

  const toggleSectorSelect = () => {
    setIsSectorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRegionSelect = () => {
    setIsRegionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleClustorSelect = () => {
    setIsClustorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchSelect = () => {
    setIsBranchOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentSelect = () => {
    setIsDepartmentOpen((prevIsOpen) => !prevIsOpen);
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
    const brand = mock_data_brands.find((item) => item.id === id);
    return brand ? brand.img : null;
  };

  const findMerchImg = (id) => {
    const merchandise = mockup_merchandise.find((item) => item.id === id);
    return merchandise ? merchandise.img : null;
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
        username: reg_email,
        password: reg_password,
        accountcode: "huUpa8dN4i",
      };

      const { token } = User.getCookieData();
      const encrypted = await Encryption.encryption(
        value,
        "create_user",
        false
      );
      // console.log(encrypted);

      const status = await User.createUser(encrypted, token);
      if (status) {
        Swal.fire({
          icon: "success",
          title: "Login ...",
          text: "สร้าง User สำเร็จ!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed ...",
          text: "ไม่สามารถสร้าง User ได้!",
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
            <button onClick={() => setShowModal(false)}>
              <AiOutlineClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="font-poppins font-semibold text-2xl mt-10 ml-3">
            <text>User</text>
          </div>
          {/* Select Menu */}
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div class="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
              <div class="flex flex-col lg:flex-row">
                <div class="w-full lg:w-3/4 flex justify-between items-center">
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                    <select
                      name="status"
                      id="status"
                      onClick={toggleStatusSelect}
                      onChange={handleStatusChange}
                      class="block appearance-none font-poppins w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isStatusOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="role"
                      id="role"
                      onClick={toggleRoleSelect}
                      onChange={handleStatusChange}
                      class="block appearance-none w-full font-poppins bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      {isRoleOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {page_permission.create ? (
                <div className="relative w-full lg:w-full h-[40px] flex items-end justify-end font-bold text-sm lg:text-base ml-3 mb-3">
                  <button
                    onClick={() => setShowRegister(true)}
                    className="bg-[#6425FE] text-white text-sm font-poppins w-[200px] lg:w-[300px] lg:h-[45px] rounded-md mr-1"
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
                  <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] border-gray-300 rounded-full">
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
          <div className="w-auto mt-5 h-[400px]  rounded-lg p-2">
            <GridTable
              user_lists={user_lists}
              page_permission={page_permission}
            />
          </div>
        </div>
      </div>

      {showRegister && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowRegister(!showRegister)}>
                <AiOutlineClose size={25} color={"#6425FE"} />
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
            <div className="mt-10 mb-4 flex justify-center items-center">
              <input
                className={` w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                onChange={(e) => setRegEmail(e.target.value)}
                type="text"
                placeholder="Your Email"
                value={reg_email === null ? "" : reg_email}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="mb-4 flex justify-center items-center">
              <input
                className={`w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                onChange={(e) => setRegPassword(e.target.value)}
                type="password"
                placeholder="Your Password"
                value={reg_password === null ? "" : reg_password}
                required
                autoComplete="password"
              />
            </div>
            <div className="mb-4 flex justify-center items-center">
              <input
                className={`w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                onChange={(e) => setRegRePassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                value={reg_re_password === null ? "" : reg_re_password}
                required
                autoComplete="password"
              />
            </div>
            <div className="mb-4 flex justify-center items-center">
              <select
                name="role"
                id="role"
                onClick={toggleStatusSelect}
                onChange={(e) => setRegRole(e.target.value)}
                value={reg_role}
                className={`w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
              >
                {default_roles.map((items) => (
                  <option value={items.RoleKey}>{items.RoleName}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex justify-center items-center">
              <div className="relative w-[60%]  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
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
            {reg_brand.length > 0 && (
              <div className="mb-4 flex ml-36 lg:ml-80 items-center space-x-4">
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
            <div className="mb-4 flex justify-center items-center">
              <div className="relative w-[60%]  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
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
            {reg_merchandise.length > 0 && (
              <div className="mb-4 flex ml-36 lg:ml-80 items-center space-x-4 ">
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
            <div className="text-center">
              <button
                type="submit"
                onClick={() => registerNewUser()}
                className="w-full lg:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
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
                <AiOutlineClose size={25} color={"#6425FE"} />
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
                Sign Up To Unleash The Power Of Digital Advertising
              </div>
            </div>
            <div className="mt-2 p-2">
              <div className="relative flex items-center justify-center">
                <input
                  className="w-[900px] h-10 border border-gray-300 rounded-md pl-10 pr-2 font-poppins"
                  placeholder="Search"
                />
                <span className="absolute inset-y-0 left-0 lg:left-80 flex items-center pl-2">
                  <AiOutlineSearch size={20} color="#DBDBDB" />
                </span>
              </div>
            </div>
            <div className="mt-2 p-2">
              <div className="relative flex flex-col  max-w-0  w-full mb-3 border-b-4 border-gray-600">
                {/* Select Menu */}
                <div className="rounded-lg h-[50px] flex items-center shadow-md">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-4/4 flex justify-center items-center p-6">
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="sector"
                          id="sector"
                          onClick={toggleSectorSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Sector">Sector</option>
                          <option value="Portrait">Portrait</option>
                          <option value="Landscape">Landscape</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isSectorOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="region"
                          id="region"
                          onClick={toggleRegionSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Region">Region</option>
                          <option value="North">North</option>
                          <option value="West">West</option>
                          <option value="East">East</option>
                          <option value="South">South</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                          {isRegionOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="store_cluster"
                          id="store_cluster"
                          onClick={toggleClustorSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Store Cluster">Store Cluster</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isClustorOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="branch"
                          id="branch"
                          onClick={toggleBranchSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Branch">Branch</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isBranchOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="department"
                          id="department"
                          onClick={toggleDepartmentSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Department">Department</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Toy">Toy</option>
                          <option value="Electronics">Electronics</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isDepartmentOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <button
                          onClick={() => showAllFilter()}
                          name="role"
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          All filter
                        </button>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <PiSlidersHorizontalFill size={18} color="#6425FE" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Select Menu */}
              </div>

              <div className="flex">
                <div className="basis-12/12 ml-4">
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
                                <div className="font-poppins text-sm font-bold">
                                  {items}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  {filter.length > 0 && (
                    <button onClick={() => clearFilter()}>
                      <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] border-gray-300 rounded-full">
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

              <div className="h-[350px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-2 gap-8">
                    {mock_data_brands.map((item, index) => (
                      <div key={index}>
                        <div className="h-64 w-64 relative">
                          <input
                            type="checkbox"
                            className="absolute top-0 left-0 mt-4 ml-4 w-5 h-5"
                            onChange={() =>
                              handleCheckboxChange(item.id, "brand")
                            }
                            checked={reg_brand.includes(item.id)}
                          />

                          <div className="w-full h-full flex items-center justify-center">
                            <img
                              className="block ml-auto mr-auto w-auto h-auto rounded-3xl"
                              src={item.img}
                              alt={item.name}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-xl font-bold">
                            {item.name}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-[#6F6F6F] text-sm">
                            {item.des}
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
                    className="w-52 h-10 bg-[#6425FE] rounded-lg text-white font-poppins"
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
                <AiOutlineClose size={25} color={"#6425FE"} />
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
                Sign Up to unleash the power of digital advertising
              </div>
            </div>
            <div className="mt-2 p-2">
              <div className="relative flex items-center justify-center">
                <input
                  className="w-[900px] h-10 border border-gray-300 rounded-md pl-10 pr-2 font-poppins"
                  placeholder="Search"
                />
                <span className="absolute inset-y-0 left-0 lg:left-80 flex items-center pl-2">
                  <AiOutlineSearch size={20} color="#DBDBDB" />
                </span>
              </div>
            </div>

            <div className="mt-2 p-2">
              {/* Select Menu */}
              <div className="relative flex flex-col  max-w-0  w-full mb-3 border-b-4 border-gray-600">
                <div className="rounded-lg h-[50px] flex items-center shadow-md">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-4/4 flex justify-center items-center p-6">
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="sector"
                          id="sector"
                          onClick={toggleSectorSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Sector">Sector</option>
                          <option value="Portrait">Portrait</option>
                          <option value="Landscape">Landscape</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isSectorOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="region"
                          id="region"
                          onClick={toggleRegionSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Region">Region</option>
                          <option value="North">North</option>
                          <option value="West">West</option>
                          <option value="East">East</option>
                          <option value="South">South</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                          {isRegionOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="store_cluster"
                          id="store_cluster"
                          onClick={toggleClustorSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Store Cluster">Store Cluster</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isClustorOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="branch"
                          id="branch"
                          onClick={toggleBranchSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Branch">Branch</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isBranchOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="department"
                          id="department"
                          onClick={toggleDepartmentSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Department">Department</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Toy">Toy</option>
                          <option value="Electronics">Electronics</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isDepartmentOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <button
                          onClick={() => showAllFilter()}
                          name="role"
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          All filter
                        </button>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <PiSlidersHorizontalFill size={18} color="#6425FE" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Select Menu */}

              {/* Filter  */}
              <div className="flex">
                <div className="basis-12/12 ml-4">
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
                                <div className="font-poppins text-sm font-bold">
                                  {items}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  {filter.length > 0 && (
                    <button onClick={() => clearFilter()}>
                      <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] border-gray-300 rounded-full">
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
              {/* Filter  */}

              <div className="h-[350px]  mt-8 overflow-y-auto">
                <div className="h-[250px] flex items-start justify-center mt-3">
                  <div className="grid grid-cols-4 gap-8">
                    {mockup_merchandise.map((item, index) => (
                      <div key={index}>
                        <div className="h-64 w-64 relative">
                          <input
                            type="checkbox"
                            className="absolute top-0 left-0 mt-4 ml-4 w-5 h-5"
                            onChange={() =>
                              handleCheckboxChange(item.id, "merchandise")
                            }
                            checked={reg_merchandise.includes(item.id)}
                          />

                          <div className="w-full h-full flex items-center justify-center">
                            <img
                              className="block ml-auto mr-auto w-auto h-auto rounded-3xl"
                              src={item.img}
                              alt={item.name}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-xl font-bold">
                            {item.name}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-[#6F6F6F] text-sm">
                            {item.des}
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
                    onClick={() => saveBrandMerchandise()}
                    className="w-52 h-10 bg-[#6425FE] rounded-lg text-white font-poppins"
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
