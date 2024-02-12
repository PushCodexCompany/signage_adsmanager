import React, { useState, useEffect } from "react";
import { Header } from "../../../components";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";
import useCheckPermission from "../../../libs/useCheckPermission";

const Create_Media_Rule = () => {
  const location = useLocation();
  useCheckPermission();
  const [media_rule_name, setMediaRulename] = useState(null);
  const [video, setVideo] = useState(null);

  const [media_value, setMediaValue] = useState([]);

  useEffect(() => {
    if (location.state) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    //fetch data

    let obj;
    if (location.state.id === 1) {
      obj = {
        name: "1080x1920",
        video: "https://www.youtube.com/watch?v=Jq2vmjOVSew",
        rule1: {
          width: "1",
          height: "1",
        },
        rule2: {
          type: "1",
          size: "1",
        },
        ads_capacity: {
          stw: 60,
          category: 10,
          advertising: 10,
          bank_partner: 10,
          branding: 10,
        },
      };
    } else {
      obj = {
        name: "Facade - 12Clients",
        video: "https://www.youtube.com/watch?v=ZmXzsOFbb5g",
        rule1: {
          width: "2",
          height: "2",
        },
        rule2: {
          type: "2",
          size: "3",
        },
        ads_capacity: {
          stw: 50,
          category: 20,
          advertising: 10,
          bank_partner: 10,
          branding: 10,
        },
      };
    }

    setMediaValue(obj);
  };

  // console.log("location", location.state.id);
  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
        <text>New Screen Media Rule</text>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 p-4">
          <div>
            <div className=" h-10 rounded-sm flex items-center justify-start">
              <div className="flex-grow h-full w-full border-1 border-gray-300 rounded-sm ">
                <input
                  className="font-bold text-sm w-full h-full font-poppins pl-4"
                  placeholder="Media Rule Name"
                  defaultValue={media_value.name ? media_value.name : ""}
                />
              </div>
            </div>
            <div className="flex justify-center mt-14 font-bold text-2xl font-poppins">
              Screen Ratio Preview
            </div>
            {media_value.video ? (
              <>
                <div className="flex justify-center mt-4">
                  <ReactPlayer
                    url={media_value.video ? media_value.video : ""}
                    width="851px"
                    height="420px"
                    controls
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mt-4">
                  <div className="w-[851px] h-[420px] bg-black"></div>
                </div>
              </>
            )}

            <div className="flex justify-center mt-10">
              <button className="bg-[#6425FE] w-[420px] hover:bg-[#3b1694] text-xl rounded-lg h-[65px] text-white font-bold font-poppins">
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
        <div class="w-full lg:w-1/2 p-4 lg:pl-8 ">
          <div>
            <span className="font-bold text-3xl font-poppins">
              Media Rule Setting
            </span>
          </div>

          {/* Resolution 1 */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-10">
            <div className="flex flex-row mt-3 space-x-5">
              <div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="border-1 border-[#6425FE] w-9 h-5 bg-white peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-[#6425FE] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#6425FE] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                </label>
              </div>
              <div className="text-xl font-bold font-poppins">Resolution</div>
            </div>

            <div className="grid grid-cols-11 mt-3 space-x-2  justify-center items-center">
              <div className="col-span-3">
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="resolution"
                    id="resolution"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="">Resolution</option>
                    {/* <option value="1">1280 x 720</option>
                    <option value="2">1920 x 1080</option>
                    <option value="3">2560 x 1440</option>
                    <option value="4">3840 x 2160</option> */}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
              {/* {console.log("media_value", media_value.rule1.width)} */}
              <div className="col-span-2">
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="resolution"
                    id="resolution"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option
                      selected={
                        media_value.rule1?.height === "1" ? true : false
                      }
                      value="1"
                    >
                      1080
                    </option>
                    <option
                      selected={
                        media_value.rule1?.height === "2" ? true : false
                      }
                      value="2"
                    >
                      1440
                    </option>
                    <option
                      selected={
                        media_value.rule1?.height === "3" ? true : false
                      }
                      value="3"
                    >
                      2160
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
              <div className="col-span-1">
                <div className="flex justify-center items-end font-bold font-poppins mt-1">
                  X
                </div>
              </div>
              <div className="col-span-2">
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="resolution"
                    id="resolution"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option
                      selected={media_value.rule1?.width === "1" ? true : false}
                      value="1"
                    >
                      1920
                    </option>
                    <option
                      selected={media_value.rule1?.width === "2" ? true : false}
                      value="2"
                    >
                      2560
                    </option>
                    <option
                      selected={media_value.rule1?.width === "3" ? true : false}
                      value="3"
                    >
                      3840
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="resolution"
                    id="resolution"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="">pixels</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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

          {/* Rule 2 */}
          {/* <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
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
              <div class="flex-grow" style={{ width: "33%" }}>
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <select
                    name="condition_type"
                    id="condition_type"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="1">File Size</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
              <div class="flex-grow " style={{ width: "33%" }}>
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="config_type"
                    id="config_type"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option
                      selected={media_value.rule2?.type === "1" ? true : false}
                      value="1"
                    >
                      Less Than
                    </option>
                    <option
                      selected={media_value.rule2?.type === "2" ? true : false}
                      value="2"
                    >
                      More Than
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
                <div class="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="file_size_type"
                    id="file_size_type"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option
                      selected={media_value.rule2?.size === "1" ? true : false}
                      value="1"
                    >
                      300(KB)
                    </option>
                    <option
                      selected={media_value.rule2?.size === "2" ? true : false}
                      value="2"
                    >
                      500(KB)
                    </option>
                    <option
                      selected={media_value.rule2?.size === "3" ? true : false}
                      value="3"
                    >
                      1(MB)
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
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
          </div> */}

          {/* Ads capacity */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
            <div className="flex flex-row mt-3 space-x-5">
              <div className="text-xl font-bold font-poppins">Ads capacity</div>
            </div>
            <div className="grid grid-cols-6 mt-5 space-x-2">
              <div className="col-span-2">
                <input
                  type="number"
                  id="branding"
                  name="branding"
                  required
                  defaultValue={0}
                  className="font-poppins  border border-gray-300 h-[40px] rounded-md pl-4"
                />
              </div>
              <div className="col-span-3">
                <div className="flex justify-start items-center">
                  <div className="font-poppins font-bold mt-2">
                    Loops per Day
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-poppins text-[15px]">
                1 Loop = 15 Seconds
              </div>
            </div>
            {/* <div className="mt-3 grid grid-cols-2 space-x-4">
              <div className="col-span-1 ">
                <div className="grid grid-rows-3 space-y-2">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2">
                      <div className="font-poppins font-bold mt-4">STW</div>
                    </div>

                    {media_value.ads_capacity?.stw !== undefined ? (
                      <>
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="stw"
                            name="stw"
                            required
                            defaultValue={media_value.ads_capacity?.stw}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="stw"
                            name="stw"
                            required
                            defaultValue={0}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-7">
                    <div className="col-span-2">
                      <div className="font-poppins font-bold mt-4">
                        Category
                      </div>
                    </div>
                    {media_value.ads_capacity?.category !== undefined ? (
                      <>
                        {console.log(media_value.ads_capacity?.category)}
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="category"
                            name="category"
                            required
                            defaultValue={media_value.ads_capacity?.category}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="category"
                            name="category"
                            required
                            defaultValue={0}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-7">
                    <div className="col-span-2">
                      <div className="font-poppins font-bold mt-4">
                        Advertising
                      </div>
                    </div>
                    {media_value.ads_capacity?.advertising !== undefined ? (
                      <>
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="advertising"
                            name="advertising"
                            required
                            defaultValue={media_value.ads_capacity?.advertising}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-5">
                          <input
                            type="number"
                            id="advertising"
                            name="advertising"
                            required
                            defaultValue={0}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="grid grid-rows-2 space-y-2">
                  <div className="grid grid-cols-7">
                    <div className="col-span-3">
                      <div className="font-poppins font-bold mt-4">
                        Bank & Partner
                      </div>
                    </div>
                    {media_value.ads_capacity?.bank_partner !== undefined ? (
                      <>
                        {console.log(media_value.ads_capacity?.bank_partner)}
                        <div className="col-span-4">
                          <input
                            type="number"
                            id="bank_partner"
                            name="bank_partner"
                            required
                            defaultValue={
                              media_value.ads_capacity?.bank_partner
                            }
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-4">
                          <input
                            type="number"
                            id="bank_partner"
                            name="bank_partner"
                            required
                            defaultValue={0}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-7">
                    <div className="col-span-3">
                      <div className="font-poppins font-bold mt-4">
                        Branding
                      </div>
                    </div>
                    {media_value.ads_capacity?.branding !== undefined ? (
                      <>
                        {console.log(media_value.ads_capacity?.branding)}
                        <div className="col-span-4">
                          <input
                            type="number"
                            id="branding"
                            name="branding"
                            required
                            defaultValue={media_value.ads_capacity?.branding}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-4">
                          <input
                            type="number"
                            id="branding"
                            name="branding"
                            required
                            defaultValue={0}
                            className="font-poppins ml-7 mt-2 border border-gray-300 w-2/3 h-[40px] rounded-md pl-4"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="flex justify-center text-sm mt-5 font-poppins">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Media_Rule;
