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

const activity_log_mockup = [
  {
    id: 1,
    user: "Admin01",
    page: "Requests",
    time: 1658469600000,
    action: "Approve",
    action_on: "Booking",
    value: "#001",
  },
  {
    id: 2,
    user: "Admin02",
    page: "Booking",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Content",
    value: "#002",
  },
  {
    id: 3,
    user: "Sale01",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Content",
    value: "#003",
  },
  {
    id: 4,
    user: "Supachai4",
    page: "Booking",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Content",
    value: "#004",
  },
  {
    id: 5,
    user: "Nidarat_ssu",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Content",
    value: "#005",
  },
  {
    id: 6,
    user: "Admin_sale",
    page: "Request",
    time: 1658468700000,
    action: "Approve",
    action_on: "Booking",
    value: "#006",
  },
  {
    id: 7,
    user: "Admin05",
    page: "Content",
    time: 1658468700000,
    action: "Reject",
    action_on: "Booking",
    value: "#007",
  },
  {
    id: 8,
    user: "Admin010",
    page: "Booking",
    time: 1658468700000,
    action: "Approve",
    action_on: "Content",
    value: "#008",
  },
  {
    id: 9,
    user: "Admin12",
    page: "Requests",
    time: 1658468700000,
    action: "Submit Request",
    action_on: "Booking",
    value: "#009",
  },
];

export const GridTable = ({
  log_data,
  all_pages,
  checkboxes,
  setCheckboxes,
  selectedScreenItems,
  setSelectedScreenItems,
  setSelectAll,
  selectAll,
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
    activity_log_mockup.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll
      ? activity_log_mockup.map((row) => row.id)
      : [];
    setSelectedScreenItems(checkedRowIds);
  };

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
      user: `Page ${page} Admin12`,
      page: "Requests",
      time: 1658468700000,
      action: "Submit Request",
      action_on: "Booking",
      value: "#009",
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
        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="flex items-center">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                className="opacity-0 absolute h-5 w-5 cursor-pointer"
                checked={checkboxes[row.id] || false} // Set default value to false if row.id is not present
                onChange={() => toggleCheckboxAddScreen(row.id)}
              />
              <span
                className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                  checkboxes[row.id] ? "bg-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-white ${
                    checkboxes[row.id] ? "opacity-100" : "opacity-0"
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
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{index + 1}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.user}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.page}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">
            {convertTimestampToFormattedDate(row.time)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.action}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.action_on}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <div className="font-poppins text-md font-bold">{row.value}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
          <ImBin
            onClick={(e) => {
              e.stopPropagation();
              alert(`Delete : ${row.id}`);
            }}
            className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
          />
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
                <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
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
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Action On
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider"></th>
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
