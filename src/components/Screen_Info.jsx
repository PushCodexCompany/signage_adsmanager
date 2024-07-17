import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { LuClock4 } from "react-icons/lu";
import { MdDragHandle } from "react-icons/md";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import empty_img from "../assets/img/empty_location.png";
import User from "../libs/admin";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";

const schedule = [
  {
    date: "2023-06-20T17:00:00.000Z",
    slot: 10,
    booking: 9,
    mediaSchedule: [
      {
        id: "1",
        name: "Mid year sale 2023.mp4",
        merchandise: "Nike",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "2",
        name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "3",
        name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "4",
        name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "5",
        name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "6",
        name: "Mid year Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "7",
        name: "Mid year Sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "8",
        name: "Food Hall Ads.mp4",
        merchandise: "After You",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "9",
        name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 1",
        duration: 15,
      },
      {
        id: "10",
        name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 1",
        duration: 15,
      },
    ],
  },
  {
    date: "2023-06-21T17:00:00.000Z",
    slot: 10,
    booking: 7,
    mediaSchedule: [],
  },
  {
    date: "2023-06-22T17:00:00.000Z",
    slot: 10,
    booking: 4,
    mediaSchedule: [],
  },
  {
    date: "2023-06-23T17:00:00.000Z",
    slot: 10,
    booking: 1,
    mediaSchedule: [],
  },
  {
    date: "2023-06-24T17:00:00.000Z",
    slot: 10,
    booking: 5,
    mediaSchedule: [],
  },
  {
    date: "2023-06-25T17:00:00.000Z",
    slot: 10,
    booking: 7,
    mediaSchedule: [],
  },
  {
    date: "2023-06-26T17:00:00.000Z",
    slot: 10,
    booking: 10,
    mediaSchedule: [],
  },
  {
    date: "2023-06-27T17:00:00.000Z",
    slot: 10,
    booking: 10,
    mediaSchedule: [],
  },
  {
    date: "2023-06-28T17:00:00.000Z",
    slot: 10,
    booking: 0,
    mediaSchedule: [],
  },
  {
    date: "2023-06-29T17:00:00.000Z",
    slot: 10,
    booking: 0,
    mediaSchedule: [],
  },
  {
    date: "2023-06-30T17:00:00.000Z",
    slot: 10,
    booking: 0,
    mediaSchedule: [],
  },
  {
    date: "2023-07-01T17:00:00.000Z",
    slot: 10,
    booking: 0,
    mediaSchedule: [],
  },
];

const health = [
  80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80,
  80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 40, 80,
  80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
];

const month_data = [
  {
    name: "January",
    value: 1,
  },
  {
    name: "February",
    value: 2,
  },
  {
    name: "March",
    value: 3,
  },
  {
    name: "April",
    value: 4,
  },
  {
    name: "May",
    value: 5,
  },
  {
    name: "June",
    value: 6,
  },
  {
    name: "July",
    value: 7,
  },
  {
    name: "August",
    value: 8,
  },
  {
    name: "September",
    value: 9,
  },
  {
    name: "October",
    value: 10,
  },
  {
    name: "November",
    value: 11,
  },
  {
    name: "December",
    value: 12,
  },
];

const year_data = [
  {
    name: "2024",
    value: 2024,
  },
  {
    name: "2025",
    value: 2025,
  },
  {
    name: "2026",
    value: 2026,
  },
  {
    name: "2027",
    value: 2027,
  },
  {
    name: "2028",
    value: 2028,
  },
];

const Screen_Info = ({ setOpenInfoScreenModal, selectInfoScreen, from }) => {
  const { token } = User.getCookieData();
  const [openMediaScheduleModal, setOpenMediaScheduleModal] = useState(false);
  const [selectMediaScreen, setSelectMediaScreen] = useState();
  const [hideOldModal, setHideOldModal] = useState(true);

  const [screen_resolution, setScreenResolution] = useState([]);
  const [screen_physical_size, setScreenPhysicalSize] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [schedule, setSchedule] = useState([]);

  const [mediaSchedule, setMediaSchedule] = useState([]);
  const [mediaScheduleData, setMediaScheduleDate] = useState(null);

  useEffect(() => {
    getScreenData();
    getSchulde();
  }, []);

  useEffect(() => {
    getSchulde();
  }, [month]);

  const getScreenData = async () => {
    const screens_option = await User.getScreensOptions(token);
    setScreenResolution(screens_option.screenresolution);
    setScreenPhysicalSize(screens_option.screenphysicalsize);
  };

  const getSchulde = async () => {
    const { ScreenID } = selectInfoScreen;
    const obj = {
      screenid: ScreenID,
      selectmonth: month,
      selectyear: year,
    };
    try {
      const { screenschedule } = await User.getScreenSchulde(obj, token);
      setSchedule(screenschedule);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectMedia = async (items) => {
    const obj = {
      screenid: selectInfoScreen.ScreenID,
      bookingdate: items.BookingDate,
    };

    try {
      const { screenmedia } = await User.getScreenmedia(obj, token);
      setMediaSchedule(screenmedia);
      setHideOldModal(!hideOldModal);
      setMediaScheduleDate(items);
      setOpenMediaScheduleModal(!openMediaScheduleModal);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(mediaSchedule);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMediaSchedule(items);
  };

  const findScreenResolutionID = (id) => {
    const resolution = screen_resolution.find(
      (item) => item.ScreenResolutionID === id
    );
    return resolution ? resolution.Resolution : "No Resolution";
  };

  const findPhysicalSizeID = (id) => {
    const resolution = screen_physical_size.find(
      (item) => item.ScreenPhySizeID === id
    );
    return resolution ? resolution.PhysicalSize : "No Physical Size";
  };

  const handleSaveNewOrderMedia = async () => {
    const { ScreenID } = selectInfoScreen;
    const { BookingDate } = mediaScheduleData;
    const mediaIDs = mediaSchedule.map((item) => item.MediaID).join(",");
    const obj = {
      screenid: ScreenID,
      bookingdate: BookingDate,
      mediaids: mediaIDs,
    };

    try {
      const data = await User.updateScreenmediaordering(obj, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "Update Screen Ordering Success ...",
          text: "แก้ไข Screen Ordering สำเร็จ!",
        }).then(async (result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "เกิดข้อผิดพลาด",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const toggleYearSelect = () => {
  //   setIsYearOpen((prevIsOpen) => !prevIsOpen);
  // };

  return (
    <>
      {hideOldModal && (
        <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setOpenInfoScreenModal(false)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4">
                <div className="p-4">
                  <div className="font-poppins text-[30px] font-bold">
                    {selectInfoScreen.ScreenName}
                  </div>
                  <div className="font-poppins text-[18px]  text-[#8A8A8A]">
                    {selectInfoScreen.ScreenLocation}
                  </div>
                  <div className="flex items-center space-x-1 ">
                    {selectInfoScreen.status === 0 ? (
                      <div className="bg-red-500 w-[8px] h-[8px]  rounded-xl"></div>
                    ) : (
                      <div className="bg-[#00C32B] w-[8px] h-[8px]  rounded-xl"></div>
                    )}
                    <div className="font-poppins text-[18px] p-[2px]">
                      {selectInfoScreen.status === 0 ? "Offline" : "Online"}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-1 flex justify-end">
                        {/* Adjusted to flex and justified to end */}
                        <div className="flex items-center justify-center text-center w-[130px] h-[35px] rounded-lg text-[18px] font-poppins bg-[#6425FE] text-white">
                          Tag
                        </div>
                      </div>
                      <div className="col-span-5">
                        {/* Kept as it is */}
                        <div className="flex flex-wrap justify-start">
                          {selectInfoScreen.ScreenTag.map((items, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1"
                              style={{
                                flexBasis: `calc(30% - 5px)`,
                              }}
                            >
                              <div className="flex justify-center items-center mr-1 ml-1">
                                <IoIosClose className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer" />
                              </div>
                              <div className="flex-grow text-sm font-poppins flex justify-center">
                                {items.TagName}
                              </div>
                              <div className="flex justify-center items-center ml-1 mr-1">
                                <BsInfoCircle className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="flex justify-center items-center h-full">
                          <img
                            src={
                              selectInfoScreen.ScreenPhoto
                                ? selectInfoScreen.ScreenPhoto
                                : empty_img
                            }
                            className="object-contain w-[290px] h-[290px]"
                            alt="placeImage"
                          />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="flex justify-center items-center h-full">
                          {/* Temporay Use screen photo wait replace location */}
                          <img
                            src={
                              selectInfoScreen.ScreenPhoto
                                ? selectInfoScreen.ScreenPhoto
                                : empty_img
                            }
                            className="object-contain w-[290px] h-[290px]"
                            alt="latImage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenLocation}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenLocation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            Open Time :{" "}
                            {`${selectInfoScreen.ScreenOpenTime?.split(":")
                              .slice(0, 2)
                              .join(
                                ":"
                              )} - ${selectInfoScreen.ScreenCloseTime?.split(
                              ":"
                            )
                              .slice(0, 2)
                              .join(":")}`}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenRule[0]?.MediaRuleName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {findPhysicalSizeID(
                              selectInfoScreen.ScreenPhySizeID
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {findScreenResolutionID(
                              selectInfoScreen.ScreenResolutionID
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenOrientation.charAt(
                              0
                            ).toUpperCase() +
                              selectInfoScreen.ScreenOrientation.slice(1)}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenPlacement.charAt(
                              0
                            ).toUpperCase() +
                              selectInfoScreen.ScreenPlacement.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-gray-200 flex justify-center items-center rounded-lg">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.price
                              ? selectInfoScreen.price
                              : "-"}{" "}
                            Bath per Dat
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 lg:pl-8 ">
                <div className="p-4 border border-gray-200">
                  <div className="mt-[70px]">
                    <div className="grid grid-cols-12">
                      <div className="col-span-3">
                        <div className="font-poppins text-[30px] font-bold">
                          Schedule
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                          <select
                            name="month"
                            id="month"
                            className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            onChange={(e) => setMonth(e.target.value)}
                            value={month}
                          >
                            <option value="" disabled selected hidden>
                              Month
                            </option>
                            {month_data.map((items) => (
                              <option value={items.value}>{items.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IoIosArrowDown size={18} color="#6425FE" />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                          <select
                            name="year"
                            id="year"
                            className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                            onChange={(e) => setYear(e.target.value)}
                            value={year}
                          >
                            <option value="" disabled selected hidden>
                              Year
                            </option>
                            {year_data.map((items) => (
                              <option value={items.value}>{items.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IoIosArrowDown size={18} color="#6425FE" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {schedule.length > 0 ? (
                      <div className="w-[720px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6425FE] scrollbar-track-[#CDCDCD] pb-[10px] bg-[#ececec]">
                        <div className="mt-3">
                          <div className="flex space-x-2">
                            {schedule?.map((items, index) => (
                              <div className="border border-[#E8E8E8] min-w-[60px] h-[60px]">
                                <div className="font-poppins font-bold text-[11px] flex justify-center items-center">
                                  {format(items.BookingDate, "EEE")}
                                </div>
                                <div className="font-poppins font-bold flex justify-center items-center text-[30px]">
                                  {format(items.BookingDate, "dd")}
                                </div>
                                <div className="font-poppins font-bold flex justify-center items-center text-[9px] ">
                                  {format(items.BookingDate, "MMM yyyy")}
                                </div>
                              </div>
                            ))}
                            {/* {selectInfoScreen.schedule?.map((items, index) => (
                            <div className="border border-[#E8E8E8] min-w-[60px] h-[60px]">
                              <div className="font-poppins font-bold text-[11px] flex justify-center items-center">
                                {format(items.date, "EEE")}
                              </div>
                              <div className="font-poppins font-bold flex justify-center items-center text-[30px]">
                                {format(items.date, "dd")}
                              </div>
                              <div className="font-poppins font-bold flex justify-center items-center text-[9px] ">
                                {format(items.date, "MMM yyyy")}
                              </div>
                            </div>
                          ))} */}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-[720px] flex space-x-2">
                            {schedule?.map((items, index) => (
                              <div
                                onClick={() => handleSelectMedia(items)}
                                className={`${
                                  items.MaxSlot - items.TotalUseSlot === 0
                                    ? "bg-[#5C5C5C]"
                                    : items.MaxSlot - items.TotalUseSlot ===
                                      items.MaxSlot
                                    ? "bg-[#018C41] opacity-40"
                                    : "bg-[#018C41]"
                                } min-w-[60px] h-[60px] flex justify-center items-center cursor-pointer rounded-md`}
                              >
                                <div className="font-poppins text-white text-[18px]">
                                  {items.TotalUseSlot}/{items.MaxSlot}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-center mt-2">
                        <div className="font-poppins text-2xl text-gray-300">
                          --- No Schedule ---
                        </div>
                      </div>
                    )}

                    <div className="mt-10 flex justify-center border-b-2 items-center text-[#DBDBDB] " />
                    <div className="mt-2">
                      <div className="font-poppins text-[30px] font-bold">
                        Screen Health
                      </div>
                      <div className="w-[720px] bg-[#D9D9D9] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6425FE] scrollbar-track-[#CDCDCD] pb-[10px]">
                        <div className="mt-2 mb-2">
                          <div className="flex items-end">
                            {health?.map((height, index) => (
                              <div
                                key={index}
                                className={`h-[${height}px] bg-[#2F8B5A] w-4 m-[1px]`}
                                style={{ minWidth: "1rem" }}
                              />
                            ))}
                            {/* {selectInfoScreen.health?.map((height, index) => (
                              <div
                                key={index}
                                className={`h-[${height}px] bg-[#2F8B5A] w-4 m-[1px]`}
                                style={{ minWidth: "1rem" }}
                              />
                            ))} */}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="font-poppins text-[18px] font-bold">
                          {`Up Time ${selectInfoScreen.uptime || " "} %`}
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="grid grid-cols-4 space-x-2">
                          <div className="col-span-2">
                            <div className="grid grid-cols-3">
                              <div className="col-span-2">
                                <div className="font-poppins text-[18px] font-bold">
                                  Maintenance Notification
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="flex justify-end">
                                  {selectInfoScreen.MANotifyDelay ? (
                                    <BiToggleRight
                                      size={32}
                                      className="text-[#6425FE]"
                                    />
                                  ) : (
                                    <BiToggleLeft
                                      size={32}
                                      className="text-[#6425FE]"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="grid grid-cols-3">
                              <div className="col-span-2">
                                <div className="font-poppins text-[18px] font-bold">
                                  Offline Notification Delay
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="flex justify-end items-center space-x-2">
                                  <div className="text-[#A9A9A9] text-[15px] font-poppins">
                                    {selectInfoScreen.MANotifyDelay}
                                  </div>
                                  <LuClock4
                                    size={24}
                                    className="text-[#6425FE]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-[15px] font-bold">
                            Screen Description : {selectInfoScreen.ScreenDesc}
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-8">
                        <div className="flex justify-center items-center">
                          <button className="font-poppins text-[15px] w-[315px] h-[48px] rounded-lg bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold">
                            Start Booking
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openMediaScheduleModal && (
        <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-10 top-14 lg:top-12 lg:right-[130px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setHideOldModal(!hideOldModal);
                  setOpenMediaScheduleModal(!openMediaScheduleModal);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-5/6 lg:w-5/6 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/4 p-1">
                <div className="p-8">
                  <div className="text-[30px] font-semibold font-poppins">
                    {selectInfoScreen.ScreenName}
                  </div>
                  <div className="text-[18px] font-poppins text-[#8A8A8A]">
                    {selectInfoScreen.ScreenLocation}
                  </div>
                  <div className="flex items-center space-x-1 ">
                    {selectInfoScreen.status === 0 ? (
                      <div className="bg-red-500 w-[8px] h-[8px]  rounded-xl"></div>
                    ) : (
                      <div className="bg-[#00C32B] w-[8px] h-[8px]  rounded-xl"></div>
                    )}
                    <div className="font-poppins font-bold text-[18px] p-[2px]">
                      {selectInfoScreen.status === 0 ? "Offline" : "Online"}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center items-center">
                    <div className="border border-[#E8E8E8] w-[130px] h-[130px]">
                      <div className="font-poppins font-bold text-[17px] flex justify-center items-center">
                        {format(mediaScheduleData.BookingDate, "EEE")}
                      </div>
                      <div className="font-poppins font-bold flex justify-center items-center text-[46px]">
                        {format(mediaScheduleData.BookingDate, "dd")}
                      </div>
                      <div className="font-poppins font-bold flex justify-center items-center text-[17px] ">
                        {format(mediaScheduleData.BookingDate, "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center items-center">
                    <div
                      className={`${
                        mediaScheduleData.MaxSlot -
                          mediaScheduleData.TotalUseSlot ===
                        0
                          ? "bg-[#5C5C5C]"
                          : mediaScheduleData.MaxSlot -
                              mediaScheduleData.TotalUseSlot ===
                            mediaScheduleData.MaxSlot
                          ? "bg-[#018C41] opacity-40"
                          : "bg-[#018C41]"
                      } min-w-[130px] h-[130px] flex justify-center items-center`}
                    >
                      <div className="font-poppins text-white text-[36px]">
                        {mediaScheduleData.TotalUseSlot}/
                        {mediaScheduleData.MaxSlot}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-3/4 p-1 lg:pl-8">
                <div className="p-8">
                  <div className="flex justify-center items-center mt-5">
                    <div className="text-[36px] font-semibold font-poppins">
                      Media Schedule
                    </div>
                  </div>
                  <div className="grid grid-cols-12  mt-5">
                    <div className="col-span-1">
                      <div className="text-[#59606C] font-poppins">No</div>
                    </div>
                    <div className="col-span-4">
                      <div className="text-[#59606C] font-poppins">
                        Media Name
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[#59606C] font-poppins">
                        Merchandise
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[#59606C] font-poppins">
                        Duration
                      </div>
                    </div>
                    {from === "list" ? (
                      <div className="col-span-1">
                        <div className="text-[#59606C] font-poppins">
                          Action
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="mediaSchedule">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {mediaSchedule.map((items, index) => (
                            <Draggable
                              key={items.MediaID.toString()}
                              draggableId={items.MediaID.toString()}
                              index={index}
                              isDragDisabled={from === "list" ? false : true}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="grid grid-cols-12 mt-5"
                                >
                                  <div className="col-span-1">
                                    <div className="font-poppins font-semibold text-sm lg:text-base">
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div className="col-span-4">
                                    <div className="font-poppins font-semibold text-sm lg:text-base">
                                      {items.ContentName}
                                    </div>
                                  </div>
                                  <div className="col-span-2">
                                    <div className="font-poppins font-semibold text-sm lg:text-base">
                                      {items.AdvertiserName}
                                    </div>
                                  </div>
                                  <div className="col-span-2">
                                    <div className="font-poppins font-semibold text-sm lg:text-base">
                                      {formatTime(items.Duration)}
                                    </div>
                                  </div>
                                  {from === "list" ? (
                                    <div className="col-span-1">
                                      <div className="font-poppins font-semibold text-sm lg:text-base">
                                        <MdDragHandle color={"#6425FE"} />
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {from === "list" ? (
                    <div className="flex justify-center items-center mt-10 mb-10">
                      <button
                        onClick={() => handleSaveNewOrderMedia()}
                        className="bg-[#6425FE] hover:bg-[#3b1694] text-white h-[35px] w-[255px] rounded-lg font-poppins"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Screen_Info;
