import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BiLinkAlt, BiUnlink } from "react-icons/bi";
import { RiDeleteBin5Line, RiEditLine, RiCalendar2Fill } from "react-icons/ri";
import User from "../libs/admin";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import firebase_func from "../libs/firebase_func";
import { filter } from "lodash";

export const GridTable = ({
  screens_data,
  all_pages,
  checkboxes,
  toggleCheckboxAddScreen,
  CityData,
  handleClickViewDetail,
  selectAll,
  toggleAllCheckboxes,
  searchTerm,
  bookingId,
  booking_slot,
  filter_screen,
}) => {
  const navigate = useNavigate();

  // table
  const { token } = User.getCookieData();
  const [data, setData] = useState(screens_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;

  useEffect(() => {
    generateStatus();
  }, [screens_data]);

  useEffect(() => {
    setData(screens_data);
  }, [screens_data]);

  const generateStatus = async () => {
    const updatedScreens = await Promise.all(
      screens_data.map(async (items) => {
        const screen_status = await firebase_func.getStatusScreen(items);
        return { ...items, screen_status }; // Return updated screen object
      })
    );
    setData(updatedScreens); // Set updated screens data after all statuses are fetched
  };

  const setScreenStatus = async (data) => {
    const updatedScreens = await Promise.all(
      data.map(async (items) => {
        const screen_status = await firebase_func.getStatusScreen(items);
        return { ...items, screen_status }; // Return updated screen object
      })
    );
    setData(updatedScreens); // Set updated screens data after all statuses are fetched
  };

  const fetchDataForPage = async (page) => {
    if (page) {
      if (searchTerm === null) {
        if (filter_screen.length > 0) {
          const result = filter_screen.join(",");
          const obj = {
            tagids: result,
          };
          const data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            page,
            obj
          );
          return data;
        } else {
          const data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            page
          );
          return data;
        }
      } else {
        if (filter_screen.length > 0) {
          const result = filter_screen.join(",");
          const obj = {
            tagids: result,
          };
          const data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            obj,
            searchTerm
          );
          return data;
        } else {
          const data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            "",
            searchTerm
          );
          return data;
        }
      }
    }
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setScreenStatus(data.screens);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setScreenStatus(data.screens);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setScreenStatus(data.screens);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const data = await fetchDataForPage(page);
      setScreenStatus(data.screens);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const renderTableData = () => {
    if (data[0].screen_status === undefined) {
      <div>Loading...</div>;
    } else {
      return (
        <>
          {data.map((row, key) => {
            const isScreenPaired = row?.screen_status === 1 ? true : false;
            const status_screen = row?.screen_status === 1 ? true : false;

            return (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className=" h-5 w-5 cursor-pointer"
                      checked={checkboxes[row.ScreenID] || false}
                      onChange={() => toggleCheckboxAddScreen(row.ScreenID)}
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
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
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
                    {CityData.find((items) => items.CityID === row.ScreenCity)
                      ?.NameEN || "No Data"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
                  <div className="font-poppins font-bold">
                    {row?.ScreenRule[0]?.Width && row?.ScreenRule[0]?.Height
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
            );
          })}
        </>
      );
    }
  };

  const renderPageNumbers = () => {
    let displayPages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        displayPages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        displayPages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        displayPages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        displayPages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return displayPages.map((number, index) => (
      <button
        key={index}
        className={`px-3 py-1 mx-1 ${
          currentPage === number
            ? "text-[#6425FE] rounded-md border border-[#6425FE]"
            : "text-[#bfbfbf]"
        }  font-poppins font-bold`}
        onClick={() => number !== "..." && handleClick(number)}
        disabled={number === "..."}
      >
        {number}
      </button>
    ));
  };

  return (
    <>
      <div>
        <div className="w-auto h-[300px] overflow-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="sticky -top-1 bg-gray-200 z-10">
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
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-6">
          <IoIosArrowBack
            onClick={handlePrevPage}
            size={26}
            className={`${
              currentPage === 1
                ? "text-[#bfbfbf]"
                : "cursor-pointer hover:text-[#bfbfbf]"
            }`}
          />
          {renderPageNumbers()}
          <IoIosArrowForward
            onClick={handleNextPage}
            size={26}
            className={`${
              currentPage === totalPages
                ? "text-[#bfbfbf]"
                : "cursor-pointer hover:text-[#bfbfbf]"
            }`}
          />
          <div className="font-poppins font-bold ml-2">Go to</div>
          <input
            type="number"
            min={1}
            value={pageInput}
            onKeyPress={handlePageInputKeyPress}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            className="w-[50px] h-[35px] ml-1 mr-1 border border-gray-300 rounded-sm pl-1 font-poppins"
          />
          <div className="font-poppins font-bold">Page</div>
        </div>
      </div>
    </>
  );
};
