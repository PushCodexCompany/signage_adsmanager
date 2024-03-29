import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import Swal from "sweetalert2";
import { PiCaretUpDown, PiSlidersHorizontalFill } from "react-icons/pi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  IoIosClose,
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";

// brand

import centralImg from "../assets/img/central.png";
import robinsonImg from "../assets/img/robinson.png";

// merchandise

import top_img from "../assets/img/merchandise/tops.png";
import matsumoto_img from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import powerbuy_img from "../assets/img/merchandise/Power_Buy.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import fila_img from "../assets/img/merchandise/Fila.png";
import alice_img from "../assets/img/merchandise/Alice.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import Encryption from "../libs/encryption";

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

const Login = () => {
  const navigate = useNavigate();

  // Check Login & Register
  const [is_login, set_is_login] = useState(1);

  // Login
  const [username, set_username] = useState(null);
  const [password, set_password] = useState(null);

  //Register

  const [reg_email, set_reg_email] = useState();
  const [reg_password, set_reg_password] = useState();
  const [reg_re_password, set_reg_re_password] = useState();
  const [reg_brand, set_reg_brand] = useState([]);
  const [reg_merchandise, set_reg_merchandise] = useState([]);

  const [show_brand_modal, set_show_brand_modal] = useState(false);
  const [show_merchandise_modal, set_show_merchandise_modal] = useState(false);

  const [is_sector_open, set_is_sector_open] = useState(false);
  const [is_region_open, set_is_region_open] = useState(false);
  const [is_clustor_open, set_is_clustor_open] = useState(false);
  const [is_branch_open, set_is_branch_open] = useState(false);
  const [is_department_open, set_is_department_open] = useState(false);

  const [filter, set_filter] = useState([
    "North",
    "Flagship",
    "Beauty",
    "Portrait",
  ]);

  useEffect(async () => {
    const select_campaign = User.getCampaign();
    const select_account = User.getAccount();
    if (select_campaign) {
      cookie.remove("signage-brand", { path: false });
    }

    if (select_account) {
      cookie.remove("signage-account", { path: false });
    }

    // User.saveRedirect();
  }, []);

  // const checkEmailTemplate = () => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (emailRegex.test(username)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const checkPasswordTemplate = () => {
    const lengthRegex = /^.{6,}$/;
    if (lengthRegex.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  // const removeFilter = (event) => {
  //   const selectedValue = event;
  //   const updatedFilter = filter.filter((value) => value !== selectedValue);
  //   set_filter(updatedFilter);
  // };

  // const clearFilter = () => {
  //   set_filter([]);
  // };

  // const toggleSectorSelect = () => {
  //   set_is_sector_open((prevIsOpen) => !prevIsOpen);
  // };
  // const toggleRegionSelect = () => {
  //   set_is_region_open((prevIsOpen) => !prevIsOpen);
  // };
  // const toggleClustorSelect = () => {
  //   set_is_clustor_open((prevIsOpen) => !prevIsOpen);
  // };
  // const toggleBranchSelect = () => {
  //   set_is_branch_open((prevIsOpen) => !prevIsOpen);
  // };
  // const toggleDepartmentSelect = () => {
  //   set_is_department_open((prevIsOpen) => !prevIsOpen);
  // };

  // const showAllFilter = () => {
  //   console.log("filter");
  // };

  // const handleStatusChange = (event) => {
  //   const selectedValue = event.target.value;
  //   if (selectedValue === "0") {
  //     alert("Please select a valid status.");
  //   } else {
  //     set_filter((prevFilter) => {
  //       if (prevFilter.includes(selectedValue)) {
  //         return prevFilter; // Already selected, no change
  //       } else {
  //         return [...prevFilter, selectedValue]; // Add the selected value to the filter state
  //       }
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // if (checkEmailTemplate()) {
      if (checkPasswordTemplate()) {
        const value = { username: username, password: password };
        const encrypted = await Encryption.encryption(value, "login", false);
        const status = await User.login(encrypted);
        if (status) {
          const user_data = User.getCookieData();
          if (user_data.user.role === "Super Admin") {
            navigate("/user_account");
          } else {
            navigate("/brand");
          }

          Swal.fire({
            icon: "success",
            title: "Login ...",
            text: "เข้าสู่ระบบได้!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed ...",
            text: "ไม่สามารถเข้าสู่ระบบได้!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Password Template ...",
          text: "กรุณากรอกรหัสผ่าน 6 หลักขึ้นไป!",
        });
      }
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Email Template ...",
      //     text: "อีเมลล์ไม่ถูกต้อง!",
      //   });
      // }
    } catch (e) {
      console.log()(User._errorMsg);
      console.log(`request failed: ${e}`);
    }
  };

  // const handleCheckboxChange = (id, type) => {
  //   if (type === "brand") {
  //     const newCheckedItems = [...reg_brand];
  //     if (newCheckedItems.includes(id)) {
  //       const indexToRemove = newCheckedItems.indexOf(id);
  //       newCheckedItems.splice(indexToRemove, 1);
  //     } else {
  //       newCheckedItems.push(id);
  //     }
  //     set_reg_brand(newCheckedItems);
  //   } else if (type === "merchandise") {
  //     const newCheckedItems = [...reg_merchandise];
  //     if (newCheckedItems.includes(id)) {
  //       const indexToRemove = newCheckedItems.indexOf(id);
  //       newCheckedItems.splice(indexToRemove, 1);
  //     } else {
  //       newCheckedItems.push(id);
  //     }
  //     set_reg_merchandise(newCheckedItems);
  //   }
  // };

  const findBrandImg = (id) => {
    const brand = mock_data_brands.find((item) => item.id === id);
    return brand ? brand.img : null;
  };

  const findMerchImg = (id) => {
    const merchandise = mockup_merchandise.find((item) => item.id === id);
    return merchandise ? merchandise.img : null;
  };

  // const saveBrandReg = () => {
  //   const sortBrand = reg_brand.slice().sort((a, b) => a - b);
  //   set_reg_brand(sortBrand);
  //   set_show_brand_modal(!show_brand_modal);
  // };

  // const saveBrandMerchandise = () => {
  //   const sortMerch = reg_merchandise.slice().sort((a, b) => a - b);
  //   set_reg_merchandise(sortMerch);
  //   set_show_merchandise_modal(!show_merchandise_modal);
  // };

  const registerNewUser = () => {
    if (reg_password === reg_re_password) {
      // console.log("email", reg_email);
      // console.log("password", reg_password);
      // console.log("re-password", reg_re_password);
      // console.log("brand", reg_brand);
      // console.log("merchandise", reg_merchandise);

      set_is_login(3);
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
      <div className="md:flex h-screen">
        {/* Left panel */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={Login_Bg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 mt-36 xl:mt-0 bg-white flex flex-col justify-center items-center p-6 md:p-12">
          {is_login === 1 ? (
            <>
              <div className="w-full  max-w-lg">
                <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
                  Elevate Your Advertising Game with Our Digital Signage
                  Solutions
                </h1>
                <p className="text-lg font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
                  Sign in to unleash the power of digital advertising
                </p>

                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => set_username(e.target.value)}
                    type="text"
                    placeholder="Your Email"
                    value={username === null ? "" : username}
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    type="password"
                    value={password === null ? "" : password}
                    onChange={(e) => set_password(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Your Password"
                    autoComplete="password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="w-full lg:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins hover:bg-[#232a36]"
                  >
                    Login
                  </button>
                </div>
                {/* <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => set_is_login(2)}
                    className="w-full  py-2 rounded-sm text-[#6425FE] hover:text-[#b29bec]  mb-2 font-poppins"
                  >
                    "Don't have an account yet? Sign Up"
                  </button>
                </div> */}
              </div>
            </>
          ) : is_login === 2 ? (
            <>
              <div className="w-full  max-w-lg">
                <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
                  Sign Up
                </h1>
                <p className="text-lg font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
                  Sign Up to unleash the power of digital advertising
                </p>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => set_reg_email(e.target.value)}
                    type="text"
                    placeholder="Your Email"
                    value={reg_email === null ? "" : reg_email}
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => set_reg_password(e.target.value)}
                    type="password"
                    placeholder="Your Password"
                    value={reg_password === null ? "" : reg_password}
                    required
                    autoFocus
                    autoComplete="password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => set_reg_re_password(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                    value={reg_re_password === null ? "" : reg_re_password}
                    required
                    autoFocus
                    autoComplete="password"
                  />
                </div>
                <div className="mb-4">
                  <div className="relative w-full  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => set_show_brand_modal(true)}
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
                  <div className="flex space-x-4 mb-4">
                    {reg_brand.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <img
                          className="block ml-auto mr-auto w-12 h-12 rounded-lg"
                          src={findBrandImg(item)}
                          alt={item.name}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <div className="relative w-full  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => set_show_merchandise_modal(true)}
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
                  <div className="flex space-x-4 mb-4">
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
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => set_is_login(1)}
                    className="w-full  py-2 rounded-sm text-[#6425FE] hover:text-[#b29bec]  mb-2 font-poppins"
                  >
                    "Already have an account? Sign In"
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <h1 className="mb-4 flex justify-center text-center font-poppins">
                  <IoIosCheckmarkCircleOutline size={300} color="#2F3847" />
                </h1>
                <div className="text-3xl font-bold text-gray-600 mb-8 md:mb-12 text-center font-poppins">
                  Registration Completed Successfully
                </div>
                <div className="text-center">
                  <button
                    onClick={() => set_is_login(1)}
                    className="w-full lg:w-[300px]  py-2 rounded-sm bg-[#6425FE] text-white hover:text-[#b29bec]  mb-2 font-poppins"
                  >
                    OK
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <div className="font-poppins text-sm">
                    "Please continue to login"
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* {show_brand_modal && (
          <a
            onClick={() => set_show_brand_modal(!show_brand_modal)}
            className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
          />
        )} */}

        {/* {show_brand_modal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
            <div className="absolute right-10 top-14 lg:top-12 lg:right-[150px] m-4 z-30">
              <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => set_show_brand_modal(!show_brand_modal)}>
                  <AiOutlineClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

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
                            {is_sector_open ? (
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
                            {is_region_open ? (
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
                            {is_clustor_open ? (
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
                            {is_branch_open ? (
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
                            {is_department_open ? (
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
                            <PiSlidersHorizontalFill
                              size={18}
                              color="#6425FE"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
        )} */}

        {/* {show_merchandise_modal && (
          <a
            onClick={() => set_show_merchandise_modal(!show_merchandise_modal)}
            className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
          />
        )} */}

        {/* {show_merchandise_modal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
            <div className="absolute right-10 top-14 lg:top-12 lg:right-[150px] m-4 z-30">
              <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => show_merchandise_modal(!show_merchandise_modal)}
                >
                  <AiOutlineClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

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
                            {is_sector_open ? (
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
                            {is_region_open ? (
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
                            {is_clustor_open ? (
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
                            {is_branch_open ? (
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
                            {is_department_open ? (
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
                            <PiSlidersHorizontalFill
                              size={18}
                              color="#6425FE"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
        )} */}
      </div>
    </>
  );
};

export default Login;
