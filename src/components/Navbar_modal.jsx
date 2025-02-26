import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiUserCircleFill } from "react-icons/pi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../assets/img/avatar.png";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import User from "../libs/admin";
import "./css/navbar.css";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const search = () => {};

const Navbar = ({ setSearchTerm, searchTerm }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const user = User.getCookieData();
  const select_campaign = User.getCampaign();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1025) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const searchByName = async (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
      <div className="p-2 md:ml-6 md:mr-6 relative">
        <div className="flex flex-row space-x-1">
          <div className="basis-full lg:basis-full h-[52px] rounded-lg border border-gray-200">
            <div className="flex">
              <NavButton
                customFunc={search}
                title="Search"
                color="grey"
                icon={<AiOutlineSearch />}
              />
              <input
                className="w-full h-[50px] rounded transition-all font-poppins focus:border-transparent focus:outline-none"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => searchByName(e.target.value)}
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
