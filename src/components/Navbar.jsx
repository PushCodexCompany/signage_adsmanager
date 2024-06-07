import React, { useEffect } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../assets/img/avatar.png";
import { UserProfile } from ".";
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

  const searchByName = async (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
      <div className="p-2 md:ml-6 md:mr-6 relative">
        <div className="flex flex-row space-x-1">
          <div className="lg:hidden basis-1/12">
            {select_campaign && (
              <NavButton
                title="Menu"
                customFunc={handleActiveMenu}
                color={"#6425FE"}
                icon={<AiOutlineMenu />}
              />
            )}
          </div>
          <div className="basis-8/12 lg:basis-11/12 h-[52px] rounded-lg border border-gray-200">
            <div className="flex">
              <NavButton
                customFunc={search}
                title="Search"
                color="grey"
                icon={<AiOutlineSearch />}
              />
              <input
                className="w-full h-[50px] rounded transition-all font-poppins  focus:border-transparent focus:outline-none"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => searchByName(e.target.value)}
              />
            </div>
          </div>
          <div className="basis-4/12 lg:basis-2/12">
            <div className="flex divide-x-1 divide-gray-300">
              {select_campaign && (
                <NavButton
                  title="Notification"
                  dotColor="red"
                  customFunc={() => handleClick("notification")}
                  color={"#000000"}
                  icon={<RiNotification3Line />}
                />
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
                        {user
                          ? `${user.user.firstname} ${user.user.lastname}`
                          : ""}
                        {/* {user ? `${user.user.username}` : ""} */}
                      </text>
                      <br />
                      <text className="text-gray-400 text-10 font-poppins">
                        {user ? user.user.role : ""}
                      </text>
                    </span>
                  </p>
                  {select_campaign && (
                    <MdKeyboardArrowDown className="text-gray-400 text-14" />
                  )}
                </div>
              </TooltipComponent>
              {select_campaign && (
                <>
                  {isClicked.userProfile && (
                    <UserProfile user={user} after_login={true} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
