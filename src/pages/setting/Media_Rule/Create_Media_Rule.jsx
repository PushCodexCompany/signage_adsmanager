import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckPermission from "../../../libs/useCheckPermission";
import User from "../../../libs/admin";
import Swal from "sweetalert2";
import "../../css/create_mediarule.css";

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

  const [media_rule_image, setMediaRuleImage] = useState(
    location.state.data ? null : true
  );
  const [media_rule_video, setMediaRuleVideo] = useState(
    location.state.data ? null : true
  );

  const [fact_image, setFactImage] = useState(false);
  const [fact_video, setFactVideo] = useState(false);

  const [toggle_disable, setToggleDisable] = useState(true);
  const [isView, setIsView] = useState(false);
  const [maNotification, setMaNotification] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const [file_type, setFileType] = useState([]);

  useEffect(() => {
    if (location.state.data) {
      fetchData();
    }

    if (location.state.isView) {
      setIsView(location.state.isView);
    }

    getConfiguration();
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
      ImageContentTypeID,
      VideoContentTypeID,
    } = location.state.data;

    setMediaRuleId(MediaRuleID);
    setMediaRuleName(MediaRuleName);
    setMediaRuleHeight(Height);
    setMediaRuleWidth(Width);
    setMediaRuleAdsCapacity(AdsCapacity);
    setToggleDisable(ActiveResolution);

    if (ImageContentTypeID !== 0) {
      setMediaRuleImage(true);
      setFactImage(true);
    }

    if (VideoContentTypeID !== 0) {
      setMediaRuleVideo(true);
      setFactVideo(true);
    }
  };

  const RatioDisplay = ({ width, height }) => {
    const max_size = Math.max(width, height);
    const new_w = (width / max_size) * 550;
    const new_h = (height / max_size) * 550;

    return (
      <>
        <div className="w-[550px] h-[550px] bg-gray-200 flex justify-center items-center">
          <div
            className={` bg-black text-white p-4`}
            style={{
              width: new_w,
              height: new_h,
              backgroundColor: "black",
            }}
          />
        </div>
      </>
    );
  };

  const getConfiguration = async () => {
    const {
      configuration: { brandconfig },
    } = await User.getConfiguration(token);
    const initialValues = brandconfig.reduce((acc, item) => {
      acc[item.ParameterKey] = item.ParameterValue;
      return acc;
    }, {});

    setMaNotification(initialValues.CONTENTPERSLOT_SEC);

    const {
      configuration: { contenttype },
    } = await User.getConfiguration(token);

    const output = contenttype
      .filter((item) => item.ContentTypeSub) // Only include items that have a ContentTypeSub
      .map((item) => ({
        id: item.ContentTypeID,
        name: item.ContentTypeName,
        type: item.ContentTypeSub.map(
          (sub) => `*${sub.ContentTypeSubName}`
        ).join(", "),
      }));
    setFileType(output);
  };

  const handleSaveNewOrEditMediaRules = async (type) => {
    try {
      if (type === "create") {
        let media_img;
        let media_video;

        if (media_rule_image) {
          const imageObject = file_type.find((item) => item.name === "Image");
          const imageId = imageObject ? imageObject.id : "";
          media_img = imageId;
        }

        if (media_rule_video) {
          const videoObject = file_type.find((item) => item.name === "Video");
          const videoId = videoObject ? videoObject.id : "";
          media_video = videoId;
        }

        const obj = {
          mediarulename: media_rule_name,
          adscapacity: media_rule_adsCapacity,
          width: media_rule_width,
          height: media_rule_height,
          activeresolution: toggle_disable,
          imagecontenttypeid: media_img || null,
          videocontenttypeid: media_video || null,
        };
        if (
          media_rule_width === 0 ||
          media_rule_height === 0 ||
          media_rule_width === null ||
          media_rule_height === null
        ) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "width หรือ height ต้องมีค่ามากกว่า 0",
          });
        } else {
          const data = await User.createMediaRule(obj, token, toggle_disable);
          if (data.code === 200) {
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
        }
      } else {
        let media_img;
        let media_video;

        if (media_rule_image) {
          const imageObject = file_type.find((item) => item.name === "Image");
          const imageId = imageObject ? imageObject.id : "";
          media_img = imageId;
        }

        if (media_rule_video) {
          const videoObject = file_type.find((item) => item.name === "Video");
          const videoId = videoObject ? videoObject.id : "";
          media_video = videoId;
        }

        const obj = {
          mediaruleid: media_rule_id,
          mediarulename: media_rule_name,
          adscapacity: media_rule_adsCapacity,
          width: media_rule_width,
          height: media_rule_height,
          activeresolution: toggle_disable,
          imagecontenttypeid: media_img || null,
          videocontenttypeid: media_video || null,
        };
        Swal.fire({
          text: `คุณยืนยันการแก้ไข Media Rule : ${media_rule_name} `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#219ad1",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (
              media_rule_width === 0 ||
              media_rule_height === 0 ||
              media_rule_width === null ||
              media_rule_height === null
            ) {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "width หรือ height ต้องมีค่ามากกว่า 0",
              });
            } else {
              const data = await User.updateMediaRule(
                obj,
                token,
                toggle_disable
              );
              if (data.code === 200) {
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
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (isImage, checked) => {
    if (isImage) {
      setMediaRuleImage(checked);
      if (fact_image !== checked) {
        setIsEdit(true);
      } else {
        setIsEdit(fact_video !== media_rule_video); // Consider the video rule
      }
    } else {
      setMediaRuleVideo(checked);
      if (fact_video !== checked) {
        setIsEdit(true);
      } else {
        setIsEdit(fact_image !== media_rule_image); // Consider the image rule
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header
          lv1={"Setting"}
          lv2={"media_rule"}
          lv2Url={"/setting/media_rule"}
          lv3={"Create/Edit Media Rule"}
        />
        <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
          {location.state.isView
            ? "View Screen Media Rule"
            : location.state.data
            ? "Edit Screen Media Rule"
            : "New Screen Media Rule"}
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <div>
              <div className="relative">
                <label
                  className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                    media_rule_name
                      ? "-top-2.5 text-xs bg-white"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Media Rule Name
                </label>
                <div className="flex items-center">
                  <input
                    className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm"
                    onChange={(e) => {
                      if (
                        location.state?.data?.MediaRuleName !== e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }

                      setMediaRuleName(e.target.value);
                    }}
                    value={media_rule_name}
                    disabled={isView}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-5 font-bold text-2xl font-poppins">
                Screen Ratio Preview
              </div>

              <div className="flex justify-center mt-2">
                {media_rule_width > 0 && media_rule_height > 0 ? (
                  <RatioDisplay
                    width={media_rule_width}
                    height={media_rule_height}
                  />
                ) : (
                  <div className="w-[550px] h-[550px] bg-gray-200 flex justify-center items-center"></div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:pl-8 ">
            <div>
              <div className="font-bold text-3xl font-poppins">
                Media Rule Setting
              </div>
            </div>

            {/* Resolution 1 */}
            <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-10">
              <div className="flex flex-row mt-3 space-x-5">
                {/* <div>
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
                        className={`w-5 h-5 rounded-full shadow-sm transform ${
                          toggle_disable
                            ? "translate-x-1 bg-[#6425FE] "
                            : "translate-x-0 border bg-white border-gray-500"
                        } duration-300 ease-in-out`}
                      />
                    </div>
                  </label>
                </div> */}
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
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="relative flex flex-col justify-center items-center h-[40px] text-sm rounded-md">
                    {isView ? (
                      <div className="relative flex flex-col justify-left items-center h-full text-sm  ml-1">
                        <label
                          className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                            media_rule_width
                              ? "-top-2.5 text-xs bg-white"
                              : "top-3 text-gray-400"
                          }`}
                        >
                          Width
                        </label>
                        <input
                          className={`font-bold text-sm w-full h-full font-poppins pl-4 border border-gray-300 rounded-lg ${
                            toggle_disable ? "text-black" : "text-gray-500"
                          } focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm`}
                          type="number"
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length > 1 && newValue.startsWith(0)) {
                              return;
                            }
                            setMediaRuleWidth(newValue);
                          }}
                          value={media_rule_width}
                          min={0}
                          disabled
                        />
                      </div>
                    ) : (
                      <div className="relative flex flex-col justify-left items-center h-full text-sm  ml-1">
                        <label
                          className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                            media_rule_width
                              ? "-top-2.5 text-xs bg-white"
                              : "top-3 text-gray-400"
                          }`}
                        >
                          Width
                        </label>
                        <input
                          className={`font-bold text-sm w-full h-full font-poppins pl-4 border border-gray-300 rounded-lg ${
                            toggle_disable ? "text-black" : "text-gray-500"
                          } focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm`}
                          type="number"
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length > 1 && newValue.startsWith(0)) {
                              return;
                            }
                            if (
                              location.state?.data?.Width !== parseInt(newValue)
                            ) {
                              setIsEdit(true);
                            } else {
                              setIsEdit(false);
                            }
                            setMediaRuleWidth(newValue);
                          }}
                          value={media_rule_width}
                          min={0}
                          disabled={!toggle_disable}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div
                    className={`flex justify-center items-end font-bold font-poppins mt-1  ${
                      toggle_disable ? "text-black" : "text-gray-500"
                    }`}
                  >
                    X
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="relative flex flex-col justify-center items-center h-[40px] text-sm  rounded-md">
                    {isView ? (
                      <div className="relative flex flex-col justify-left items-center h-full text-sm  ml-1">
                        <label
                          className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                            media_rule_height
                              ? "-top-2.5 text-xs bg-white"
                              : "top-3 text-gray-400"
                          }`}
                        >
                          Height
                        </label>
                        <input
                          className={`font-bold text-sm w-full h-full font-poppins pl-4 border border-gray-300 rounded-lg ${
                            toggle_disable ? "text-black" : "text-gray-500"
                          } focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm`}
                          type="number"
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length > 1 && newValue.startsWith(0)) {
                              return;
                            }
                            setMediaRuleHeight(newValue);
                          }}
                          value={media_rule_height}
                          min={0}
                          disabled
                        />
                      </div>
                    ) : (
                      <div className="relative flex flex-col justify-left items-center h-full text-sm  ml-1">
                        <label
                          className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                            media_rule_height
                              ? "-top-2.5 text-xs bg-white"
                              : "top-3 text-gray-400"
                          }`}
                        >
                          Height
                        </label>
                        <input
                          className={`font-bold text-sm w-full h-full font-poppins pl-4 border border-gray-300 rounded-lg ${
                            toggle_disable ? "text-black" : "text-gray-500"
                          } focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm`}
                          type="number"
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length > 1 && newValue.startsWith(0)) {
                              return;
                            }
                            if (
                              location.state?.data?.Height !==
                              parseInt(newValue)
                            ) {
                              setIsEdit(true);
                            } else {
                              setIsEdit(false);
                            }

                            setMediaRuleHeight(newValue);
                          }}
                          min={0}
                          value={media_rule_height}
                          disabled={!toggle_disable}
                        />
                      </div>
                    )}
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
                <div className="text-xl font-bold font-poppins">
                  Ads capacity
                </div>
              </div>
              <div className="grid grid-cols-6 mt-5 space-x-2">
                <div className="col-span-2">
                  <div className="relative">
                    <label
                      className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                        media_rule_adsCapacity
                          ? "-top-2.5 text-xs bg-white"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Ads Capacity
                    </label>
                    <div className="flex items-center">
                      <input
                        onChange={(e) => {
                          if (
                            location.state?.data?.AdsCapacity !== e.target.value
                          ) {
                            setIsEdit(true);
                          } else {
                            setIsEdit(false);
                          }
                          setMediaRuleAdsCapacity(e.target.value);
                        }}
                        value={media_rule_adsCapacity}
                        disabled={isView}
                        // className="font-poppins border border-gray-300 h-[40px] rounded-md pl-4 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm"
                        className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex justify-start items-center">
                    <div className="font-poppins font-bold mt-2">
                      Slots per Loops
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="grid grid-cols-6">
                  <div className="col-span-2">
                    <div className="font-poppins text-[15px]">
                      1 Slot = {maNotification} Second
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="font-poppins text-[15px]">
                      Total Time ={" "}
                      {media_rule_adsCapacity * maNotification > 60
                        ? (
                            (media_rule_adsCapacity * maNotification) /
                            60
                          ).toFixed(2)
                        : media_rule_adsCapacity * maNotification}{" "}
                      {media_rule_adsCapacity * maNotification > 60
                        ? "Minute"
                        : "Second"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Type */}
            <div className="border-1 border-[#DBDBDB] rounded-sm p-2 mt-5">
              <div className="flex flex-row mt-3 space-x-5">
                <div className="text-xl font-bold font-poppins">Media Type</div>
              </div>
              <div className="grid grid-cols-6 mt-5 space-x-2">
                <div className="col-span-2">
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="custom-checkbox w-[30px] h-[30px]"
                        disabled={isView ? true : false}
                        checked={media_rule_image}
                        onChange={(e) =>
                          handleCheckboxChange(true, e.target.checked)
                        }
                      />
                    </div>
                    <div className="col-span-4 ">
                      <div className="flex">
                        <div className="font-poppins text-xl">Image</div>
                      </div>
                      <div className="flex">
                        <div className="font-poppins text-xs">{`(${
                          file_type.find((item) => item.name === "Image")?.type
                        })`}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="custom-checkbox w-[30px] h-[30px]"
                        disabled={isView ? true : false}
                        checked={media_rule_video}
                        onChange={(e) =>
                          handleCheckboxChange(false, e.target.checked)
                        }
                      />
                    </div>
                    <div className="col-span-4 ">
                      <div className="flex">
                        <div className="font-poppins text-xl">Video</div>
                      </div>
                      <div className="flex">
                        <div className="font-poppins text-xs">{`(${
                          file_type.find((item) => item.name === "Video")?.type
                        })`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <div className="font-poppins text-xs">
                  Choose the appropriate media type for your needs.
                </div>
              </div>
            </div>

            {!isView ? (
              <>
                <div className="flex justify-center mt-5">
                  {media_rule_id ? (
                    <button
                      onClick={() => handleSaveNewOrEditMediaRules("edit")}
                      className={`${
                        isEdit
                          ? "bg-[#6425FE] hover:bg-[#6325fe86]"
                          : "bg-gray-500 hover:bg-gray-800"
                      }  w-[350px]  text-md rounded-lg h-[65px] text-white font-bold font-poppins`}
                      disabled={!isEdit}
                    >
                      Save Change
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveNewOrEditMediaRules("create")}
                      className="bg-[#6425FE] w-[350px] hover:bg-[#3b1694] text-md rounded-lg h-[65px] text-white font-bold font-poppins"
                    >
                      Create
                    </button>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_Media_Rule;
