import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../contexts/ContextProvider";

import Central_Logo from "../assets/img/central-logo.png";
import Bluetree_logo from "../assets/img/logo/bluetree.svg";
import Cpn_logo from "../assets/img/logo/cpn.svg";
import Cpn_vertical_logo from "../assets/img/logo/cpn_vertical.svg";

import {
  MdOutlineCloudQueue,
  MdOutlineSettings,
  MdInfoOutline,
  MdOutlineLogout,
} from "react-icons/md";

import { SlScreenDesktop, SlChart } from "react-icons/sl";
import { HiOutlineChartSquareBar, HiOutlineNewspaper } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiFileEditLine } from "react-icons/ri";
import { AiOutlineIdcard } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

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
      },
      {
        name: "Ad Media",
        link: "ads-media",
        icon: <MdOutlineCloudQueue size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Merchandise",
        link: "merchandise",
        icon: <IoDocumentTextOutline size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Analytics",
        link: "analytic",
        icon: <SlChart size={27} />,
        notification: { is_notification: false, amount: 0 },
      },
      // {
      //   name: "Campaign",
      //   link: "campaign",
      //   icon: <MdOutlineInsertChartOutlined size={27} />,
      //   notification: { is_notification: false, amount: 0 },
      // },

      // {
      //   name: "Event",
      //   link: "event",
      //   icon: <MdOutlineEvent size={27} />,
      //   notification: { is_notification: false, amount: 0 },
      // },
      // {
      //   name: "Invoices",
      //   link: "invoices",
      //   icon: <MdOutlineBook size={27} />,
      //   notification: { is_notification: true, amount: 2 },
      // },
      // {
      //   name: "Inbox",
      //   link: "inbox",
      //   icon: <MdOutlineMoveToInbox size={27} />,
      //   notification: { is_notification: true, amount: 27 },
      // },
      // {
      //   name: "Log",
      //   link: "log",
      //   icon: <MdOutlineDocumentScanner size={27} />,
      //   notification: { is_notification: false, amount: 0 },
      // },
      // {
      //   name: "Pdf",
      //   link: "pdf",
      //   icon: <MdOutlinePictureAsPdf size={27} />,
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
                link: "setting",
                icon: <AiOutlineIdcard size={27} />,
              },
              {
                name: "Activity Log",
                link: "activity-log",
                icon: <GrDocumentText size={27} />,
              },
            ],
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
  // {
  //   title: "Component",
  //   links: [
  //     {
  //       name: "dashboard_mockup",
  //       link: "dashboard_mockup",
  //       icon: <FiShoppingBag size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "orders",
  //       link: "orders",
  //       icon: <AiOutlineShoppingCart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "employees",
  //       link: "employees",
  //       icon: <IoMdContacts size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "customers",
  //       link: "customers",
  //       icon: <RiContactsLine size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "calendar",
  //       link: "calendar",
  //       icon: <AiOutlineCalendar size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "kanban",
  //       link: "kanban",
  //       icon: <BsKanban size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "editor",
  //       link: "editor",
  //       icon: <FiEdit size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "color-picker",
  //       link: "color-picker",
  //       icon: <BiColorFill size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "line",
  //       link: "line",
  //       icon: <AiOutlineStock size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "area",
  //       link: "area",
  //       icon: <AiOutlineAreaChart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },

  //     {
  //       name: "bar",
  //       link: "bar",
  //       icon: <AiOutlineBarChart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "pie",
  //       link: "pie",
  //       icon: <FiPieChart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "financial",
  //       link: "financial",
  //       icon: <RiStockLine size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "color-mapping",
  //       link: "color-mapping",
  //       icon: <BsBarChart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "pyramid",
  //       link: "pyramid",
  //       icon: <GiLouvrePyramid size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //     {
  //       name: "stacked",
  //       link: "stacked",
  //       icon: <AiOutlineBarChart size={27} />,
  //       notification: { is_notification: false, amount: 0 },
  //     },
  //   ],
  // },
];

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const [imgClass, setImgClass] = useState("");

  useEffect(() => {
    const loadImgClass = async () => {
      const cssValue = await generateImgHeight(Central_Logo);
      setImgClass(cssValue); // Update the state with the CSS class
    };

    loadImgClass();
  }, []); // Run this effect once on component mount

  const generateImgHeight = async (img_logo) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = img_logo;

      img.onload = function () {
        const width = img.width; // Get the width of the image
        const height = img.height; // Get the height of the image

        let css_value;
        if (height > 60) {
          css_value = "w-1/4 ";
        } else {
          css_value = "w-3/4";
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
        <div className="">
          {activeMenu && (
            <>
              <div className="flex justify-center items-center">
                <Link
                  to="/dashboard"
                  onClick={handleCloseSideBar}
                  className="items-center justify-center ml-3 mt-10 flex"
                >
                  <img className={`${imgClass}`} src={Central_Logo} />
                </Link>
              </div>
              <div className="mt-10 ">
                {links.map((item) => (
                  <div key={item.title}>
                    <p className="text-gray-400 text-sm  dark:text-gray-400 m-3 mt-4 uppercase font-poppins">
                      {item.title}
                    </p>
                    {item.links.map((link) => (
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
                        {link.submenu ? (
                          <div className="relative group">
                            <div className="capitalize text-sm font-poppins ">
                              {link.name}
                            </div>
                            <div className="hidden group-hover:block absolute left-28 top-0 w-48 bg-white border border-gray-300 shadow-lg p-4 z-50">
                              <div className="hover:bg-gray-200 p-2 cursor-pointer">
                                test3.1
                              </div>
                              <div className="hover:bg-gray-200 p-2 cursor-pointer">
                                test3.2
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="capitalize text-sm font-poppins ">
                            {link.name}
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
