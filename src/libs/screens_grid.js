import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiLinkAlt } from "react-icons/bi";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import User from "../libs/admin";
import Swal from "sweetalert2";

export const GridTable = ({
  setSelectedScreenItems,
  setSelectInfoScren,
  screens_data,
  screens_options_data,
}) => {
  const navigate = useNavigate();

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    // Set all checkboxes to the new state
    screens_data.forEach((row) => {
      newCheckboxes[row.ScreenID] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll
      ? screens_data.map((row) => row.ScreenID)
      : [];
    setSelectedScreenItems(checkedRowIds);
  };

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

  const handleSelectInfoScreen = (screen) => {
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const handleEditScreen = (screen) => {
    navigate(`/screen/create/${screen.ScreenID}`, {
      state: { screen: screen },
    });
  };

  const handleDeleteScreen = async (screen_id) => {
    const { token } = User.getCookieData();
    const data = await User.deleteScreen(screen_id, token);
    if (data.code !== 404) {
      Swal.fire({
        icon: "success",
        title: "Delete Screen Success ...",
        text: `ลบ Screen สำเร็จ!`,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.backdrop
        ) {
          navigate("/screen");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: data.message,
      });
    }
  };

  const findScreenResolutionID = (id) => {
    const resolution = screens_options_data.find(
      (item) => item.ScreenResolutionID === id
    );
    return resolution ? resolution.Resolution : "No Resolution";
  };

  return (
    <>
      <div className="w-auto h-[580px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              {/* <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
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
              <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                No
              </th>
              <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                Screen Name
              </th>
              <th className="px-4 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Media Rule
              </th>
              <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Slot Per Day
              </th>
              <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Loop Duration
              </th>
              <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Tag
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {screens_data.map((row, key) => (
              <tr key={row.ScreenID}>
                {/* <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={checkboxes[row.ScreenID] || false} // Set default value to false if row.ScreenID is not present
                        onChange={() => toggleCheckboxAddScreen(row.ScreenID)}
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
                <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex">
                    <div className="font-poppins text-xl font-bold">
                      {key + 1}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex">
                    <div
                      onClick={() => handleSelectInfoScreen(row)}
                      className="font-poppins text-xl font-bold cursor-pointer"
                    >
                      {row.ScreenName}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-sm text-[#59606C] font-bold">
                    {row.ScreenLocation || "No Data"}
                  </div>
                  <div className="font-poppins text-sm font-bold">
                    {row.province || "No Data"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins font-bold">
                    {findScreenResolutionID(row.ScreenResolutionID)}
                  </div>
                </td>
                <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                  <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                    {row.ScreenRule[0]?.AdsCapacity || "No Data"}
                  </div>
                </td>
                <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                  <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                    {row.loopDuration
                      ? `${row.loopDuration} Second`
                      : "No Data"}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex flex-wrap">
                    {row.ScreenTag.length > 0 ? (
                      row.ScreenTag.map((items, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                          style={{
                            flexBasis: `calc(${
                              100 / row.ScreenTag.length
                            }% - 8px)`,
                          }}
                        >
                          <div className="font-poppins text-xs font-bold">
                            {items.TagName}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                        style={{ flexBasis: "calc(100% - 8px)" }}
                      >
                        <div className="font-poppins text-xs font-bold">
                          No Tag
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    {row.isPair ? (
                      <button>
                        <BiLinkAlt
                          size={20}
                          className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                        />
                      </button>
                    ) : (
                      <></>
                    )}
                    <button onClick={() => handleEditScreen(row)}>
                      <RiEditLine
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                    <button onClick={() => handleDeleteScreen(row.ScreenID)}>
                      <RiDeleteBin5Line
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
