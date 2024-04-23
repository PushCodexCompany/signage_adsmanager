import React, { useState, useEffect } from "react";
import { Header } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckPermission from "../../../libs/useCheckPermission";
import User from "../../../libs/admin";
import Swal from "sweetalert2";

const Create_Media_Rule = () => {
  useCheckPermission();
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = User.getCookieData();

  const [media_rule_id, setMediaRuleId] = useState(null);
  const [media_rule_name, setMediaRuleName] = useState(null);
  const [media_rule_height, setMediaRuleHeight] = useState(null);
  const [media_rule_width, setMediaRuleWidth] = useState(null);
  const [media_rule_adsCapacity, setMediaRuleAdsCapacity] = useState(null);

  const [toggle_disable, setToggleDisable] = useState(false);

  useEffect(() => {
    if (location.state) {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    //fetch data

    const {
      MediaRuleID,
      MediaRuleName,
      Height,
      Width,
      AdsCapacity,
      ActiveResolution,
    } = location.state.data;

    setMediaRuleId(MediaRuleID);
    setMediaRuleName(MediaRuleName);
    setMediaRuleHeight(Height);
    setMediaRuleWidth(Width);
    setMediaRuleAdsCapacity(AdsCapacity);
    setToggleDisable(ActiveResolution);
  };

  const RatioDisplay = ({ width, height }) => {
    const gcd = (a, b) => {
      return b === 0 ? a : gcd(b, a % b);
    };

    const divisor = gcd(width, height);

    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;

    const w_percentage = ((100 - ratioWidth) / 100) * 550;
    const h_percentage = ((100 - ratioHeight) / 100) * 550;

    return (
      <>
        <div className="w-[550px] h-[550px] bg-gray-200 flex justify-center items-center">
          <div
            className={`w-[${h_percentage}px]  h-[${w_percentage}px]  bg-black text-white p-4`}
            style={{
              width: `${h_percentage}px`,
              height: `${w_percentage}px`,
              backgroundColor: "black",
            }}
          ></div>
        </div>
      </>
    );
  };

  const handleSaveNewOrEditMediaRules = async (type) => {
    try {
      if (type === "create") {
        const obj = {
          mediarulename: media_rule_name,
          adscapacity: media_rule_adsCapacity,
          width: media_rule_width,
          height: media_rule_height,
          activeresolution: toggle_disable,
        };
        console.log(obj);
        const data = await User.createMediaRule(obj, token, toggle_disable);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "Add Media Rule Success ...",
            text: `เพิ่ม Media Rule สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              navigate("/setting/media_rule/");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      } else {
        const obj = {
          mediaruleid: media_rule_id,
          mediarulename: media_rule_name,
          adscapacity: media_rule_adsCapacity,
          width: media_rule_width,
          height: media_rule_height,
          activeresolution: toggle_disable,
        };

        const data = await User.updateMediaRule(obj, token, toggle_disable);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "Edit Media Rule Success ...",
            text: `แก้ไข Media Rule สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              navigate("/setting/media_rule");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
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
                  className="font-bold text-sm w-full h-full font-poppins pl-4"
                  placeholder="Media Rule Name"
                  onChange={(e) => setMediaRuleName(e.target.value)}
                  value={media_rule_name}
                />
              </div>
            </div>
            <div className="flex justify-center mt-14 font-bold text-2xl font-poppins">
              Screen Ratio Preview
            </div>

            <div className="flex justify-center  mt-4">
              {media_rule_width && media_rule_height ? (
                <RatioDisplay
                  width={media_rule_width}
                  height={media_rule_height}
                />
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-center mt-10">
              {media_rule_id ? (
                <button
                  onClick={() => handleSaveNewOrEditMediaRules("edit")}
                  className="bg-[#6425FE] w-[420px] hover:bg-[#3b1694] text-xl rounded-lg h-[65px] text-white font-bold font-poppins"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => handleSaveNewOrEditMediaRules("create")}
                  className="bg-[#6425FE] w-[420px] hover:bg-[#3b1694] text-xl rounded-lg h-[65px] text-white font-bold font-poppins"
                >
                  Create
                </button>
              )}
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

          {/* Resolution 1 */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-10">
            <div className="flex flex-row mt-3 space-x-5">
              <div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    value={toggle_disable}
                    onClick={(e) => setToggleDisable(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-[58px] h-6 flex items-center justify-${
                      toggle_disable ? "end" : "start"
                    } p-1 rounded-full border border-gray-500 transition duration-300`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shadow-md transform ${
                        toggle_disable
                          ? "translate-x-1 bg-[#6425FE] "
                          : "translate-x-0 border bg-white border-gray-500"
                      } duration-300 ease-in-out`}
                    />
                  </div>
                </label>
              </div>
              <div
                className={`text-xl font-poppins font-bold ${
                  toggle_disable ? "text-black" : "text-gray-500"
                }`}
              >
                Resolution
              </div>
            </div>

            <div className="grid grid-cols-11 mt-3 space-x-2  justify-center items-center">
              <div className="col-span-3">
                <div className="relative flex flex-col justify-center items-center h-full ">
                  <div
                    className={`text-sm font-poppins font-bold ${
                      toggle_disable ? "text-black" : "text-gray-500"
                    }`}
                  >
                    Resolution
                  </div>
                  {/* <select
                    name="resolution"
                    id="resolution"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                  >
                    <option value="">Resolution</option>
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
                  </div> */}
                </div>
              </div>
              <div className="col-span-2">
                <div className="relative flex flex-col justify-center items-center h-[40px] text-sm font-bold border border-gray-300 rounded-md">
                  <input
                    className={`font-bold text-sm w-full h-full font-poppins pl-4 ${
                      toggle_disable ? "text-black" : "text-gray-500"
                    }`}
                    type="number"
                    placeholder="Width"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue > 0) {
                        setMediaRuleWidth(newValue);
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "เกิดข้อผิดพลาด!",
                          text: "ต้องมีค่ามากกว่า 0",
                        });
                      }
                    }}
                    value={media_rule_width}
                    disabled={!toggle_disable}
                  />
                  {/* <select
                    name="resolution"
                    id="resolution"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
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
                  </div> */}
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className={`flex justify-center items-end font-bold font-poppins mt-1 ${
                    toggle_disable ? "text-black" : "text-gray-500"
                  }`}
                >
                  X
                </div>
              </div>
              <div className="col-span-2">
                <div className="relative flex flex-col justify-center items-center h-[40px] border border-gray-300 rounded-md">
                  <input
                    className={`font-bold text-sm w-full h-full font-poppins pl-4 ${
                      toggle_disable ? "text-black" : "text-gray-500"
                    }`}
                    placeholder="Height"
                    type="number"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue > 0) {
                        setMediaRuleHeight(newValue);
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "เกิดข้อผิดพลาด!",
                          text: "ต้องมีค่ามากกว่า 0",
                        });
                      }
                    }}
                    value={media_rule_height}
                    disabled={!toggle_disable}
                  />
                  {/* <select
                    name="resolution"
                    id="resolution"
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
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
                  </div> */}
                </div>
              </div>
              <div className="col-span-3">
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                  <div
                    className={`text-sm font-poppins ${
                      toggle_disable ? "text-black" : "text-gray-500"
                    }`}
                  >
                    pixels
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex justify-center text-sm mt-3 font-poppins ${
                toggle_disable ? "text-black" : "text-gray-500"
              }`}
            >
              Maximum Image Size of Requests must be over than 300 X 300
            </div>
          </div>

          {/* Ads capacity */}
          <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
            <div className="flex flex-row mt-3 space-x-5">
              <div className="text-xl font-bold font-poppins">Ads capacity</div>
            </div>
            <div className="grid grid-cols-6 mt-5 space-x-2">
              <div className="col-span-2">
                <input
                  onChange={(e) => setMediaRuleAdsCapacity(e.target.value)}
                  placeholder="Ads Capacity"
                  value={media_rule_adsCapacity}
                  className="font-poppins  border border-gray-300 h-[40px] rounded-md pl-4"
                />
              </div>
              <div className="col-span-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Media_Rule;
