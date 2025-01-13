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
  //   filter_screen,
  getReportScreenData,
}) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();

  // Pagination Table
  const [data, setData] = useState(report_screen_booking);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_report_screen_pages ? all_report_screen_pages : 0;
  const [screen_data, setScreenData] = useState([]);

  useEffect(() => {
    setData(report_screen_booking);
  }, [report_screen_booking]);

  const fetchDataForPage = async (page) => {
    // if (page) {
    //   if (filter_screen.length > 0) {
    //     const result = filter_screen.join(",");
    //     const obj = {
    //       tagids: result,
    //     };
    //     const data = await User.getBooking(token, page, searchTerm, obj);
    //     return data;
    //   } else {
    //     const data = await User.getBooking(token, page, searchTerm);
    //     return data;
    //   }
    // }
  };

  const onClickEdit = async (obj) => {
    // const replacedString = obj.BookingName.replace(/\//g, "_");
    // navigate(`/booking/${replacedString}`, {
    //   state: { data: obj, screen_data },
    // });
  };

  const handleSelectBooking = (obj) => {
    // const replacedString = obj.BookingName.replace(/\//g, "_");
    // navigate(`/booking/select/${replacedString}`, {
    //   state: { data: obj, screen_data },
    // });
  };

  const handleClick = async (page) => {
    // setCurrentPage(page);
    // setPageInput("");
    // const data = await fetchDataForPage(page);
    // setData(data.booking);
  };

  const handlePrevPage = async () => {
    // if (currentPage > 1) {
    //   const newPage = currentPage - 1;
    //   setCurrentPage(newPage);
    //   const data = await fetchDataForPage(newPage);
    //   setData(data.booking);
    // }
  };

  const handleNextPage = async () => {
    // if (currentPage < totalPages) {
    //   const newPage = currentPage + 1;
    //   setCurrentPage(newPage);
    //   const data = await fetchDataForPage(newPage);
    //   setData(data.booking);
    // }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    // const page = Number(pageInput);
    // if (page >= 1 && page <= totalPages) {
    //   setCurrentPage(page);
    //   const data = await fetchDataForPage(page);
    //   setData(data.booking);
    // }
    // setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    // if (e.key === "Enter") {
    //   handlePageInputBlur();
    // }
  };

  const renderTableData = () => {
    return (
      <>
        {data?.map((row, index) => (
          <tr key={row.ScreenID}>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              {row.ScreenID}
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b  border-gray-200 ">
              <div className="flex group relative">
                <div className="font-poppins text-sm">
                  {row.ScreenName.length > 20 ? (
                    <>
                      {row.ScreenName.slice(0, 17) + "..."}
                      <span
                        style={{ pointerEvents: "none" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
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
              <div className="font-poppins text-sm">
                {row.ScreenRule[0].MediaRuleName}
              </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="font-poppins text-sm">{row.ScreenLocation}</div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="font-poppins text-sm">
                {row.ScreenSupport.image === true ? (
                  <FaCheck className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                ) : (
                  <FaXmark className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                )}
              </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="font-poppins text-sm">
                {row.ScreenSupport.video === true ? (
                  <FaCheck className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                ) : (
                  <FaXmark className="text-lg p-2.5 w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center" />
                )}
              </div>
            </td>
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
        <div className="w-auto h-[380px] overflow-auto scrollable-chart-container">
          <table className="min-w-full border border-gray-300">
            <thead className="sticky -top-1  bg-gray-200 z-10">
              <tr>
                <th className="px-6 py-3  text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3  text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider ">
                  Screen Name
                </th>
                <th className="px-6 py-3  text-center leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider ">
                  Size (from media rule)
                </th>
                <th className="px-6 py-3  text-center leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3  text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider ">
                  Image Type
                </th>
                <th className="px-6 py-3  text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider ">
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
