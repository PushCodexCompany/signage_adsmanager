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

import { bookingData, bookingGrid } from "../libs/campaign_grid";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";

const Booking = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const [filter, setFilter] = useState(["Admin"]);

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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
        <text>My booking</text>
      </div>
      {/* Select Menu */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div class="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
              <div class="flex flex-col lg:flex-row">
                <div class="w-full lg:w-3/4 flex justify-between items-center">
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                    <select
                      name="sort"
                      id="sort"
                      onClick={toggleSortSelect}
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="Sort">Sort</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isSortOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      onClick={toggleStatusSelect}
                      onChange={handleStatusChange}
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="0">Status</option>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
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
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="0">Role</option>
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
              <div class="relative w-full lg:w-full h-[40px] flex items-end justify-end font-bold text-sm lg:text-base ml-3 mb-3">
                <button className="bg-[#6425FE] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md">
                  New Booking +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div class="flex">
        {filter &&
          filter.map((items) => (
            <button onClick={() => removeFilter(items)}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <IoIosClose size="22" color="#6425FE" />
                </div>
                <span className="text-sm">{items}</span>
              </div>
            </button>
          ))}
        {filter.length > 0 && (
          <button onClick={() => clearFilter()}>
            <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center bg-[#6425FE] text-white justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
              <span className="text-sm">Clear All</span>
            </div>
          </button>
        )}
      </div>

      <div className="mt-5">
        <GridComponent
          dataSource={bookingData}
          height={600}
          width={"auto"}
          // allowSorting
          // pageSettings={{ pageCount: 10 }}
          // editSettings={editing}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {bookingGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Booking;
