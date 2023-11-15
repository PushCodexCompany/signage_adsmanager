import React, { useState, useEffect } from "react";
import { Header } from "../components";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useNavigate } from "react-router-dom";
import { GridTable } from "../libs/booking_grid";

import { bookingData, bookingGrid } from "../libs/campaign_grid";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { Navbar } from "../components";
import useCheckPermission from "../libs/useCheckPermission";
const Booking = () => {
  useCheckPermission();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const [filter, setFilter] = useState(["Active", "Admin"]);
  const navigate = useNavigate();

  const toggleSortSelect = () => {
    setIsSortOpen((prevIsOpen) => !prevIsOpen);
  };
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
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="font-poppins font-semibold text-2xl mt-10">
          <text>My booking</text>
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
                        name="sort"
                        id="sort"
                        onClick={toggleSortSelect}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      >
                        <option value="Sort">Sort</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isSortOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="status"
                        id="status"
                        onClick={toggleStatusSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      >
                        <option value="0">Status</option>
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isStatusOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="role"
                        id="role"
                        onClick={toggleRoleSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                        {isRoleOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div className="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="role"
                        id="role"
                        onClick={toggleRoleSelect}
                        onChange={handleStatusChange}
                        className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      >
                        <option value="Merchandise">Merchandise</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                        {isRoleOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full lg:w-full h-[40px] flex items-end justify-end font-bold text-sm lg:text-base ml-3 mb-3">
                  <button
                    onClick={() => navigate("/booking/create_booking")}
                    className="bg-[#6425FE] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
                  >
                    New Booking +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
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

        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </div>
    </>
  );
};

export default Booking;
