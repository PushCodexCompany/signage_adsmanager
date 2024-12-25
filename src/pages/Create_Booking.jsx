import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  IoIosPlayCircle,
  IoIosCalendar,
  IoIosInformationCircleOutline,
  IoMdTrash,
} from "react-icons/io";

import { RiEditLine } from "react-icons/ri";
import { PiMonitor } from "react-icons/pi";

import { format } from "date-fns";
import useCheckPermission from "../libs/useCheckPermission";
import Screen_Info from "../components/Screen_Info";
import New_Screen from "../components/New_Screen";

import "react-datepicker/dist/react-datepicker.css";
import User from "../libs/admin";

import Filter from "../components/Filter";
import Add_Screen_Booking from "../components/Add_Screen_Booking";
import Confirm_Booking from "../components/Confirm_Booking";
import Swal from "sweetalert2";
import Detail_Screen_Booking from "../components/Detail_Screen_Booking";
import firebase_func from "../libs/firebase_func";
import Permission from "../libs/permission";

const Create_Booking = () => {
  const location = useLocation();
  useCheckPermission();
  const navigate = useNavigate();

  const { token } = User.getCookieData();

  const [bookingId, setBookingId] = useState();
  const [bookingName, setBookingName] = useState("");
  const [bookingCode, setBookingCode] = useState("CDS-BT-230101-004");
  const [merchandise, setMerchandise] = useState([]);
  const [booking_date, setBookingDate] = useState([]);
  const [booking_slot, setBookingSlot] = useState();

  const [showAddScreen, setShowAddScreen] = useState(false);

  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [allScreenData, setAllScreenData] = useState([]);

  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // const [deleteModalIndex, setDeleteModalIndex] = useState({});

  const [bookingSelect, setBookingSelect] = useState([]);

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const [openAddNewScreenModal, setOpenAddNewScreenModal] = useState(false);

  const [openConfirmBookingModal, setOpenConfirmBookingModal] = useState(false);

  const [openAdsAllocationModal, setOpenAdsAllocationModal] = useState(false);

  const [isApplyToScreen, setIsApplyToScreen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [filter_screen, setFilterScreen] = useState([]);

  const [showDetailScreen, setShowDetailScreen] = useState(false);
  const [detailScreen, setDetailScreen] = useState(null);
  const [page_permission, setPagePermission] = useState([]);

  useEffect(() => {
    setBooking();
    getAllScreen();
    getPermission();
  }, []);

  const findAccountCode = async (merchandise_name) => {
    const advertiser = await User.getMerchandiseList(token);

    if (advertiser.length > 0) {
      const foundEntry = advertiser?.find(
        (entry) => entry.AdvertiserName === merchandise_name
      );

      if (foundEntry) {
        return foundEntry.AccountCode;
      } else {
        return "No Data";
      }
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
    let all_screens_data;
    if (location.state.screen_data) {
      all_screens_data = location.state.screen_data;
    } else {
      all_screens_data = await User.getScreens(token);
    }

    const groupedByScreenID = booking_data.reduce((acc, curr) => {
      const screenID = curr.ScreenID;
      const existing = acc?.find((item) => item.ScreenID === screenID);
      const filter_screen = all_screens_data?.find(
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
            AccountCode: filter_screen.AccountCode,
            BrandCode: filter_screen.BrandCode,
            BranchCode: filter_screen.BranchCode,
            ScreenCode: filter_screen.ScreenCode,
            screen_status: filter_screen.screen_status,
            ScreenLocation: filter_screen.ScreenLocation,
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
      const existing = acc?.find((item) => item.ScreenID === screenID);
      const filter_screen = all_screens_data?.find(
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
            screen_status: filter_screen.screen_status,
            ScreenLocation: filter_screen.ScreenLocation,
            AccountCode: filter_screen.AccountCode,
            BrandCode: filter_screen.BrandCode,
            BranchCode: filter_screen.BranchCode,
            ScreenCode: filter_screen.ScreenCode,
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

    groupedByScreenID.map(async (items) => {
      const screen_status = await firebase_func.getStatusScreen(items);
      items.screen_status = screen_status;
    });

    setScreenData(groupedByScreenID);
  };

  const getAllScreen = async () => {
    const { SlotPerDay } = location.state.data;
    const data = await User.getScreensWithAdsCapacity(null, SlotPerDay, token);
    data.map(async (items) => {
      const screen_status = await firebase_func.getStatusScreen(items);
      items.screen_status = screen_status;
    });
    setAllScreenData(data);
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);

    if (!permissions.digiBookingMgt.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }

    setPagePermission(permissions?.digiBookingMgt);
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

  // const toggleScreenFromAllScreen = async (items) => {
  //   const obj_to_save = {
  //     bookingid: bookingId,
  //     screenids: items.ScreenID,
  //   };

  //   try {
  //     const data = await User.selectScreenBooking(obj_to_save, token);
  //     if (data.code === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "เลือก Screen สำเร็จ!",
  //         text: `เลือก Screen สำเร็จ!`,
  //       }).then(async (result) => {
  //         if (
  //           result.isConfirmed ||
  //           result.dismiss === Swal.DismissReason.backdrop
  //         ) {
  //           const data = await User.getBookingById(bookingId, token);
  //           const filteredData = data.filter(
  //             (item) => item.ScreenID === items.ScreenID
  //           );
  //           const obj = {
  //             MaxSlot: parseInt(items.ScreenRule[0].AdsCapacity),
  //             Media_Rules:
  //               items.ScreenRule[0].Width && items.ScreenRule[0].Height
  //                 ? items.ScreenRule[0].Width + "x" + items.ScreenRule[0].Height
  //                 : "Not Set",
  //             ScreenID: items.ScreenID,
  //             ScreenName: items.ScreenName,
  //             booking: filteredData,
  //           };
  //           screenData.push(obj);
  //           setScreenData(screenData);
  //           setBookingData();
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "เกิดข้อผิดพลาด!",
  //         text: data.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

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
      if (data.code === 200) {
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

  const handleDeleteClick = (item) => {
    Swal.fire({
      text: `คุณต้องการลบจอ ${item.ScreenName} ออกจาก Booking ${bookingName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const obj = {
          bookingid: bookingId,
          screenid: item.ScreenID,
        };

        try {
          const data = await User.deleteScreenBooking(obj, token);
          if (data.code === 200) {
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
                    [item.ScreenID]: false,
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
      }
    });
  };

  // const handleConfirmDelete = async (index, id) => {
  //   // ลบจอที่เลือก

  //   setDeleteModalIndex((prevModal) => {
  //     const updatedModal = {
  //       ...prevModal,
  //       [index]: !prevModal[index],
  //     };
  //     return updatedModal;
  //   });
  // };

  // const handleCancelDelete = (index) => {
  //   // ปิด modal ของตัว comfirm delete
  //   setDeleteModalIndex((prevModal) => {
  //     const updatedModal = {
  //       ...prevModal,
  //       [index]: !prevModal[index],
  //     };

  //     return updatedModal;
  //   });
  // };

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

  const handleSelectAllAvilable = () => {
    const output = [];
    screenData.forEach((screen, screenIndex) => {
      screen.booking.forEach((booking, dateIndex) => {
        if (parseInt(booking.AvailableSlot) >= booking_slot) {
          output.push({
            screenIndex,
            dateIndex,
            ScreenID: screen.ScreenID,
            BookingDateID: booking.BookingDateID,
          });
        }
      });
    });

    setBookingSelect(output);

    // if (!isDuplicate) {
    //   const newBookingSelect = [
    //     ...bookingSelect,
    //     {
    //       screenIndex,
    //       dateIndex,
    //       ScreenID: items.ScreenID,
    //       BookingDateID: items.booking[dateIndex].BookingDateID,
    //     },
    //   ];
    //   setBookingSelect(newBookingSelect);
    // } else {
    //   const filteredBookingSelect = bookingSelect.filter(
    //     (selected) =>
    //       !(
    //         selected.screenIndex === screenIndex &&
    //         selected.dateIndex === dateIndex
    //       )
    //   );
    //   setBookingSelect(filteredBookingSelect);
    // }
  };

  const handleDeselectAllAvilable = () => {
    setBookingSelect([]);
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
          const matchingBooking = bookingSelect?.find(
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
        const data = await User.updateBookingSlots(obj, token);
        if (data.code === 200) {
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
      const screen_data = allScreenData?.find(
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
        Swal.fire({
          text: `คุณต้องการเปลี่ยนชื่อ Booking ${bookingName} เป็น ${value} ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3dabeb",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const obj = {
              bookingid: bookingId,
              bookingname: value,
            };
            if (bookingName !== value) {
              try {
                const data = await User.updateBookingName(obj, token);

                if (data.code === 200) {
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
                      setBookingName(value);
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
            } else {
              setEditing(false);
            }
          }
        });
      }
    };

    const handleBlur = async () => {
      Swal.fire({
        text: `คุณต้องการเปลี่ยนชื่อ Booking ${bookingName} เป็น ${value} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3dabeb",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const obj = {
            bookingid: bookingId,
            bookingname: value,
          };
          if (bookingName !== value) {
            try {
              const data = await User.updateBookingName(obj, token);

              if (data.code === 200) {
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
                    setBookingName(value);
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
          } else {
            setEditing(false);
          }
        }
      });
    };

    return (
      <div className="grid grid-cols-6">
        <div className="col-span-3 ">
          <div className="flex">
            {editing ? (
              <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                autoFocus
                className="font-poppins font-semibold text-2xl w-[95%] pl-2 border border-gray-200 rounded-lg"
              />
            ) : (
              <div className="font-poppins font-semibold text-2xl w-[95%] pl-2 border border-gray-200 rounded-lg">
                {value}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-start items-center">
            {page_permission?.update || page_permission?.create ? (
              <RiEditLine
                className="text-[26px] text-[#6425FE] hover:text-[#3b1694] ml-2 cursor-pointer"
                onClick={handleClick}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Booking"} lv1Url={"/booking"} lv2={bookingName} />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            {/* <div className="font-poppins font-semibold text-2xl w-[95%] pl-2"> */}
            <EditableText initialValue={bookingName} />
            {/* </div> */}
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <>
                {page_permission?.update ? (
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
                      Save Draft
                    </button>
                    <button
                      onClick={() => handleConfirmbooking()}
                      className="w-52 h-10 rounded-md text-white lg:text-base md:text-[12px] bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                    >
                      Confirm Booking
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
        </div>

        {/* <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        /> */}

        <div className="mt-7 grid grid-cols-8 md:space-x-2">
          <div className="col-span-2">
            <div>
              <img
                className={`block mx-auto mt-30px lg:w-[250px] lg:h-[250px] md:w-[150px] md:h-[150px] rounded-3xl object-cover border border-gray-300 shadow-sm`}
                src={
                  merchandise.AdvertiserLogo
                    ? merchandise.AdvertiserLogo
                    : `https://ui-avatars.com/api/?name=${
                        merchandise.AdvertiserName
                      }&background=${"000000"}&color=fff`
                }
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
              <div className="h-[360px] overflow-y-auto mt-5">
                {screenData.length > 0 ? (
                  screenData.map((items, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mt-3 "
                    >
                      <div
                        className={`border border-gray-300 rounded-lg lg:w-[80%] md:w-[100%] h-[90px] shadow-sm`}
                        // onClick={() => toggleScreenFromAllScreen(items)}
                      >
                        <div className="grid grid-cols-10 md:space-x-1">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={40} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center group relative ">
                              <div className="font-poppins lg:text-xl md:text-md font-bold">
                                {items.ScreenName.length > 15 ? (
                                  <>
                                    {items.ScreenName.slice(0, 12) + "..."}
                                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                      {items.ScreenName}
                                    </span>
                                  </>
                                ) : (
                                  <>{items.ScreenName}</>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-start items-center group relative">
                              <div className="font-poppins text-sm md:text-xs text-[#8A8A8A]">
                                {items.ScreenLocation.length > 25 ? (
                                  <>
                                    {items.ScreenLocation.slice(0, 23) + "..."}
                                    <div
                                      style={{ pointerEvents: "none" }}
                                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                      {items.ScreenLocation}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {items.ScreenLocation || "No Location ..."}
                                  </>
                                )}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectInfoScreen(items, "right");
                                // const data = findScreenData(items, "info");
                                // handleSelectInfoScreen(data, "left");
                              }}
                              size={22}
                              className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                            />

                            {screenData.some(
                              (screen) => screen.ScreenID === items.ScreenID
                            ) && (
                              <>
                                {page_permission?.create ||
                                page_permission?.update ? (
                                  <>
                                    <IoMdTrash
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(items);
                                      }}
                                      size={22}
                                      className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                    />
                                    {/* {deleteModalIndex[index] && (
                                      <div className="absolute left-[200px] lg:left-[600px] lg:top-[680px] flex items-center">
                                        <div className="bg-black bg-opacity-80 w-[400px] h-[130px] p-8 rounded shadow-sm">
                                          <p className="font-poppins text-xs text-white">
                                            Do You Want to Delete This Screen ?
                                          </p>
                                          <div className="flex justify-center items-center mt-5">
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
                                    )} */}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-[400px] border border-gray-300 flex justify-center items-center text-gray-500 text-2xl">
                    No Screen(s) Selected
                  </div>
                )}
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
                      {`You Select ${booking_slot} Slot(s)`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-[1140px] w-[520px] h-[630px] overflow-x-auto overflow-y-auto  mt-5">
                <div className="grid grid-cols-12 space-x-1 mt-3">
                  <div className="col-span-3 lg:col-span-1">
                    <div className="min-w-[100%]">
                      <div className="sticky top-0 z-10">
                        <div className="flex items-center space-x-2">
                          {bookingSelect.length <= 0 ? (
                            <div
                              onClick={() => {
                                if (
                                  page_permission?.create ||
                                  page_permission?.update
                                ) {
                                  handleSelectAllAvilable();
                                }
                              }}
                              className="lg:min-w-[100px] min-w-[100px h-[90px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center cursor-pointer"
                            >
                              <div className="text-xs font-poppins text-white">
                                Select all
                              </div>
                              <div className="text-xs font-poppins text-white">
                                available
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                if (
                                  page_permission?.create ||
                                  page_permission?.update
                                ) {
                                  handleDeselectAllAvilable();
                                }
                              }}
                              className="lg:min-w-[100px] min-w-[100px h-[90px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center cursor-pointer"
                            >
                              <div className="text-xs font-poppins text-white">
                                Deselect All
                              </div>
                            </div>
                          )}

                          {screenData.length > 0 &&
                            screenData.map((items, screenIndex) => (
                              <>
                                <div
                                  key={screenIndex}
                                  className="h-[90px] min-w-[250px] rounded-lg bg-white flex items-center border border-gray-300 shadow-sm"
                                >
                                  <div className="grid grid-cols-12">
                                    <div className="col-span-2 flex justify-center items-center">
                                      <PiMonitor size={40} color={"#59606C"} />
                                    </div>
                                    <div className="col-span-9">
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xl font-bold relative group">
                                          {items.ScreenName.length > 12 ? (
                                            <>
                                              {items.ScreenName.slice(0, 9) +
                                                "..."}
                                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {items.ScreenName}
                                              </div>
                                            </>
                                          ) : (
                                            <>{items.ScreenName}</>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xs">
                                          Max Capacity {items.MaxSlot}/Day
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="w-full font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                          <div className="flex items-center justify-center ">
                                            Media Rule
                                          </div>
                                          <div className="flex items-center justify-center">
                                            {`W ${
                                              items.Media_Rules.split("x")[0]
                                            } x H ${
                                              items.Media_Rules.split("x")[1]
                                            }`}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-1 flex justify-center items-center">
                                      <IoIosInformationCircleOutline
                                        onClick={() =>
                                          handleSelectInfoScreen(items, "right")
                                        }
                                        size={22}
                                        className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>

                      <div>
                        {booking_date.length > 0 &&
                          booking_date.map((items, index) => (
                            <div key={index} className="mt-3 space-x-2">
                              <div
                                className={`lg:min-w-[100px] min-w-[100px] h-[80px] bg-[#59606C] rounded-lg flex flex-col justify-center items-center`}
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
                                className="h-[90px] min-w-[250px] rounded-lg "
                              >
                                <div className="grid grid-cols-10">
                                  <div className="col-span-2 flex justify-center items-center">
                                    {/* <PiMonitor size={40} color={"#59606C"} /> */}
                                  </div>
                                  <div className="col-span-6">
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xl font-bold relative group">
                                        {items.ScreenName.length > 12 ? (
                                          <>
                                            {items.ScreenName.slice(0, 9) +
                                              "..."}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                              {items.ScreenName}
                                            </div>
                                          </>
                                        ) : (
                                          <>{items.ScreenName}</>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xs">
                                        Max Capacity {items.MaxSlot}/Day
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="w-full font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                        <div className="flex items-center justify-center ">
                                          Media Rule
                                        </div>
                                        <div className="flex items-center justify-center">
                                          {`W ${
                                            items.Media_Rules.split("x")[0]
                                          } x H ${
                                            items.Media_Rules.split("x")[1]
                                          }`}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-center items-center">
                                    {/* <IoIosInformationCircleOutline
                                      onClick={() =>
                                        handleSelectInfoScreen(items, "right")
                                      }
                                      size={22}
                                      className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                    /> */}
                                  </div>
                                </div>
                                <div className="pl-[10px] mt-[23px] space-y-3">
                                  {items.booking !== undefined &&
                                    items.booking
                                      .slice(0, booking_date.length)
                                      .map((items2, dateIndex) => (
                                        <div
                                          key={dateIndex}
                                          onClick={() => {
                                            if (
                                              page_permission?.create ||
                                              page_permission?.update
                                            ) {
                                              if (items2.UsedSlot > 0) {
                                                handleRemoveScreen(
                                                  screenIndex,
                                                  dateIndex,
                                                  items
                                                );
                                              } else if (
                                                items2.MaxSlot -
                                                  parseInt(items2.UsedTotal) >
                                                0
                                              ) {
                                                handleSelectScreen(
                                                  screenIndex,
                                                  dateIndex,
                                                  items
                                                );
                                              }
                                            }
                                          }}
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
                                          } h-[80px] min-w-[250px] rounded-lg flex justify-center items-center`}
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
          setShowDetailScreen={setShowDetailScreen}
          showDetailScreen={showDetailScreen}
          setDetailScreen={setDetailScreen}
        />
      )}

      {showDetailScreen && (
        <Detail_Screen_Booking
          setShowDetailScreen={setShowDetailScreen}
          detailScreen={detailScreen}
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

      {openAddNewScreenModal && (
        <New_Screen
          setOpenAddNewScreenModal={setOpenAddNewScreenModal}
          openAddNewScreenModal={openAddNewScreenModal}
        />
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
          booking_id={bookingId}
        />
      )}
    </>
  );
};

export default Create_Booking;
