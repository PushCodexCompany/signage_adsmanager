import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { LuClock4 } from "react-icons/lu";
import { MdDragHandle } from "react-icons/md";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import User from "../libs/admin";

const Screen_Info = ({ setOpenInfoScreenModal, selectInfoScreen }) => {
  const [openMediaScheduleModal, setOpenMediaScheduleModal] = useState(false);
  const [selectMediaScreen, setSelectMediaScreen] = useState();
  const [hideOldModal, setHideOldModal] = useState(true);

  const [screen_resolution, setScreenResolution] = useState([]);
  const [screen_physical_size, setScreenPhysicalSize] = useState([]);

  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    const { token } = User.getCookieData();
    const screens_option = await User.getScreensOptions(token);
    setScreenResolution(screens_option.screenresolution);
    setScreenPhysicalSize(screens_option.screenphysicalsize);
  };

  const handleSelectMedia = (items) => {
    setHideOldModal(!hideOldModal);
    setSelectMediaScreen(items);
    setOpenMediaScheduleModal(!openMediaScheduleModal);
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
    const items = Array.from(selectMediaScreen.mediaSchedule);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectMediaScreen((prevState) => {
      return {
        ...prevState,
        mediaSchedule: items,
      };
    });
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

  return (
    <>
      {hideOldModal && (
        <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setOpenInfoScreenModal(false)}>
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {console.log("selectInfoScreen", selectInfoScreen)}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="grid grid-cols-6">
              <div className="col-span-3">
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
                        <button className="w-[130px] h-[35px] rounded-lg text-[18px] font-poppins bg-[#6425FE] hover:bg-[#3b1694] text-white">
                          New Tag+
                        </button>
                      </div>
                      <div className="col-span-5">
                        {/* Kept as it is */}
                        <div className="flex flex-wrap justify-start">
                          {selectInfoScreen.ScreenTag.map((items, index) => (
                            <div
                              key={index}
                              className="border border-gray-300 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1"
                              style={{
                                flexBasis: `calc(30% - 5px)`,
                              }}
                            >
                              <div className="flex justify-center items-center mr-1 ml-1">
                                <AiOutlineClose className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer" />
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
                            src={selectInfoScreen.ScreenPhoto}
                            className="object-cover w-full h-full"
                            alt="placeImage"
                          />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="flex justify-center items-center h-full">
                          {/* Temporay Use screen photo wait replace location */}
                          <img
                            src={selectInfoScreen.ScreenPhoto}
                            className="object-cover w-full h-full"
                            alt="latImage"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenLocation}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center ">
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
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center">
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
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center ">
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
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center">
                          <div className="font-poppins font-bold">
                            {findPhysicalSizeID(
                              selectInfoScreen.ScreenPhySizeID
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center ">
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
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center">
                          <div className="font-poppins font-bold">
                            {selectInfoScreen.ScreenOrientation.charAt(
                              0
                            ).toUpperCase() +
                              selectInfoScreen.ScreenOrientation.slice(1)}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center ">
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
                  <div className="mt-8 mb-10">
                    <div className="grid grid-cols-6 space-x-2">
                      <div className="col-span-3">
                        <div className="border h-[150%] border-[#DBDBDB] flex justify-center items-center">
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
              <div className="col-span-3">
                <div className="p-4">
                  <div className="mt-[90px]">
                    <div className="font-poppins text-[30px] font-bold">
                      Schedule
                    </div>
                    <div className="w-[760px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6425FE] scrollbar-track-[#CDCDCD]">
                      <div className="mt-3">
                        <div className="flex space-x-2">
                          {selectInfoScreen.schedule?.map((items, index) => (
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
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 mb-2">
                        <div className="w-[760px] flex space-x-2">
                          {selectInfoScreen.schedule?.map((items, index) => (
                            <div
                              onClick={() => handleSelectMedia(items)}
                              className={`${
                                items.slot - items.booking === 0
                                  ? "bg-[#5C5C5C]"
                                  : items.slot - items.booking === items.slot
                                  ? "bg-[#018C41] opacity-40"
                                  : "bg-[#018C41]"
                              } min-w-[60px] h-[60px] flex justify-center items-center cursor-pointer `}
                            >
                              <div className="font-poppins text-white text-[18px]">
                                {items.booking}/{items.slot}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex justify-center border-b-2 items-center text-[#DBDBDB] " />
                    <div className="mt-6">
                      <div className="font-poppins text-[30px] font-bold">
                        Screen Health
                      </div>
                      <div className="w-[760px] bg-[#D9D9D9] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6425FE] scrollbar-track-[#CDCDCD]">
                        <div className="mt-2 mb-2">
                          <div className="flex items-end">
                            {selectInfoScreen.health?.map((height, index) => (
                              <div
                                key={index}
                                className={`h-[${height}px] bg-[#2F8B5A] w-4 m-[1px]`}
                                style={{ minWidth: "1rem" }}
                              />
                            ))}
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
                            Screen Description
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flex justify-center items-center">
                          <button className="font-poppins text-[15px] w-[315px] h-[48px] rounded-lg bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold">
                            Start Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openMediaScheduleModal && (
        <a className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur" />
      )}

      {openMediaScheduleModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex w-screen items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-10 top-14 lg:top-16 lg:right-[220px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setHideOldModal(!hideOldModal);
                  setOpenMediaScheduleModal(!openMediaScheduleModal);
                }}
              >
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-9/10 lg:w-9/10 h-auto rounded-md max-h-screen overflow-y-auto relative">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="p-8">
                  <div className="text-[30px] font-semibold font-poppins">
                    {selectInfoScreen.name}
                  </div>
                  <div className="text-[18px] font-poppins text-[#8A8A8A]">
                    {selectInfoScreen.location}
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
                  <div className="mt-2 flex justify-center items-center">
                    <div className="border border-[#E8E8E8] w-[130px] h-[130px]">
                      <div className="font-poppins font-bold text-[17px] flex justify-center items-center">
                        {format(selectMediaScreen.date, "EEE")}
                      </div>
                      <div className="font-poppins font-bold flex justify-center items-center text-[46px]">
                        {format(selectMediaScreen.date, "dd")}
                      </div>
                      <div className="font-poppins font-bold flex justify-center items-center text-[17px] ">
                        {format(selectMediaScreen.date, "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center items-center">
                    <div
                      className={`${
                        selectMediaScreen.slot - selectMediaScreen.booking === 0
                          ? "bg-[#5C5C5C]"
                          : selectMediaScreen.slot -
                              selectMediaScreen.booking ===
                            selectMediaScreen.slot
                          ? "bg-[#018C41] opacity-40"
                          : "bg-[#018C41]"
                      } min-w-[130px] h-[130px] flex justify-center items-center`}
                    >
                      <div className="font-poppins text-white text-[36px]">
                        {selectMediaScreen.booking}/{selectMediaScreen.slot}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5">
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
                      <div className="text-[#59606C] font-poppins">Screen</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[#59606C] font-poppins">
                        Duration
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-[#59606C] font-poppins">Action</div>
                    </div>
                  </div>

                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="mediaSchedule">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {selectMediaScreen.mediaSchedule.map(
                            (items, index) => (
                              <Draggable
                                key={items.id}
                                draggableId={items.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="grid grid-cols-12 mt-5"
                                  >
                                    <div className="col-span-1">
                                      <div className="font-poppins font-semibold">
                                        {index + 1}
                                      </div>
                                    </div>
                                    <div className="col-span-4">
                                      <div className="font-poppins font-semibold">
                                        {items.name}
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      <div className="font-poppins font-semibold">
                                        {items.merchandise}
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      <div className="font-poppins font-semibold">
                                        {items.screen}
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      <div className="font-poppins font-semibold">
                                        {formatTime(items.duration)}
                                      </div>
                                    </div>
                                    <div className="col-span-1">
                                      <div className="font-poppins font-semibold ">
                                        <MdDragHandle color={"#6425FE"} />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <div className="flex justify-center items-center mt-10 mb-10">
                    <button className="bg-[#6425FE] hover:bg-[#3b1694] text-white h-[35px] w-[255px] rounded-lg font-poppins">
                      Save
                    </button>
                  </div>
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
