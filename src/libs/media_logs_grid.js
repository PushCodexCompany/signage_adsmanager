import { useState, useEffect } from "react";
import { ImBin } from "react-icons/im";
import User from "../libs/admin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const convertTimestampToFormattedDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const secondsToTime = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const GridTable = ({
  log_data,
  all_pages,
  checkboxes,
  setCheckboxes,
  selectedScreenItems,
  setSelectedScreenItems,
  setSelectAll,
  selectAll,
  searchTerm,
  setExportData,
  setCurrentPagePdf,
}) => {
  const toggleCheckboxAddScreen = (rowId) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectedScreenItems(intArray);

      return updatedCheckboxes;
    });
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    // Set all checkboxes to the new state
    log_data.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? log_data.map((row) => row.id) : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const [data, setData] = useState(log_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages;
  const { token } = User.getCookieData();

  useEffect(() => {
    setData(log_data);
  }, [log_data]);

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getMedialog(token, page, searchTerm);
      return data;
    }
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setCurrentPagePdf(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.medialog);
    setExportData(data.medialog);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setCurrentPagePdf(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.medialog);
      setExportData(data.medialog);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setCurrentPagePdf(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.medialog);
      setExportData(data.medialog);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setCurrentPagePdf(page);
      const data = await fetchDataForPage(page);
      setData(data.medialog);
      setExportData(data.medialog);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const renderTableData = () => {
    return data.map((item, index) => (
      <tr key={item.id}>
        {/* <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="flex items-center">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                className="opacity-0 absolute h-5 w-5 cursor-pointer"
                checked={checkboxes[item.id] || false} // Set default value to false if item.id is not present
                onChange={() => toggleCheckboxAddScreen(item.id)}
              />
              <span
                className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                  checkboxes[item.id] ? "bg-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-white ${
                    checkboxes[item.id] ? "opacity-100" : "opacity-0"
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
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {item.MediaLogID}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {item.ContentName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {item.AdvertiserName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {item.ScreenName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {convertTimestampToFormattedDate(item.StartTime)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {convertTimestampToFormattedDate(item.EndTime)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="font-poppins text-md font-bold">
            {secondsToTime(item.Duration)}
          </div>
        </td>
        {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <ImBin
            onClick={(e) => {
              e.stopPropagation();
              alert(`Delete : ${item.id}`);
            }}
            className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
          />
        </td> */}
      </tr>
    ));
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
        <div className="w-auto h-[550px] overflow-auto">
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
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Media Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Merchandise
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Screen
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Duration
                </th>
                {/* <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider"></th> */}
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
