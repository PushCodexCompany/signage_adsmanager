import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Navbar } from "../components";
import empty_img from "../assets/img/empty_location.png";
import location_img from "../assets/img/location.png";
import { HiOutlineClock } from "react-icons/hi";

const New_screen = () => {
  const [IsMaintenanceSwitchOn, setIsMaintenanceSwitchOn] = useState(false);

  const toggleMaintenanceSwitch = () => {
    setIsMaintenanceSwitchOn(!IsMaintenanceSwitchOn);
  };
  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="flex items-center justify-between mt-10 mb-5 ">
          <div className="font-poppins font-semibold text-2xl">
            Create New Screens
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="p-1">
              <div className="flex items-center">
                <input
                  placeholder="Screen Name"
                  className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  //   value={merchandise_name}
                  //   onChange={(e) => setMerchandiseName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="file_size_type"
                    id="file_size_type"
                    className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                    // onChange={(e) => setMerchandiseType(e.target.value)}
                  >
                    <option value="0">Media Rule</option>
                    <option value="1">.</option>
                    <option value="2">.</option>
                    <option value="3">.</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                        stroke="#6425FE"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button className="bg-[#6425FE] text-white w-32 h-9 font-poppins rounded-lg">
                  New Tag+
                </button>
              </div>
              <div className="mt-2 flex justify-center">
                <div className=" items-center grid grid-cols-6 space-x-1">
                  <div className="col-span-3">
                    <div className="flex justify-center items-center w-[315px] h-[315px] border border-gray-300 rounded-lg">
                      <img
                        src={empty_img}
                        className="object-cover w-[112px] h-[90px]"
                        alt="Image"
                      />
                    </div>
                    <div className="mt-2 flex justify-center items-center">
                      <button className="bg-[#6425FE] text-white font-poppins w-[315px] h-[48px] rounded-lg">
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex justify-center items-center w-[315px] h-[315px] border border-gray-300 rounded-lg">
                      <img
                        src={location_img}
                        className="object-cover w-[112px] h-[90px]"
                        alt="Image"
                      />
                    </div>
                    <div className="mt-2 flex justify-center items-center">
                      <div className="grid grid-cols-4 space-x-1">
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Lat"
                            className="w-[157px] h-[48px] rounded-lg p-3 font-poppins border border-gray-300"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Long"
                            className="w-[156px] h-[48px] rounded-lg p-3 font-poppins border border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="p-2 flex items-center justify-center text-center">
                  <div className="font-poppins text-[15px]">
                    Select and upload images of your screen. Choose a screen
                    location on the map to target your audience effectively.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 bg-yellow-500">
            <div className="p-1 mt-5">
              <div className="font-poppins font-semibold text-2xl">
                Screen Detail
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Screen Description"
                  className="w-full h-[147px] rounded-lg p-3 resize-none font-poppins border border-gray-300"
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    lineHeight: "1.2",
                  }}
                  maxLength={255}
                />
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-6 space-x-1">
                  <div className="col-span-3">
                    <div className="relative flex flex-col justify-left items-center h-full text-sm font-bold ml-1">
                      <select
                        name="file_size_type"
                        id="file_size_type"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        placeholder="Resolution"
                        // onChange={(e) => setMerchandiseType(e.target.value)}
                      >
                        <option value="0">Screen Resolution</option>
                        <option value="1">.</option>
                        <option value="2">.</option>
                        <option value="3">.</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                            stroke="#6425FE"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                      <select
                        name="file_size_type"
                        id="file_size_type"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        placeholder="Resolution"
                        // onChange={(e) => setMerchandiseType(e.target.value)}
                      >
                        <option value="0">Screen Physical Size</option>
                        <option value="1">.</option>
                        <option value="2">.</option>
                        <option value="3">.</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                            stroke="#6425FE"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-6 space-x-1">
                  <div className="col-span-3">
                    <div className="relative flex flex-col justify-left items-center h-full text-sm font-bold ml-1">
                      <select
                        name="file_size_type"
                        id="file_size_type"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        placeholder="Resolution"
                        // onChange={(e) => setMerchandiseType(e.target.value)}
                      >
                        <option value="0">Orientation</option>
                        <option value="1">.</option>
                        <option value="2">.</option>
                        <option value="3">.</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                            stroke="#6425FE"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                      <select
                        name="file_size_type"
                        id="file_size_type"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        placeholder="Resolution"
                        // onChange={(e) => setMerchandiseType(e.target.value)}
                      >
                        <option value="0">Indoor / Outdoor</option>
                        <option value="1">.</option>
                        <option value="2">.</option>
                        <option value="3">.</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                            stroke="#6425FE"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-6 space-x-1">
                  <div className="col-span-3 ml-1">
                    <div className="grid grid-cols-12">
                      <div className="col-span-5">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                          <select
                            name="open_time"
                            id="open_time"
                            className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            // onChange={(e) => setMerchandiseType(e.target.value)}
                          >
                            <option value="" disabled selected hidden>
                              Open Time
                            </option>
                            <option value="0">00:00</option>
                            <option value="1">.</option>
                            <option value="2">.</option>
                            <option value="3">.</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                          <div className="font-poppins font-bold">-</div>
                        </div>
                      </div>
                      <div className="col-span-5">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                          <select
                            name="close_time"
                            id="close_time"
                            className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            // onChange={(e) => setMerchandiseType(e.target.value)}
                          >
                            <option value="" disabled selected hidden>
                              Close Time
                            </option>
                            <option value="0">00:00</option>
                            <option value="1">.</option>
                            <option value="2">.</option>
                            <option value="3">.</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                          <HiOutlineClock color="#6425FE" size="20" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="relative flex flex-col justify-left items-center h-full text-sm font-bold ml-1">
                      <input
                        type="number"
                        placeholder="Pricing Per Day"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-6 space-x-1">
                  <div className="col-span-3 ml-2">
                    <div className="grid grid-cols-4">
                      <div className="col-span-3">
                        <div className="font-poppins font-bold">
                          Maintenance Notification
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex justify-center items-center">
                          <div
                            className="relative items-center inline-block w-12 h-6 border-2 border-[#6425FE] rounded-full p-1 cursor-pointer"
                            onClick={toggleMaintenanceSwitch}
                          >
                            <div
                              className={`absolute left-1 top-[2px] w-4 h-4 bg-[#6425FE] rounded-full shadow-md transition-transform duration-300 ${
                                IsMaintenanceSwitchOn ? "translate-x-full" : ""
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid grid-cols-5 ml-2">
                      <div className="col-span-3">
                        <div className="flex items-center">
                          <div className="font-poppins font-bold">
                            Notification Delay (sec)
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-end">
                          <input
                            placeholder="Second"
                            className="border border-gray-300 rounded-lg p-3 pr-10 w-[80%] h-[30px]  font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                            //   value={merchandise_name}
                            //   onChange={(e) => setMerchandiseName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <div className="flex justify-center items-center">
                  <button className="w-[315px] h-[48px] bg-[#6425FE] text-white font-poppins rounded-lg">
                    Create Screen
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-center items-center text-center">
                  <div className="font-poppins">
                    Add screen details for precise ad targeting. Enter size,
                    resolution, and operating hours to optimize your advertising
                    strategy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New_screen;
