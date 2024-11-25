import React, { useState, useEffect } from "react";
import {
  IoIosClose,
  IoIosCloseCircle,
  IoIosAdd,
  IoIosSearch,
} from "react-icons/io";
import { format } from "date-fns";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Filter from "../components/Filter";

const Remove_From_Screen = ({
  setSelectedData,
  setCheckboxes,
  setIsRemoveFromScreen,
  isRemoveFromScreen,
  booking_date,
  selectAll,
  toggleAllCheckboxes,
  checkboxes,
  toggleCheckboxAddScreen,
  //   screenSelectFromEdit,
  media_rules_select,
  screen,
  selectedScreenItems,
  setScreenRemoveContent,
}) => {
  const [filter_screen, setFilterScreen] = useState([]);
  const [screen_filter, setScreenFilter] = useState([]);
  useEffect(() => {
    filterByMediaRules();
    handleSetDefaultCheckbox();
  }, []);

  const filterByMediaRules = () => {
    // const filteredScreens = screen.filter((screen) => {
    //   if (screen.ScreenRule.length === 0) return false; // If no ScreenRule, exclude the screen
    //   const rule = screen.ScreenRule[0]; // Assuming there's only one rule per screen
    //   return (
    //     rule.Width === `${media_rules_select.width}.00` &&
    //     rule.Height === `${media_rules_select.height}.00`
    //   );
    // });

    // setScreenFilter(filteredScreens);
    setScreenFilter(screen);
  };

  const handleSetDefaultCheckbox = () => {
    // if (Object.keys(checkboxes).length <= 1) {
    //   const output = { [screenSelectFromEdit]: true };
    //   setCheckboxes(output);
    // }
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

  const search = () => {
    alert("search");
  };

  const handleRemoveContent = () => {
    const screensToReturn = screen_filter.filter((screen) =>
      selectedScreenItems.includes(screen.ScreenID)
    );
    setScreenRemoveContent(screensToReturn);
    setIsRemoveFromScreen(!isRemoveFromScreen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                setIsRemoveFromScreen(!isRemoveFromScreen);
                setSelectedData([]);
                setCheckboxes({});
              }}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <div className="font-poppins text-5xl font-bold">Remove Screens</div>
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
          </div>
        </div>
        {/* Search Box */}
        <div className="p-1 mt-1">
          <div className="basis-8/12 lg:basis-11/12 rounded-lg border border-gray-200">
            <div className="flex">
              <NavButton
                customFunc={search}
                title="Search"
                color="grey"
                icon={<IoIosSearch />}
              />
              <input
                className=" w-full h-[46px] rounded relative border-gray-500  transition font-poppins"
                type="text"
                name="name"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        {/* Search Box */}
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        <div className="mt-5 p-6">
          <div className="font-poppins">
            *Search result displays only screens available in your booking
          </div>
        </div>
        <div className="p-4">
          <div className="w-auto h-[350px] overflow-y-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
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
                  <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Screen Name
                  </th>
                  <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Media Rule
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Tag
                  </th>
                  {/* <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
              Action
            </th> */}
                </tr>
              </thead>
              <tbody>
                {screen_filter.length > 0 ? (
                  screen_filter.map((row, key) => (
                    <tr key={row.ScreenID}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className=" h-5 w-5 cursor-pointer"
                            checked={checkboxes[row.ScreenID] || false}
                            onChange={() =>
                              toggleCheckboxAddScreen(row.ScreenID)
                            }
                            // disabled={
                            //   row.ScreenID === screenSelectFromEdit
                            //     ? true
                            //     : false
                            // }
                          />
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="flex items-center">
                          <div className="font-poppins text-xl font-bold">
                            {row.ScreenName}
                          </div>
                          {row.screen_status === 0 ? (
                            <div className="bg-red-500 w-1 h-1 rounded-full ml-2"></div>
                          ) : (
                            <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="font-poppins text-sm text-[#59606C] font-bold">
                          {row.ScreenLocation || "No Data"}
                        </div>
                        <div className="font-poppins text-sm font-bold">
                          {row.province || "No Data"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
                        <div className="font-poppins font-bold">
                          {/* {findScreenResolutionID(row.ScreenResolutionID)} */}
                          {row?.ScreenRule[0]?.Width &&
                          row?.ScreenRule[0]?.Height
                            ? parseInt(row.ScreenRule[0].Width, 10) +
                              "x" +
                              parseInt(row.ScreenRule[0].Height, 10)
                            : "Not Set"}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex flex-wrap">
                          {row.ScreenTag.length > 0 ? (
                            row.ScreenTag.map((items, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                                style={{
                                  flexBasis: `calc(${
                                    100 / row.ScreenTag.length
                                  }% - 8px)`,
                                }}
                              >
                                <div className="font-poppins text-xs font-bold">
                                  {items.TagName}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                              className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                              style={{ flexBasis: "calc(100% - 8px)" }}
                            >
                              <div className="font-poppins text-xs font-bold">
                                No Tag
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 text-center whitespace-nowrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button
                      className="w-36 h-6 bg-[#6425FE] text-white text-sm font-poppins rounded-md"
                      // onClick={() => handleClickViewDetail(row)}
                    >
                      View Detail
                    </button>
                  </div>
                </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4">
                      <div className="flex justify-center items-center">
                        <span className="text-gray-300 text-4xl">
                          No Screen(s) Match with Media Rules
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
            onClick={() => handleRemoveContent()}
            className="w-[20%] bg-[#6425FE] text-white text-xl py-2 rounded-lg font-bold font-poppins "
          >
            Select Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remove_From_Screen;
