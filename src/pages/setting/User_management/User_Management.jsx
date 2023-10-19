import React, { useState } from "react";

import { Header } from "../../../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";

import {
  PiSlidersHorizontalFill,
  PiGridFourFill,
  PiListDashesFill,
} from "react-icons/pi";

import { GridTable } from "../../../libs/user_grid";

const User = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filter, setFilter] = useState(["Active", "Admin"]);

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleRoleSelect = () => {
    setIsRoleOpen((prevIsOpen) => !prevIsOpen);
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

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
  };

  return (
    <>
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="flex justify-between mt-10 mb-5 font-bold text-2xl font-poppins">
          <div className="flex items-center">
            <div className="font-poppins">User</div>
          </div>
        </div>

        <div className="relative flex flex-col min-w-0  w-full mb-6 ">
          {/* Select Menu */}
          <div class="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/4 flex justify-between items-center">
                <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                  <select
                    name="status"
                    id="status"
                    onClick={toggleStatusSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isStatusOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                  <select
                    name="role"
                    id="role"
                    onClick={toggleRoleSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                    {isRoleOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="relative w-full lg:w-full h-[40px] flex items-center justify-end font-bold text-sm lg:text-base ml-3 mb-3">
              <button
                onClick={() => showAllFilter()}
                className=" text-[#6425FE]text-sm font-poppins w-full lg:w-[50px] lg:h-[45px] rounded-md"
              >
                <PiSlidersHorizontalFill size={26} color="#6425FE" />
              </button>
            </div>
          </div>

          {/* Select Menu */}
        </div>

        <div className="flex flex-row mt-4">
          <div className="basis-11/12">
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
                <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] border-gray-300 rounded-full">
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
        </div>

        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </div>

      {showRightPanel && (
        <a
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="fixed top-0 lg:right-52 w-screen h-screen opacity-50 bg-black z-50 backdrop-blur"
        />
      )}

      {showRightPanel && (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-[#E8E8E8] z-50 rounded-md max-h- overflow-y-auto">
          <div className="flex justify-between items-center p-2 mt-3 border-b-2 border-gray-300">
            <span className="text-center text-sm flex-grow font-poppins">
              Filter and sort
            </span>
            <button onClick={() => setShowRightPanel(!showRightPanel)}>
              <IoIosClose size="42" color="#6425FE" />
            </button>
          </div>

          {/* Sort */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">
                  Sort <br />
                  <span
                    className={`font-poppins text-xs  text-[#59606C] ${
                      !isCollapsed ? "hidden" : ""
                    }`}
                  >
                    Best match
                  </span>
                </span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sector */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Sector</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Region */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Region</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Store Cluster */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Store Cluster</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Branch */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Branch</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Department */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Department</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floor */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Floor</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-sm ">G Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <span className="font-poppins text-sm mr-1">12</span>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-4 w-4 cursor-pointer"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                      />
                      <span
                        className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          isChecked ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-3 w-3 text-white ${
                            isChecked ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">1 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">5</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">2 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">4</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">3 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">10</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Location</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Orientation */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Orientation</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Size */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Size</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* File Type */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">File Type</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
