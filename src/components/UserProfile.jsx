import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { MdOutlineCancel } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../assets/img/avatar.png";
import User, {
  SIGNAGE_ACCOUNT_COOKIE,
  SIGNAGE_BRAND_CODE_COOKIE,
  SIGNAGE_BRAND_COOKIE,
  SIGNAGE_MEMBER_COOKIE,
  SIGNAGE_MERCHANDISE_COOKIE,
  SIGNAGE_PERMISSION_COOKIE_TOKEN,
} from "../libs/admin";
import { BiBookContent } from "react-icons/bi";
import User_Management from "../components/User_management";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    const status = await User.logout();
    if (status) {
      window.location.href = "/adsmanager";
      cookie.remove(SIGNAGE_BRAND_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_ACCOUNT_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_MERCHANDISE_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_BRAND_CODE_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_MEMBER_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_PERMISSION_COOKIE_TOKEN, { path: "/" });
      return false;
      //window.location.reload()
    }
  };

  return (
    <>
      {!showModal && (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200 font-poppins">
              User Profile
            </p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>
          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <img
              className="rounded-full h-24 w-24"
              src={avatar}
              alt="user-profile"
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200 font-poppins">
                {user ? `${user.user.firstname} ${user.user.lastname}` : ""}
                {/* {`${user.user.username}`} */}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400 font-poppins">
                {user.user.role}
              </p>
            </div>
          </div>
          <div className="mt-4">
            {user.user.permissions.user ? (
              <button
                className="w-full"
                onClick={() => setShowModal(!showModal)}
              >
                <div className="grid grid-cols-5">
                  <div className="col-span-1 ">
                    <button
                      type="button"
                      style={{ color: "#6425FE", backgroundColor: "#E5FAFB" }}
                      className="text-xl rounded-lg p-3 hover:bg-light-gray"
                    >
                      <FaUsersBetweenLines />
                    </button>
                  </div>
                  <div className="col-span-4 ">
                    <div className="flex justify-start hover:text-[#6425FE] left-2 font-semibold dark:text-gray-200 font-poppins">
                      User Management
                    </div>
                    <div className="flex justify-start left-2 text-gray-500 text-sm dark:text-gray-400 font-poppins">
                      User Management Setting
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <></>
            )}
            {/* <button className="w-full" onClick={() => setShowModal(!showModal)}>
              <div className="grid grid-cols-5">
                <div className="col-span-1 ">
                  <button
                    type="button"
                    style={{ color: "#6425FE", backgroundColor: "#E5FAFB" }}
                    className="text-xl rounded-lg p-3 hover:bg-light-gray"
                  >
                    <FaUsersBetweenLines />
                  </button>
                </div>
                <div className="col-span-4 ">
                  <div className="flex justify-start hover:text-[#6425FE] left-2 font-semibold dark:text-gray-200 font-poppins">
                    User Management
                  </div>
                  <div className="flex justify-start left-2 text-gray-500 text-sm dark:text-gray-400 font-poppins">
                    User Management Setting
                  </div>
                </div>
              </div>
            </button> */}
            {/* {!getBrand && (
          <div className="mt-4">
            <button className="w-full" onClick={() => navigate("/brand")}>
              <div className="grid grid-cols-5">
                <div className="col-span-1 ">
                  <button
                    type="button"
                    style={{ color: "#6425FE", backgroundColor: "#E5FAFB" }}
                    className="text-xl rounded-lg p-3 hover:bg-light-gray"
                  >
                    <BiBookContent />
                  </button>
                </div>
                <div className="col-span-4 ">
                  <div className="flex justify-start left-2 hover:text-[#6425FE] font-semibold dark:text-gray-200 font-poppins">
                    Brand
                  </div>
                  <div className="flex justify-start left-2 text-gray-500 text-sm dark:text-gray-400 font-poppins">
                    Select Brand
                  </div>
                </div>
              </div>
            </button>
          </div>
        )} */}
          </div>
          <div className="mt-5">
            <button
              onClick={() => handleLogout()}
              className="text-white bg-[#6425FE] hover:bg-[#3b1694] rounded-[10px] w-full h-[50px] font-poppins"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <a
          onClick={() => setShowModal(!showModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModal && <User_Management setShowModal={setShowModal} />}
    </>
  );
};

export default UserProfile;
