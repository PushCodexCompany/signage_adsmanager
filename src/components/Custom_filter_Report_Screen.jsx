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
import { filter } from "lodash";
import "./css/datepicker.css";

const Custom_filter_Report_Screen = ({
  page_name,
  setFilterOptionScreen,
  filter_option_screen,
  setFilterTagScreen,
  filter_tag_screen,
  width,
  setFilterTag,
  filterTag,
  setFilterOption,
  filterOption,
  getReportData,
  setAllReportBookingPages,
  setReportStatusBooking,
  setStartDate,
  setEndDate,
  setStartDatePickers,
  setEndDatePickers,
  startDatePickers,
  endDatePickers,
  setDateTricker,
  date_tricker,
  setTotalPageBooking,
}) => {
  const { token } = User.getCookieData();
  //   const [filter, setFilter] = useState([]);
  const [all_filter_tag_data, setAllFilterTagData] = useState([]);
  const [all_filter_option_data, setAllFilterOptionData] = useState([]);

  useEffect(() => {
    getTagFilter();
    getOptionFilter();
  }, []);

  const getTagFilter = async () => {
    const {
      configuration: { pagetags },
    } = await User.getConfiguration(token);

    if (page_name) {
      const result = pagetags.find((page) => page.page === page_name);

      const data = await User.getCategorytags(token);
      const filteredData = data.filter((item) =>
        result.tags.includes(Number(item.TagCategoryID))
      );

      setAllFilterTagData(filteredData);
    } else {
      setAllFilterTagData([]);
    }
  };

  const getOptionFilter = async () => {
    const {
      configuration: { pagefilters },
    } = await User.getConfiguration(token);
    if (page_name) {
      const result = pagefilters.find((page) => page.page === page_name);
      setAllFilterOptionData(result.options);
    } else {
      setAllFilterOptionData([]);
    }
  };

  const handleStatusTagChange = async (event) => {
    const selectedValue = event.target.value;
    const [tagID, tagName] = selectedValue.split("!");

    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilterTag((prevFilter) => {
        if (prevFilter.includes(tagName)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagName]; // Add the selected value to the filter state
        }
      });

      setFilterTagScreen((prevFilter) => {
        if (prevFilter.includes(tagID)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagID]; // Add the selected value to the filter state
        }
      });

      if (filter_tag_screen.length > 0) {
        const output = [...filter_tag_screen, tagID].join(",");
        let obj;

        if (filter_option_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: output,
              optionkey: {
                filterfields: filter_option_screen.join(","),
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: output,
              optionkey: {
                filterfields: filter_option_screen.join(","),
              },
            };
          }
        } else {
          if (date_tricker) {
            obj = {
              tagids: output,
              optionkey: {
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: output,
            };
          }
        }

        if (page_name === "dashBookingRpt") {
          const data = await User.getDashboardBooking(token, 1, obj);
          if (data.code === 200) {
            setReportStatusBooking(data.booking);
            if (data.pagination.length > 0) {
              setAllReportBookingPages(data.pagination[0].totalpage);
              setTotalPageBooking(data.pagination[0].totalpage);
            }
          }
        }
      } else {
        //  1 filter
        let obj;
        if (filter_option_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: tagID,
              optionkey: {
                filterfields: filter_option_screen.join(","),
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: tagID,
              optionkey: {
                filterfields: filter_option_screen.join(","),
              },
            };
          }
        } else {
          if (date_tricker) {
            obj = {
              tagids: tagID,
              optionkey: {
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: tagID,
            };
          }
        }

        if (page_name === "dashBookingRpt") {
          const data = await User.getDashboardBooking(token, 1, obj);
          if (data.code === 200) {
            setReportStatusBooking(data.booking);
            if (data.pagination.length > 0) {
              setAllReportBookingPages(data.pagination[0].totalpage);
              setTotalPageBooking(data.pagination[0].totalpage);
            }
          }
        }
      }

      event.target.value = "";
    }
  };

  const handleStatusOptionChange = async (event) => {
    const selectedValue = event.target.value;
    const [tagID, tagName] = selectedValue.split("!");

    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      const result = all_filter_option_data
        .map((option) => option.optionvalue) // Get the optionvalue arrays
        .flat() // Flatten the nested arrays into a single array
        .find((option) => option.text === tagName); // Find the object where text matches

      const value = result ? result.value : null;

      setFilterOption((prevFilter) => {
        if (prevFilter.includes(tagName)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagName]; // Add the selected value to the filter state
        }
      });
      setFilterOptionScreen((prevFilter) => {
        if (prevFilter.includes(`${tagID}-${value}`)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, `${tagID}-${value}`]; // Add the selected value to the filter state
        }
      });
      if (filter_option_screen.length > 0) {
        const output = [...filter_option_screen, `${tagID}-${value}`].join(",");
        let obj;
        if (filter_tag_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                filterfields: output,
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                filterfields: output,
              },
            };
          }
        } else {
          if (date_tricker) {
            obj = {
              optionkey: {
                filterfields: output,
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              optionkey: {
                filterfields: output,
              },
            };
          }
        }

        if (page_name === "dashBookingRpt") {
          const data = await User.getDashboardBooking(token, 1, obj);
          if (data.code === 200) {
            setReportStatusBooking(data.booking);
            if (data.pagination.length > 0) {
              setAllReportBookingPages(data.pagination[0].totalpage);
              setTotalPageBooking(data.pagination[0].totalpage);
            }
          }
        }
      } else {
        let obj;
        if (filter_tag_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                filterfields: `${tagID}-${value}`,
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                filterfields: `${tagID}-${value}`,
              },
            };
          }
        } else {
          if (date_tricker) {
            obj = {
              optionkey: {
                filterfields: `${tagID}-${value}`,
                startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
                endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
              },
            };
          } else {
            obj = {
              optionkey: {
                filterfields: `${tagID}-${value}`,
              },
            };
          }
        }

        if (page_name === "dashBookingRpt") {
          const data = await User.getDashboardBooking(token, 1, obj);
          if (data.code === 200) {
            setReportStatusBooking(data.booking);
            if (data.pagination.length > 0) {
              setAllReportBookingPages(data.pagination[0].totalpage);
              setTotalPageBooking(data.pagination[0].totalpage);
            }
          }
        }
      }

      event.target.value = "";
    }
  };

  const removeTagFilter = async (event, index) => {
    const selectedValue = `${filter_tag_screen[index]}!${event}`;
    const [tagID, tagName] = selectedValue.split("!");
    const updatedFilterOutSide = filter_tag_screen.filter(
      (value) => value !== tagID
    );

    const updatedFilterInside = filterTag.filter((value) => value !== tagName);
    setFilterTag(updatedFilterInside);
    setFilterTagScreen(updatedFilterOutSide);

    const updatedFilterScreen = filter_tag_screen.filter(
      (item) => item !== tagID
    );

    if (updatedFilterScreen.length > 0 || filter_option_screen.length > 0) {
      // any left
      let obj;

      if (updatedFilterScreen.length > 0 && filter_option_screen.length > 0) {
        if (date_tricker) {
          obj = {
            tagids: updatedFilterScreen,
            optionkey: {
              filterfields: filter_option_screen.join(","),
              startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            tagids: updatedFilterScreen,
            optionkey: {
              filterfields: filter_option_screen.join(","),
            },
          };
        }
      } else if (
        updatedFilterScreen.length > 0 &&
        filter_option_screen.length <= 0
      ) {
        if (date_tricker) {
          obj = {
            tagids: updatedFilterScreen,
            optionkey: {
              startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            tagids: updatedFilterScreen,
          };
        }
      } else if (
        updatedFilterScreen.length <= 0 &&
        filter_option_screen.length > 0
      ) {
        if (date_tricker) {
          obj = {
            optionkey: {
              filterfields: filter_option_screen.join(","),
              startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            optionkey: {
              filterfields: filter_option_screen.join(","),
            },
          };
        }
      }

      if (page_name === "dashBookingRpt") {
        const data = await User.getDashboardBooking(token, 1, obj);
        if (data.code === 200) {
          setReportStatusBooking(data.booking);
          if (data.pagination.length > 0) {
            setAllReportBookingPages(data.pagination[0].totalpage);
            setTotalPageBooking(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      // no filter left
      if (page_name === "dashBookingRpt") {
        getReportData();
      }
    }
  };

  const removeOptionFilter = async (event, index) => {
    const selectedValue = `${filter_option_screen[index]}!${event}`;
    const [tagID, value] = selectedValue.split("!");
    const updatedFilterOutSide = filter_option_screen.filter(
      (value) => value !== tagID
    );
    const updatedFilterInside = filterOption.filter(
      (option) => option !== value
    );

    setFilterOption(updatedFilterInside);
    setFilterOptionScreen(updatedFilterOutSide);
    const updatedFilterScreen = filter_option_screen.filter(
      (item) => item !== tagID
    );

    if (updatedFilterScreen.length > 0 || filter_tag_screen.length > 0) {
      // any left
      let obj;

      if (updatedFilterScreen.length > 0 && filter_tag_screen.length > 0) {
        if (date_tricker) {
          obj = {
            tagids: filter_tag_screen,
            optionkey: {
              filterfields: updatedFilterScreen.join(","),
              startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            tagids: filter_tag_screen,
            optionkey: {
              filterfields: updatedFilterScreen.join(","),
            },
          };
        }
      } else if (
        updatedFilterScreen.length > 0 &&
        filter_tag_screen.length <= 0
      ) {
        if (date_tricker) {
          obj = {
            optionkey: {
              filterfields: updatedFilterScreen.join(","),
              startDate: format(new Date(startDatePickers), "yyyy-MM-dd"),
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            optionkey: {
              filterfields: updatedFilterScreen.join(","),
            },
          };
        }
      } else if (
        updatedFilterScreen.length <= 0 &&
        filter_tag_screen.length > 0
      ) {
        if (date_tricker) {
          obj = {
            tagids: filter_tag_screen,
            optionkey: {
              endDate: format(new Date(endDatePickers), "yyyy-MM-dd"),
            },
          };
        } else {
          obj = {
            tagids: filter_tag_screen,
          };
        }
      }

      if (page_name === "dashBookingRpt") {
        const data = await User.getDashboardBooking(token, 1, obj);
        if (data.code === 200) {
          setReportStatusBooking(data.booking);
          if (data.pagination.length > 0) {
            setAllReportBookingPages(data.pagination[0].totalpage);
            setTotalPageBooking(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      // no filter left
      if (page_name === "dashBookingRpt") {
        getReportData();
      }
    }
  };

  const clearFilter = () => {
    setFilterTag([]);
    setFilterOption([]);
    setFilterTagScreen([]);
    setFilterOptionScreen([]);
    setStartDatePickers(new Date());
    setEndDatePickers(new Date());
    setDateTricker(false);
    if (page_name === "dashBookingRpt") {
      getReportData();
    }
  };

  const handleStartDateChange = async (date) => {
    if (date <= endDatePickers) {
      setStartDatePickers(date);
      setStartDate(date);

      let filtertag = filter_tag_screen.join(",");
      let filteroption = filter_option_screen.join(",");

      // const output = [...filter_screen].join(",");
      const formattedStartDate = format(new Date(date), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(endDatePickers), "yyyy-MM-dd");
      let obj;
      if (filtertag || filteroption) {
        if (filtertag && filteroption) {
          obj = {
            tagids: filtertag,
            optionkey: {
              filterfields: filteroption,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        } else if (filtertag) {
          obj = {
            tagids: filtertag,
            optionkey: {
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        } else if (filteroption) {
          obj = {
            optionkey: {
              filterfields: filteroption,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        }
      } else {
        obj = {
          optionkey: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        };
      }
      if (page_name === "dashBookingRpt") {
        setDateTricker(true);
        const data = await User.getDashboardBooking(token, 1, obj);
        if (data.code === 200) {
          setReportStatusBooking(data.booking);
          if (data.pagination.length > 0) {
            setAllReportBookingPages(data.pagination[0].totalpage);
            setTotalPageBooking(data.pagination[0].totalpage);
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

      let filtertag = filter_tag_screen.join(",");
      let filteroption = filter_option_screen.join(",");

      const formattedStartDate = format(
        new Date(startDatePickers),
        "yyyy-MM-dd"
      );
      const formattedEndDate = format(new Date(date), "yyyy-MM-dd");

      let obj;

      if (filtertag || filteroption) {
        if (filtertag && filteroption) {
          obj = {
            tagids: filtertag,
            optionkey: {
              filterfields: filteroption,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        } else if (filtertag) {
          obj = {
            tagids: filtertag,
            optionkey: {
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        } else if (filteroption) {
          obj = {
            optionkey: {
              filterfields: filteroption,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          };
        }
      } else {
        obj = {
          optionkey: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        };
      }

      if (page_name === "dashBookingRpt") {
        setDateTricker(true);
        const data = await User.getDashboardBooking(token, 1, obj);
        if (data.code === 200) {
          setReportStatusBooking(data.booking);
          if (data.pagination.length > 0) {
            setAllReportBookingPages(data.pagination[0].totalpage);
            setTotalPageBooking(data.pagination[0].totalpage);
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
      <div
        className={`flex flex-wrap ${
          all_filter_option_data.length > 7 || all_filter_tag_data.length > 7
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
                  {all_filter_tag_data.length > 0 &&
                    all_filter_tag_data.map((items, index) => (
                      <div
                        key={index}
                        className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 "
                      >
                        <select
                          name={items.TagCategoryName}
                          id={items.TagCategoryName}
                          onChange={handleStatusTagChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-300 rounded-lg shadow-sm p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        >
                          <option value="" disabled selected hidden>
                            {items.TagCategoryName}
                          </option>
                          {items.tags.map((items) => (
                            <option value={`${items.TagID}!${items.TagName}`}>
                              {items.TagName}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <IoIosArrowDown size={18} color="#6425FE" />
                        </div>
                      </div>
                    ))}
                  {all_filter_option_data.length > 0 &&
                    all_filter_option_data.map((items, index) => (
                      <div
                        key={items.optionname}
                        className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 "
                      >
                        <select
                          name={items.optionname}
                          id={items.optionname}
                          onChange={handleStatusOptionChange}
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
                {page_name === "dashBookingRpt" ? (
                  <>
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
                      <div className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 z-11">
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

      <div className="flex flex-wrap w-[1500px] space-y-1">
        {filterTag.length > 0 &&
          filterTag.map((items, index) => (
            <button key={index} onClick={() => removeTagFilter(items, index)}>
              <div className="inline-flex items-center ml-3 px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                <IoIosClose
                  size="20"
                  className="text-[#6425FE] hover:text-[#3b1694] mr-2"
                />
                <div className="font-poppins text-sm">{items}</div>
              </div>
            </button>
          ))}
        {filterOption.length > 0 &&
          filterOption.map((items, index) => (
            <button
              key={index}
              onClick={() => removeOptionFilter(items, index)}
            >
              <div className="inline-flex items-center ml-3 px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                <IoIosClose
                  size="20"
                  className="text-[#6425FE] hover:text-[#3b1694] mr-2"
                />
                <div className="font-poppins text-sm">{items}</div>
              </div>
            </button>
          ))}
        {filterTag.length > 0 || filterOption.length > 0 ? (
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Custom_filter_Report_Screen;
