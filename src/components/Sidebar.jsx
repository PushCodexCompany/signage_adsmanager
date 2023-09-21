import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../contexts/ContextProvider";

import Central_Logo from "../assets/img/central-logo.png";
import Bluetree_logo from "../assets/img/logo/bluetree.svg";
import Cpn_logo from "../assets/img/logo/cpn.svg";
import Cpn_vertical_logo from "../assets/img/logo/cpn_vertical.svg";

import {
  MdOutlineHome,
  MdOutlineCancel,
  MdOutlineMenuBook,
  MdOutlineCloudQueue,
  MdOutlineMoveToInbox,
  MdOutlineDocumentScanner,
  MdOutlinePictureAsPdf,
  MdOutlineSettings,
  MdInfoOutline,
  MdOutlineLogout,
  MdOutlineInsertChartOutlined,
  MdOutlineBook,
  MdOutlineEvent,
} from "react-icons/md";
import { FiShoppingBag, FiEdit, FiPieChart } from "react-icons/fi";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { BsKanban, BsBarChart } from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { GiLouvrePyramid } from "react-icons/gi";

export const links = [
  {
    title: "Main menu",
    links: [
      {
        name: "Dashboard",
        link: "dashboard",
        icon: <MdOutlineHome size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Campaign",
        link: "campaign",
        icon: <MdOutlineInsertChartOutlined size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Ads Media",
        link: "ads-media",
        icon: <MdOutlineCloudQueue size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Booking",
        link: "booking",
        icon: <MdOutlineMenuBook size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Event",
        link: "event",
        icon: <MdOutlineEvent size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Invoices",
        link: "invoices",
        icon: <MdOutlineBook size={25} />,
        notification: { is_notification: true, amount: 2 },
      },
      {
        name: "Inbox",
        link: "inbox",
        icon: <MdOutlineMoveToInbox size={25} />,
        notification: { is_notification: true, amount: 25 },
      },
      {
        name: "Log",
        link: "log",
        icon: <MdOutlineDocumentScanner size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Pdf",
        link: "pdf",
        icon: <MdOutlinePictureAsPdf size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
    ],
  },
  {
    title: "Preference",
    links: [
      {
        name: "setting",
        link: "setting",
        icon: <MdOutlineSettings size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Help & Center",
        link: "help_center",
        icon: <MdInfoOutline size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "Log Out",
        link: "",
        icon: <MdOutlineLogout size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
    ],
  },
  {
    title: "Component",
    links: [
      {
        name: "dashboard_mockup",
        link: "dashboard_mockup",
        icon: <FiShoppingBag size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "orders",
        link: "orders",
        icon: <AiOutlineShoppingCart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "employees",
        link: "employees",
        icon: <IoMdContacts size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "customers",
        link: "customers",
        icon: <RiContactsLine size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "calendar",
        link: "calendar",
        icon: <AiOutlineCalendar size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "kanban",
        link: "kanban",
        icon: <BsKanban size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "editor",
        link: "editor",
        icon: <FiEdit size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "color-picker",
        link: "color-picker",
        icon: <BiColorFill size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "line",
        link: "line",
        icon: <AiOutlineStock size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "area",
        link: "area",
        icon: <AiOutlineAreaChart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },

      {
        name: "bar",
        link: "bar",
        icon: <AiOutlineBarChart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "pie",
        link: "pie",
        icon: <FiPieChart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "financial",
        link: "financial",
        icon: <RiStockLine size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "color-mapping",
        link: "color-mapping",
        icon: <BsBarChart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "pyramid",
        link: "pyramid",
        icon: <GiLouvrePyramid size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
      {
        name: "stacked",
        link: "stacked",
        icon: <AiOutlineBarChart size={25} />,
        notification: { is_notification: false, amount: 0 },
      },
    ],
  },
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
      const cssValue = await generateImgHeight(Cpn_logo);
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
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-center items-center">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="items-center justify-center ml-3 mt-10 flex"
            >
              {/* <SiShopware /> <span>CMS</span> */}
              <img className={`${imgClass}`} src={Cpn_logo} />
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent> */}
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
                    <span className="capitalize text-xs font-poppins">
                      {link.name}
                    </span>
                    {link.notification.is_notification ? (
                      <div className="bg-[#6427FE] w-[35px] h-[35px] rounded-full ml-auto">
                        <div className="mt-[10px] text-xs font-bold text-white text-center font-poppins">
                          {link.notification.amount}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}

            {/* Logout */}
            {/* <NavLink
              to={`/`}
              key={"/"}
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                color: isActive ? "#6425fe" : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineLogout size={25} />
              <span className="capitalize text-xs ">Log Out</span>
            </NavLink> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
