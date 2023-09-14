import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    // User.saveRedirect();
  }, []);

  const handleSubmit = async (e) => {
    try {
      const status = await User.login(username, password);

      if (status) {
        window.location.reload();
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
          <form className="w-full max-w-md" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-gray-800 font-bold text-4xl mb-10 text-center font-poppins">
              Easily Manage <br /> Your Booking.
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8 md:mb-12 text-center font-poppins">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <div className="mb-4">
              <input
                className="w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                placeholder="Your Email"
                value={username}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                type="password"
                value={password}
                required
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
