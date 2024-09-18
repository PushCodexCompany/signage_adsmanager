import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { MdOutlineCancel } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { PiUserCircleFill } from "react-icons/pi";
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

const UserProfile = ({ user, after_login, showModal, setShowModal }) => {
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  const [showUserMng, setShowUserMng] = useState(false);
  const ref = useRef();

  const { token } = User.getCookieData();

  const [percent, setPercent] = useState(0);
  const [totalSpace, setTotalSpace] = useState(null);
  const [useSpace, setUseSpace] = useState(null);

  useEffect(() => {
    fetchAccountStorage();
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (after_login) {
          setShowModal(!showModal);
        }
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchAccountStorage = async () => {
    const { storagebyte } = await User.getStorage();
    if (storagebyte?.percentuse > 0) {
      if (storagebyte?.percentuse <= 1) {
        setPercent(1);
      } else {
        setPercent(storagebyte?.percentuse);
      }
    } else {
      setPercent(0);
    }
    if (storagebyte?.totalspace >= 1000 * 1000 * 1000) {
      const spaceInGB = bytesToGB(storagebyte?.totalspace);
      setTotalSpace(`${spaceInGB.toFixed(2)} GB`);
    } else {
      const spaceInMB = bytesToMB(storagebyte?.totalspace);
      setTotalSpace(`${spaceInMB.toFixed(2)} MB`);
    }
    if (storagebyte?.usesapce >= 1000 * 1000 * 1000) {
      const spaceInGB = bytesToGB(storagebyte?.usesapce);
      setUseSpace(`${spaceInGB.toFixed(2)} GB`);
    } else {
      const spaceInMB = bytesToMB(storagebyte?.usesapce);
      setUseSpace(`${spaceInMB.toFixed(2)} MB`);
    }
  };

  const bytesToMB = (bytes) => {
    return bytes / (1000 * 1000);
  };

  const bytesToGB = (bytes) => {
    return bytes / (1000 * 1000 * 1000);
  };

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
      {showModal && (
        <div
          className="nav-item absolute right-1 top-16 bg-white border border-gray-500 p-8 rounded-lg w-96"
          style={{ zIndex: 10, borderRight: "1px solid #dedede" }}
          ref={ref}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200 font-poppins">
              User Profile
            </p>
            <MdOutlineCancel
              onClick={() => setShowModal(!showModal)}
              size={35}
              className="text-gray-500 hover:bg-gray-200 rounded-full p-2"
            />
            {/* <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            /> */}
          </div>
          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <PiUserCircleFill size={64} className="text-[#6425FE]" />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200 font-poppins">
                {user
                  ? `${user.user.firstname || "Name"} ${
                      user.user.lastname || "LastName"
                    }`
                  : ""}
                {/* {`${user.user.username}`} */}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400 font-poppins">
                {user.user.role}
              </p>
              <p
                className={`text-xs font-poppins ${
                  percent >= 80 ? "text-[#B3261E]" : "text-black"
                }`}
              >
                {useSpace} of {totalSpace} ({percent}% used)
              </p>
              {percent < 80 ? (
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#6425FE] h-2 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              ) : percent >= 80 && percent <= 100 ? (
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#B3261E] h-2 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              ) : (
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#B3261E] h-2 rounded-full"
                    style={{ width: `${100}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          {!after_login ? (
            <>
              <div className="mt-4">
                {user.user.permissions.user ? (
                  <button
                    className="w-full"
                    onClick={() => setShowUserMng(!showUserMng)}
                  >
                    <div className="grid grid-cols-5">
                      <div className="col-span-1 ">
                        <button
                          type="button"
                          style={{
                            color: "#6425FE",
                            backgroundColor: "#E5FAFB",
                          }}
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
              </div>
              <div className="mt-5">
                <button
                  onClick={() => handleLogout()}
                  className="text-white bg-[#6425FE] hover:bg-[#3b1694] rounded-[10px] w-full h-[50px] font-poppins"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}

      {showUserMng && (
        <a
          onClick={() => setShowUserMng(!showUserMng)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showUserMng && (
        <User_Management
          setShowUserMng={setShowUserMng}
          showUserMng={showUserMng}
        />
      )}
    </>
  );
};

export default UserProfile;
