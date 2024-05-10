import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import User from "../libs/admin";

import Central_Logo from "../assets/img/central-logo.png";
import Robinson_Logo from "../assets/img/robinson-logo.png";
import Bluetree_logo from "../assets/img/logo/bluetree.svg";
import Cpn_logo from "../assets/img/logo/cpn.svg";
import Cpn_vertical_logo from "../assets/img/logo/cpn_vertical.svg";

import {
  MdOutlineCloudQueue,
  MdOutlineSettings,
  MdInfoOutline,
  MdOutlineLogout,
  MdFolderOpen,
} from "react-icons/md";

import { SlScreenDesktop, SlChart } from "react-icons/sl";
import { HiOutlineChartSquareBar, HiOutlineNewspaper } from "react-icons/hi";
import {
  IoDocumentTextOutline,
  IoShieldOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RiFileEditLine, RiFileList2Line } from "react-icons/ri";
import { AiOutlineIdcard, AiOutlineFileText } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BiShapeSquare, BiPurchaseTag } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
export const links = [
  {
    title: "Main menu",
    links: [
      {
        name: "Dashboard",
        link: "dashboard",
        icon: <HiOutlineChartSquareBar size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Booking",
        link: "booking",
        icon: <RiFileEditLine size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Screens",
        link: "screen",
        icon: <SlScreenDesktop size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Statics",
        link: "static",
        icon: <HiOutlineNewspaper size={27} />,
        notification: { is_notification: false, amount: 0 },
        submenu: [
          {
            name: "Activities Log",
            link: "statics/activities_log",
            icon: <FaRegListAlt size={27} />,
          },
          {
            name: "Media Log",
            link: "statics/media_log",
            icon: <FaRegListAlt size={27} />,
          },
          {
            name: "Screen",
            link: "statics/screen",
            icon: <FaRegListAlt size={27} />,
          },
        ],
      },
      {
        name: "Ad Media",
        link: "ads_media",
        icon: <MdOutlineCloudQueue size={27} />,
        notification: { is_notification: false, amount: 0 },
        submenu: [
          {
            name: "Ads Management",
            link: "ad_media/ads_management",
            icon: <RiFileList2Line size={27} />,
          },
          {
            name: "Media Libraly",
            link: "ad_media/media_libraly",
            icon: <MdFolderOpen size={27} />,
          },
        ],
      },
      {
        name: "Merchandise",
        link: "merchandise",
        icon: <IoDocumentTextOutline size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      // {
      //   name: "Analytics",
      //   link: "analytic",
      //   icon: <SlChart size={27} />,
      //   notification: { is_notification: false, amount: 0 },
      // },
    ],
  },
  {
    title: "Preference",
    links: [
      {
        name: "Setting",
        link: "setting",
        icon: <MdOutlineSettings size={27} />,
        notification: { is_notification: false, amount: 0 },
        submenu: [
          {
            name: "User Managament",
            icon: <AiOutlineIdcard size={27} />,
            submenu: [
              {
                name: "User",
                link: "setting/user_management/user",
                icon: <AiOutlineIdcard size={27} />,
              },
              {
                name: "Role And Permission",
                link: "setting/user_management/role_permission",
                icon: <IoPersonOutline size={27} />,
              },
              {
                name: "Activity Log",
                link: "setting/user_management/activity_log",
                icon: <AiOutlineFileText size={27} />,
              },
            ],
          },
          {
            name: "Media Rule",
            link: "setting/media_rule",
            icon: <IoShieldOutline size={27} />,
          },
          // {
          //   name: "Content Type",
          //   link: "setting/content_type",
          //   icon: <BiShapeSquare size={27} />,
          // },
          {
            name: "Tag Management",
            link: "setting/tag_management",
            icon: <BiPurchaseTag size={27} />,
          },
        ],
      },
      {
        name: "Help & Center",
        link: "help_center",
        icon: <MdInfoOutline size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Log Out",
        link: "logout",
        icon: <MdOutlineLogout size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
    ],
  },
];

const SidebarMain = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const [openLevel1, setOpenLevel1] = useState(false);
  const [openLevel2, setOpenLevel2] = useState(false);
  const [logo_img, setLogoImg] = useState();

  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleLevel1 = (index) => {
    if (openLevel1 === index) {
      setOpenLevel1(null);
    } else {
      setOpenLevel1(index);
    }
  };

  const toggleLevel2 = (openLevel1, event) => {
    setOpenLevel1(openLevel1); // Set openLevel1 to the passed value
    setOpenLevel2(!openLevel2);
    event.stopPropagation(); // Prevent the click event from propagating to the parent div
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
    // handleOutsideClick();
  };

  const [imgClass, setImgClass] = useState("");

  useEffect(async () => {
    const { token } = User.getCookieData();
    const { brand_id } = User.getCampaign();
    // const data = await User.getBrand(token);
    // const brand = data.find((items) => items.BrandCode === brand_id);
    // setLogoImg(brand.BrandLogo);
    if (brand_id === 1) {
      setLogoImg(Central_Logo);
    } else {
      setLogoImg(Robinson_Logo);
    }

    const loadImgClass = async () => {
      const cssValue = await generateImgHeight(logo_img);
      setImgClass(cssValue); // Update the state with the CSS class
    };

    loadImgClass();
  }, []); // Run this effect once on component mount

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenLevel1(null);
        setOpenLevel2(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const generateImgHeight = async (img_logo) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = img_logo;

      img.onload = function () {
        const width = img.width; // Get the width of the image
        const height = img.height; // Get the height of the image

        let css_value;
        if (height > 60) {
          css_value = "w-1/6 ";
        } else {
          css_value = "w-2/6";
        }

        resolve(css_value); // Resolve the Promise with the css_value
      };
    });
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <>
      <div className="ml-1 h-screen pb-10">
        {activeMenu && (
          <>
            <div ref={sidebarRef} className="flex justify-center items-center">
              <Link
                to="/dashboard"
                onClick={handleCloseSideBar}
                className="items-center justify-center ml-3 mt-10 flex"
              >
                <img className={`w-2/4 h-2/4`} src={logo_img} />
              </Link>
            </div>
            <div ref={sidebarRef} className="mt-10">
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 text-sm dark:text-gray-400 m-3 mt-4 uppercase font-poppins">
                    {item.title}
                  </p>
                  {item.links.map((link, index) => (
                    <div key={link.link}>
                      {link.submenu ? (
                        <>
                          <div
                            to={`/${link.link}`}
                            key={link.link}
                            // onClick={handleCloseSideBar}
                            // style={({ isActive }) => ({
                            //   color: isActive ? "#6427FE" : "",
                            // })}
                            className={`flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2  cursor-pointer `}
                            onClick={() => toggleLevel1(index)}
                          >
                            {link.icon}
                            <div className="capitalize text-sm font-poppins">
                              {link.name}
                            </div>

                            <div className="ml-auto">
                              <div className="text-xs font-bold text-gray-300">
                                <IoIosArrowForward size={26} />
                              </div>
                            </div>

                            <div className="relative group">
                              {openLevel1 === index && (
                                <div className="absolute  top-[-50px] w-80 bg-white border border-gray-300 shadow-lg p-3">
                                  {link.submenu.map((items) => (
                                    <>
                                      {items.submenu ? (
                                        <div
                                          to={`/${items.link}`}
                                          key={items.link}
                                          className={`flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray-700  text-md m-2`}
                                        >
                                          <div
                                            onClick={(event) =>
                                              toggleLevel2(openLevel1, event)
                                            }
                                            className="w-full flex hover:text-[#804DFE]"
                                          >
                                            <div className=" w-3/4 capitalize text-sm font-poppins flex justify-start items-center space-x-2">
                                              <div>{items.icon}</div>
                                              <div>{items.name}</div>
                                            </div>
                                            <div className="w-1/4">
                                              <div className="flex justify-end">
                                                {items.submenu && (
                                                  <div className="relative group">
                                                    <div className="flex">
                                                      <div className="w-[35px] h-[35px] rounded-full ml-20">
                                                        <div className="mt-[5px] text-xs font-bold text-gray-300 text-center font-poppins">
                                                          <IoIosArrowForward
                                                            size={26}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {openLevel2 && (
                                                      <div className="absolute left-[140px] top-[-32px] w-72 bg-white border border-gray-300 shadow-lg p-3">
                                                        {items.submenu.map(
                                                          (submenuItem) => (
                                                            <div
                                                              // to={`/${submenuItem.link}`}
                                                              onClick={() => {
                                                                navigate(
                                                                  `/${submenuItem.link}`
                                                                );
                                                                // window.location.href = `${process.env.REACT_APP_SUB_DIR}/${submenuItem.link}`;
                                                              }}
                                                              key={
                                                                submenuItem.link
                                                              }
                                                              className={
                                                                normalLink
                                                              }
                                                            >
                                                              {submenuItem.icon}
                                                              <div className="capitalize text-sm font-poppins ">
                                                                {
                                                                  submenuItem.name
                                                                }
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <NavLink
                                          to={`/${items.link}`}
                                          key={items.link}
                                          style={({ isActive }) => ({
                                            color: isActive ? "#6427FE" : "",
                                          })}
                                          className={({ isActive }) =>
                                            isActive ? activeLink : normalLink
                                          }
                                        >
                                          <div className="w-full flex hover:text-[#804DFE]">
                                            <div className=" w-3/4 capitalize text-sm font-poppins flex justify-start items-center space-x-2">
                                              <div>{items.icon}</div>
                                              <div>{items.name}</div>
                                            </div>
                                          </div>
                                        </NavLink>
                                      )}
                                    </>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to={`/${link.link}`}
                            key={link.link}
                            onClick={handleCloseSideBar}
                            style={({ isActive }) => ({
                              color: isActive ? "#6427FE" : "",
                            })}
                            className={({ isActive }) =>
                              isActive ? activeLink : normalLink
                            }
                          >
                            {link.icon}
                            <div className="capitalize text-sm font-poppins ">
                              {link.name}
                            </div>
                          </NavLink>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarMain;
