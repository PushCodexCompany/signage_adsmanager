import React, { useEffect } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../assets/img/avatar.png";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import User from "../libs/admin";

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

const search = () => {
  alert("search");
};

const Navbar = () => {
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
  const select_merchandise = User.getMerchandise();

  const role = {
    1: {
      name: "Admin",
    },
    2: {
      name: "User",
    },
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <div className="flex">
        {select_campaign && select_merchandise ? (
          <div className="md:hidden">
            <NavButton
              title="Menu"
              customFunc={handleActiveMenu}
              color={currentColor}
              icon={<AiOutlineMenu />}
            />
          </div>
        ) : (
          <></>
        )}

        <NavButton
          customFunc={search}
          title="Search"
          color="grey"
          icon={<AiOutlineSearch />}
        />
        <input
          className="w-full h-56px rounded relative bg-[rgba(255, 255, 255, 0.3)] transition font-poppins"
          type="text"
          name="name"
          placeholder="Search..."
        />
      </div>

      <div className="flex divide-x-1 divide-gray-300">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}

        {select_campaign && select_merchandise ? (
          <NavButton
            title="Notification"
            dotColor="red"
            customFunc={() => handleClick("notification")}
            color={"#000000"}
            icon={<RiNotification3Line />}
          />
        ) : (
          <></>
        )}

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="">
                <text className="text-black font-bold text-14 font-poppins">
                  {user.name}
                </text>{" "}
                <br />{" "}
                <text className="text-gray-400 text-10 font-poppins">
                  {role[user.role].name}
                </text>
              </span>{" "}
              {/* <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name}
              </span> */}
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile user={user} />}
      </div>
    </div>
  );
};

export default Navbar;
