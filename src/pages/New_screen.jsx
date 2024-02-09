import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "../components";
import { Navbar } from "../components";
import empty_img from "../assets/img/empty_location.png";
import location_img from "../assets/img/location.png";
import { HiOutlineClock } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

const New_screen = () => {
  const { id } = useParams();
  const location = useLocation();

  const fileInputRef = useRef(null);

  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [screenName, setScreenName] = useState();
  const [mediaRule, setMediaRule] = useState();
  const [screenTag, setScreenTag] = useState([]);
  const [locationImg, setLocationImg] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [latLong, setLatLong] = useState([]);
  const [screenDescription, setScreenDescription] = useState();
  const [screenResolution, setScreenResolution] = useState();
  const [screenPhysical, setScreenPhysical] = useState();
  const [orientation, setOrientation] = useState();
  const [inDoorOutdoot, setIndoorOutDoor] = useState();
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [pricing, setPricing] = useState();
  const [IsMaintenanceSwitchOn, setIsMaintenanceSwitchOn] = useState(false);
  const [notificationDelay, setNotificationDelay] = useState();

  useEffect(() => {
    if (id !== "new") {
      fetchScreen();
    }
  }, [id]);

  const fetchScreen = () => {
    console.log("location", location.state.screen);
    // //set edit
    const {
      name,
      rule,
      tag,
      img,
      latitude,
      resolutions,
      direction,
      position,
      officeHours,
      price,
      maintenanceNoti,
    } = location.state.screen;

    setScreenName(name);
    setMediaRule(rule);
    setScreenTag(tag);
    setLocationImg(img);
    setSelectedImage(img);
    setLatLong({ lat: latitude[0], long: latitude[1] });
    setScreenDescription(null);
    setScreenResolution(resolutions);
    // setScreenPhysical();
    setOrientation(direction);
    setIndoorOutDoor(position);
    setOpenTime(officeHours[0]);
    setCloseTime(officeHours[1]);
    setPricing(price);
    setIsMaintenanceSwitchOn(maintenanceNoti);
    // setNotificationDelay()
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleImageChange = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setLocationImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                  value={screenName}
                  onChange={(e) => setScreenName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="mediaRule"
                    id="mediaRule"
                    className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    onClick={toggleStatusSelect}
                    onChange={(e) => setMediaRule(e.target.value)}
                    value={mediaRule}
                  >
                    <option value="" disabled selected hidden>
                      Media Rule
                    </option>

                    <option value="Media Rule 1">Media Rule 1</option>
                    <option value="Media Rule 2">Media Rule 2</option>
                    <option value="Media Rule 3">Media Rule 3</option>
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
                <div className="grid grid-cols-6 space-x-2">
                  <div className="col-span-1">
                    <button className="w-[130px] h-[35px] rounded-lg  font-poppins bg-[#6425FE] text-white">
                      New Tag+
                    </button>
                  </div>
                  <div className="col-span-5">
                    <div className="flex flex-wrap space-x-1 space-y-1">
                      {screenTag.length > 0 ? (
                        screenTag.map((items, index) => (
                          <div
                            key={index}
                            className="w-1/5 border border-[#DBDBDB] p-1 rounded-lg flex justify-center items-center space-x-1"
                            style={{ minWidth: "20%" }}
                          >
                            <div className="flex justify-center items-center">
                              <AiOutlineClose className="text-[#6425FE]" />
                            </div>
                            <div className="flex-grow  font-poppins">
                              {items}
                            </div>
                            <div className="flex justify-center items-center">
                              <BsInfoCircle className="text-[#6425FE]" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                {/* <button className="bg-[#6425FE] text-white w-32 h-9 font-poppins rounded-lg">
                  New Tag+
                </button> */}
              </div>
              <div className="mt-2 flex justify-center">
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
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          className="flex items-center justify-center w-[250px] h-[250px]"
                        />
                      ) : (
                        <div className=" flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                          <img
                            src={empty_img}
                            className="flex items-center justify-center"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex justify-center items-center">
                      <button
                        onClick={() => handleImageChange()}
                        className="bg-[#6425FE] text-white font-poppins w-[315px] h-[48px] rounded-lg"
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
                              setLatLong({ lat: e.target.value })
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
                              setLatLong({ long: e.target.value })
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
          </div>
          <div className="col-span-6">
            <div className="p-1 mt-5">
              <div className="font-poppins font-semibold text-2xl">
                Screen Detail
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
                        onClick={toggleStatusSelect}
                        onChange={(e) => setScreenResolution(e.target.value)}
                        value={screenResolution}
                      >
                        <option value="" disabled selected hidden>
                          Screen Resolution
                        </option>
                        <option value="1920x1080">1920x1080</option>
                        <option value="1080x1920">1080x1920</option>
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
                        onClick={toggleStatusSelect}
                        onChange={(e) => setScreenPhysical(e.target.value)}
                        value={screenPhysical}
                      >
                        <option value="" disabled selected hidden>
                          Screen Physical Size
                        </option>
                        <option value="1">.</option>
                        <option value="2">.</option>
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
                        onClick={toggleStatusSelect}
                        onChange={(e) => setOrientation(e.target.value)}
                        value={orientation}
                      >
                        <option value="" disabled selected hidden>
                          Orientation
                        </option>
                        <option value="Portrait">Portrait</option>
                        <option value="Landscape">Landscape</option>
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
                        onClick={toggleStatusSelect}
                        onChange={(e) => setIndoorOutDoor(e.target.value)}
                        value={inDoorOutdoot}
                      >
                        <option value="" disabled selected hidden>
                          Indoor / Outdoor
                        </option>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
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
                            onClick={toggleStatusSelect}
                            onChange={(e) => setOpenTime(e.target.value)}
                            value={openTime}
                          >
                            <option value="" disabled selected hidden>
                              Open Time
                            </option>
                            <option value="0">00:00</option>
                            <option value="1">01:00</option>
                            <option value="2">02:00</option>
                            <option value="3">03:00</option>
                            <option value="4">04:00</option>
                            <option value="5">05:00</option>
                            <option value="6">06:00</option>
                            <option value="7">07:00</option>
                            <option value="8">08:00</option>
                            <option value="9">09:00</option>
                            <option value="10">10:00</option>
                            <option value="11">11:00</option>
                            <option value="12">12:00</option>
                            <option value="13">13:00</option>
                            <option value="14">14:00</option>
                            <option value="15">15:00</option>
                            <option value="16">16:00</option>
                            <option value="17">17:00</option>
                            <option value="18">18:00</option>
                            <option value="19">19:00</option>
                            <option value="20">20:00</option>
                            <option value="21">21:00</option>
                            <option value="22">22:00</option>
                            <option value="23">23:00</option>
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
                            onClick={toggleStatusSelect}
                            onChange={(e) => setCloseTime(e.target.value)}
                            value={closeTime}
                          >
                            <option value="" disabled selected hidden>
                              Close Time
                            </option>
                            <option value="0">00:00</option>
                            <option value="1">01:00</option>
                            <option value="2">02:00</option>
                            <option value="3">03:00</option>
                            <option value="4">04:00</option>
                            <option value="5">05:00</option>
                            <option value="6">06:00</option>
                            <option value="7">07:00</option>
                            <option value="8">08:00</option>
                            <option value="9">09:00</option>
                            <option value="10">10:00</option>
                            <option value="11">11:00</option>
                            <option value="12">12:00</option>
                            <option value="13">13:00</option>
                            <option value="14">14:00</option>
                            <option value="15">15:00</option>
                            <option value="16">16:00</option>
                            <option value="17">17:00</option>
                            <option value="18">18:00</option>
                            <option value="19">19:00</option>
                            <option value="20">20:00</option>
                            <option value="21">21:00</option>
                            <option value="22">22:00</option>
                            <option value="23">23:00</option>
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
                        onChange={(e) => setPricing(e.target.value)}
                        value={pricing}
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
                              className={`absolute left-1 top-[2px] w-4 h-4 ${
                                IsMaintenanceSwitchOn
                                  ? "bg-[#6425FE]"
                                  : "bg-white border border-[#6425FE]"
                              }  rounded-full shadow-md transition-transform duration-300 ${
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
                            value={notificationDelay}
                            onChange={(e) =>
                              setNotificationDelay(e.target.value)
                            }
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
