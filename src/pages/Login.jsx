import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { PiCaretUpDown } from "react-icons/pi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  // Check Login & Register
  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  //Register

  const [reg_email, setRegEmail] = useState();
  const [reg_password, setRegPassword] = useState();
  const [reg_re_password, setRegRePassword] = useState();
  const [reg_brand, setRegBrand] = useState([]);
  const [reg_merchandise, setRegMerchandise] = useState([]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showMerchandiseModal, setShowMerchandiseModal] = useState(false);

  useEffect(async () => {
    const select_campaign = User.getCampaign();
    if (select_campaign) {
      cookie.remove("signage-brand", { path: false });
    }
    // User.saveRedirect();
  }, []);

  const generateMD5Hash = (input) => {
    // Calculate the MD5 hash of the input
    const md5Hash = CryptoJS.MD5(input).toString();

    return md5Hash;
  };

  const generateCombinedMD5Hash = (username, password) => {
    // Calculate the MD5 hash of the password
    const passwordMD5 = generateMD5Hash(password);

    // Concatenate the username and the MD5 hash of the password
    const combinedInput = username + passwordMD5;

    // Calculate the MD5 hash of the concatenated string
    const result = generateMD5Hash(combinedInput);

    return result;
  };

  const checkEmailTemplate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(username)) {
      return true;
    } else {
      return false;
    }
  };

  const checkPasswordTemplate = () => {
    const lengthRegex = /^.{6,}$/;
    if (lengthRegex.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      // if (checkEmailTemplate()) {
      if (checkPasswordTemplate()) {
        const hash = generateCombinedMD5Hash(username, password);
        const status = await User.login(hash);
        if (status) {
          navigate("/brand");
          Swal.fire({
            icon: "success",
            title: "Login ...",
            text: "เข้าสู่ระบบได้!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed ...",
            text: "ไม่สามารถเข้าสู่ระบบได้!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Password Template ...",
          text: "กรุณากรอกรหัสผ่าน 6 หลักขึ้นไป!",
        });
      }
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Email Template ...",
      //     text: "อีเมลล์ไม่ถูกต้อง!",
      //   });
      // }
    } catch (e) {
      console.log()(User._errorMsg);
      console.log(`request failed: ${e}`);
    }
  };

  return (
    <>
      <div className="md:flex h-screen">
        {/* Left panel */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={Login_Bg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 mt-36 xl:mt-0 bg-white flex flex-col justify-center items-center p-6 md:p-12">
          {isLogin ? (
            <>
              <div className="w-full  max-w-lg">
                <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
                  Elevate Your Advertising Game with Our Digital Signage
                  Solutions
                </h1>
                <p className="text-lg font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
                  Sign in to unleash the power of digital advertising
                </p>

                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Your Email"
                    value={username === null ? "" : username}
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    type="password"
                    value={password === null ? "" : password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Your Password"
                    autoComplete="current-password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="w-full lg:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
                  >
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => setIsLogin(false)}
                    className="w-full  py-2 rounded-sm text-[#6425FE] hover:text-[#b29bec]  mb-2 font-poppins"
                  >
                    "Don't have an account yet? Sign Up"
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full  max-w-lg">
                <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
                  Sign Up
                </h1>
                <p className="text-lg font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
                  Sign Up to unleash the power of digital advertising
                </p>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => setRegEmail(e.target.value)}
                    type="text"
                    placeholder="Your Email"
                    value={reg_email === null ? "" : reg_email}
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => setRegEmail(e.target.value)}
                    type="password"
                    placeholder="Your Password"
                    value={reg_password === null ? "" : reg_password}
                    required
                    autoFocus
                    autoComplete="password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className={`w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                    onChange={(e) => setRegRePassword(e.target.value)}
                    type="password"
                    placeholder="Re-Password"
                    value={reg_re_password === null ? "" : reg_re_password}
                    required
                    autoFocus
                    autoComplete="password"
                  />
                </div>
                <div className="mb-4">
                  <div class="relative w-full  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => setShowBrandModal(true)}
                      name="role"
                      class="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                    >
                      Select Brand
                    </button>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <PiCaretUpDown size={20} color="#6425FE" />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div class="relative w-full  py-2 px-3 border-2 rounded-2xl outline-none font-poppins">
                    <button
                      onClick={() => alert("dddd")}
                      name="role"
                      class="block appearance-none w-full  text-left  rounded p-1 pr-6 focus:outline-none"
                    >
                      Select Merchandise
                    </button>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <PiCaretUpDown size={20} color="#6425FE" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => alert("signup")}
                    className="w-full lg:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={() => setIsLogin(true)}
                    className="w-full  py-2 rounded-sm text-[#6425FE] hover:text-[#b29bec]  mb-2 font-poppins"
                  >
                    "Have an account ? Sign In"
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {showBrandModal && (
          <a
            onClick={() => setShowBrandModal(!showBrandModal)}
            className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
          />
        )}

        {showBrandModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
            {/* First div (circle) */}
            <div className="absolute right-12 top-14 lg:top-12 lg:right-[350px] m-4 z-30">
              <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setShowBrandModal(!showBrandModal)}>
                  <AiOutlineClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Second div (gray background) */}
            <div className="bg-[#FFFFFF] w-4/5 lg:w-3/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
              <div className="flex justify-center items-center mt-8">
                <div className="font-poppins text-5xl font-bold">
                  Select Brands
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                  Sign Up To Unleash The Power Of Digital Advertising
                </div>
              </div>
              <div className="mt-2 p-2">
                <div className="relative flex items-center justify-center">
                  <input
                    className="w-[900px] h-10 border border-gray-300 rounded-md pl-10 pr-2 font-poppins"
                    placeholder="Search"
                  />
                  <span className="absolute inset-y-0 left-0 lg:left-32 flex items-center pl-2">
                    <AiOutlineSearch size={20} color="#DBDBDB" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
