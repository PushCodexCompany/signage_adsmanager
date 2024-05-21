import { useState } from "react";
import { ImBin } from "react-icons/im";

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

export const GridTable = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  return (
    <>
      <div className="w-auto h-[600px] overflow-auto">
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
          <tbody>
            {activity_log_mockup.map((row, index) => (
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
                  <div className="font-poppins text-md font-bold">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.user}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.page}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.action}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.action_on}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.value}
                  </div>
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
