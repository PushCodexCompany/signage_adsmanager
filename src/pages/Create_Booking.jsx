import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useLocation } from "react-router-dom";
import {
  IoIosPlayCircle,
  IoIosCalendar,
  IoIosInformationCircleOutline,
  IoMdTrash,
} from "react-icons/io";

import { RiEditLine } from "react-icons/ri";

import { MdOutlineModeEditOutline } from "react-icons/md";
import { PiMonitor } from "react-icons/pi";

import { format } from "date-fns";
import useCheckPermission from "../libs/useCheckPermission";
import Screen_Info from "../components/Screen_Info";
import New_Screen from "../components/New_Screen";

import "react-datepicker/dist/react-datepicker.css";
import { mediaMockup } from "../data/mockup";

import User from "../libs/admin";

import Filter from "../components/Filter";
import Add_Screen_Booking from "../components/Add_Screen_Booking";
import Publish_Screen_Booking from "../components/Publish_Screen_Booking";
import Confirm_Booking from "../components/Confirm_Booking";
import Ads_Allocation_Booking from "../components/Ads_Allocation_Booking";
import Booking_Upload_Media from "../components/Booking_Upload_Media";
import Media_Player from "../components/Media_Player";
import Ads_Allocation_Apply_Screen from "../components/Ads_Allocation_Apply_Screen";
import Swal from "sweetalert2";

const Create_Booking = () => {
  const location = useLocation();
  useCheckPermission();

  const { token } = User.getCookieData();

  const [bookingId, setBookingId] = useState();
  const [bookingName, setBookingName] = useState("");
  const [bookingCode, setBookingCode] = useState("CDS-BT-230101-004");
  const [merchandise, setMerchandise] = useState([]);
  const [booking_date, setBookingDate] = useState([]);
  const [booking_slot, setBookingSlot] = useState();

  const [showAddScreen, setShowAddScreen] = useState(false);
  const [showPublishScreen, setShowPublishScreen] = useState(false);

  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [allScreenData, setAllScreenData] = useState([]);

  const [screenAdsAllocation, setScreennAdsAllocation] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const [checkboxPublishScreen, setCheckboxPublishScreen] = useState({});
  const [selectAllPubishScreen, setSelectAllPublishScreen] = useState(false);
  const [selectPublihsScreen, setSelectPublishScreen] = useState([]);

  const [deleteModalIndex, setDeleteModalIndex] = useState({});

  const [bookingSelect, setBookingSelect] = useState([]);

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const [openAddNewScreenModal, setOpenAddNewScreenModal] = useState(false);

  const [openConfirmBookingModal, setOpenConfirmBookingModal] = useState(false);

  const [booking_col, setBookingCol] = useState();

  const [screen_select, setScreenSelect] = useState({
    screen: null,
    value: {},
  });

  const [openAdsAllocationModal, setOpenAdsAllocationModal] = useState(false);

  const [isApplyToScreen, setIsApplyToScreen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [openModalUploadNewMedia, setOpenModalUploadMedia] = useState(false);

  const [datePickers, setDatePickers] = useState([]);

  const [mediaAdsAllocationTab, setMediaAdsAllocationTab] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [media_list, setMediaList] = useState(mediaMockup);

  const [itemsPanel1, setItemsPanel1] = useState([]);
  const [itemsPanel2, setItemsPanel2] = useState(mediaMockup);
  const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
  const [mediaDisplay, setMediaDisplay] = useState([]);

  useEffect(() => {
    setBooking();
    // if (location.state.isEdited) {
    //   setEditedBookingData();
    //   setIsEdited(true);
    // } else {
    //   setCreateBookingData();
    //   setIsEdited(false);
    // }

    getAllScreen();
  }, []);

  const findAccountCode = async (merchandise_name) => {
    const advertiser = await User.getMerchandiseList(token);
    const foundEntry = advertiser.find(
      (entry) => entry.AdvertiserName === merchandise_name
    );

    if (foundEntry) {
      return foundEntry.AccountCode;
    } else {
      return "No Data";
    }
  };

  const setBooking = async () => {
    const {
      AdvertiserLogo,
      AdvertiserName,
      BookingName,
      SlotPerDay,
      BookingID,
    } = location.state.data;

    setBookingName(BookingName);
    setMerchandise({
      AdvertiserLogo,
      AdvertiserName,
      AccountCode: await findAccountCode(AdvertiserName),
    });
    setBookingId(BookingID);

    const booking_data = await User.getBookingById(BookingID, token);
    const booking_date = [
      ...new Set(booking_data.map((items) => +new Date(items.BookingDate))),
    ];
    setBookingDate(booking_date.map((timestamp) => new Date(timestamp)));
    setBookingSlot(parseInt(SlotPerDay));

    const all_screens_data = await User.getScreens(token);

    const groupedByScreenID = booking_data.reduce((acc, curr) => {
      const screenID = curr.ScreenID;
      const existing = acc.find((item) => item.ScreenID === screenID);
      const filter_screen = all_screens_data.find(
        (items) => items.ScreenID === screenID
      );
      if (filter_screen) {
        if (existing) {
          existing.booking.push({
            BookingDateID: curr.BookingDateID,
            UsedSlot: curr.UsedSlot,
            OtherUseSlot: curr.OtherUseSlot,
            UsedTotal: curr.UsedTotal,
            MaxSlot: curr.MaxSlot,
            AvailableSlot: curr.AvailableSlot,
          });
        } else {
          acc.push({
            ScreenID: screenID,
            ScreenName: curr.ScreenName,
            Media_Rules:
              filter_screen.ScreenRule[0]?.Width &&
              filter_screen.ScreenRule[0]?.Height
                ? parseInt(filter_screen.ScreenRule[0]?.Width).toString() +
                  "x" +
                  parseInt(filter_screen.ScreenRule[0]?.Height).toString()
                : "Not Set",
            MaxSlot: parseInt(curr.MaxSlot),
            booking: [
              {
                BookingDateID: curr.BookingDateID,
                UsedSlot: curr.UsedSlot,
                OtherUseSlot: curr.OtherUseSlot,
                UsedTotal: curr.UsedTotal,
                MaxSlot: curr.MaxSlot,
                AvailableSlot: curr.AvailableSlot,
              },
            ],
          });
        }
      }

      return acc;
    }, []);

    setScreenData(groupedByScreenID);

    let result = [];
    groupedByScreenID.forEach((screen, screenIndex) => {
      screen.booking.forEach((booking, dateIndex) => {
        if (parseInt(booking.UsedSlot) > 0) {
          result.push({
            screenIndex,
            dateIndex,
            ScreenID: screen.ScreenID,
            BookingDateID: booking.BookingDateID,
          });
        }
      });
    });

    setBookingSelect(result);

    groupedByScreenID.map((items, index) => {});

    const output = {};
    groupedByScreenID.forEach((item) => {
      output[item.ScreenID] = true;
    });

    setCheckboxes(output);
  };

  const setBookingData = async () => {
    const booking_data = await User.getBookingById(bookingId, token);
    const all_screens_data = await User.getScreens(token);
    const groupedByScreenID = booking_data.reduce((acc, curr) => {
      const screenID = curr.ScreenID;
      const existing = acc.find((item) => item.ScreenID === screenID);
      const filter_screen = all_screens_data.find(
        (items) => items.ScreenID === screenID
      );
      if (filter_screen) {
        if (existing) {
          existing.booking.push({
            BookingDateID: curr.BookingDateID,
            UsedSlot: curr.UsedSlot,
            OtherUseSlot: curr.OtherUseSlot,
            UsedTotal: curr.UsedTotal,
            MaxSlot: curr.MaxSlot,
            AvailableSlot: curr.AvailableSlot,
          });
        } else {
          acc.push({
            ScreenID: screenID,
            ScreenName: curr.ScreenName,
            Media_Rules:
              filter_screen.ScreenRule[0]?.Width &&
              filter_screen.ScreenRule[0]?.Height
                ? parseInt(filter_screen.ScreenRule[0]?.Width).toString() +
                  "x" +
                  parseInt(filter_screen.ScreenRule[0]?.Height).toString()
                : "Not Set",
            MaxSlot: parseInt(curr.MaxSlot),
            booking: [
              {
                BookingDateID: curr.BookingDateID,
                UsedSlot: curr.UsedSlot,
                OtherUseSlot: curr.OtherUseSlot,
                UsedTotal: curr.UsedTotal,
                MaxSlot: curr.MaxSlot,
                AvailableSlot: curr.AvailableSlot,
              },
            ],
          });
        }
      }

      return acc;
    }, []);

    setScreenData(groupedByScreenID);
  };

  // Test Data
  // const setBookingData = async () => {
  // const { booking_name, merchandise, booking_slot, booking_date } =
  //   location.state.data;
  // setBookingName(booking_name);
  // setMerchandise(merchandise);
  // setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
  // setBookingSlot(parseInt(booking_slot));
  // };

  // const setConfirmBookingData = () => {
  //   Test Data
  //   const { booking_name, merchandise, booking_slot, booking_date, screen } =
  //     location.state.data;
  //   setBookingName(BookingName);
  //   setBookingName(booking_name[0]);
  //   setBookingCode(booking_name[1]);
  //   setMerchandise(merchandise);
  //   setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
  //   setBookingSlot(booking_slot);
  //   setScreenData(screen);
  //   calculateSize(screen);
  // };

  const calculateSize = (screen) => {
    let maxLength = 0;
    screen.forEach((screen) => {
      screen.booking.forEach((booking) => {
        const bookingLength = booking.media_list.length;
        if (bookingLength > maxLength) {
          maxLength = bookingLength;
        }
      });
    });

    const col_booking = Math.ceil(maxLength / 5);
    setBookingCol(col_booking);
  };

  const getAllScreen = async () => {
    const { SlotPerDay } = location.state.data;
    const data = await User.getScreensWithAdsCapacity(null, SlotPerDay, token);
    setAllScreenData(data);
  };

  const toggleCheckboxAddScreen = (rowId) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectedScreenItems(intArray);

      return updatedCheckboxes;
    });
  };

  const toggleCheckboxPublishScreen = (rowId) => {
    setCheckboxPublishScreen((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectPublishScreen(intArray);

      return updatedCheckboxes;
    });
  };

  const toggleScreenFromAllScreen = async (items) => {
    const obj_to_save = {
      bookingid: bookingId,
      screenids: items.ScreenID,
    };

    try {
      const data = await User.selectScreenBooking(obj_to_save, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "เลือก Screen สำเร็จ!",
          text: `เลือก Screen สำเร็จ!`,
        }).then(async (result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            const data = await User.getBookingById(bookingId, token);
            const filteredData = data.filter(
              (item) => item.ScreenID === items.ScreenID
            );
            const obj = {
              MaxSlot: parseInt(items.ScreenRule[0].AdsCapacity),
              Media_Rules:
                items.ScreenRule[0].Width && items.ScreenRule[0].Height
                  ? items.ScreenRule[0].Width + "x" + items.ScreenRule[0].Height
                  : "Not Set",
              ScreenID: items.ScreenID,
              ScreenName: items.ScreenName,
              booking: filteredData,
            };
            screenData.push(obj);
            setScreenData(screenData);
            setBookingData();
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
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    allScreenData.forEach((row) => {
      newCheckboxes[row.ScreenID] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    const checkedRowIds = newSelectAll
      ? allScreenData.map((row) => row.ScreenID)
      : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const toggleAllCheckboxesPublishScreen = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAllPubishScreen;

    allScreenData.forEach((row) => {
      newCheckboxes[row.ScreenID] = newSelectAll;
    });

    setCheckboxPublishScreen(newCheckboxes);
    setSelectAllPublishScreen(newSelectAll);

    const checkedRowIds = newSelectAll
      ? allScreenData.map((row) => row.ScreenID)
      : [];
    setSelectPublishScreen(checkedRowIds);
  };

  const handleAddScreen = async () => {
    const screensToReturn = allScreenData.filter((screen) =>
      selectedScreenItems.includes(screen.ScreenID)
    );

    const screenIDs = screensToReturn.map((item) => item.ScreenID.toString());

    const obj = {
      bookingid: bookingId,
      screenids: screenIDs,
    };
    try {
      const data = await User.selectScreenBooking(obj, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "เลือก Screen สำเร็จ!",
          text: `เลือก Screen สำเร็จ!`,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            setBookingData();
            setShowAddScreen(!showAddScreen);
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
  };

  const handleDeleteClick = (index) => {
    // เปิด modal ของตัว comfirm delete
    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };

      return updatedModal;
    });
  };

  const handleConfirmDelete = async (index, id) => {
    // ลบจอที่เลือก
    const obj = {
      bookingid: bookingId,
      screenid: id,
    };

    try {
      const data = await User.deleteScreenBooking(obj, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "ลบ Screen สำเร็จ!",
          text: `ลบ Screen สำเร็จ!`,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            setBookingData();
            setCheckboxes((prevCheckboxes) => {
              const updatedCheckboxes = {
                ...prevCheckboxes,
                [id]: false,
              };
              return updatedCheckboxes;
            });
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

    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };
      return updatedModal;
    });
  };

  const handleCancelDelete = (index) => {
    // ปิด modal ของตัว comfirm delete
    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };

      return updatedModal;
    });
  };

  const handleSelectScreen = (screenIndex, dateIndex, items) => {
    const isDuplicate = bookingSelect.some(
      (selected) =>
        selected.screenIndex === screenIndex && selected.dateIndex === dateIndex
    );

    if (!isDuplicate) {
      const newBookingSelect = [
        ...bookingSelect,
        {
          screenIndex,
          dateIndex,
          ScreenID: items.ScreenID,
          BookingDateID: items.booking[dateIndex].BookingDateID,
        },
      ];
      setBookingSelect(newBookingSelect);
    } else {
      const filteredBookingSelect = bookingSelect.filter(
        (selected) =>
          !(
            selected.screenIndex === screenIndex &&
            selected.dateIndex === dateIndex
          )
      );
      setBookingSelect(filteredBookingSelect);
    }
  };

  const handleRemoveScreen = (screenIndex, dateIndex, items) => {
    const filteredBookingSelect = bookingSelect.filter((item) => {
      return !(
        item.screenIndex === screenIndex && item.dateIndex === dateIndex
      );
    });

    items.booking[dateIndex].UsedSlot = 0;
    items.booking[dateIndex].UsedTotal =
      items.booking[dateIndex].UsedTotal - booking_slot;
    setBookingSelect(filteredBookingSelect);
  };

  const handleSaveScreen = async () => {
    if (bookingSelect.length > 0) {
      const obj = {
        bookingid: bookingId,
        bookingaction: "saved",
        bookingcontent: [],
      };
      screenData.forEach((screen) => {
        screen.booking.forEach((booking) => {
          const matchingBooking = bookingSelect.find(
            (select) =>
              select.ScreenID === screen.ScreenID &&
              select.BookingDateID === booking.BookingDateID
          );
          const sbdstatus = matchingBooking ? "saved" : "none";
          obj.bookingcontent.push({
            bookingdateid: booking.BookingDateID,
            screenid: screen.ScreenID,
            sbdstatus,
          });
        });
      });

      try {
        const data = await User.updateBookingContent(obj, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ!",
            text: `บันทึกสำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              const updatedData = bookingSelect.map((item) => {
                return { ...item };
              });
              setBookingData();
              setBookingSelect(updatedData);
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
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกหน้าจอที่ต้องการจอง ...",
      });
    }
  };

  const handleSelectInfoScreen = (screen, type) => {
    if (type === "left") {
      setSelectInfoScren(screen);
      setOpenInfoScreenModal(!openInfoScreenModal);
    } else {
      const screen_data = allScreenData.find(
        (items) => items.ScreenID === screen.ScreenID
      );

      if (!screen_data?.booking) {
        screen_data.booking = screen.booking;
        setSelectInfoScren(screen_data);
        setOpenInfoScreenModal(!openInfoScreenModal);
      } else {
        setSelectInfoScren(screen_data);
        setOpenInfoScreenModal(!openInfoScreenModal);
      }
    }
  };

  const handleConfirmbooking = () => {
    setOpenConfirmBookingModal(!openConfirmBookingModal);
  };

  const handleSelectScreenAddmedia = (screen, obj) => {
    setScreenSelect({ screen, value: obj });
    setItemsPanel1({ screen, value: obj });
    setOpenAdsAllocationModal(!openAdsAllocationModal);
  };

  const handleScreenInfo = (screen_id) => {
    const screen = allScreenData.find((a) => a.ScreenID === screen_id);
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const openMediaAdsAllocationTab = (tabName) => {
    setMediaAdsAllocationTab(tabName);
  };

  const renderMediaListBox = (items) => {
    const nullFreeList = items.media_list.filter((it) => it.media_id !== null);

    const mediaSize = nullFreeList.length;

    const emptySlots = [];

    for (var i = mediaSize; i < items.slots; i++) {
      emptySlots.push({
        media_id: null,
        media_name: null,
        media_type: null,
        media_size: null,
        media_duration: null,
        slot_size: 1,
        slot_num: i + 1,
      });
    }

    const processedMediaList = [...nullFreeList, ...emptySlots];
    return (
      <>
        {processedMediaList.map((item, index2) => (
          <div key={index2} className="w-[20%] p-1">
            <div
              className={`w-[36px] h-[36px] ${
                item.media_id
                  ? "bg-white border border-[#D9D9D9]"
                  : "bg-[#D9D9D9]"
              } flex justify-center items-center`}
            >
              {item.media_id ? <IoIosPlayCircle color="#6425FE" /> : ""}
            </div>
          </div>
        ))}
      </>
    );
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
          title: `Do you want to change booking name ?`,
          showCancelButton: true,
          confirmButtonText: "Yes",
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
        title: `Do you want to change booking name ?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
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

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            {/* <div className="font-poppins font-semibold text-2xl w-[95%] pl-2"> */}
            <EditableText initialValue={bookingName} />
            {/* </div> */}
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              {/* {isEdited ? (
                <button
                  onClick={() => setShowPublishScreen(true)}
                  className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                >
                  Publish
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddScreen(true)}
                    className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                  >
                    Add Screen+
                  </button>
                  <button
                    onClick={() => handleSaveScreen()}
                    className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                  >
                    Save Booking
                  </button>
                  <button
                    onClick={() => handleConfirmbooking()}
                    className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                  >
                    Confirm Booking
                  </button>
                </>
              )} */}

              <>
                <button
                  onClick={() => setShowAddScreen(true)}
                  className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                >
                  Add Screen+
                </button>
                <button
                  onClick={() => handleSaveScreen()}
                  className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                >
                  Save Booking
                </button>
                <button
                  onClick={() => handleConfirmbooking()}
                  className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                >
                  Confirm Booking
                </button>
              </>
            </div>
          </div>
        </div>

        <Filter />

        <div className="mt-7 grid grid-cols-8 md:space-x-2">
          {/* Left Panel */}

          {/* <div className="col-span-2">
            <div>
              <img
                className={`block mx-auto mt-30px lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] rounded-3xl object-cover`}
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
              <div className="flex justify-center items-center mt-5">
                <div className="font-poppins font-bold lg:text-xl md:text-md text-[#59606C]">
                  {bookingCode}
                </div>
              </div>
              <div className="h-[350px] overflow-y-auto mt-5">
                {screenData.length > 0 &&
                  screenData.map((items, index) => (
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
                                {items.name}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="font-poppins text-sm md:text-xs">
                                {items.location}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              {items.status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.status === 0 ? "Offline" : "Online"}
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
          </div> */}

          <div className="col-span-2">
            <div>
              <img
                className={`block mx-auto mt-30px lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] rounded-3xl object-cover`}
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
              {/* <div className="flex justify-center items-center mt-5">
                  <div className="font-poppins font-bold lg:text-xl md:text-md text-[#59606C]">
                    {bookingCode}
                  </div>
                </div> */}

              <div className="h-[350px] overflow-y-auto mt-5">
                {allScreenData.length > 0 &&
                  allScreenData.map((items, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mt-3 cursor-pointer"
                    >
                      <div
                        className={`border border-gray-300 rounded-lg lg:w-[80%] md:w-[100%] h-[75px] ${
                          screenData.some(
                            (screen) => screen.ScreenID === items.ScreenID
                          )
                            ? "bg-[#FFBD49]"
                            : ""
                        }`}
                        onClick={() => toggleScreenFromAllScreen(items)}
                      >
                        <div className="grid grid-cols-10 md:space-x-1">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={40} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center">
                              <div className="font-poppins lg:text-xl md:text-md font-bold">
                                {items.ScreenName}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="font-poppins lg:text-sm md:text-xs">
                                {items.ScreenLocation}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              {items.status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.status === 0 ? "Offline" : "Online"}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-center items-center space-y-2">
                            <IoIosInformationCircleOutline
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectInfoScreen(items, "left");
                              }}
                              size={22}
                              className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                            />

                            {screenData.some(
                              (screen) => screen.ScreenID === items.ScreenID
                            ) && (
                              <>
                                <IoMdTrash
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(index);
                                  }}
                                  size={22}
                                  className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                />
                                {deleteModalIndex[index] && (
                                  <div className="absolute left-[200px] lg:left-[600px] lg:top-[680px] flex items-center">
                                    <div className="bg-black bg-opacity-80 w-[400px] h-[130px] p-8 rounded shadow-md">
                                      <p className="font-poppins text-xs text-white">
                                        Do You Want to Delete This Screen. Lorem
                                        Ipsum is simply dummy text of the
                                        printing and typesetting industry.
                                      </p>
                                      <div className="flex justify-center items-center">
                                        <button
                                          className="bg-[#6425FE] hover:bg-[#3b1694] w-[76px] h-[30px] text-white font-poppins text-xs px-4 py-2 mr-2 rounded"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleConfirmDelete(
                                              index,
                                              items.ScreenID
                                            );
                                          }}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          className="bg-[#6425FE] hover:bg-[#3b1694] w-[76px] h-[30px] text-white font-poppins text-xs px-4 py-2 rounded"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelDelete(index);
                                          }}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
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
          {/* {isEdited ? (
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

                <div className="lg:w-[1140px] w-[520px] h-[630px] overflow-x-auto overflow-y-auto  mt-5">
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
                                    booking_col === 1
                                      ? "h-[80px]"
                                      : booking_col === 2
                                      ? "h-[100px]"
                                      : booking_col === 3
                                      ? "h-[150px]"
                                      : booking_col === 4
                                      ? "h-[400px]"
                                      : "h-[100px]"
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
                          {screenData.length > 0 &&
                            screenData.map((items, screenIndex) => (
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
                                        <div className="font-poppins text-xl font-bold">
                                          {items.name}
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-sm text-[#8A8A8A]">
                                          {items.location}
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                          Media Rule : {items.media_rule}
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

                                  {items.booking.map((items, index) => (
                                    <div key={index} className="mt-2">
                                      <div className="p-2">
                                        <div className="grid grid-cols-6 space-x-1">
                                          <div className="col-span-5">
                                            <div className="flex flex-wrap">
                                              {renderMediaListBox(items)}
                                            </div>
                                          </div>
                                          <div
                                            onClick={() =>
                                              handleSelectScreenAddmedia(
                                                screenIndex + 1,
                                                items
                                              )
                                            }
                                            className="col-span-1 flex justify-center items-center cursor-pointer"
                                          >
                                            <MdOutlineModeEditOutline
                                              size={26}
                                              className="text-[#6425FE] hover:text-[#3b1694]"
                                            />
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
          ) : (
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
                        <div className="font-poppins lg:text-2xl text-xl  ">
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

                <div className="lg:w-[1140px] w-[520px] h-[630px] overflow-x-auto overflow-y-auto  mt-5">
                  <div className="grid grid-cols-12 space-x-1 mt-3">
                    <div className="col-span-3 lg:col-span-1">
                      <div className="min-w-[100%]">
                        <div
                          onClick={() => console.log("Select all", screenData)}
                          className="lg:min-w-[20px] min-w-[100px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="text-xs font-poppins text-white">
                            Select all
                          </div>
                          <div className="text-xs font-poppins text-white">
                            available
                          </div>
                        </div>
                        <div>
                          {booking_date.length > 0 &&
                            booking_date.map((items, index) => (
                              <div key={index} className="mt-3 space-x-2">
                                <div className="lg:min-w-[20px]  min-w-[100px] h-[70px] bg-[#59606C] rounded-lg">
                                  <div className="flex items-center justify-center text-xs font-poppins text-white">
                                    {format(items, "EEE")}
                                  </div>
                                  <div className="flex items-center justify-center text-3xl font-poppins text-white">
                                    {format(items, "dd")}
                                  </div>
                                  <div className="flex items-center justify-center text-xs font-poppins text-white">
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
                          {screenData.length > 0 &&
                            screenData.map((items, screenIndex) => (
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
                                        <div className="font-poppins text-xl font-bold">
                                          {items.ScreenName}
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xs">
                                          Max Capacity {items.MaxSlot}/Day
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                          Media Rule : {items.Media_Rules}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-2 flex justify-center items-center">
                                      <IoIosInformationCircleOutline
                                        onClick={() =>
                                          handleSelectInfoScreen(items)
                                        }
                                        size={22}
                                        className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-3 space-y-3">
                                    {items.booking
                                      .slice(0, booking_date.length)
                                      .map((items2, dateIndex) => (
                                        <div
                                          key={dateIndex}
                                          // onClick={() =>
                                          //   items2.slot - items2.booking > 0
                                          //     ? handleSelectScreen(
                                          //         screenIndex,
                                          //         dateIndex,
                                          //         items
                                          //       )
                                          //     : null
                                          // }
                                          className={`${
                                            bookingSelect.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                bookingItem.status === true
                                            )
                                              ? "bg-[#FD6822] cursor-pointer"
                                              : bookingSelect.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? "bg-[#FFBD49] cursor-pointer"
                                              : items2.MaxSlot -
                                                  items2.UsedSlot >=
                                                booking_slot
                                              ? "bg-[#018C41] cursor-pointer"
                                              : "bg-[#5C5C5C] pointer-events-none"
                                          } h-[70px] min-w-[250px] rounded-lg flex justify-center items-center`}
                                        >
                                          <div
                                            className={`font-poppins ${
                                              bookingSelect.some(
                                                (bookingItem) =>
                                                  bookingItem.screenIndex ===
                                                    screenIndex &&
                                                  bookingItem.dateIndex ===
                                                    dateIndex &&
                                                  bookingItem.status === true
                                              )
                                                ? "text-white"
                                                : bookingSelect.some(
                                                    (bookingItem) =>
                                                      bookingItem.screenIndex ===
                                                        screenIndex &&
                                                      bookingItem.dateIndex ===
                                                        dateIndex
                                                  )
                                                ? "text-[#4A4A4A]"
                                                : items2.MaxSlot -
                                                    items2.UsedSlot >=
                                                  booking_slot
                                                ? "text-white"
                                                : "text-white"
                                            }`}
                                          >
                                            {bookingSelect.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                bookingItem.status === true
                                            )
                                              ? `Booked ${
                                                  items2.UsedSlot + booking_slot
                                                }/${items2.MaxSlot}`
                                              : bookingSelect.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? `Selected ${
                                                  items2.UsedSlot + booking_slot
                                                }/${items2.MaxSlot}`
                                              : items2.MaxSlot -
                                                  items2.UsedSlot >=
                                                booking_slot
                                              ? `Available ${items2.UsedSlot}/${items2.MaxSlot}`
                                              : items2.MaxSlot -
                                                  items2.UsedSlot ===
                                                0
                                              ? `Full ${items2.UsedSlot}/${items2.MaxSlot}`
                                              : items2.MaxSlot -
                                                  items2.UsedSlot <=
                                                booking_slot
                                              ? `Not Available ${items2.UsedSlot}/${items2.MaxSlot}`
                                              : ""}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
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
          )} */}
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
                      <div className="font-poppins lg:text-2xl text-xl  ">
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

              <div className="lg:w-[1140px] w-[520px] h-[630px] overflow-x-auto overflow-y-auto  mt-5">
                <div className="grid grid-cols-12 space-x-1 mt-3">
                  <div className="col-span-3 lg:col-span-1">
                    <div className="min-w-[100%]">
                      <div
                        onClick={() => console.log("Select all", screenData)}
                        className="lg:min-w-[20px] min-w-[100px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center cursor-pointer"
                      >
                        <div className="text-xs font-poppins text-white">
                          Select all
                        </div>
                        <div className="text-xs font-poppins text-white">
                          available
                        </div>
                      </div>
                      <div>
                        {booking_date.length > 0 &&
                          booking_date.map((items, index) => (
                            <div key={index} className="mt-3 space-x-2">
                              <div className="lg:min-w-[20px]  min-w-[100px] h-[70px] bg-[#59606C] rounded-lg">
                                <div className="flex items-center justify-center text-xs font-poppins text-white">
                                  {format(items, "EEE")}
                                </div>
                                <div className="flex items-center justify-center text-3xl font-poppins text-white">
                                  {format(items, "dd")}
                                </div>
                                <div className="flex items-center justify-center text-xs font-poppins text-white">
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
                        {screenData.length > 0 &&
                          screenData.map((items, screenIndex) => (
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
                                      <div className="font-poppins text-xl font-bold">
                                        {items.ScreenName}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xs">
                                        Max Capacity {items.MaxSlot}/Day
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                        Media Rule : {items.Media_Rules}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-center items-center">
                                    <IoIosInformationCircleOutline
                                      onClick={() =>
                                        handleSelectInfoScreen(items, "right")
                                      }
                                      size={22}
                                      className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                    />
                                  </div>
                                </div>
                                <div className="mt-3 space-y-3">
                                  {items.booking !== undefined &&
                                    items.booking
                                      .slice(0, booking_date.length)
                                      .map((items2, dateIndex) => (
                                        <div
                                          key={dateIndex}
                                          onClick={() =>
                                            items2.UsedSlot > 0
                                              ? handleRemoveScreen(
                                                  screenIndex,
                                                  dateIndex,
                                                  items
                                                )
                                              : items2.MaxSlot -
                                                  parseInt(items2.UsedTotal) >
                                                0
                                              ? handleSelectScreen(
                                                  screenIndex,
                                                  dateIndex,
                                                  items
                                                )
                                              : null
                                          }
                                          className={`${
                                            bookingSelect?.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                items2.UsedSlot > 0
                                            )
                                              ? "bg-[#FD6822] cursor-pointer"
                                              : bookingSelect?.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? "bg-[#FFBD49] cursor-pointer"
                                              : items2.MaxSlot -
                                                  parseInt(items2.UsedTotal) >=
                                                booking_slot
                                              ? "bg-[#018C41] cursor-pointer"
                                              : "bg-[#5C5C5C] pointer-events-none"
                                          } h-[70px] min-w-[250px] rounded-lg flex justify-center items-center`}
                                        >
                                          <div
                                            className={`font-poppins ${
                                              bookingSelect?.some(
                                                (bookingItem) =>
                                                  bookingItem.screenIndex ===
                                                    screenIndex &&
                                                  bookingItem.dateIndex ===
                                                    dateIndex &&
                                                  items2.UsedSlot > 0
                                              )
                                                ? "text-white"
                                                : bookingSelect?.some(
                                                    (bookingItem) =>
                                                      bookingItem.screenIndex ===
                                                        screenIndex &&
                                                      bookingItem.dateIndex ===
                                                        dateIndex
                                                  )
                                                ? "text-[#4A4A4A]"
                                                : items2.MaxSlot -
                                                    parseInt(
                                                      items2.UsedTotal
                                                    ) >=
                                                  booking_slot
                                                ? "text-white"
                                                : "text-white"
                                            }`}
                                          >
                                            {bookingSelect?.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                items2.UsedSlot > 0
                                            )
                                              ? `Booked ${parseInt(
                                                  items2.UsedTotal
                                                )}/${items2.MaxSlot}`
                                              : bookingSelect?.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? `Selected ${
                                                  parseInt(items2.UsedTotal) +
                                                  booking_slot
                                                }/${items2.MaxSlot}`
                                              : items2.MaxSlot -
                                                  parseInt(items2.UsedTotal) >=
                                                booking_slot
                                              ? `Available ${parseInt(
                                                  items2.UsedTotal
                                                )}/${items2.MaxSlot}`
                                              : items2.MaxSlot -
                                                  parseInt(items2.UsedTotal) ===
                                                0
                                              ? `Full ${parseInt(
                                                  items2.UsedTotal
                                                )}/${items2.MaxSlot}`
                                              : parseInt(items2.MaxSlot) -
                                                  parseInt(items2.UsedTotal) <=
                                                booking_slot
                                              ? `Not Available ${parseInt(
                                                  items2.UsedTotal
                                                )}/${items2.MaxSlot}`
                                              : ""}
                                          </div>
                                        </div>
                                      ))}
                                </div>
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

      {showAddScreen && (
        <a
          onClick={() => setShowAddScreen(!showAddScreen)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showAddScreen && (
        <Add_Screen_Booking
          showAddScreen={showAddScreen}
          setShowAddScreen={setShowAddScreen}
          booking_date={booking_date}
          openAddNewScreenModal={openAddNewScreenModal}
          setOpenAddNewScreenModal={setOpenAddNewScreenModal}
          selectAll={selectAll}
          toggleAllCheckboxes={toggleAllCheckboxes}
          checkboxes={checkboxes}
          toggleCheckboxAddScreen={toggleCheckboxAddScreen}
          handleAddScreen={handleAddScreen}
          booking_slot={booking_slot}
          bookingId={bookingId}
        />
      )}

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
          selectPublihsScreen={selectPublihsScreen}
          allScreenData={allScreenData}
          selectAllPubishScreen={selectAllPubishScreen}
          toggleAllCheckboxesPublishScreen={toggleAllCheckboxesPublishScreen}
          toggleCheckboxPublishScreen={toggleCheckboxPublishScreen}
          checkboxPublishScreen={checkboxPublishScreen}
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
        />
      )}

      {openAddNewScreenModal && (
        <a
          onClick={() => setOpenAddNewScreenModal(!openAddNewScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openAddNewScreenModal && (
        <New_Screen setOpenAddNewScreenModal={setOpenAddNewScreenModal} />
      )}

      {openConfirmBookingModal && (
        <a
          onClick={() => setOpenConfirmBookingModal(!openConfirmBookingModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openConfirmBookingModal && (
        <Confirm_Booking
          setOpenConfirmBookingModal={setOpenConfirmBookingModal}
          openConfirmBookingModal={openConfirmBookingModal}
          bookingName={bookingName}
          bookingSelect={bookingSelect}
          merchandise={merchandise}
          booking_slot={booking_slot}
          booking_date={booking_date}
          screenData={screenData}
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
          setIsApplyToScreen={setIsApplyToScreen}
          isApplyToScreen={isApplyToScreen}
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
        />
      )}

      {openModalUploadNewMedia && (
        <a
          onClick={() => {
            setOpenModalUploadMedia(!openModalUploadNewMedia);
            setOpenAdsAllocationModal(!openAdsAllocationModal);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openModalUploadNewMedia && (
        <Booking_Upload_Media
          setOpenModalUploadMedia={setOpenModalUploadMedia}
          openModalUploadNewMedia={openModalUploadNewMedia}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
        />
      )}

      {isApplyToScreen && (
        <a
          onClick={() => {
            setIsApplyToScreen(!isApplyToScreen);
            setOpenAdsAllocationModal(!openAdsAllocationModal);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {isApplyToScreen && (
        <Ads_Allocation_Apply_Screen
          setIsApplyToScreen={setIsApplyToScreen}
          isApplyToScreen={isApplyToScreen}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          setSelectedData={setSelectedData}
          booking_date={booking_date}
          setOpenAddNewScreenModal={setOpenAddNewScreenModal}
          openAddNewScreenModal={openAddNewScreenModal}
          selectAll={selectAll}
          toggleAllCheckboxes={toggleAllCheckboxes}
          allScreenData={allScreenData}
          checkboxes={checkboxes}
          toggleCheckboxAddScreen={toggleCheckboxAddScreen}
          selectedScreenItems={selectedScreenItems}
          setScreennAdsAllocation={setScreennAdsAllocation}
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
    </>
  );
};

export default Create_Booking;
