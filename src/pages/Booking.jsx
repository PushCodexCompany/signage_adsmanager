import React from "react";
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

const Booking = () => {
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
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="Sort">Sort</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="Status">Status</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="relative w-[100px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="role"
                      id="role"
                      class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="Role">Role</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                      <option value="...">...</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative w-full lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 mb-3">
                <button className="bg-[#6425FE] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md">
                  New Booking +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div class=" h-[50px] flex items-center mt-1  lg:ml-10 ">
        <div class="flex flex-col lg:flex-row">
          <div class="w-full lg:w-3/4 flex justify-center items-center">
            {/* filter active */}
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-[#6425FE] font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Active</span>
              </div>
            </button>
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-[#6425FE] font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Admin</span>
              </div>
            </button>
            {/* filter active */}

            {/* Button Clear All */}
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center bg-[#6425FE] text-white justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <span className="text-sm">Clear All</span>
              </div>
            </button>
            {/* Button Clear All */}
          </div>
        </div>
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
