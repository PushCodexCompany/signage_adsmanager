import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import User from "../libs/admin";
import { RiEditLine } from "react-icons/ri";
import { PiMonitor } from "react-icons/pi";
import {
  IoIosInformationCircleOutline,
  IoIosCalendar,
  IoIosPlayCircle,
  IoMdEye,
} from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";

import Filter from "../components/Filter";
import Publish_Screen_Booking from "../components/Publish_Screen_Booking";
import Ads_Allocation_Booking from "../components/Ads_Allocation_Booking";
import Booking_Upload_Media from "../components/Booking_Upload_Media";
import Media_Player from "../components/Media_Player";

import Screen_Info from "../components/Screen_Info";
import { format } from "date-fns";
import View_Allocation from "../components/View_Allocation";

const Select_Booking = () => {
  const location = useLocation();
  const { token } = User.getCookieData();
  const [bookingName, setBookingName] = useState();
  const [bookingId, setBookingId] = useState();
  const [advertiserId, setAdvertiserId] = useState();
  const [merchandise, setMerchandise] = useState([]);
  const [allScreenData, setAllScreenData] = useState([]);
  const [screen, setScreen] = useState([]);
  const [booking_date, setBookingDate] = useState([]);
  const [booking_slot, setBookingSlot] = useState([]);
  const [booking_col, setBookingCol] = useState();

  const [showPublishScreen, setShowPublishScreen] = useState(false);

  const [itemsPanel1, setItemsPanel1] = useState([]);
  const [screen_select, setScreenSelect] = useState({
    screen: null,
    value: {},
  });

  const [media_rules_select, setMediaRulesSelect] = useState({});
  const [media_rules_select_id, setMediaRulesSelectId] = useState();

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [screenAdsAllocation, setScreennAdsAllocation] = useState([]);
  const [datePickers, setDatePickers] = useState([]);
  const [media_list, setMediaList] = useState([]);
  const [itemsPanel2, setItemsPanel2] = useState([]);
  const [mediaAdsAllocationTab, setMediaAdsAllocationTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
  const [mediaDisplay, setMediaDisplay] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

  const [screenSelectFromEdit, setScreenSelectFromEdit] = useState(null);
  const [fact_allocation, setFactAllocation] = useState(false);

  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);
  const [openAdsAllocationModal, setOpenAdsAllocationModal] = useState(false);
  const [openModalUploadNewMedia, setOpenModalUploadMedia] = useState(false);
  const [openViewMediaAllocation, setOpenViewMediaAllocation] = useState(false);
  const [media_allocation_upload_index, setMediaAllocatonUploadIndex] =
    useState(null);

  const [filter_screen, setFilterScreen] = useState([]);

  useEffect(() => {
    getBookingData();
    getMediaItemsData();
  }, [fact_allocation]);

  const getBookingData = async () => {
    const {
      AdvertiserID,
      AdvertiserLogo,
      AdvertiserName,
      BookingName,
      SlotPerDay,
      BookingID,
    } = location.state.data;

    setBookingName(BookingName);
    setBookingId(BookingID);
    setAdvertiserId(AdvertiserID);
    setMerchandise({
      AdvertiserLogo,
      AdvertiserName,
      AccountCode: await findAccountCode(AdvertiserName),
    });
    setBookingSlot(SlotPerDay);

    // get Booking Content
    const booking_content = await User.getBookingContent(BookingID, token);

    calculateSize(booking_content);

    // get Screen Data
    const uniqueScreenIDs = [
      ...new Set(booking_content.map((item) => item.ScreenID)),
    ];
    const output = uniqueScreenIDs.map((screenID) => ({ ScreenID: screenID }));
    let all_screen;
    if (location.state.screen_data) {
      all_screen = location.state.screen_data;
    } else {
      all_screen = await User.getScreens(token);
    }

    setAllScreenData(all_screen);
    const filteredOutput = all_screen?.filter((screen) => {
      return output.some((item) => parseInt(item.ScreenID) === screen.ScreenID);
    });

    const filteredOutputWithBooking = filteredOutput?.map((screen) => {
      const booking = booking_content?.filter(
        (booking) => parseInt(booking.ScreenID) === screen.ScreenID
      );
      return {
        ...screen,
        booking_content: booking,
      };
    });
    setScreen(filteredOutputWithBooking);

    //get Booking Date
    const booking_data = await User.getBookingById(BookingID, token);
    const booking_date = [
      ...new Set(booking_data.map((items) => +new Date(items.BookingDate))),
    ];
    setBookingDate(booking_date.map((timestamp) => new Date(timestamp)));
  };

  const getMediaItemsData = async () => {
    const { BookingID } = location.state.data;
    const media_item = await User.getMediaPlaylist(BookingID, token);
    setItemsPanel2(media_item);
    setMediaList(media_item);
  };

  const calculateSize = (screen) => {
    let maxLength = 0;
    screen.forEach((screen) => {
      const bookingLength = screen.DisplaySlot;
      if (bookingLength > maxLength) {
        maxLength = bookingLength;
      }
    });
    const col_booking = Math.ceil(maxLength / 5);
    setBookingCol(col_booking);
  };

  const findAccountCode = async (merchandise_name) => {
    const advertiser = await User.getMerchandiseList(token);
    const foundEntry = advertiser.find(
      (entry) => entry.AdvertiserName === merchandise_name
    );
    if (advertiser.length > 0) {
      if (foundEntry) {
        return foundEntry.AccountCode;
      } else {
        return "No Data";
      }
    }
  };

  const EditableText = ({ initialValue }) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleClick = () => {
      setEditing(true);
    };

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const handleKeyPress = async (e) => {
      if (e.key === "Enter") {
        const result = await Swal.fire({
          title: `คุณต้องการเปลี่ยน Booking name ?`,
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "ลบข้อมูล",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          const obj = {
            bookingid: bookingId,
            bookingname: value,
          };

          try {
            const data = await User.updateBookingName(obj, token);

            if (data.code !== 404) {
              Swal.fire({
                icon: "success",
                title: "แก้ไขชื่อ Booking name สำเร็จ!",
                text: `แก้ไขชื่อ Booking name สำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  setEditing(false);
                }
              });
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
        }
      }
    };

    const handleBlur = async () => {
      const result = await Swal.fire({
        title: `คุณต้องการเปลี่ยนชื่อ Booking Name ?`,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const obj = {
          bookingid: bookingId,
          bookingname: value,
        };
        try {
          const data = await User.updateBookingName(obj, token);
          if (data.code !== 404) {
            Swal.fire({
              icon: "success",
              title: "แก้ไขชื่อ Booking name สำเร็จ !",
              text: `แก้ไขชื่อ Booking name สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setEditing(false);
              }
            });
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
      }
    };

    return (
      <div className="grid grid-cols-6">
        <div className="col-span-3">
          <div className="flex">
            {editing ? (
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                autoFocus
                className="font-poppins font-semibold text-2xl w-[95%] pl-2"
              />
            ) : (
              <div className="font-poppins font-semibold text-2xl w-[95%] pl-2">
                {value}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-start items-center">
            <RiEditLine
              className="text-[26px] text-[#6425FE] hover:text-[#3b1694] ml-2 cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleScreenInfo = (screen_id) => {
    const screen = allScreenData.find((a) => a.ScreenID === screen_id);
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const renderMediaListBox = (items) => {
    const nullFreeList = items.medias?.filter((it) => it.ContentID !== null);
    const mediaSize = nullFreeList.length;

    const emptySlots = [];

    for (var i = mediaSize; i < items.DisplaySlot; i++) {
      emptySlots.push({
        ContentID: null,
        ContentName: null,
        ContentTypeName: null,
        ContentProperties: null,
        slot_size: 1,
        slot_num: i + 1,
      });
    }

    const processedMediaList = [...nullFreeList, ...emptySlots];
    return (
      <>
        {processedMediaList.length > 0 &&
          processedMediaList.map((item, index2) => (
            <div key={index2} className="w-[20%] p-1 relative group">
              <div
                className={`w-[36px] h-[36px] ${
                  item.MediaID
                    ? "bg-white border border-[#D9D9D9]"
                    : "bg-[#D9D9D9]"
                } flex justify-center items-center`}
              >
                {item.MediaID ? <IoIosPlayCircle color="#6425FE" /> : ""}
                {item.ContentName && (
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {item.ContentName}
                  </span>
                )}
              </div>
            </div>
          ))}
      </>
    );
  };

  const handleSelectScreenAddmedia = async (screen, obj, media_obj) => {
    const media_rule = {
      width: parseInt(obj.ScreenRule[0].Width),
      height: parseInt(obj.ScreenRule[0].Height),
    };
    setMediaRulesSelectId(obj.ScreenRule[0].MediaRuleID);
    setMediaRulesSelect(media_rule);
    media_obj.slots = parseInt(booking_slot);
    setScreenSelect({ screen, value: media_obj });
    setItemsPanel1({ screen, value: media_obj });
    setScreenSelectFromEdit(obj.ScreenID);
    setOpenAdsAllocationModal(!openAdsAllocationModal);
  };

  const openMediaAdsAllocationTab = (tabName) => {
    setMediaAdsAllocationTab(tabName);
  };

  const handleViewMediaAllocation = (screen, media_obj) => {
    setItemsPanel1({ screen, value: media_obj });
    setOpenViewMediaAllocation(!openViewMediaAllocation);
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <EditableText initialValue={bookingName} />
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => setShowPublishScreen(true)}
                className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        <Filter
          filter_screen={filter_screen}
          setFilterScreen={setFilterScreen}
        />

        <div className="mt-7 grid grid-cols-8 md:space-x-2">
          {/* Left Panel */}
          <div className="col-span-2">
            <div>
              <img
                className={`block mx-auto mt-30px lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] rounded-3xl object-cover border border-gray-300`}
                src={merchandise.AdvertiserLogo}
                alt={merchandise.AdvertiserName}
              />
            </div>
            <div className="mt-2">
              <div className="flex justify-center items-center">
                <div className="font-poppins lg:text-xl md:text-md font-bold text-[#2F3847]">
                  {merchandise.AdvertiserName}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="font-poppins lg:text-sm md:text-xs text-[#6F6F6F]">
                  {merchandise.AccountCode}
                </div>
              </div>
              <div className="h-[350px] overflow-y-auto mt-5">
                {screen.length > 0 &&
                  screen.map((items, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mt-3 "
                    >
                      <div
                        className={`border border-gray-300 rounded-lg lg:w-[80%] md:w-[100%] h-[75px] `}
                      >
                        <div className="grid grid-cols-10">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={40} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center">
                              <div className="font-poppins lg:text-xl md:text-md font-bold">
                                {items.ScreenName.length > 15 ? (
                                  <>
                                    {items.ScreenName.slice(0, 12) + "..."}
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      {items.ScreenName}
                                    </span>
                                  </>
                                ) : (
                                  <>{items.ScreenName}</>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="font-poppins text-sm md:text-xs">
                                {items.ScreenLocation}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              {items.screen_status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.screen_status === 0
                                  ? "Offline"
                                  : "Online"}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-center items-center space-y-2">
                            <IoIosInformationCircleOutline
                              onClick={() => handleScreenInfo(items.ScreenID)}
                              size={22}
                              className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Left Panel */}

          {/* Right Panel */}

          <div className="col-span-6 border-1 border-gray-300">
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <IoIosCalendar
                    size={20}
                    className="bg-[#59606C] text-[#FFFFFF] w-10 h-10 rounded-lg"
                  />
                  <div>
                    <div className="flex justify-center items-center space-x-2">
                      <div className="font-poppins lg:text-xl text-md font-bold">
                        Booking Period :
                      </div>
                      <div className="font-poppins lg:text-2xl text-md">
                        {booking_date.length > 0 && (
                          <div>{` ${format(
                            booking_date[0],
                            "EEE dd MMM yyyy"
                          )} - ${format(
                            booking_date[booking_date.length - 1],
                            "EEE dd MMM yyyy"
                          )}`}</div>
                        )}
                      </div>
                    </div>

                    <div className="font-poppins text-xs">
                      {`You Select ${booking_slot} Slot(s) Per Day`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[1140px] w-[520px] h-[630px] overflow-x-auto overflow-y-auto mt-5 scrollbar pb-[10px]">
                <div className="grid grid-cols-12 space-x-1 mt-3">
                  <div className="col-span-3 lg:col-span-1">
                    <div className="min-w-[100%]">
                      <div
                        // onClick={() => console.log("Clear Selection")}
                        className="lg:min-w-[20px] min-w-[100px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center"
                      >
                        <div className="text-xs font-poppins text-white">
                          Clear
                        </div>
                        <div className="text-xs font-poppins text-white">
                          Selection
                        </div>
                      </div>
                      <div>
                        {booking_date.length > 0 &&
                          booking_date.map((items, index) => (
                            <div key={index} className="mt-3 space-x-2">
                              <div
                                className={`lg:min-w-[20px] min-w-[100px]
                                  ${
                                    booking_col > 1
                                      ? `h-[${booking_col * 50}px]`
                                      : `h-[100px]`
                                  } 
                                  bg-[#59606C] rounded-lg flex flex-col justify-center items-center`}
                              >
                                <div className="text-xs font-poppins text-white">
                                  {format(items, "EEE")}
                                </div>
                                <div className="text-3xl font-poppins text-white">
                                  {format(items, "dd")}
                                </div>
                                <div className="text-xs font-poppins text-white">
                                  {format(items, "MMM yyyy")}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-9 lg:col-span-11">
                    <div className="grid grid-cols-6 ">
                      <div className="flex space-x-2">
                        {screen.length > 0 &&
                          screen.map((items, screenIndex) => (
                            <>
                              <div
                                key={screenIndex}
                                className="h-[70px] min-w-[250px] rounded-lg"
                              >
                                <div className="grid grid-cols-10">
                                  <div className="col-span-2 flex justify-center items-center">
                                    <PiMonitor size={40} color={"#59606C"} />
                                  </div>
                                  <div className="col-span-6">
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xl font-bold relative group">
                                        {items.ScreenName.length > 15 ? (
                                          <>
                                            {items.ScreenName.slice(0, 12) +
                                              "..."}
                                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                              {items.ScreenName}
                                            </span>
                                          </>
                                        ) : (
                                          <>{items.ScreenName}</>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-sm text-[#8A8A8A]">
                                        {items.ScreenLocation}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                        Media Rule :{" "}
                                        {items.ScreenRule[0].Width &&
                                        items.ScreenRule[0].Height
                                          ? parseInt(
                                              items.ScreenRule[0].Width,
                                              10
                                            ) +
                                            "x" +
                                            parseInt(
                                              items.ScreenRule[0].Height,
                                              10
                                            )
                                          : "Not Set"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-center items-center">
                                    <IoIosInformationCircleOutline
                                      onClick={() =>
                                        handleScreenInfo(items.ScreenID)
                                      }
                                      size={22}
                                      className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                    />
                                  </div>
                                </div>
                                {items.booking_content.length > 0 &&
                                  items.booking_content.map((items2, index) => (
                                    <div key={index} className="mt-3 space-x-2">
                                      <div
                                        className={`p-2
                                          ${
                                            booking_col > 1
                                              ? `h-[${booking_col * 50}px]`
                                              : `h-[100px]`
                                          } 
                                         rounded-lg`}
                                      >
                                        <div class="flex justify-start items-center h-full">
                                          <div className="grid grid-cols-8 space-x-1 ">
                                            <div className="col-span-7 flex items-center justify-center">
                                              <div className="flex flex-wrap w-full ">
                                                {renderMediaListBox(items2)}
                                              </div>
                                            </div>
                                            <div className="col-span-1 flex items-center">
                                              {items2?.DisplaySlot > 0 ? (
                                                new Date(
                                                  new Date().getFullYear(),
                                                  new Date().getMonth(),
                                                  new Date().getDate()
                                                ) <=
                                                new Date(
                                                  new Date(
                                                    items2.BookingDate
                                                  ).getFullYear(),
                                                  new Date(
                                                    items2.BookingDate
                                                  ).getMonth(),
                                                  new Date(
                                                    items2.BookingDate
                                                  ).getDate()
                                                ) ? (
                                                  <div
                                                    onClick={() =>
                                                      handleSelectScreenAddmedia(
                                                        screenIndex + 1,
                                                        items,
                                                        items2
                                                      )
                                                    }
                                                    className="col-span-1 flex justify-center items-center cursor-pointer"
                                                  >
                                                    <MdOutlineModeEditOutline
                                                      size={26}
                                                      className="text-[#6425FE] hover:text-[#3b1694]"
                                                    />
                                                  </div>
                                                ) : (
                                                  <div
                                                    onClick={() =>
                                                      handleViewMediaAllocation(
                                                        screenIndex + 1,
                                                        items,
                                                        items2
                                                      )
                                                    }
                                                    className="col-span-1 flex justify-center items-center cursor-pointer"
                                                  >
                                                    <IoMdEye
                                                      size={26}
                                                      className="text-[#6425FE] hover:text-[#3b1694]"
                                                    />
                                                  </div>
                                                )
                                              ) : (
                                                <></>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
        </div>
      </div>

      {showPublishScreen && (
        <a
          onClick={() => setShowPublishScreen(!showPublishScreen)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showPublishScreen && (
        <Publish_Screen_Booking
          setShowPublishScreen={setShowPublishScreen}
          showPublishScreen={showPublishScreen}
          bookingId={bookingId}
          screen={screen}
        />
      )}

      {openInfoScreenModal && (
        <a
          onClick={() => setOpenInfoScreenModal(!openInfoScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openInfoScreenModal && (
        <Screen_Info
          setOpenInfoScreenModal={setOpenInfoScreenModal}
          selectInfoScreen={selectInfoScreen}
          from="edit"
        />
      )}

      {openAdsAllocationModal && (
        <a
          onClick={() => setOpenAdsAllocationModal(!openAdsAllocationModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openAdsAllocationModal && (
        <Ads_Allocation_Booking
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          booking_date={booking_date}
          screenAdsAllocation={screenAdsAllocation}
          setScreennAdsAllocation={setScreennAdsAllocation}
          datePickers={datePickers}
          setDatePickers={setDatePickers}
          screen_select={screen_select}
          media_list={media_list}
          itemsPanel1={itemsPanel1}
          setItemsPanel1={setItemsPanel1}
          itemsPanel2={itemsPanel2}
          setItemsPanel2={setItemsPanel2}
          setOpenModalUploadMedia={setOpenModalUploadMedia}
          openModalUploadNewMedia={openModalUploadNewMedia}
          mediaAdsAllocationTab={mediaAdsAllocationTab}
          openMediaAdsAllocationTab={openMediaAdsAllocationTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setModalPlayerOpen={setModalPlayerOpen}
          modalPlayerOpen={modalPlayerOpen}
          setMediaDisplay={setMediaDisplay}
          setCheckboxes={setCheckboxes}
          media_rules_select={media_rules_select}
          media_rules_select_id={media_rules_select_id}
          checkboxes={checkboxes}
          bookingId={bookingId}
          setMediaAllocatonUploadIndex={setMediaAllocatonUploadIndex}
          screenSelectFromEdit={screenSelectFromEdit}
          screen={screen}
          allScreenData={allScreenData}
          setFactAllocation={setFactAllocation}
          fact_allocation={fact_allocation}
        />
      )}

      {openModalUploadNewMedia && (
        <Booking_Upload_Media
          setOpenModalUploadMedia={setOpenModalUploadMedia}
          openModalUploadNewMedia={openModalUploadNewMedia}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          bookingId={bookingId}
          advertiserId={advertiserId}
          media_rules_select={media_rules_select}
          setItemsPanel1={setItemsPanel1}
          itemsPanel1={itemsPanel1}
          setItemsPanel2={setItemsPanel2}
          itemsPanel2={itemsPanel2}
          media_allocation_upload_index={media_allocation_upload_index}
        />
      )}

      {modalPlayerOpen && (
        <a
          onClick={() => {
            setModalPlayerOpen(!modalPlayerOpen);
            setOpenAdsAllocationModal(!openAdsAllocationModal);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalPlayerOpen && (
        <Media_Player
          mediaDisplay={mediaDisplay}
          setModalPlayerOpen={setModalPlayerOpen}
          modalPlayerOpen={modalPlayerOpen}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          setMediaDisplay={setMediaDisplay}
        />
      )}

      {openViewMediaAllocation && (
        <a
          onClick={() => {
            setOpenViewMediaAllocation(!openViewMediaAllocation);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openViewMediaAllocation && (
        <View_Allocation
          openViewMediaAllocation={openViewMediaAllocation}
          setOpenViewMediaAllocation={setOpenViewMediaAllocation}
          itemsPanel1={itemsPanel1}
          bookingId={bookingId}
        />
      )}
    </>
  );
};

export default Select_Booking;
