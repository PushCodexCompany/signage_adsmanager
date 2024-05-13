import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "../components";
import { Navbar } from "../components";
import empty_img from "../assets/img/empty_location.png";
import location_img from "../assets/img/location.png";
import { HiOutlineClock } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import User from "../libs/admin";
import New_Tag from "../components/New_Tag";
import Swal from "sweetalert2";

const New_screen = ({ setOpenAddNewScreenModal, openAddNewScreenModal }) => {
  const { token } = User.getCookieData();
  const fileInputRef = useRef(null);

  const [screenName, setScreenName] = useState();
  const [mediaRule, setMediaRule] = useState();
  const [screenTag, setScreenTag] = useState([]);
  const [locationImg, setLocationImg] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview_img, setPreviewImg] = useState(null);
  const [latLong, setLatLong] = useState([]);
  const [screenLocationName, setScreenLocationName] = useState();
  const [screenCityName, setScreenCityName] = useState();
  const [screenDescription, setScreenDescription] = useState();
  const [screenResolution, setScreenResolution] = useState();
  const [screenPhysical, setScreenPhysical] = useState();
  const [orientation, setOrientation] = useState();
  const [inDoorOutdoot, setIndoorOutDoor] = useState();
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [IsMaintenanceSwitchOn, setIsMaintenanceSwitchOn] = useState(false);
  const [notificationDelay, setNotificationDelay] = useState();

  const [media_rules_dd, setMediaRulesDD] = useState([]);
  const [screen_resolution_dd, setScreenResolutionDD] = useState([]);
  const [screen_physical_size_dd, setScreenPhysicalSize] = useState([]);
  const [city_data, setCityData] = useState([]);

  const [openModalNewTag, setOpenModalNewTag] = useState(false);

  useEffect(() => {
    getCity();
    getMediaRules();
    getScreenOption();
  }, []);

  const getCity = async () => {
    const data = await User.getConfiguration(token);
    setCityData(data?.configuration?.cities);
  };

  const getMediaRules = async () => {
    const media_rules = await User.getMediaRules(token);
    setMediaRulesDD(media_rules);
  };

  const getScreenOption = async () => {
    const screen_option = await User.getScreensOptions(token);
    setScreenResolutionDD(screen_option.screenresolution);
    setScreenPhysicalSize(screen_option.screenphysicalsize);
  };

  const handleDeleteTagInSelectTag = (id) => {
    const tag = screenTag.filter((tag) => tag.TagID !== id);
    setScreenTag(tag);
  };

  const handleImageChange = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTime = (time) => {
    let inputTime = time;
    // Remove non-numeric characters
    inputTime = inputTime.replace(/\D/g, "");
    // Format to HH:MM:SS format
    if (inputTime.length >= 4) {
      inputTime = inputTime.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
    }

    return inputTime;
  };

  const toggleMaintenanceSwitch = () => {
    setIsMaintenanceSwitchOn(!IsMaintenanceSwitchOn);
  };

  const handleCreateScreen = async () => {
    const obj = {
      screenname: screenName,
      mediaruleid: mediaRule || "",
      tagids: screenTag.map((item) => String(item.TagID)),
      screencoords: `${latLong.lat},${latLong.long}`,
      screenlocation: screenLocationName || "",
      screencity: screenCityName || "",
      screendesc: screenDescription || "",
      screenresolutionid: screenResolution || "",
      screenphysizeid: screenPhysical || "",
      screenorientation: orientation || "",
      screenplacement: inDoorOutdoot || "",
      screenopentime: openTime || "",
      screenclosetime: closeTime || "",
      manotifydelay: notificationDelay || "",
    };

    if (obj.screenname) {
      try {
        const data = await User.createNewScreen(obj, token);
        if (data.code !== 404) {
          if (selectedImage) {
            const form = new FormData();
            form.append("target", "screenphoto");
            form.append("screenid", data.screenid);
            form.append("logo", selectedImage);
            const data_img = await User.saveImgAccountScreens(form, token);
            if (data_img.code !== 404) {
              Swal.fire({
                icon: "success",
                title: "สร้าง Screen สำเร็จ!",
                text: `สร้าง Screen สำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  setOpenAddNewScreenModal(!openAddNewScreenModal);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data_img.message,
              });
            }
          } else {
            Swal.fire({
              icon: "success",
              title: "สร้าง Screen สำเร็จ!",
              text: `สร้าง Screen สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setOpenAddNewScreenModal(!openAddNewScreenModal);
              }
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Screen Name",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
        {/* First div (circle) */}
        <div className="absolute right-10 top-[150px] lg:top-[30px] lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setOpenAddNewScreenModal(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen  relative">
          <div className="flex items-center justify-between mt-10 mb-5  p-4">
            <div className="font-poppins font-semibold text-2xl">
              Create New Screens
            </div>
          </div>
          <div className=" h-[700px] flex flex-col lg:flex-row overflow-y-auto">
            <div className="w-full lg:w-1/2 p-4">
              <div className="relative">
                <div className="flex items-center">
                  <div className="flex justify-start items-center h-full whitespace-nowrap">
                    <div className="font-poppins text-lg font-bold">
                      Screen Name:
                    </div>
                  </div>

                  <input
                    placeholder="Screen Name"
                    className="border border-[#DBDBDB] rounded-lg p-3 pr-10 w-full font-bold font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                    value={screenName}
                    onChange={(e) => setScreenName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="mediaRule"
                    id="mediaRule"
                    className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    onChange={(e) => setMediaRule(e.target.value)}
                    value={mediaRule}
                  >
                    <option value="" disabled selected hidden>
                      Media Rule
                    </option>
                    {media_rules_dd.length > 0 &&
                      media_rules_dd.map((items) => (
                        <option value={items.MediaRuleID}>
                          {items.MediaRuleName}
                        </option>
                      ))}
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
                <div className="grid grid-cols-6 space-x-1">
                  <div className="col-span-1 flex justify-start">
                    <button
                      onClick={() => setOpenModalNewTag(!openModalNewTag)}
                      className="w-[150px] h-[45px] rounded-lg  font-poppins bg-[#6425FE] hover:bg-[#3b1694] text-white"
                    >
                      New Tag+
                    </button>
                  </div>
                  <div className="col-span-5">
                    <div className="flex flex-wrap">
                      {screenTag.length > 0
                        ? screenTag.map((item, index) => (
                            <div
                              key={index}
                              className="border border-gray-300 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1"
                              style={{
                                flexBasis: `calc(30% - 5px)`, // Increased width and adjusted spacing
                              }}
                            >
                              <div className="flex justify-center items-center mr-1 ml-1">
                                <IoIosClose
                                  onClick={() =>
                                    handleDeleteTagInSelectTag(item.TagID)
                                  }
                                  className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                />
                              </div>
                              <div className="flex-grow lg:text-sm md:text-xs font-poppins flex justify-center">
                                {item.TagName}
                              </div>
                              <div className="flex justify-center items-center ml-1 mr-1">
                                <BsInfoCircle
                                  onClick={() => alert(index)}
                                  className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                />
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <div className=" items-center grid grid-cols-6 space-x-1">
                  <div className="col-span-3">
                    <div className="flex justify-center items-center w-[315px] h-[315px] border border-gray-300 rounded-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                      {preview_img ? (
                        <img
                          src={preview_img}
                          className="flex items-center justify-center w-[315px] h-[315px] object-cover"
                        />
                      ) : (
                        <div className=" flex items-center justify-center mt-3 w-[250px] h-[250px] rounded-lg">
                          <img
                            src={empty_img}
                            className="flex items-center justify-center object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex justify-center items-center">
                      <button
                        onClick={() => handleImageChange()}
                        className="bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold font-poppins w-[315px] h-[48px] rounded-lg"
                      >
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
                            value={latLong.lat}
                            onChange={(e) =>
                              setLatLong({ ...latLong, lat: e.target.value })
                            }
                            type="text"
                            placeholder="Lat"
                            className="w-[157px] h-[48px] rounded-lg p-3 font-poppins border border-gray-300"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            value={latLong.long}
                            onChange={(e) =>
                              setLatLong({ ...latLong, long: e.target.value })
                            }
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
            <div className="w-full lg:w-1/2 p-4 lg:pl-8 border border-gray-300">
              <div className="p-1 mt-5">
                <div className="font-poppins font-semibold text-2xl">
                  Screen Detail
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-6 space-x-1">
                    <div className="col-span-3">
                      <div className="relative flex flex-col justify-left items-center h-full text-sm font-bold ml-1">
                        <input
                          value={screenLocationName}
                          onChange={(e) =>
                            setScreenLocationName(e.target.value)
                          }
                          type="text"
                          placeholder="Location"
                          className="w-full rounded-lg p-3 font-poppins border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                        <select
                          name="screenCity"
                          id="screenCity"
                          className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                          onChange={(e) => setScreenCityName(e.target.value)}
                          value={screenCityName}
                        >
                          <option value="" disabled selected hidden>
                            City
                          </option>
                          {city_data.length > 0 &&
                            city_data.map((items) => (
                              <option value={items.CityID}>
                                {items.NameEN}
                              </option>
                            ))}
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
                  <textarea
                    value={screenDescription}
                    onChange={(e) => setScreenDescription(e.target.value)}
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
                          name="screenResolution"
                          id="screenResolution"
                          className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                          onChange={(e) => setScreenResolution(e.target.value)}
                          value={screenResolution}
                        >
                          <option value="" disabled selected hidden>
                            Screen Resolution
                          </option>
                          {screen_resolution_dd.length > 0 &&
                            screen_resolution_dd.map((items) => (
                              <option value={items.ScreenResolutionID}>
                                {items.Resolution}
                              </option>
                            ))}
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
                          name="screenPhysical"
                          id="screenPhysical"
                          className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                          onChange={(e) => setScreenPhysical(e.target.value)}
                          value={screenPhysical}
                        >
                          <option value="" disabled selected hidden>
                            Screen Physical Size
                          </option>
                          {screen_physical_size_dd.length > 0 &&
                            screen_physical_size_dd.map((items) => (
                              <option value={items.ScreenPhySizeID}>
                                {items.PhysicalSize}
                              </option>
                            ))}
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
                          name="orientation"
                          id="orientation"
                          className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                          onChange={(e) => setOrientation(e.target.value)}
                          value={orientation}
                        >
                          <option value="" disabled selected hidden>
                            Orientation
                          </option>
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
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
                          name="IndoorOutdoor"
                          id="IndoorOutdoor"
                          className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                          onChange={(e) => setIndoorOutDoor(e.target.value)}
                          value={inDoorOutdoot}
                        >
                          <option value="" disabled selected hidden>
                            Placement
                          </option>
                          <option value="indoor">Indoor</option>
                          <option value="outdoor">Outdoor</option>
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
                            <input
                              value={openTime}
                              onChange={(e) => {
                                const time_value = generateTime(e.target.value);
                                setOpenTime(time_value);
                              }}
                              placeholder="Open Time"
                              className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                            <div className="font-poppins font-bold">-</div>
                          </div>
                        </div>
                        <div className="col-span-5">
                          <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                            <input
                              value={closeTime}
                              onChange={(e) => {
                                const time_value = generateTime(e.target.value);
                                setCloseTime(time_value);
                              }}
                              placeholder="Close Time"
                              className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            />
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
                      {/* <div className="relative flex flex-col justify-left items-center h-full text-sm font-bold ml-1">
                      <input
                        onChange={(e) => setSlotPerDay(e.target.value)}
                        value={slotPerDay}
                        type="number"
                        placeholder="Slot Per Day"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border  border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      />
                    </div> */}
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
                              value={IsMaintenanceSwitchOn}
                              onClick={toggleMaintenanceSwitch}
                            >
                              <div
                                className={`absolute left-1 top-[2px] w-4 h-4 ${
                                  IsMaintenanceSwitchOn
                                    ? "bg-[#6425FE]"
                                    : "bg-white border border-[#6425FE]"
                                }  rounded-full shadow-md transition-transform duration-300 ${
                                  IsMaintenanceSwitchOn
                                    ? "translate-x-full"
                                    : ""
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
                            <div
                              className={` ${
                                !IsMaintenanceSwitchOn ? "text-gray-300" : ""
                              } font-poppins font-bold`}
                            >
                              Notification Delay (sec)
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center justify-end">
                            <input
                              placeholder="Second"
                              className="border border-gray-300 rounded-lg p-3 pr-10 w-[80%] h-[30px]  font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                              value={notificationDelay}
                              onChange={(e) =>
                                setNotificationDelay(e.target.value)
                              }
                              disabled={!IsMaintenanceSwitchOn}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleCreateScreen()}
                      className="w-[315px] h-[48px] bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold font-poppins rounded-lg"
                    >
                      Create Screen
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-center items-center text-center">
                    <div className="font-poppins">
                      Add screen details for precise ad targeting. Enter size,
                      resolution, and operating hours to optimize your
                      advertising strategy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModalNewTag && (
        <New_Tag
          setOpenModalNewTag={setOpenModalNewTag}
          openModalNewTag={openModalNewTag}
          screenTag={screenTag}
          setScreenTag={setScreenTag}
        />
      )}
    </>
  );
};

export default New_screen;
