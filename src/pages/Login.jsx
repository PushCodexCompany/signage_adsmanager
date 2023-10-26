import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // User.saveRedirect();
  }, []);

  const handleSubmit = async () => {
    try {
      const status = await User.login(username, password);
      if (status) {
        navigate("/brand");
      } else {
        console.log()(User._errorMsg);
      }
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
          <form onSubmit={() => handleSubmit()} className="w-full max-w-md">
            <h1 className="text-gray-800 font-[700] text-4xl mb-4 text-center font-poppins">
              Elevate Your Advertising Game with Our Digital Signage Solutions
            </h1>
            <p className="text-sm font-[300] text-gray-600 mb-8 md:mb-12 text-center font-poppins">
              Sign in to unleash the power of digital advertising
            </p>

            <div className="mb-4">
              <input
                className="w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                placeholder="Your Email"
                value={username === null ? "" : username}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
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
                className="w-full md:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
