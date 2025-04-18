import React, { useState, useEffect } from "react";
import {
  IoIosArrowDown,
  IoIosClose,
  IoIosArrowUp,
  IoIosCalendar,
} from "react-icons/io";
import User from "../libs/admin";
import "../index.css";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { format } from "date-fns";
const Custom_Filter = ({
  filter_screen,
  setFilterScreen,
  width,
  page_name,
  getLogData,
  setLogData,
  setAllPages,
  setStartDate,
  setEndDate,
  getMediaLibralyData,
  setMediaLibralyData,
  fetchUsersList,
  setUserLists,
  setExportData,
  setTotalPage,
  setFact_changeDate,
}) => {
  const { token } = User.getCookieData();
  const [filter, setFilter] = useState([]);
  const [all_filter_data, SetAllFilterData] = useState([]);
  const [startDatePickers, setStartDatePickers] = useState(new Date());
  const [endDatePickers, setEndDatePickers] = useState(new Date());

  useEffect(() => {
    getFilter();
  }, []);

  const getFilter = async () => {
    const {
      configuration: { pagefilters },
    } = await User.getConfiguration(token);
    if (page_name) {
      const result = pagefilters.find((page) => page.page === page_name);
      SetAllFilterData(result.options);
    } else {
      SetAllFilterData([]);
    }
  };

  const handleStatusChange = async (event) => {
    const selectedValue = event.target.value;
    const [tagID, tagName] = selectedValue.split("!");
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(tagName)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagName]; // Add the selected value to the filter state
        }
      });

      const result = all_filter_data
        .map((option) => option.optionvalue) // Get the optionvalue arrays
        .flat() // Flatten the nested arrays into a single array
        .find((option) => option.text === tagName); // Find the object where text matches

      const value = result ? result.value : null;

      setFilterScreen((prevFilter) => {
        if (prevFilter.includes(`${tagID}-${tagName}`)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, `${tagID}-${value}`]; // Add the selected value to the filter state
        }
      });

      if (filter_screen.length > 0) {
        // more than 1 filter
        const output = [...filter_screen, `${tagID}-${value}`].join(",");
        const formattedStartDate = format(
          new Date(startDatePickers),
          "yyyy-MM-dd"
        );
        const formattedEndDate = format(new Date(endDatePickers), "yyyy-MM-dd");

        if (page_name === "actLog") {
          const obj = {
            filterfields: output,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          };

          const data = await User.getActivitylog(
            token,
            1,
            "",
            JSON.stringify(obj)
          );
          if (data.code === 200) {
            setLogData(data.activitylog);
            setExportData(data.activitylog);
            if (data.pagination.length > 0) {
              setTotalPage(data.pagination[0].totalpage);
              setAllPages(data.pagination[0].totalpage);
            }
          }
        } else if (page_name === "mdLib") {
          const obj = {
            filterfields: output,
          };

          const data = await User.getMedias(token, 1, "", JSON.stringify(obj));
          if (data.code === 200) {
            setMediaLibralyData(data.media);
            if (data.pagination.length > 0) {
              setAllPages(data.pagination[0].totalpage);
            }
          }
        } else if (page_name === "userMgt") {
          const obj = {
            filterfields: output,
          };

          const data = await User.getUsersList(
            token,
            1,
            "",
            JSON.stringify(obj)
          );
          if (data.code === 200) {
            setUserLists(data.users);
            if (data.pagination.length > 0) {
              setAllPages(data.pagination[0].totalpage);
            }
          }
        }
      } else {
        //  1 filter

        if (page_name === "actLog") {
          const formattedStartDate = format(
            new Date(startDatePickers),
            "yyyy-MM-dd"
          );
          const formattedEndDate = format(
            new Date(endDatePickers),
            "yyyy-MM-dd"
          );

          const obj = {
            filterfields: `${tagID}-${value}`,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          };

          const data = await User.getActivitylog(
            token,
            1,
            "",
            JSON.stringify(obj)
          );
          if (data.code === 200) {
            setLogData(data.activitylog);
            setExportData(data.activitylog);
            if (data.pagination.length > 0) {
              setTotalPage(data.pagination[0].totalpage);
              setAllPages(data.pagination[0].totalpage);
            }
          }
        } else if (page_name === "mdLib") {
          const obj = {
            filterfields: `${tagID}-${value}`,
          };
          const data = await User.getMedias(token, 1, "", JSON.stringify(obj));
          if (data.code === 200) {
            setMediaLibralyData(data.media);
            if (data.pagination.length > 0) {
              setAllPages(data.pagination[0].totalpage);
            }
          }
        } else if (page_name === "userMgt") {
          const obj = {
            filterfields: `${tagID}-${value}`,
          };
          const data = await User.getUsersList(
            token,
            1,
            "",
            JSON.stringify(obj)
          );
          if (data.code === 200) {
            setUserLists(data.users);
            if (data.pagination.length > 0) {
              setAllPages(data.pagination[0].totalpage);
            }
          }
        }
      }

      event.target.value = "";
    }
  };

  const removeFilter = async (event, index) => {
    const selectedValue = `${filter_screen[index]}!${event}`;
    const [tagID, value] = selectedValue.split("!");

    const updatedFilterOutSide = filter_screen.filter(
      (value) => value !== tagID
    );
    const updatedFilterInside = filter.filter((option) => option !== value);

    setFilter(updatedFilterInside);
    setFilterScreen(updatedFilterOutSide);

    const updatedFilterScreen = filter_screen.filter((item) => item !== tagID);
    if (updatedFilterScreen.length > 0) {
      // any left

      if (page_name === "actLog") {
        const formattedStartDate = format(
          new Date(startDatePickers),
          "yyyy-MM-dd"
        );
        const formattedEndDate = format(new Date(endDatePickers), "yyyy-MM-dd");

        const obj = {
          filterfields: updatedFilterScreen.join(","),
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
        const data = await User.getActivitylog(
          token,
          1,
          "",
          JSON.stringify(obj)
        );
        if (data.code === 200) {
          setLogData(data.activitylog);
          setExportData(data.activitylog);
          if (data.pagination.length > 0) {
            setTotalPage(data.pagination[0].totalpage);
            setAllPages(data.pagination[0].totalpage);
          }
        }
      } else if (page_name === "mdLib") {
        const obj = {
          filterfields: updatedFilterScreen.join(","),
        };
        const data = await User.getMedias(token, 1, "", JSON.stringify(obj));
        if (data.code === 200) {
          setMediaLibralyData(data.media);
          if (data.pagination.length > 0) {
            setAllPages(data.pagination[0].totalpage);
          }
        }
      } else if (page_name === "userMgt") {
        const obj = {
          filterfields: updatedFilterScreen.join(","),
        };
        const data = await User.getUsersList(token, 1, "", JSON.stringify(obj));
        if (data.code === 200) {
          setUserLists(data.users);
          if (data.pagination.length > 0) {
            setAllPages(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      // no filter left
      if (page_name === "actLog") {
        getLogData();
      } else if (page_name === "mdLib") {
        getMediaLibralyData();
      } else if (page_name === "userMgt") {
        fetchUsersList();
      }
    }
  };

  const clearFilter = () => {
    setFilter([]);
    setFilterScreen([]);

    if (page_name === "actLog") {
      getLogData();
    } else if (page_name === "mdLib") {
      getMediaLibralyData();
    } else if (page_name === "userMgt") {
      fetchUsersList();
    }
  };

  const handleStartDateChange = async (date) => {
    if (date <= endDatePickers) {
      setStartDatePickers(date);
      setStartDate(date);
      const output = [...filter_screen].join(",");
      const formattedStartDate = format(new Date(date), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(endDatePickers), "yyyy-MM-dd");
      const obj = {
        filterfields: output,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      if (page_name === "actLog") {
        setFact_changeDate(true);
        const data = await User.getActivitylog(
          token,
          1,
          "",
          JSON.stringify(obj)
        );
        if (data.code === 200) {
          setLogData(data.activitylog);
          setExportData(data.activitylog);
          if (data.pagination.length > 0) {
            setTotalPage(data.pagination[0].totalpage);
            setAllPages(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "วันที่เริ่มต้นไม่สามารถน้อยกว่าวันสิ้นสุดได้ ...",
      });
      return;
    }
  };

  const handleEndDateChange = async (date) => {
    if (date >= startDatePickers) {
      setEndDatePickers(date);
      setEndDate(date);
      const output = [...filter_screen].join(",");
      const formattedStartDate = format(
        new Date(startDatePickers),
        "yyyy-MM-dd"
      );
      const formattedEndDate = format(new Date(date), "yyyy-MM-dd");
      const obj = {
        filterfields: output,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      if (page_name === "actLog") {
        setFact_changeDate(true);
        const data = await User.getActivitylog(
          token,
          1,
          "",
          JSON.stringify(obj)
        );
        if (data.code === 200) {
          setLogData(data.activitylog);
          setExportData(data.activitylog);
          if (data.pagination.length > 0) {
            setTotalPage(data.pagination[0].totalpage);
            setAllPages(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "วันที่สิ้นสุดไม่สามารถน้อยกว่าวันเริ่มต้นได้ ...",
      });
      return;
    }
  };

  return (
    <>
      {/* Select Menu */}
      <div
        className={`flex flex-wrap ${
          all_filter_data.length > 7
            ? ` ${
                width ? `w-[${width}px]` : "w-[1500px]"
              } overflow-x-auto custom-scrollbar`
            : ""
        }`}
      >
        <div className="w-[50%] lg:w-full h-[70px]">
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-sm">
              <div className="flex flex-col lg:flex-row space-x-2">
                <div className="w-5/6 flex justify-between items-center ">
                  {all_filter_data.length > 0 &&
                    all_filter_data.map((items, index) => (
                      <div
                        key={items.optionname}
                        className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 "
                      >
                        <select
                          name={items.optionname}
                          id={items.optionname}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-300 rounded-lg shadow-sm p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        >
                          <option value="" disabled selected hidden>
                            {items.optionname}
                          </option>
                          {items.optionvalue.map((items2) => (
                            <option value={`${items.optionkey}!${items2.text}`}>
                              {items2.text}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <IoIosArrowDown size={18} color="#6425FE" />
                        </div>
                      </div>
                    ))}
                </div>
                {page_name === "actLog" ? (
                  <>
                    {" "}
                    <div className="w-5/6 flex justify-between items-center ">
                      <div className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                        <DatePicker
                          selected={startDatePickers}
                          selectsStart
                          startDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                          onChange={(date) => handleStartDateChange(date)}
                          className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-300 rounded-lg shadow-sm p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <IoIosCalendar size={18} color="#6425FE" />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6 flex justify-between items-center ">
                      <div className="relative  h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                        -
                      </div>
                    </div>
                    <div className="w-5/6 flex justify-between items-center ">
                      <div className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                        <DatePicker
                          selected={endDatePickers}
                          selectsStart
                          startDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                          onChange={(date) => handleEndDateChange(date)}
                          className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-300 rounded-lg shadow-sm p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <IoIosCalendar size={18} color="#6425FE" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Select Menu */}

      {/* Filter */}
      <div className="flex flex-wrap w-[1500px] space-y-1">
        {filter &&
          filter.map((items, index) => (
            <button key={index} onClick={() => removeFilter(items, index)}>
              <div className="inline-flex items-center ml-3 px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                <IoIosClose
                  size="20"
                  className="text-[#6425FE] hover:text-[#3b1694] mr-2"
                />
                <div className="font-poppins text-sm">{items}</div>
              </div>
            </button>
          ))}
        {filter.length > 0 && (
          <button onClick={() => clearFilter()}>
            <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] hover:bg-[#3b1694] border-gray-2 rounded-full shadow-sm">
              <div className="grid grid-cols-12">
                <div className="col-span-1 mt-[6px]">
                  <div className="flex justify-end items-center">
                    <IoIosClose size="27" color="#6425FE" />
                  </div>
                </div>
                <div className="col-span-11 mt-[8px]">
                  <div className="flex justify-center items-center">
                    <div className="font-poppins text-sm text-white">
                      Clear All
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
      {/* Filter */}
    </>
  );
};

export default Custom_Filter;
