import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import User from "../libs/admin";

import {
  MdOutlineCloudQueue,
  MdOutlineSettings,
  MdInfoOutline,
  MdOutlineLogout,
  MdFolderOpen,
  MdOutlineMarkunreadMailbox,
  MdSettings,
} from "react-icons/md";
import { GrMultimedia } from "react-icons/gr";

import { SlScreenDesktop, SlChart } from "react-icons/sl";
import { HiOutlineChartSquareBar, HiOutlineNewspaper } from "react-icons/hi";
import {
  IoDocumentTextOutline,
  IoShieldOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RiFileEditLine, RiFileList2Line } from "react-icons/ri";
import { AiOutlineIdcard, AiOutlineFileText } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
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
        submenu: [
          {
            name: "Digital Screen",
            link: "booking",
            icon: <SlScreenDesktop size={27} />,
          },
          {
            name: "Static Screen",
            link: "static_booking",
            icon: <MdOutlineMarkunreadMailbox size={27} />,
          },
        ],
      },
      {
        name: "Screens",
        link: "screen",
        icon: <SlScreenDesktop size={27} />,
        notification: { is_notification: false, amount: 0 },
        submenu: [
          {
            name: "Digital Screen",
            link: "screen",
            icon: <SlScreenDesktop size={27} />,
          },
          {
            name: "Static Screen",
            link: "static_screen",
            icon: <MdOutlineMarkunreadMailbox size={27} />,
          },
        ],
      },
      {
        name: "Log Management",
        link: "logmanagement",
        icon: <HiOutlineNewspaper size={27} />,
        notification: { is_notification: false, amount: 0 },
        submenu: [
          {
            name: "Activities Log",
            link: "log_management/activities_log",
            icon: <FaRegListAlt size={27} />,
          },
          {
            name: "Media Log",
            link: "log_management/media_log",
            icon: <GrMultimedia size={27} />,
          },
          {
            name: "Screen",
            link: "log_management/screen",
            icon: <SlScreenDesktop size={27} />,
          },
        ],
      },
      {
        name: "Media Libraly",
        link: "media_libraly",
        icon: <MdFolderOpen size={27} />,
        notification: { is_notification: false, amount: 0 },
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
          {
            name: "Configuration",
            link: "setting/configuration",
            icon: <MdSettings size={27} />,
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

  // const toggleLevel1 = (index) => {
  //   if (openLevel1 === index) {
  //     setOpenLevel1(null);
  //   } else {
  //     setOpenLevel1(index);
  //   }
  // };

  // const toggleLevel2 = (openLevel1, event) => {
  //   setOpenLevel1(openLevel1); // Set openLevel1 to the passed value
  //   setOpenLevel2(!openLevel2);
  //   event.stopPropagation(); // Prevent the click event from propagating to the parent div
  // };

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
    const data = await User.getBrand(token);
    const brand = data.find((items) => items.BrandCode === brand_id);
    setLogoImg(brand.BrandLogo);
    // if (brand_id === 1) {
    //   setLogoImg(Central_Logo);
    // } else {
    //   setLogoImg(Robinson_Logo);
    // }

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

  // const activeLink =
  //   "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  // const normalLink =
  //   "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {activeMenu && (
        <>
          <div className="w-full h-screen text-gray-600 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div ref={sidebarRef} className="flex justify-center items-center">
              <Link
                to="/dashboard"
                onClick={handleCloseSideBar}
                className="items-center justify-center ml-3 mt-10 flex"
              >
                <img className={`w-2/4 h-2/4`} src={logo_img} />
              </Link>
            </div>
            <div className="mt-10 p-2">
              {links.map((category, index) => (
                <div key={index} className="mt-4">
                  <h2 className="px-4 text-gray-400 uppercase  text-sm">
                    {category.title}
                  </h2>
                  <ul className="mt-2">
                    {category.links.map((link, i) => (
                      <li key={i} className="group">
                        <div
                          className="flex items-center px-4 py-3 text-sm font-medium hover:bg-light-gray hover:text-[#6427FE] rounded cursor-pointer"
                          onClick={() => {
                            if (link.submenu) {
                              link.submenu && toggleSubmenu(link.name);
                            } else {
                              navigate(`/${link.link}`);
                            }
                          }}
                        >
                          {link.icon}
                          <div className="ml-2 flex-1 font-poppins">
                            {link.name}
                          </div>
                          {link.submenu && (
                            <IoIosArrowDown
                              size={20}
                              className={`ml-auto transition-transform duration-200 ${
                                openSubmenus[link.name] ? "rotate-180" : ""
                              }`}
                            />
                          )}
                          {link.notification?.is_notification && (
                            <div className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-poppins">
                              {link.notification.amount}
                            </div>
                          )}
                        </div>
                        {link.submenu && openSubmenus[link.name] && (
                          <ul className="ml-8 mt-2 space-y-1">
                            {link.submenu.map((sublink, j) => (
                              <li key={j}>
                                <div
                                  className="flex items-center px-4 py-2 text-sm font-medium hover:bg-light-gray rounded cursor-pointer  hover:text-[#6427FE]"
                                  onClick={() => {
                                    if (sublink.link) {
                                      navigate(`/${sublink.link}`);
                                    } else {
                                      sublink.submenu &&
                                        toggleSubmenu(sublink.name);
                                    }
                                  }}
                                >
                                  {sublink.icon}
                                  <div className="ml-2 flex-1 font-poppins">
                                    {sublink.name}
                                  </div>
                                  {sublink.submenu && (
                                    <IoIosArrowDown
                                      size={20}
                                      className={`ml-auto transition-transform duration-200 ${
                                        openSubmenus[sublink.name]
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </div>
                                {sublink.submenu &&
                                  openSubmenus[sublink.name] && (
                                    <ul className="ml-8 mt-2 space-y-1">
                                      {sublink.submenu.map((subSubLink, k) => (
                                        <li key={k}>
                                          <div
                                            onClick={() => {
                                              navigate(`/${subSubLink.link}`);
                                            }}
                                            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-light-gray rounded transition duration-200 cursor-pointer  hover:text-[#6427FE]"
                                          >
                                            {subSubLink.icon}
                                            <div className="ml-2 font-poppins">
                                              {subSubLink.name}
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarMain;
