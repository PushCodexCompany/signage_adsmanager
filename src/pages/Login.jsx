import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState(null);
  // const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState(null);
  // const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    const select_campaign = User.getCampaign();
    // const data = await User.getPHP();
    // console.log(data);
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
          Swal.fire({
            icon: "success",
            title: "Login ...",
            text: "เข้าสู่ระบบได้!",
          });
          window.location.href = "/adsmanager/brand";
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
          <div className="w-full max-w-md">
            <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
              Elevate Your Advertising Game with Our Digital Signage Solutions
            </h1>
            <p className="text-sm font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
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
                className="w-full md:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
