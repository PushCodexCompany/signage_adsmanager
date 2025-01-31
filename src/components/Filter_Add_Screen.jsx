import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import User from "../libs/admin";
import "../index.css";

const Filter = ({
  filter_screen,
  setFilterScreen,
  width,
  page_name,
  setAllPages,
  setScreensData,
  bookingId,
  booking_slot,
  setScreens,
  searchTerm,
  getScreenData,
}) => {
  const { token } = User.getCookieData();
  const [filter, setFilter] = useState([]);
  const [all_filter_data, SetAllFilterData] = useState([]);

  useEffect(() => {
    getFilter();
  }, []);

  const getFilter = async () => {
    const {
      configuration: { pagetags },
    } = await User.getConfiguration(token);

    if (page_name) {
      const result = pagetags.find((page) => page.page === page_name);

      const data = await User.getCategorytags(token);
      const filteredData = data.filter((item) =>
        result.tags.includes(Number(item.TagCategoryID))
      );

      SetAllFilterData(filteredData);
    } else {
      SetAllFilterData([]);
    }
  };

  const handleStatusChange = async (event, type) => {
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

      setFilterScreen((prevFilter) => {
        if (prevFilter.includes(tagID)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagID]; // Add the selected value to the filter state
        }
      });

      if (filter_screen.length > 0) {
        // more than 1 filter
        const output = [...filter_screen, tagID].join(",");

        const obj = {
          tagids: output,
        };

        if (page_name === "digiScrnMgt") {
          let data;
          if (searchTerm === null) {
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              obj
            );
          } else {
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              obj,
              searchTerm
            );
          }

          if (data.code === 200) {
            setScreens(data.screens);
            if (data.pagination.length > 0) {
              setAllPages(data.pagination[0].totalpage);
            }
          }
        }
      } else {
        //  1 filter
        const obj = {
          tagids: tagID,
        };

        if (page_name === "digiScrnMgt") {
          let data;
          if (searchTerm === null) {
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              obj
            );
          } else {
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              obj,
              searchTerm
            );
          }
          if (data.code === 200) {
            setScreens(data.screens);
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
    const [tagID, tagName] = selectedValue.split("!");

    const updatedFilterOutSide = filter_screen.filter(
      (value) => value !== tagID
    );
    const updatedFilterInside = filter.filter((value) => value !== tagName);

    setFilter(updatedFilterInside);
    setFilterScreen(updatedFilterOutSide);

    const updatedFilterScreen = filter_screen.filter((item) => item !== tagID);

    if (updatedFilterScreen.length > 0) {
      // any left
      const obj = {
        tagids: updatedFilterScreen,
      };

      if (page_name === "digiScrnMgt") {
        let data;

        if (searchTerm === null) {
          data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            obj
          );
        } else {
          data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            obj,
            searchTerm
          );
        }
        if (data.code === 200) {
          setScreens(data.screens);
          if (data.pagination.length > 0) {
            setAllPages(data.pagination[0].totalpage);
          }
        }
      }
    } else {
      // no filter left
      if (page_name === "digiScrnMgt") {
        getScreenData("clear");
      }
    }
  };

  const clearFilter = () => {
    setFilter([]);
    setFilterScreen([]);

    if (page_name === "digiScrnMgt") {
      getScreenData("clear");
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
              <div className="flex flex-col lg:flex-row">
                <div className="w-5/6 flex justify-between items-center ">
                  {all_filter_data.length > 0 &&
                    all_filter_data.map((items, index) => (
                      <div
                        key={index}
                        className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 "
                      >
                        <select
                          name={items.TagCategoryName}
                          id={items.TagCategoryName}
                          onChange={(e) => handleStatusChange(e)}
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
                </div>
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

export default Filter;
