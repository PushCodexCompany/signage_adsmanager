import React, { useState, useEffect } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Navbar from "../components/Navbar_modal";
import Filter from "../components/Filter";
import { format } from "date-fns";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import User from "../libs/admin";
import firebase_func from "../libs/firebase_func";

const Add_Screen_Booking = ({
  showAddScreen,
  setShowAddScreen,
  booking_date,
  openAddNewScreenModal,
  setOpenAddNewScreenModal,
  selectAll,
  toggleAllCheckboxes,
  checkboxes,
  toggleCheckboxAddScreen,
  handleAddScreen,
  booking_slot,
  bookingId,
  setShowDetailScreen,
  showDetailScreen,
  setDetailScreen,
}) => {
  const { token } = User.getCookieData();
  const [screen, setScreens] = useState([]);
  const [temp_screen, setTempScreen] = useState([]);
  const [screens_options_data, setScreenOptionsData] = useState([]);
  const [CityData, setCityData] = useState([]);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    getScreenData();
    getScreenOption();
    getCity();
  }, [openAddNewScreenModal]);

  useEffect(() => {
    getScreenData(filter_screen);
  }, [filter_screen]);

  useEffect(() => {
    FilterScreen();
  }, [searchTerm]);

  const getScreenData = async (filter) => {
    try {
      let data;
      if (filter && filter?.length > 0) {
        data = await User.getScreensWithAdsCapacityAndTag(
          bookingId,
          booking_slot,
          filter,
          token
        );
      } else {
        data = await User.getScreensWithAdsCapacity(
          bookingId,
          booking_slot,
          token
        );
      }

      // Using Promise.all to handle asynchronous mapping
      const updatedData = await Promise.all(
        data.map(async (items) => {
          const screen_status = await firebase_func.getStatusScreen(items);
          items.screen_status = screen_status;
          return items;
        })
      );
      setScreens(updatedData);
      setTempScreen(updatedData);
    } catch (error) {
      console.error("Error fetching screen data:", error);
    }
  };

  const FilterScreen = () => {
    if (searchTerm?.length > 0) {
      const filteredScreens = screen.filter((s) =>
        s.ScreenName.includes(searchTerm)
      );
      setScreens(filteredScreens);
    } else {
      setScreens(temp_screen);
    }
  };

  const getScreenOption = async () => {
    const data = await User.getScreensOptions(token);
    setScreenOptionsData(data.screenresolution);
  };

  const getCity = async () => {
    const data = await User.getConfiguration(token);
    setCityData(data?.configuration?.cities);
  };

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const handleCloseAddScreen = () => {
    setShowAddScreen(!showAddScreen);
  };

  const search = () => {
    alert("search");
  };

  const handleClickViewDetail = (data) => {
    setDetailScreen(data);
    setShowDetailScreen(!showDetailScreen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => handleCloseAddScreen()}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <div className="font-poppins text-5xl text-[#2F3847] font-bold">
            Select Screen to Booking
          </div>
        </div>
        <div className="mt-1">
          <div className="grid grid-cols-4">
            <div className="flex justify-end items-center col-span-3">
              <div className="font-poppins text-xs lg:text-xl text-[#2F3847] mr-28">
                {`You Booking Period : ${format(
                  booking_date[0],
                  "EEE dd MMM yyyy"
                )} - ${format(
                  booking_date[booking_date.length - 1],
                  "EEE dd MMM yyyy"
                )}`}
              </div>
            </div>
            <div className="flex justify-end items-center col-span-1 ">
              <button
                onClick={() => setOpenAddNewScreenModal(!openAddNewScreenModal)}
                className="bg-[#6425FE] hover:bg-[#3b1694] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
              >
                Create New Screen
              </button>
            </div>
          </div>
        </div>
        <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <Filter
          filter_screen={filter_screen}
          setFilterScreen={setFilterScreen}
        />

        <div className="mt-5 p-6">
          <div className="font-poppins">
            *Search result displays only screens available in your booking
          </div>
        </div>

        <div className="p-4">
          <div className="w-auto h-[300px] overflow-y-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={selectAll}
                        onChange={toggleAllCheckboxes}
                      />
                      <span
                        className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          selectAll ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 text-white ${
                            selectAll ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </th>
                  <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[200px]">
                    Screen Name
                  </th>
                  <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[300px]">
                    Location
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[200px]">
                    Media Rule
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                    Tag
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {screen.length > 0 ? (
                  screen.map((row, key) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className=" h-5 w-5 cursor-pointer"
                            checked={checkboxes[row.ScreenID] || false}
                            onChange={() =>
                              toggleCheckboxAddScreen(row.ScreenID)
                            }
                          />
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="flex items-center group relative">
                          <div className="font-poppins text-lg font-bold">
                            {row.ScreenName.length > 20 ? (
                              <>
                                {row.ScreenName.slice(0, 17) + "..."}
                                <div
                                  style={{ pointerEvents: "none" }}
                                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                >
                                  {row.ScreenName}
                                </div>
                              </>
                            ) : (
                              <>{row.ScreenName}</>
                            )}
                          </div>
                          {row.screen_status === 1 ? (
                            <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                          ) : (
                            <div className="bg-red-500 w-1 h-1 rounded-full ml-2"></div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="flex justify-start items-center group relative">
                          <div className="font-poppins text-sm text-[#59606C] font-bold ">
                            {row.ScreenLocation.length > 39 ? (
                              <>
                                {row.ScreenLocation.slice(0, 36) + "..."}
                                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                  {row.ScreenLocation}
                                </span>
                              </>
                            ) : (
                              <>{row.ScreenLocation}</>
                            )}
                          </div>
                        </div>
                        <div className="font-poppins text-sm font-bold">
                          {CityData.find(
                            (items) => items.CityID === row.ScreenCity
                          )?.NameEN || "No Data"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="font-poppins font-bold">
                          {row?.ScreenRule[0]?.Width &&
                          row?.ScreenRule[0]?.Height
                            ? `W ${parseInt(row.ScreenRule[0].Width, 10)}` +
                              " x " +
                              `H ${parseInt(row.ScreenRule[0].Height, 10)}`
                            : "Not Set"}
                        </div>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex flex-wrap">
                          {row.ScreenTag.length > 0 ? (
                            row.ScreenTag.map((items, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 shadow-sm rounded-lg flex justify-center items-center mb-1 mr-1"
                                style={{ padding: "2px 4px" }}
                              >
                                <div className="p-1">
                                  <div
                                    className="font-poppins text-xs font-bold"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {items.TagName}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                              className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                              style={{
                                flexBasis: "calc(100% - 8px)",
                                padding: "2px 4px",
                              }}
                            >
                              <div
                                className="font-poppins text-xs font-bold"
                                style={{ fontSize: "10px" }}
                              >
                                No Tag
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap border-b  border-gray-200">
                        <div className="space-x-2">
                          <button
                            className="w-36 h-6 bg-[#6425FE] text-white text-sm font-poppins rounded-md"
                            onClick={() => handleClickViewDetail(row)}
                          >
                            View Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4">
                      <div className="flex justify-center items-center">
                        <span className="text-gray-300 text-4xl">
                          No Screen(s)
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-1 mb-3 flex items-center justify-center">
          <button
            onClick={() => handleAddScreen()}
            className="w-[20%] bg-[#6425FE] hover:bg-[#3b1694] text-white text-xl py-2 rounded-lg font-bold font-poppins "
          >
            Select Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add_Screen_Booking;
