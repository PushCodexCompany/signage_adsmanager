import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  RiDeleteBin5Line,
  RiEditLine,
  RiShareBoxLine,
  RiVideoAddLine,
} from "react-icons/ri";
import User from "../libs/admin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import firebase_func from "../libs/firebase_func";
import { format } from "date-fns";
import Swal from "sweetalert2";

export const GridTableReportStatus = ({
  report_status_booking,
  all_report_booking_pages,
  getReportData,
  filter_tag_screen,
  filter_option_screen,
  startDate,
  endDate,
  date_tricker,
}) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();

  // Pagination Table
  const [data, setData] = useState(report_status_booking);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_report_booking_pages ? all_report_booking_pages : 0;
  const [screen_data, setScreenData] = useState([]);

  useEffect(() => {
    setData(report_status_booking);
  }, [report_status_booking]);

  const fetchDataForPage = async (page) => {
    if (page) {
      if (filter_tag_screen || filter_option_screen) {
        let obj;
        if (filter_tag_screen && filter_option_screen) {
          if (date_tricker) {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                filterfields: filter_option_screen,
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {},
            };
          }
        } else if (filter_tag_screen) {
          if (date_tricker) {
            obj = {
              tagids: filter_tag_screen,
              optionkey: {
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              tagids: filter_tag_screen,
            };
          }
        } else if (filter_option_screen) {
          if (date_tricker) {
            obj = {
              optionkey: {
                filterfields: filter_option_screen,
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              optionkey: {
                filterfields: filter_option_screen,
              },
            };
          }
        }
        const data = await User.getDashboardBooking(token, page, obj);
        return data;
      } else {
        const data = await User.getDashboardBooking(token, page);
        return data;
      }
    }
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.booking);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.booking);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.booking);
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
      setData(data.booking);
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
        {data?.map((row, index) => (
          <tr key={row.BookingID}>
            <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
              <div className="font-poppins text-md flex justify-center">
                {row.BookingID}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200 ">
              <div className="flex group relative">
                <div className="font-poppins text-xl ">
                  {row.BookingName.length > 20 ? (
                    <>
                      {row.BookingName.slice(0, 17) + "..."}
                      <span
                        style={{ pointerEvents: "none" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {row.BookingName}
                      </span>
                    </>
                  ) : (
                    <>{row.BookingName}</>
                  )}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b font-poppins border-gray-200">
              <div className="flex items-center justify-start space-x-2">
                <img
                  className="w-[30px] h-[30px] rounded-md border border-gray-200 shadow-sm object-cover"
                  src={
                    row.AdvertiserLogo
                      ? row.AdvertiserLogo
                      : `https://ui-avatars.com/api/?name=${
                          row.AdvertiserName
                        }&background=${"000000"}&color=fff`
                  }
                  alt={row.AdvertiserName}
                />
                <div className="font-poppins text-md">{row.AdvertiserName}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
              <div className="font-poppins text-md flex justify-center items-center">
                {row.BookingStatus === 0
                  ? "Published"
                  : row.BookingStatus === 1
                  ? "Incomplete Booking"
                  : row.BookingStatus === 2
                  ? "Non Publish"
                  : row.BookingStatus === 3
                  ? "Inactive"
                  : "No Status"}
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
        <div className="w-auto h-[480px] overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="sticky -top-1  bg-gray-200 z-9">
              <tr>
                <th className="px-1 py-5 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[10px]">
                  ID
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[250px]">
                  Booking Name
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[300px]">
                  Customer Name
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[150px]">
                  Booking Status
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
