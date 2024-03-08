import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { BiLinkAlt } from "react-icons/bi";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";

import Screen_Info from "../components/Screen_Info";
import Pair_Screen from "../components/Pair_Screen";
import { Navbar } from "../components";

import { screens } from "../data/mockup";

const Event = () => {
  const [showRightPanel, setShowRightPanel] = useState(false);

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const [openPairScreenModal, setOpenPairScreenModal] = useState(false);

  const [filter, setFilter] = useState([
    "Flagship",
    "5 Floor",
    "Beauty",
    "Portrait",
  ]);

  const navigate = useNavigate();

  const toggleSectorSelect = () => {
    setIsSectorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRegionSelect = () => {
    setIsRegionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleClustorSelect = () => {
    setIsClustorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchSelect = () => {
    setIsBranchOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentSelect = () => {
    setIsDepartmentOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(selectedValue)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, selectedValue]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
  };

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    // Set all checkboxes to the new state
    screens.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? screens.map((row) => row.id) : [];
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
    navigate(`/screen/create/${screen.id}`, {
      state: { screen: screen },
    });
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">Screens</div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => navigate("/screen/create/new")}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                New Screen +
              </button>
              <button
                onClick={() => setOpenPairScreenModal(!openPairScreenModal)}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Pair Screen
              </button>
            </div>
          </div>
        </div>
        {/* Select Menu */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="relative flex flex-col min-w-0  w-full mb-6 ">
              <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-3/4 flex justify-between items-center">
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                      <select
                        name="sector"
                        id="sector"
                        onClick={toggleSectorSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Sector">Sector</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Landscape">Landscape</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isSectorOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="region"
                        id="region"
                        onClick={toggleRegionSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Region">Region</option>
                        <option value="North">North</option>
                        <option value="West">West</option>
                        <option value="East">East</option>
                        <option value="South">South</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                        {isRegionOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="store_cluster"
                        id="store_cluster"
                        onClick={toggleClustorSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Store Cluster">Store Cluster</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isClustorOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="branch"
                        id="branch"
                        onClick={toggleBranchSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Branch">Branch</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isBranchOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="department"
                        id="department"
                        onClick={toggleDepartmentSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Department">Department</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Toy">Toy</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isDepartmentOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {filter &&
            filter.map((items) => (
              <button onClick={() => removeFilter(items)}>
                <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-300 rounded-full">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 mt-[6px]">
                      <div className="flex justify-end items-center">
                        <IoIosClose size="27" color="#6425FE" />
                      </div>
                    </div>
                    <div className="col-span-3 mt-[8px]">
                      <div className="flex justify-center items-center">
                        <div className="font-poppins text-sm">{items}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          {filter.length > 0 && (
            <button onClick={() => clearFilter()}>
              <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] hover:bg-[#3b1694] border-gray-300 rounded-full">
                <div className="grid grid-cols-12">
                  <div className="col-span-1 mt-[6px]">
                    <div className="flex justify-end items-center">
                      <IoIosClose size="27" color="#6425FE" />
                    </div>
                  </div>
                  <div className="col-span-11 mt-[8px]">
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-sm text-white">
                        Clear All
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
        <div className="mt-5">
          <div className="w-auto h-[580px] overflow-auto">
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
                  <th className="px-1 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
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
                {screens.map((row, key) => (
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
                    <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="flex">
                        <div className="font-poppins text-xl font-bold">
                          {row.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="flex">
                        <div
                          onClick={() => handleSelectInfoScreen(row)}
                          className="font-poppins text-xl font-bold cursor-pointer"
                        >
                          {row.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins text-sm text-[#59606C] font-bold">
                        {row.location}
                      </div>
                      <div className="font-poppins text-sm font-bold">
                        {row.province}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins font-bold">
                        {row.resolutions}
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                      <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                        {row.slotPerDay}
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                      <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                        {row.loopDuration}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex flex-wrap">
                        {row.tag.map((items, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                            style={{ flexBasis: "calc(20% - 8px)" }} // Adjust the width to fit 5 items per row
                          >
                            <div className="font-poppins text-xs font-bold">
                              {items}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                      <div className="space-x-2">
                        {row.isPair ? (
                          <button>
                            <BiLinkAlt size={20} className="text-[#6425FE]" />
                          </button>
                        ) : (
                          <></>
                        )}
                        <button onClick={() => handleEditScreen(row)}>
                          <RiEditLine size={20} className="text-[#6425FE]" />
                        </button>
                        <button onClick={() => alert(`delete : ${row.id}`)}>
                          <RiDeleteBin5Line
                            size={20}
                            className="text-[#6425FE]"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openInfoScreenModal && (
        <a
          onClick={() => setOpenInfoScreenModal(!openInfoScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openInfoScreenModal && (
        <Screen_Info
          setOpenInfoScreenModal={setOpenInfoScreenModal}
          selectInfoScreen={selectInfoScreen}
        />
      )}

      {openPairScreenModal && (
        <Pair_Screen
          setOpenPairScreenModal={setOpenPairScreenModal}
          screen={screens}
        />
      )}
    </>
  );
};

export default Event;
