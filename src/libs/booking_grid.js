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

export const GridTable = ({
  booking_data,
  all_pages,
  searchTerm,
  page_permission,
}) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();

  // Pagination Table
  const [data, setData] = useState(booking_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;
  const [screen_data, setScreenData] = useState([]);

  useEffect(() => {
    getScreenData();
  }, []);

  useEffect(() => {
    setData(booking_data);
  }, [booking_data]);

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getBooking(token, page, searchTerm);
      return data;
    }
  };

  const getScreenData = async () => {
    const all_screens_data = await User.getScreens(token);
    all_screens_data.map(async (items) => {
      const screen_status = await firebase_func.getStatusScreen(items);
      items.screen_status = screen_status;
    });
    setScreenData(all_screens_data);
  };

  const onClickEdit = async (obj) => {
    const replacedString = obj.BookingName.replace(/\//g, "_");
    navigate(`/booking/${replacedString}`, {
      state: { data: obj, screen_data },
    });
  };

  const handleSelectBooking = (obj) => {
    const replacedString = obj.BookingName.replace(/\//g, "_");
    navigate(`/booking/select/${replacedString}`, {
      state: { data: obj, screen_data },
    });
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    // if (data.booking.length > 0) {
    //   data.booking?.sort((a, b) => a.BookingID - b.BookingID);
    // }
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

  const handleDeleteBooking = (booking_data) => {
    Swal.fire({
      text: `คุณต้องการลบ Booking : ${booking_data.BookingName} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        alert("wait function delete");
      }
    });
  };

  const renderTableData = () => {
    return (
      <>
        {data.map((row, index) => (
          <tr key={row.BookingID}>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="font-poppins text-md flex justify-center">
                {row.BookingID}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 ">
              <div
                // onClick={() => handleSelectBooking(row)}
                className="font-poppins text-xl  text-[#6425FE]"
              >
                {row.BookingName}
              </div>
              <div className="font-poppins text-sm text-gray-500">
                {row.AdvertiserName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 ">
              <div className="font-poppins text-md flex justify-center">
                {format(row.BookingStartDate, "dd MMM yyyy")} -{" "}
                {format(row.BookingEndDate, "dd MMM yyyy")}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="flex items-center justify-center">
                <img
                  className="w-[60px] h-[60px] rounded-md border border-gray-300 shadow-lg object-cover"
                  src={
                    row.AdvertiserLogo
                      ? row.AdvertiserLogo
                      : `https://ui-avatars.com/api/?name=${
                          row.AdvertiserName
                        }&background=${"000000"}&color=fff`
                  }
                  alt={row.AdvertiserName}
                />
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="font-poppins text-xl flex justify-center items-center">
                {row.TotalScreen ? row.TotalScreen : 0}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="font-poppins text-xl flex justify-center items-center">
                {row.SlotPerDay ? row.SlotPerDay : 0}
              </div>
            </td>
            {row.BookingStatus === 1 ? (
              <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                <div className="space-x-3">
                  {page_permission?.view ? (
                    <button
                      onClick={() => onClickEdit(row)}
                      className="relative group"
                    >
                      <RiEditLine
                        size={23}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                      <div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: "none" }}
                      >
                        Complete Booking
                      </div>
                    </button>
                  ) : (
                    <></>
                  )}
                  {page_permission?.delete ? (
                    <button
                      onClick={() => handleDeleteBooking(row)}
                      className="relative group"
                    >
                      <RiDeleteBin5Line
                        size={23}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                      <div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: "none" }}
                      >
                        Cancel Booking
                      </div>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </td>
            ) : (
              <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                <div className="space-x-3">
                  {page_permission?.view ? (
                    <button
                      className="relative group"
                      onClick={() => handleSelectBooking(row)}
                    >
                      <RiVideoAddLine
                        size={23}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                      <div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: "none" }}
                      >
                        Manage Content
                      </div>
                    </button>
                  ) : (
                    <></>
                  )}
                  {page_permission?.delete ? (
                    <button
                      onClick={() => handleDeleteBooking(row)}
                      className="relative group"
                    >
                      <RiDeleteBin5Line
                        size={23}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                      <div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: "none" }}
                      >
                        Cancel Booking
                      </div>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </td>
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
            <thead>
              <tr>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[200px]">
                  Booking Name
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider ">
                  Start Date - End Date
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Screens
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Slots
                </th>
                {/* <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Booking Status
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Content Status
              </th> */}
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
