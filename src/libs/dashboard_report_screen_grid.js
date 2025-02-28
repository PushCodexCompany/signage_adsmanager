import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  RiDeleteBin5Line,
  RiEditLine,
  RiShareBoxLine,
  RiVideoAddLine,
} from "react-icons/ri";
import { FaCheck, FaXmark } from "react-icons/fa6";
import User from "../libs/admin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import firebase_func from "../libs/firebase_func";
import { format } from "date-fns";
import Swal from "sweetalert2";

export const GridTableReportScreen = ({
  report_screen_booking,
  all_report_screen_pages,
  getReportScreenData,
  setExportScreenData,
  filter_tag_screen_page,
  setReportScreenBooking,
  setCurrentPageScreen,
  currentPageScreen,
  searchTermScreen,
}) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();

  // Pagination Table
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_report_screen_pages ? all_report_screen_pages : 0;

  const fetchDataForPage = async (page) => {
    if (page) {
      if (filter_tag_screen_page.length > 0) {
        const result = filter_tag_screen_page.join(",");
        const obj = {
          tagids: result,
        };
        let data;
        if (searchTermScreen === null) {
          data = await User.getDashboardScreen(token, page, obj);
        } else {
          data = await User.getDashboardScreen(
            token,
            page,
            obj,
            searchTermScreen
          );
        }

        return data;
      } else {
        let data;
        if (searchTermScreen === null) {
          data = await User.getDashboardScreen(token, page);
        } else {
          data = await User.getDashboardScreen(
            token,
            page,
            "",
            searchTermScreen
          );
        }

        return data;
      }
    }
  };

  const handleClick = async (page) => {
    if (currentPageScreen !== page) {
      setCurrentPageScreen(page);
      setPageInput("");
      const data = await fetchDataForPage(page);
      setReportScreenBooking(data.screens);
      setExportScreenData(data.screens);
    }
  };

  const handlePrevPage = async () => {
    if (currentPageScreen > 1) {
      const newPage = currentPageScreen - 1;
      setCurrentPageScreen(newPage);
      const data = await fetchDataForPage(newPage);
      setReportScreenBooking(data.screens);
      setExportScreenData(data.screens);
    }
  };

  const handleNextPage = async () => {
    if (currentPageScreen < totalPages) {
      const newPage = currentPageScreen + 1;
      setCurrentPageScreen(newPage);
      const data = await fetchDataForPage(newPage);
      setReportScreenBooking(data.screens);
      setExportScreenData(data.screens);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPageScreen(page);
      const data = await fetchDataForPage(page);
      setReportScreenBooking(data.screens);
      setExportScreenData(data.screens);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const renderTableData = () => {
    return (
      <>
        {console.log("report_screen_booking", report_screen_booking)}
        {report_screen_booking?.map((row, index) => (
          <tr key={row.ScreenID}>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              {row.ScreenID}
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200 ">
              <div className="flex group relative">
                <div className="font-poppins">
                  {row.ScreenName.length > 20 ? (
                    <>
                      {row.ScreenName.slice(0, 17) + "..."}
                      <span
                        style={{ pointerEvents: "none" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      >
                        {row.ScreenName}
                      </span>
                    </>
                  ) : (
                    <>{row.ScreenName}</>
                  )}
                </div>
              </div>
            </td>
            <td className="px-20 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="font-poppins flex justify-center items-center ">
                {row?.ScreenRule[0]?.Width && row?.ScreenRule[0]?.Height
                  ? `W ${parseInt(row.ScreenRule[0].Width, 10)}` +
                    " x " +
                    `H ${parseInt(row.ScreenRule[0].Height, 10)}`
                  : "Not Set"}
              </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="font-poppins ">{row.ScreenLocation}</div>
            </td>
            {row.ScreenRule.length > 0 ? (
              <>
                <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
                  <div className="font-poppins flex justify-center items-center">
                    {row.ScreenRule[0].ImageContentTypeID !== 0 ? (
                      <FaCheck className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                    ) : (
                      <FaXmark className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
                  <div className="font-poppins flex justify-center items-center">
                    {row.ScreenRule[0].VideoContentTypeID !== 0 ? (
                      <FaCheck className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                    ) : (
                      <FaXmark className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                    )}
                  </div>
                </td>
              </>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </>
    );
  };

  const renderPageNumbers = () => {
    let displayPages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        displayPages.push(i);
      }
    } else {
      if (currentPageScreen <= 4) {
        displayPages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPageScreen >= totalPages - 3) {
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
          currentPageScreen - 1,
          currentPageScreen,
          currentPageScreen + 1,
          "...",
          totalPages,
        ];
      }
    }

    return displayPages.map((number, index) => (
      <button
        key={index}
        className={`px-3 py-1 mx-1 ${
          currentPageScreen === number
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
        <div className="w-auto h-[480px] overflow-auto scrollable-chart-container">
          <table className="min-w-full border border-gray-300">
            <thead className="sticky -top-1  bg-gray-200 z-10">
              <tr>
                <th className="px-1 py-5 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[10px]">
                  ID
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[150px]">
                  Screen Name
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[250px]">
                  Size (from media rule)
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[250px]">
                  Location
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[250px]">
                  Image Type
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[250px]">
                  Video Type
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
              currentPageScreen === 1
                ? "text-[#bfbfbf]"
                : "cursor-pointer hover:text-[#bfbfbf]"
            }`}
          />
          {renderPageNumbers()}
          <IoIosArrowForward
            onClick={handleNextPage}
            size={26}
            className={`${
              currentPageScreen === totalPages
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
