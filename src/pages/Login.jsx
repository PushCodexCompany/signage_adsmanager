import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import Login_Bg from "../assets/img/login_bg.png";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    User.saveRedirect();
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
      <div class="h-screen md:flex">
        {/* left panal */}
        {/* <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden"> */}
        <div className="relative overflow-hidden md:flex w-1/2 hidden">
          <img src={Login_Bg} />
        </div>
        {/* </div> */}

        {/* right panal */}
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form class="bg-white" onSubmit={(e) => handleSubmit(e)}>
            <h1 class="text-gray-800 font-bold text-4xl mb-10 text-center">
              {" "}
              Easily Manage <br /> Your Booking.
            </h1>
            <p class="text-sm font-normal text-gray-600 mb-20 ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                class="pl-2 outline-none border-none"
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                placeholder="Your Email"
                value={username}
                required
                autofocus
                autocomplete
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <input
                class="pl-2 outline-none border-none"
                type="password"
                value={password}
                required
                placeholder="Your Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-[#2f3847] mt-4 py-2 rounded-sm text-white font-semibold mb-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
