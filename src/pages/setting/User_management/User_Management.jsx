import React, { useState, useEffect } from "react";

import { Header } from "../../../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { Navbar } from "../../../components";
import {
  PiSlidersHorizontalFill,
  PiGridFourFill,
  PiListDashesFill,
  PiCaretUpDown,
} from "react-icons/pi";
import User from "../../../libs/admin";

import { GridTable } from "../../../libs/user_grid";
import useCheckPermission from "../../../libs/useCheckPermission";

import centralImg from "../../../assets/img/central.png";
import robinsonImg from "../../../assets/img/robinson.png";

import top_img from "../../../assets/img/merchandise/tops.png";
import matsumoto_img from "../../../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersport_img from "../../../assets/img/merchandise/Super_Sports.png";
import powerbuy_img from "../../../assets/img/merchandise/Power_Buy.png";
import evisu_img from "../../../assets/img/merchandise/Evisu.png";
import fila_img from "../../../assets/img/merchandise/Fila.png";
import alice_img from "../../../assets/img/merchandise/Alice.png";
import kfc_img from "../../../assets/img/merchandise/kfc.png";
import Encryption from "../../../libs/encryption";
import Swal from "sweetalert2";

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

const User_Management = () => {
  useCheckPermission();
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filter, setFilter] = useState(["Active", "Admin"]);
  const [user_lists, setUserLists] = useState([]);
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

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
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
      if (reg_role) {
        const value = {
          username: reg_username,
          email: reg_email,
          password: reg_password,
          role: reg_role,
          accountcode: "huUpa8dN4i",
        };

        const { token } = User.getCookieData();
        const encrypted = await Encryption.encryption(
          value,
          "create_user",
          false
        );
        // console.log(encrypted);
        try {
          const data = await User.createUser(encrypted, token);
          if (data.code !== 404) {
            Swal.fire({
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
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">
              <text>User</text>
            </div>
          </div>

          {page_permission.create ? (
            <button
              onClick={() => setModalNewUser(!modalNewUser)}
              className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
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
                    name="status"
                    id="status"
                    onClick={toggleStatusSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
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
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
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
            )}
          </div>
        </div>

        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          {user_lists.length > 0 && (
            <GridTable
              user_lists={user_lists}
              page_permission={page_permission}
            />
          )}
        </div>
      </div>

      {showRightPanel && (
        <a
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="fixed top-0 lg:right-52 w-screen h-screen opacity-50 bg-black z-50 backdrop-blur"
        />
      )}

      {showRightPanel && (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-[#E8E8E8] z-50 rounded-md max-h- overflow-y-auto">
          <div className="flex justify-between items-center p-2 mt-3 border-b-2 border-gray-300">
            <span className="text-center text-sm flex-grow font-poppins">
              Filter and sort
            </span>
            <button onClick={() => setShowRightPanel(!showRightPanel)}>
              <IoIosClose size="42" color="#6425FE" />
            </button>
          </div>

          {/* Sort */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">
                  Sort <br />
                  <span
                    className={`font-poppins text-xs  text-[#59606C] ${
                      !isCollapsed ? "hidden" : ""
                    }`}
                  >
                    Best match
                  </span>
                </span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sector */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Sector</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Region */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Region</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Store Cluster */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Store Cluster</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Branch */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Branch</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Department */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Department</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floor */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Floor</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-sm ">G Floor</span>
                </div>
                <div className="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <span className="font-poppins text-sm mr-1">12</span>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-4 w-4 cursor-pointer"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                      />
                      <span
                        className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          isChecked ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-3 w-3 text-white ${
                            isChecked ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">1 Floor</span>
                </div>
                <div className="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">5</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">2 Floor</span>
                </div>
                <div className="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">4</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">3 Floor</span>
                </div>
                <div className="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">10</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Location</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Orientation */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Orientation</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Size */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">Size</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* File Type */}
          <div className="p-6 border-b-2 border-gray-300">
            <div className="flex flex-row ">
              <div className="flex basis-11/12  ">
                <span className="font-poppins text-md ">File Type</span>
              </div>
              <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div className="flex flex-row ">
                <div className="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div className="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalNewUser && (
        <a
          onClick={() => setModalNewUser(!modalNewUser)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalNewUser && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setModalNewUser(!modalNewUser)}>
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
                Select Brands To Unleash The Power Of Digital Advertising
              </div>
            </div>
            <div className="mt-2 p-2">
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
