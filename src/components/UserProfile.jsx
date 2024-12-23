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
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";
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
import { IoIosClose } from "react-icons/io";

const UserProfile = ({ user, after_login, showModal, setShowModal }) => {
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  const [showUserMng, setShowUserMng] = useState(false);
  const [modal_change_password, setModalChangePassword] = useState(false);
  const ref = useRef();

  const { token } = User.getCookieData();

  const [percent, setPercent] = useState(0);
  const [totalSpace, setTotalSpace] = useState(null);
  const [useSpace, setUseSpace] = useState(null);

  //chg password
  const [chg_userid, setChgUserId] = useState();
  const [chg_username, setChgUserName] = useState();
  const [chg_oldPassword, setChgOldPassword] = useState();
  const [chg_password, setChgPassword] = useState();
  const [chg_confirmPassword, setChgConfirmPassword] = useState();

  const [fact_chgPassword, setFactChgPassword] = useState(true);

  useEffect(() => {
    fetchAccountStorage();
    setUser();
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (after_login) {
          setShowModal(!showModal);
        }

        if (fact_chgPassword) {
          setShowModal(!showModal);
        }
      }
    };

    // Add event listener for clicks
    if (fact_chgPassword) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fact_chgPassword]);

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

    if (storagebyte?.totalspace) {
      if (storagebyte?.totalspace >= 1000 * 1000 * 1000) {
        const spaceInGB = bytesToGB(storagebyte?.totalspace);
        setTotalSpace(`${spaceInGB.toFixed(2)} GB`);
      } else {
        const spaceInMB = bytesToMB(storagebyte?.totalspace);
        setTotalSpace(`${spaceInMB.toFixed(2)} MB`);
      }
    } else {
      setTotalSpace(`0 MB`);
    }

    if (storagebyte?.usesapce) {
      if (storagebyte?.usesapce >= 1000 * 1000 * 1000) {
        const spaceInGB = bytesToGB(storagebyte?.usesapce);
        setUseSpace(`${spaceInGB.toFixed(2)} GB`);
      } else {
        const spaceInMB = bytesToMB(storagebyte?.usesapce);
        setUseSpace(`${spaceInMB.toFixed(2)} MB`);
      }
    } else {
      setUseSpace(`0 MB`);
    }
  };

  const setUser = () => {
    const { userid, username } = user?.user;
    setChgUserId(userid);
    setChgUserName(username);
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

  const handleChangePassword = () => {
    setFactChgPassword(false);
    setModalChangePassword(!modal_change_password);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    Swal.fire({
      text: `คุณต้องการเปลี่ยนรหัสผ่านของ user : ${chg_username} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (chg_password !== chg_confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "รหัสผ่านไม่ตรงกัน",
            text: "กรุณากรอกรหัสผ่านให้เหมือนกัน!",
          });
          return;
        }
        try {
          const obj = {
            userid: chg_userid,
            currentpassword: chg_oldPassword,
            newpassword: chg_password,
          };
          const encrypted = await Encryption.encryption(
            obj,
            "updateUserpassword",
            false
          );
          const data = await User.updateUserpassword(encrypted, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "เปลี่ยนรหัสผ่าน!",
              text: `เปลี่ยนรหัสผ่าน ${chg_username} สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setModalChangePassword(!modal_change_password);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
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

              <div className="mt-2 text-md cursor-pointer  text-blue-500 hover:text-blue-900">
                <button
                  onClick={() => handleChangePassword()}
                  className="underline font-poppins"
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
          {!after_login ? (
            <>
              <div className="mt-4">
                {user.user.permissions.user ? (
                  <button
                    className="w-full"
                    onClick={() => {
                      setFactChgPassword(!fact_chgPassword);
                      setShowUserMng(!showUserMng);
                    }}
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
          setFactChgPassword={setFactChgPassword}
          fact_chgPassword={fact_chgPassword}
        />
      )}

      {modal_change_password && (
        <>
          <a
            onClick={() => setModalChangePassword(!modal_change_password)}
            className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-30 backdrop-blur"
          />
        </>
      )}

      {modal_change_password && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-40`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => {
                    setModalChangePassword(!modal_change_password);
                    setFactChgPassword(!fact_chgPassword);
                  }}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Change Password
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Edit User Password
              </div>
            </div>
            <div className="h-[550px] overflow-y-auto">
              <div className="mt-10 mx-40">
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Username :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={` lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      type="text"
                      placeholder="Your Username"
                      defaultValue={chg_username}
                      value={chg_username}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Current Password :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setChgOldPassword(e.target.value);
                      }}
                      type="text"
                      placeholder="Your Old Password"
                      value={chg_oldPassword}
                      required
                      autoComplete="oldPassword"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      New Password :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setChgPassword(e.target.value);
                      }}
                      type="text"
                      placeholder="Your New Password"
                      value={chg_password}
                      required
                      autoComplete="newPassword"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="font-poppins text-[#8A8A8A] text-right mt-2 ">
                      Confirm New Password :
                    </div>
                  </div>
                  <div className="col-span-8">
                    <input
                      className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                      onChange={(e) => {
                        setChgConfirmPassword(e.target.value);
                      }}
                      type="text"
                      placeholder="Confirm your Password"
                      value={chg_confirmPassword}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                onClick={(e) => changePassword(e)}
                className={`w-[315px] h-[48px] bg-[#6425FE] hover:bg-[#6325fe86] text-white font-bold font-poppins rounded-lg`}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
