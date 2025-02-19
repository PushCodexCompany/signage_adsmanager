import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../libs/admin";
import Swal from "sweetalert2";
import { BiLinkAlt } from "react-icons/bi";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const GridTable = ({
  // setSelectedScreenItems,
  setSelectInfoScren,
  screens_data,
  all_pages,
  setScreensData,
  searchTerm,
  // screens_options_data,
  setOpenPairScreenModal,
  setOpenUnPairScreenModal,
  openPairScreenModal,
  openUnPairScreenModal,
  setScreenSelect,
  // setCheckboxes,
  // checkboxes,
  // screen_checkbox_select,
  // setScreenCheckboxSelect,
}) => {
  const navigate = useNavigate();

  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  // table
  const { token } = User.getCookieData();
  const [data, setData] = useState(screens_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;

  const renderTableData = () => {
    return (
      <>
        {data.map((row, key) => {
          const isScreenPaired = row?.ScreenStatus
            ? row?.ScreenStatus.is_paired
            : false;

          return (
            <tr key={row.ScreenID}>
              {/* <td className="px-3 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex items-center">
                          <label className="inline-flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="opacity-0 absolute h-5 w-5 cursor-pointer"
                              checked={checkboxes[row.ScreenID] || false} // Set default value to false if row.ScreenID is not present
                              onChange={() =>
                                toggleCheckboxAddScreen(row.ScreenID, row)
                              }
                            />
                            <span
                              className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                                checkboxes[row.ScreenID] ? "bg-white" : ""
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 text-white ${
                                  checkboxes[row.ScreenID]
                                    ? "opacity-100"
                                    : "opacity-0"
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
                        </div>
                      </td> */}
              <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="font-poppins text-md font-bold">
                    {row.ScreenID}
                  </div>
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                <div className="flex">
                  <div
                    onClick={() => handleSelectInfoScreen(row)}
                    className="font-poppins text-md font-bold cursor-pointer"
                  >
                    {row.ScreenName}
                  </div>
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                <div className="font-poppins text-md text-[#59606C] font-bold">
                  {row.ScreenLocation || "No Data"}
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                <div className="flex justify-center items-center font-poppins font-bold">
                  {/* {findScreenResolutionID(row.ScreenResolutionID)} */}
                  {row?.ScreenRule[0]?.Width && row?.ScreenRule[0]?.Height
                    ? parseInt(row.ScreenRule[0].Width, 10) +
                      "x" +
                      parseInt(row.ScreenRule[0].Height, 10)
                    : "Not Set"}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-nowrap border-b text-center  border-gray-200">
                <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                  {row.ScreenRule[0]?.AdsCapacity || "No Data"}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-nowrap border-b text-center  border-gray-200">
                <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                  {row.loopDuration ? `${row.loopDuration} Second` : "No Data"}
                </div>
              </td>
              <td className="px-2 py-4 whitespace-nowrap border-b border-gray-200">
                <div className="flex flex-wrap">
                  {row.ScreenTag.length > 0 ? (
                    row.ScreenTag.map((items, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-xl flex justify-center items-center mb-1 mr-1"
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
                  {isScreenPaired ? (
                    <button>
                      <BiLinkAlt
                        onClick={() => handleUnpairScreen(row)}
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                  ) : (
                    <button>
                      <BiLinkAlt
                        onClick={() => handlePairScreen(row)}
                        size={20}
                        className="text-[#ccc] hover:text-[#ccc] cursor-pointer"
                      />
                    </button>
                  )}
                  <button onClick={() => handleEditScreen(row)}>
                    <RiEditLine
                      size={20}
                      className="text-[#6425FE] hover:text-[#ccc] cursor-pointer"
                    />
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteScreen(row.ScreenID, row.ScreenName)
                    }
                  >
                    <RiDeleteBin5Line
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                    />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const handleSelectInfoScreen = (screen) => {
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const handleUnpairScreen = (row) => {
    setScreenSelect(row);
    setOpenUnPairScreenModal(!openUnPairScreenModal);
  };

  const handlePairScreen = (row) => {
    setScreenSelect(row);
    setOpenPairScreenModal(!openPairScreenModal);
  };

  const handleEditScreen = (screen) => {
    navigate(`/static_screen/create/${screen.ScreenID}`, {
      state: { screen: screen },
    });
  };

  const handleDeleteScreen = async (screen_id, screen_name) => {
    Swal.fire({
      text: `คุณต้องการลบจอ ${screen_name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { token } = User.getCookieData();
        const data = await User.deleteScreen(screen_id, token);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "Delete Screen Success ...",
            text: `ลบ Screen สำเร็จ!`,
          }).then(async (result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              const data = await fetchDataForPage(currentPage);
              setData(data.screens);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      }
    });
  };

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getScreenList(token, page, searchTerm);
      return data;
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.screens);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.screens);
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

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.screens);
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const data = await fetchDataForPage(page);
      setData(data.screens);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  return (
    <>
      <div>
        <div className="w-auto h-[480px] overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                {/* <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
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
              </th> */}
                <th className="px-2 py-5 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-medium text-[#59606C] tracking-wider">
                  No
                </th>
                <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-medium text-[#59606C] tracking-wider">
                  Screen Name
                </th>
                <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Location
                </th>
                <th className="px-2 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Media Rule
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Slot Per Day
                </th>
                <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Loop Duration
                </th>
                <th className="px-2 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
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
