import React, { useState, useEffect } from "react";
import {
  IoIosClose,
  IoIosCloseCircle,
  IoIosAdd,
  IoIosRemoveCircle,
  IoIosAddCircle,
} from "react-icons/io";
import { format } from "date-fns";
import Remove_From_Screen from "./Remove_From_Screen";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import User from "../libs/admin";

const Remove_Content = ({
  setShowRemoveContent,
  showRemoveContent,
  booking_date,
  allScreenData,
  media_rules_select,
  screen,
  bookingId,
  fact_allocation,
  setFactAllocation,
}) => {
  const [isRemoveFromScreen, setIsRemoveFromScreen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [screenRemoveContent, setScreenRemoveContent] = useState([]);
  const [screenSelect, setScreenSelect] = useState(null);
  const [datePickers, setDatePickers] = useState([]);
  const { token } = User.getCookieData();

  const handleToggleDropdownRemoveScreen = () => {
    setIsRemoveFromScreen(!isRemoveFromScreen);
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

  const handleDeleteScreenFromRemoveContent = (index, id) => {
    const newData = [...screenRemoveContent];
    newData.splice(index, 1);
    setScreenRemoveContent(newData);

    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [id]: !prevCheckboxes[id],
      };

      return updatedCheckboxes;
    });
  };

  const handleAddDatePicker = () => {
    const booking_date_format = booking_date.map((timestamp) =>
      format(timestamp, "yyyy-MM-dd")
    );

    const todayed = new Date().toISOString().split("T")[0];
    const filteredDates = booking_date_format.filter((date) => date >= todayed);

    const today = new Date();
    today.setHours(7, 0, 0, 0); // Set the time to 07:00:00

    if (datePickers.length > 0) {
      const nextStartDate = new Date(
        datePickers[datePickers.length - 1].endDate
      );
      nextStartDate.setDate(nextStartDate.getDate() + 1);

      if (nextStartDate > new Date(booking_date[booking_date.length - 1])) {
        nextStartDate.setDate(nextStartDate.getDate() - 1);
        setDatePickers([
          ...datePickers,
          {
            startDate: nextStartDate,
            endDate: new Date(booking_date[booking_date.length - 1]),
            dateRange: booking_date_format,
          },
        ]);
      } else {
        setDatePickers([
          ...datePickers,
          {
            startDate: nextStartDate,
            endDate: new Date(booking_date[booking_date.length - 1]),
            dateRange: booking_date_format,
          },
        ]);
      }
    } else {
      setDatePickers([
        ...datePickers,
        {
          startDate: today,
          endDate: new Date(booking_date[booking_date.length - 1]),
          dateRange: filteredDates,
        },
      ]);
    }
  };

  const handleStartDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].startDate = date;

    setDatePickers(newDatePickers);
    generateDateRange(index);
  };

  const handleEndDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].endDate = date;

    if (newDatePickers[index].endDate < newDatePickers[index].startDate) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเลือกวันย้อนหลังได้",
      });
      return;
    } else {
      setDatePickers(newDatePickers);
      generateDateRange(index);
    }
  };

  const generateDateRange = (index) => {
    const startDate = new Date(datePickers[index].startDate);
    const endDate = new Date(datePickers[index].endDate);

    const newDateRange = [];
    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      newDateRange.push(currentDate.toISOString().split("T")[0]);
    }

    // Replace the old dateRange with the new one
    datePickers[index].dateRange = newDateRange;
  };

  const handleRemoveDatePicker = (index) => {
    const newDatePickers = [...datePickers];
    newDatePickers.splice(index, 1);
    setDatePickers(newDatePickers);
  };

  const handleDateRangeToString = (datePickers) => {
    let date_range;
    if (datePickers.length > 0) {
      date_range = datePickers
        .reduce((acc, curr) => {
          curr.dateRange.forEach((date) => {
            if (!acc.includes(date)) {
              acc.push(date);
            }
          });
          return acc;
        }, [])
        .join(",");

      return date_range;
    }
  };

  const handleRemoveContent = async () => {
    const date_range = handleDateRangeToString(datePickers);
    const screenIDs = screenRemoveContent.map((screen) => ({
      screenid: screen.ScreenID,
    }));
    const screenIdsString = screenIDs
      .map((screen) => screen.screenid)
      .join(",");
    if (screenIDs.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกจอที่ต้องการ ...",
      });
      return;
    }
    if (!date_range) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกช่วงเวลา ...",
      });
      return;
    }

    Swal.fire({
      text: `คุณต้องการลบข้อมูล Playlist ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const obj = {
            bookingid: bookingId,
            dates: date_range,
            screenids: screenIdsString,
          };
          const data = await User.deleteBookingContent(obj, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: `Delete Playlist สำเร็จ!`,
              text: `Delete Playlist สำเร็จ!`,
            }).then(async (result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setShowRemoveContent(!showRemoveContent);
                setFactAllocation(!fact_allocation);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {}
      }
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className="sticky top-0 right-0 z-30 flex justify-end">
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowRemoveContent(!showRemoveContent)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full p-1">
                <div className="mt-10">
                  <div className="flex justify-center items-center">
                    <div className="font-poppins text-[#2F3847] text-[44px] font-bold">
                      Deallocation
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="font-poppins text-[#2F3847] text-[14px] text-center">
                      Define when and where your advertisements will be
                      displayed for maximum impact.
                    </div>
                  </div>
                </div>
                <div className="mt-10 h-[450px] lg:h-[450px]">
                  {/* Booking Period */}
                  <div className="grid grid-cols-12">
                    <div className="col-span-1" />
                    <div className="col-span-3 flex justify-end items-center">
                      <div className="font-poppins font-bold">
                        Booking Period :
                      </div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-6">
                      <div className="font-poppins font-medium  text-lg">
                        {` ${format(
                          booking_date[0],
                          "EEE dd MMM yyyy"
                        )} - ${format(
                          booking_date[booking_date.length - 1],
                          "EEE dd MMM yyyy"
                        )}`}
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>
                  {/* Remove from Screen */}
                  <div className="grid grid-cols-12 mt-5">
                    <div className="col-span-1" />
                    <div className="col-span-3 mt-2 flex justify-end items-center">
                      <div className="font-poppins font-bold">
                        Remove from Screens :
                      </div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-4 border border-[#D9D9D9] rounded-md shadow-sm">
                      <div className="p-2">
                        <div className="grid grid-cols-5">
                          <div className="col-span-4">
                            <div className="flex flex-wrap">
                              {screenRemoveContent.length > 0 &&
                                screenRemoveContent.map((screen, index) => (
                                  <div
                                    key={index}
                                    className="border border-gray-300 rounded-sm bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                    style={{ flexBasis: "calc(50% - 8px)" }}
                                  >
                                    <div className="font-poppins text-xs font-bold">
                                      {screen.ScreenName}
                                    </div>

                                    <IoIosClose
                                      size={20}
                                      className="cursor-pointer text-[#6425FE]"
                                      onClick={() =>
                                        handleDeleteScreenFromRemoveContent(
                                          index,
                                          screen.ScreenID
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex justify-between items-center">
                              {screenRemoveContent.length > 1 && (
                                <IoIosCloseCircle
                                  onClick={() => {
                                    const filteredScreen = screen.filter(
                                      (screen) =>
                                        screen.ScreenID === screenSelect
                                    );
                                    const output = {
                                      [screenSelect]: true,
                                    };
                                    setCheckboxes(output);
                                    setScreenRemoveContent(filteredScreen);
                                  }}
                                  size={24}
                                  className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                                />
                              )}

                              <div className="flex justify-center items-center w-full">
                                <IoIosAdd
                                  size={24}
                                  className="mt-1 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                  onClick={handleToggleDropdownRemoveScreen}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3" />
                  </div>
                  {/* Remove from Periods */}
                  <div className="grid grid-cols-12 mt-5">
                    <div className="col-span-1" />
                    <div className="col-span-3 flex justify-end items-start pt-3">
                      <div className="font-poppins font-bold">
                        Remove from Periods :
                      </div>
                    </div>
                    <div className="col-span-1" />
                    <div
                      className={`col-span-4 space-y-1 ${
                        datePickers.length > 3
                          ? "h-[300px] lg:h-[300px] overflow-y-auto"
                          : ""
                      }`}
                    >
                      {datePickers.map((items, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-6 border border-[#D9D9D9] rounded-md "
                        >
                          <div className="col-span-2 p-2 flex justify-center items-center">
                            <div className="font-poppins">
                              <DatePicker
                                selected={items.startDate}
                                selectsStart
                                startDate={new Date()}
                                endDate={items.endDate}
                                minDate={new Date()}
                                maxDate={booking_date[booking_date.length - 1]}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) =>
                                  handleStartDateChange(index, date)
                                }
                                className="p-2 rounded-lg shadow-sm w-full text-xs"
                              />
                            </div>
                          </div>
                          <div className="col-span-1 p-2 flex justify-center items-center">
                            -
                          </div>
                          <div className="col-span-2 p-2">
                            <div className="font-poppins">
                              <DatePicker
                                selected={items.endDate}
                                selectsEnd
                                startDate={new Date()}
                                endDate={items.endDate}
                                minDate={new Date()}
                                maxDate={booking_date[booking_date.length - 1]}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) =>
                                  handleEndDateChange(index, date)
                                }
                                className="p-2 rounded-lg shadow-sm w-full text-xs"
                              />
                            </div>
                          </div>
                          <div className="col-span-1 p-2 flex justify-center items-center">
                            <IoIosRemoveCircle
                              size={24}
                              className="mt-1 ml-2 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                              onClick={() => handleRemoveDatePicker(index)}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-5 border border-[#D9D9D9] rounded-md shadow-sm">
                        <div className="col-span-4">
                          <div className="p-2">
                            <div className="flex flex-wrap">
                              <div className="font-poppins text-[#AFAFAF]">
                                Add Period
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="p-2">
                            <div className="flex justify-center items-center">
                              <IoIosAddCircle
                                size={24}
                                onClick={handleAddDatePicker}
                                className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3" />
                  </div>
                </div>
                <div>
                  <div
                    className={`grid grid-cols-10 
                    `}
                  >
                    <div className="col-span-2" />
                    <div className="col-span-7">
                      <div className="flex">
                        <div className="font-poppins">
                          <b>Note :</b> Modifications made will only affect the
                          screens and periods within the booked timeframe.
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>
                  <div className="flex justify-center items-center space-x-2 mt-3">
                    <button
                      onClick={() => handleRemoveContent()}
                      className="w-[250px] h-[48px] bg-[#6425FE] hover:bg-[#3b1694] rounded-md text-white font-poppins font-bold"
                    >
                      Confirm
                    </button>
                    {/* <button className="w-[250px] h-[48px] border border-[#6425FE] rounded-md text-[#6425FE] font-poppins font-bold">
                      Clear Slot
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRemoveFromScreen && (
        <Remove_From_Screen
          setSelectedData={setSelectedData}
          setCheckboxes={setCheckboxes}
          setIsRemoveFromScreen={setIsRemoveFromScreen}
          isRemoveFromScreen={isRemoveFromScreen}
          booking_date={booking_date}
          selectAll={selectAll}
          toggleAllCheckboxes={toggleAllCheckboxes}
          checkboxes={checkboxes}
          toggleCheckboxAddScreen={toggleCheckboxAddScreen}
          media_rules_select={media_rules_select}
          screen={screen}
          selectedScreenItems={selectedScreenItems}
          setScreenRemoveContent={setScreenRemoveContent}
        />
      )}
    </>
  );
};

export default Remove_Content;
