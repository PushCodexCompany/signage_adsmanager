import { useState, useEffect } from "react";
import { ImBin } from "react-icons/im";
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

export const GridTable = ({ log_data, all_pages }) => {
  const [data, setData] = useState(log_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages;

  useEffect(() => {
    fetchDataForPage();
  }, [currentPage]);

  const fetchDataForPage = (page) => {
    // Simulate fetching data for a specific page
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      screen_name: `Page ${page} Screen ${i + 1}`,
      event: "Event 1",
      time: 1658901600000,
      status: "Up",
    }));
    return {
      items: newItems,
      pages: page,
      length: 10,
      all_page: 7,
    };
  };

  const handleClick = (page) => {
    setCurrentPage(page);
    setPageInput("");
    setData(fetchDataForPage(page).items);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setData(fetchDataForPage(newPage).items);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setData(fetchDataForPage(newPage).items);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setData(fetchDataForPage(page).items);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const renderTableData = () => {
    return data.map((row, index) => (
      <tr key={row.id}>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{index + 1}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">
            {row.screen_name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.event}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">
            {convertTimestampToFormattedDate(row.time)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.status}</div>
        </td>
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
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Screen Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                  Status
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
