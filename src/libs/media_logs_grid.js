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

const secondsToTime = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const media_log_mockup = [
  {
    id: 1,
    media_name: "Mid year sale 2023.mp4",
    merchandise: "Nike",
    screen: "Screen 1",
    start_time: 1658901600000,
    end_time: 1658901600000,
    Duration: 15,
  },
  {
    id: 2,
    media_name: "Promotion Summer.mp4",
    merchandise: "Adidas",
    screen: "Screen 2",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 3,
    media_name: "Sample Ads.png",
    merchandise: "Adidas 3",
    screen: "Screen 2",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 4,
    media_name: "Mid Night Sale 2023.mp4",
    merchandise: "FILA",
    screen: "Screen 3",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 5,
    media_name: "Mid year sale 2023.mp4",
    merchandise: "FILA",
    screen: "Screen 4",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 6,
    media_name: "Mid year sale 2023.mp4",
    merchandise: "BAOBAO",
    screen: "Screen 5",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 7,
    media_name: "Food Hall Ads.png",
    merchandise: "After You",
    screen: "Screen 5",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 8,
    media_name: "Mid year sale 2023.mp4",
    merchandise: "Adidas",
    screen: "Screen 7",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
  },
  {
    id: 9,
    media_name: "Pet Show 2023.mp4",
    merchandise: "Tops",
    screen: "Screen 10",
    start_time: 1658900700000,
    end_time: 1658900700000,
    Duration: 15,
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
    media_log_mockup.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll
      ? media_log_mockup.map((row) => row.id)
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
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                No
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Media Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Screen
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {media_log_mockup.map((row, index) => (
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
                    {row.media_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.merchandise}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.screen}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.start_time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {convertTimestampToFormattedDate(row.end_time)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {secondsToTime(row.Duration)}
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
