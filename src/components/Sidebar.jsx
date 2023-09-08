import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel, MdOutlineLogout } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

import Central_Logo from "../assets/img/central-logo.png";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="items-center ml-3 mt-10 flex"
            >
              {/* <SiShopware /> <span>CMS</span> */}
              <img className="w-3/4 m-auto " src={Central_Logo} />
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 text-sm  dark:text-gray-400 m-3 mt-4 text-sm uppercase">
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
                    <span className="capitalize text-xs ">{link.name}</span>
                    {link.notification.is_notification ? (
                      <div className="bg-[#6427FE] w-[35px] h-[35px] rounded-full ml-auto">
                        <div className="mt-[10px] text-xs font-bold text-white text-center">
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
