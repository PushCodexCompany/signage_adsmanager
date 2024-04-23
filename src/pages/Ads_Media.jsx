import React, { useState } from "react";
import { Header } from "../components";
import ReactPlayer from "react-player/youtube";

const Ads_Media = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
        New Screen Media Rule
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <div>
            <div className=" h-10 rounded-sm flex items-center justify-start">
              <div className="flex-grow h-full w-full border-1 border-gray-300 rounded-sm ">
                <input
                  className="font-bold text-sm w-full h-full font-poppins"
                  placeholder="Media Rule Name"
                />
              </div>
            </div>
            <div className="flex justify-center mt-14 font-bold text-xl font-poppins">
              Preview
            </div>
            <div className="flex justify-center mt-4">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=xqyUdNxWazA"
                width="851px"
                height="420px"
                controls
              />
            </div>
            <div className="flex justify-center mt-10">
              <button className="bg-[#6425FE] w-[420px] h-[65px] text-white font-bold font-poppins">
                Create
              </button>
            </div>
            <div className="flex justify-center mt-5 font-poppins">
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 lg:pl-8 ">
          <div>
            <span className="font-bold text-3xl font-poppins">
              Media Rule Setting
            </span>
          </div>

          {/* Rule 1 */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-10">
            <div className="flex flex-row mt-3 space-x-5">
              <div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="border-1 border-[#6425FE] w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#6425FE] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#6425FE] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                </label>
              </div>
              <div className="text-xl font-bold font-poppins">Rule 1</div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex-grow" style={{ width: "50%" }}>
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="resolution"
                    id="resolution"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="">Resolution</option>
                    <option value="1">1280 x 720</option>
                    <option value="2">1920 x 1080</option>
                    <option value="3">2560 x 1440</option>
                    <option value="4">3840 x 2160</option>
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
              <div className="flex-grow " style={{ width: "20%" }}>
                <div className="flex flex-col justify-center items-end h-full text-sm font-bold mr-1 font-poppins">
                  <div>Position</div>
                </div>
              </div>
              <div className="flex-grow " style={{ width: "15%" }}>
                <div className="flex flex-col justify-center items-center h-full text-white text-sm font-bold font-poppins">
                  <input
                    className="w-full h-full text-center placeholder-center"
                    placeholder="X"
                  />
                </div>
              </div>
              <div className="flex-grow  ml-1" style={{ width: "15%" }}>
                <div className="flex flex-col justify-center items-center h-full text-white text-sm font-bold font-poppins">
                  <input
                    className="w-full h-full text-center placeholder-center"
                    placeholder="Y"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm mt-3 font-poppins">
              Maximum Image Size of Requests must be over than 300 X 300
            </div>
          </div>

          {/* Rule 2 */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
            <div className="flex flex-row mt-3 space-x-5">
              <div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="border-1 border-[#6425FE] w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#6425FE] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#6425FE] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                </label>
              </div>
              <div className="text-xl font-bold font-poppins">Rule 2</div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex-grow" style={{ width: "33%" }}>
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="condition_type"
                    id="condition_type"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="1">File Size</option>
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
              <div className="flex-grow " style={{ width: "33%" }}>
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="config_type"
                    id="config_type"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="1">Less Than</option>
                    <option value="2">More Than</option>
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
              <div className="flex-grow " style={{ width: "33%" }}>
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="file_size_type"
                    id="file_size_type"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="1">300(KB)</option>
                    <option value="2">500(KB)</option>
                    <option value="2">1(MB)</option>
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
            <div className="flex justify-center text-sm mt-3 font-poppins">
              Maximum Image Size of Requests must be over than 300 X 300
            </div>
          </div>

          {/* Ads capacity */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
            <div className="flex flex-row mt-3 space-x-5">
              <div className="text-xl font-bold font-poppins">Ads capacity</div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex-grow" style={{ width: "50%" }}>
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="ads_capacity"
                    id="ads_capacity"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                  >
                    <option value="1">10</option>
                    <option value="2">20</option>
                    <option value="3">30</option>
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
              <div className="flex-grow" style={{ width: "25%" }}></div>
              <div className="flex-grow" style={{ width: "25%" }}></div>
            </div>
            <div className="flex justify-center text-sm mt-3 font-poppins">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads_Media;
