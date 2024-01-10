import React, { useState, useRef, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";

import { format } from "date-fns";

import useCheckPermission from "../libs/useCheckPermission";

const Create_Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useCheckPermission();

  const [bookingName, setBookingName] = useState("");
  const [merchandise, setMerchandise] = useState([]);
  const [booking_date, setBookingDate] = useState([]);
  const [booking_slot, setBookingSlot] = useState();
  const [view, setView] = useState(true);
  const [filter, setFilter] = useState(["Available", "Low < 5"]);

  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isChecked, setIsChecked] = useState(false);

  const [fill_all, setFillAll] = useState(false);
  const [display_fully, setDisplayFully] = useState(false);

  useEffect(() => {
    setBookingData();
  }, []);

  const setBookingData = () => {
    const { booking_name, merchandise, booking_slot, booking_date } =
      location.state.data;

    setBookingName(booking_name);
    setMerchandise(merchandise);
    setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
    setBookingSlot(booking_slot);
  };

  const toggleSlotSelect = () => {
    setIsSlotOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDateSelect = () => {
    setIsDateOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleConditionSelect = () => {
    setIsConditionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchSelect = () => {
    setIsBranchOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentSelect = () => {
    setIsDepartmentOpen((prevIsOpen) => !prevIsOpen);
  };

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
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

  const handleView = () => {
    setView(!view);
  };

  const boxData = [
    { width: "70px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
    { width: "200px", height: "70px" },
  ];
  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl w-[95%] pl-2">
              {bookingName}
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex space-x-1">
              <button
                onClick={() => alert("edit")}
                className="w-52 h-10 rounded-md text-[#6425FE] border-2 border-[#6425FE] font-poppins font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => alert("add Screen")}
                className="w-52 h-10 rounded-md text-white bg-[#6425FE] font-poppins"
              >
                Add Screen+
              </button>
              <button
                onClick={() => alert("Comfirm Booking")}
                className="w-52 h-10 rounded-md text-white bg-[#6425FE] font-poppins"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
        {/* Select Menu */}
        <div className="relative flex flex-col max-w-0  w-full mb-6 mt-4">
          <div class="rounded-lg h-[50px] flex items-center shadow-md">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/4 flex justify-center items-center">
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="slot"
                    id="slot"
                    onClick={toggleSlotSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Avaliable Slot">Avaliable Slot</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isSlotOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="date"
                    id="date"
                    onClick={toggleDateSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Date">Date</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                    {isDateOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="condition"
                    id="condition"
                    onClick={toggleConditionSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Store Cluster">{`Low The < 5`}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isConditionOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="branch"
                    id="branch"
                    onClick={toggleBranchSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Branch">Branch</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isBranchOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="department"
                    id="department"
                    onClick={toggleDepartmentSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Department">Department</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Toy">Toy</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isDepartmentOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                {/* <div class="relative w-full lg:w-[300px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <button
                    onClick={() => showAllFilter()}
                    name="role"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    All filter
                  </button>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <PiSlidersHorizontalFill size={18} color="#6425FE" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Select Menu */}

        {/* Filter */}
        <div className="flex">
          <div class="basis-8/12">
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
                          <div className="font-poppins text-sm font-bold">
                            {items}
                          </div>
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

          {/* <div class="basis-4/12">
            <div className="grid grid-cols-6 space-x-1">
              <div className="col-span-3">
                <div className="flex space-x-2">
                  <label className="inline-flex items-center ">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                      checked={fill_all}
                      onChange={() => setFillAll(!fill_all)}
                    />
                    <span
                      className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        fill_all ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-white ${
                          fill_all ? "opacity-100" : "opacity-0"
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
                  <div className="font-poppins text-sm font-bold flex items-center">
                    Fill All Available Slots
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex space-x-2">
                  <label className="inline-flex items-center ">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                      checked={display_fully}
                      onChange={() => setDisplayFully(!display_fully)}
                    />
                    <span
                      className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        display_fully ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-white ${
                          display_fully ? "opacity-100" : "opacity-0"
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
                  <div className="font-poppins text-sm font-bold flex items-center">
                    Display Only Fully Available
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* Filter */}

        <div className="mt-7 grid grid-cols-8 ">
          {/* Left Panel */}
          <div className="col-span-2">
            <div>
              <img
                className={`block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl `}
                src={merchandise.AdvertiserLogo}
                alt={merchandise.AdvertiserName}
              />
            </div>
            <div className="mt-2">
              <div className="flex justify-center items-center">
                <div className="font-poppins text-xl font-bold text-[#2F3847]">
                  {merchandise.AdvertiserName}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="font-poppins text-sm text-[#6F6F6F]">
                  {merchandise.AccountCode}
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <div className="font-poppins font-bold text-xl text-[#59606C]">
                  CDS-BT-230101-004
                </div>
              </div>
            </div>
          </div>
          {/* Left Panel */}

          {/* Right Panel */}
          <div className="col-span-6 border-1 border-gray-300">
            <div className="p-3">
              <div className="grid grid-cols-12">
                <div className="col-span-8 flex items-center space-x-2">
                  <div className="col-span-8 flex items-center space-x-2">
                    <CiCalendar
                      size={20}
                      className="bg-[#59606C] text-[#FFFFFF] w-10 h-10 rounded-lg"
                    />
                    <div className="font-poppins text-xl font-bold">
                      Booking Period :
                    </div>
                    <div className="font-poppins text-xl ">
                      {booking_date.length > 0 &&
                        `${format(
                          booking_date[0],
                          "EEE dd MMM yyyy"
                        )} - ${format(
                          booking_date[booking_date.length - 1],
                          "EEE dd MMM yyyy"
                        )}`}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 flex items-center justify-end space-x-5">
                  <div className=" font-poppins text-[#8A8A8A] text-xl">
                    {`You Select ${booking_slot} Slot(s) Per Day`}
                  </div>
                  <BsInfoCircle size={20} className=" text-[#6425FE] w-4 h-4" />
                </div>
              </div>
              <div className="w-auto h-[550px] overflow-x-auto mt-5">
                <div className="mt-3 flex min-w-[100%] space-x-2">
                  <div className="min-w-[70px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center">
                    <div className="text-xs font-poppins text-white">Clear</div>
                    <div className="text-xs font-poppins text-white">
                      Selection
                    </div>
                  </div>
                  {/* {[...Array(parseInt(booking_slot)).keys()].map((index) => (
                    <div
                      key={index}
                      className="bg-gray-300 h-[70px] min-w-[200px] rounded-lg  flex justify-center items-center"
                    >
                      <div className="font-poppins">Slot {index + 1}</div>
                    </div>
                  ))} */}
                </div>
                {booking_date.length > 0 &&
                  booking_date.map((items) => (
                    <div className="mt-3 flex min-w-[100%] space-x-2">
                      <div className="min-w-[70px] h-[70px] bg-[#59606C] rounded-lg">
                        <div className="flex items-center justify-center text-xs font-poppins text-white">
                          {format(items, "EEE")}
                        </div>
                        <div className="flex items-center justify-center text-3xl font-poppins text-white">
                          {format(items, "dd")}
                        </div>
                        <div className="flex items-center justify-center text-xs font-poppins text-white">
                          {format(items, "MMM yyyy")}
                        </div>
                      </div>
                      {[...Array(parseInt(booking_slot)).keys()].map(
                        (index) => (
                          <div
                            key={index}
                            className="bg-gray-300 h-[70px] min-w-[200px] rounded-lg  flex justify-center items-center"
                          >
                            <div className="font-poppins">Slot {index + 1}</div>
                          </div>
                        )
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Right Panel */}
        </div>
      </div>

      {/* {showRightPanel && (
        <a
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="fixed top-0 lg:right-52 w-screen h-screen opacity-50 bg-black z-50 backdrop-blur"
        />
      )} */}

      {/* {showRightPanel && (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-[#E8E8E8] z-50 rounded-md max-h- overflow-y-auto">
          <div className="flex justify-between items-center p-2 mt-3 border-b-2 border-gray-300">
            <div className="text-center text-sm flex-grow font-poppins">
              Filter and sort
            </div>
            <button onClick={() => setShowRightPanel(!showRightPanel)}>
              <IoIosClose size="42" color="#6425FE" />
            </button>
          </div>

          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">
                  Sort <br />
                  <div
                    className={`font-poppins text-xs  text-[#59606C] ${
                      !isCollapsed ? "hidden" : ""
                    }`}
                  >
                    Best match
                  </div>
                </div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Sector</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Region</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Store Cluster</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Branch</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Department</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Floor</div>
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
                  <div className="font-poppins text-sm ">G Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <div className="font-poppins text-sm mr-1">12</div>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-4 w-4 cursor-pointer"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                      />
                      <div
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
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">1 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">5</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">2 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">4</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">3 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">10</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Location</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Orientation</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Size</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">File Type</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
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
      )} */}
    </>
  );
};

export default Create_Booking;
