import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import User from "../libs/admin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Edit_Static_Booking from "../components/Edit_Static_Booking";

export const GridTable = ({ booking_data, all_pages, searchTerm }) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const [edit_booking_data, setEditBookingData] = useState([]);
  const [modalEditBooking, setModalEditBooking] = useState(false);

  // Pagination Table
  const [data, setData] = useState(booking_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;

  useEffect(() => {
    setData(booking_data);
  }, [booking_data]);

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getBooking(token, page, searchTerm);
      return data;
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

  const formatBookingPeriod = (period) => {
    // Split the input string into start and end dates
    const dates = period.split(",");

    // Function to convert date string to desired format
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const dateParts = date.toLocaleDateString("en-US", options).split(" ");
      let cleanedList = dateParts.map((item) => item.replace(",", ""));

      // Reorder parts to match the desired format and remove commas
      return `${cleanedList[0]} ${cleanedList[2]} ${cleanedList[1]} ${cleanedList[3]}`;
    };

    // Format both dates
    const startDate = formatDate(dates[0]);
    const endDate = formatDate(dates[1]);

    // Join the formatted dates with ' - '
    return `${startDate} - ${endDate}`;
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
              <div className="font-poppins text-xl  text-[#6425FE]">
                {row.BookingName}
              </div>
              <div className="font-poppins text-sm text-gray-500">
                {row.BookingCode}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="flex items-center justify-center">
                <img
                  className="w-[60px] h-[60px] rounded-md object-cover"
                  src={row.AdvertiserLogo}
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
              <div className="font-poppins text-md flex justify-center items-center">
                {formatBookingPeriod(row.BookingPeriod)}
              </div>
            </td>
            {row.Media ? (
              <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="font-poppins text-md flex justify-center items-center">
                  <IoImageOutline size={24} className="text-[#6425FE]" />
                </div>
              </td>
            ) : (
              <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="font-poppins text-md flex justify-center items-center">
                  <IoImageOutline size={24} className="text-[#D1CFD6]" />
                </div>
              </td>
            )}
            {row.BookingStatus === 2 ? (
              <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="font-poppins font-bold text-[#00CB45] text-md flex justify-center items-center">
                  Expire in {row.BookingExpire} Day
                </div>
              </td>
            ) : (
              <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="font-poppins font-bold text-md text-[#FF0000] flex justify-center items-center">
                  Expired
                </div>
              </td>
            )}
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div
                onClick={() => handleEditBooking(row)}
                className="font-poppins text-md flex justify-center items-center"
              >
                <MdOutlineModeEditOutline
                  size={24}
                  className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                />
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

  const handleEditBooking = (row) => {
    setEditBookingData(row);
    setModalEditBooking(!modalEditBooking);
  };

  return (
    <>
      <div>
        <div className="w-auto h-[550px] overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Booking Name
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Merchandise
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Screens
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Booking Period
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Media
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Status
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

      {modalEditBooking && (
        <a
          onClick={() => setModalEditBooking(!modalEditBooking)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalEditBooking && (
        <Edit_Static_Booking
          setModalEditBooking={setModalEditBooking}
          modalEditBooking={modalEditBooking}
          edit_booking_data={edit_booking_data}
        />
      )}
    </>
  );
};
