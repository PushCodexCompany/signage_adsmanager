import React, { useState, useRef, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import event1 from "../assets/img/event/event1.png";
import event2 from "../assets/img/event/event2.png";
import event3 from "../assets/img/event/event3.png";
import event4 from "../assets/img/event/event4.png";
import event5 from "../assets/img/event/event5.png";
import event6 from "../assets/img/event/event6.png";
import event7 from "../assets/img/event/event7.png";
import event8 from "../assets/img/event/event8.png";
import event9 from "../assets/img/event/event9.png";
import event10 from "../assets/img/event/event10.png";
import event11 from "../assets/img/event/event11.png";
import event12 from "../assets/img/event/event12.png";
import event13 from "../assets/img/event/event13.png";
import event14 from "../assets/img/event/event14.png";
import event15 from "../assets/img/event/event15.png";
import event16 from "../assets/img/event/event16.png";

import { format } from "date-fns";

import useCheckPermission from "../libs/useCheckPermission";
const mockup = [
  {
    img: event1,
    name: "Screen 1",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event2,
    name: "Screen 2",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event3,
    name: "Screen 3",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event4,
    name: "Screen 4",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event5,
    name: "Screen 5",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event6,
    name: "Screen 6",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event7,
    name: "Screen 7",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event8,
    name: "Screen 8",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event9,
    name: "Screen 9",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event10,
    name: "Screen 10",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event11,
    name: "Screen 11",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event12,
    name: "Screen 12",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event13,
    name: "Screen 13",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event14,
    name: "Screen 14",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event15,
    name: "Screen 15",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
  {
    img: event16,
    name: "Screen 16",
    location: "Central World,FL1",
    province: "Bangkok",
    price: 500,
  },
];

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
  const [filter_add_screen, setFilterAddScreen] = useState([
    "North",
    "Flagship",
    "Beauty",
    "Portrait",
  ]);

  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isChecked, setIsChecked] = useState(false);

  const [showAddScreen, setShowAddScreen] = useState(false);

  //Add Screen Filter

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchAddViewOpen, setIsBranchAddViewOpen] = useState(false);
  const [isDepartmentAddViewOpen, setIsDepartmentAddViewOpen] = useState(false);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const isScreenSelected = (itemName) =>
    selectedScreenItems.some((item) => item.name === itemName);

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

  const search = () => {
    alert("search");
  };

  const toggleSectorSelect = () => {
    setIsSectorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRegionSelect = () => {
    setIsRegionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleClustorSelect = () => {
    setIsClustorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchAddViewSelect = () => {
    setIsBranchAddViewOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentAddViewSelect = () => {
    setIsDepartmentAddViewOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleFloorSelect = () => {
    setIsFloorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleLocationSelect = () => {
    setIsLocationOpen((prevIsOpen) => !prevIsOpen);
  };

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const [checkboxes, setCheckboxes] = useState({
    fillBookingPeriod: false,
    ignoreUnavailableSlots: false,
    // Add more checkboxes as needed
  });

  const toggleCheckboxAddScreen = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  const handleSelectScreen = (screen) => {
    // Check if the item is already selected
    const isItemSelected = selectedScreenItems.some(
      (item) => item.name === screen.name
    );

    if (!isItemSelected) {
      // Add the selected item to the array
      setSelectedScreenItems((prevSelectedItems) => [
        ...prevSelectedItems,
        screen,
      ]);
    } else {
      // Remove the selected item from the array if it's already selected
      setSelectedScreenItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.name !== screen.name)
      );
    }
  };

  const handleCloseAddScreen = () => {
    setShowAddScreen(!showAddScreen);
    setSelectedScreenItems([]);
  };

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
                onClick={() => setShowAddScreen(true)}
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

      {showAddScreen && (
        <a
          onClick={() => setShowAddScreen(!showAddScreen)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showAddScreen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-10 top-14 lg:top-[-10px] lg:right-[150px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => handleCloseAddScreen()}>
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl text-[#2F3847] font-bold">
                Add Screens For Booking
              </div>
            </div>
            <div className="mt-1">
              <div className="grid grid-cols-4">
                <div className="flex justify-end items-center col-span-3">
                  <div className="font-poppins text-xs lg:text-sm text-[#2F3847] mr-24">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
                <div className="flex justify-end items-center col-span-1 ">
                  <button
                    onClick={() => alert("new screen")}
                    className="bg-[#6425FE] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
                  >
                    Create New Screen +
                  </button>
                </div>
              </div>
            </div>
            {/* Search Box */}
            <div className="p-1 mt-1">
              <div className="basis-8/12 lg:basis-11/12 rounded-lg border border-gray-200">
                <div className="flex">
                  <NavButton
                    customFunc={search}
                    title="Search"
                    color="grey"
                    icon={<AiOutlineSearch />}
                  />
                  <input
                    className=" w-full h-[46px] rounded relative border-gray-500  transition font-poppins"
                    type="text"
                    name="name"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            {/* Search Box */}
            {/* Select */}
            <div className="mt-1">
              <div className="relative flex flex-col  max-w-0  w-full border-b-4 border-gray-600">
                <div className="rounded-lg h-[50px] flex items-center shadow-md">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-4/4 flex justify-center items-center p-6">
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
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
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
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
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
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
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="branch"
                          id="branch"
                          onClick={toggleBranchAddViewSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Branch">Branch</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                          <option value="...">...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isBranchAddViewOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="department"
                          id="department"
                          onClick={toggleDepartmentAddViewSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Department">Department</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Toy">Toy</option>
                          <option value="Electronics">Electronics</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isDepartmentAddViewOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="floor"
                          id="floor"
                          onClick={toggleFloorSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="Floor">Floor</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isFloorOpen ? (
                            <IoIosArrowUp size={18} color="#6425FE" />
                          ) : (
                            <IoIosArrowDown size={18} color="#6425FE" />
                          )}
                        </div>
                      </div>
                      <div className="relative w-[80px] lg:w-[180px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                        <select
                          name="location"
                          id="location"
                          onClick={toggleLocationSelect}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                        >
                          <option value="location">Location</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          {isLocationOpen ? (
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
            {/* Select */}
            {/* Filter */}
            <div className="mt-1">
              <div className="flex">
                <div className="basis-12/12 ml-4">
                  {filter_add_screen &&
                    filter_add_screen.map((items) => (
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
                                <div className="font-poppins text-sm">
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
              </div>
            </div>
            {/* Filter */}

            {/* Grid */}
            <div className="p-4">
              <div className="w-auto h-[450px] overflow-x-auto ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 p-2 space-x-0">
                  {mockup.map((items, index) => (
                    <div
                      key={index}
                      className={`border border-[#B6B3B3] md:h-[350px] lg:w-[200px] lg:h-[350px] ${
                        index >= 6 ? "lg:mt-4" : "mt-4"
                      } ${index >= 3 ? "md : mt-3 " : "mt-3"} grid grid-rows-8`}
                    >
                      <div className="flex justify-center items-center ">
                        <img src={items.img} className="w-[150px] h-[150px]" />
                      </div>
                      <div className="ml-1 row-span-2 ">
                        <div className="ml-1 text-2xl font-bold font-poppins">
                          {items.name}
                        </div>
                        <div className="ml-1 mt-1 text-[#59606C] text-sm font-poppins">
                          {items.location}
                        </div>
                        <div className="ml-1 mt-1 text-sm font-bold font-poppins">
                          {items.province}
                        </div>
                        <div className="flex justify-center items-center mt-4 text-2xl font-bold font-poppins">
                          {`฿${items.price}/Loop`}
                        </div>
                      </div>
                      <div className="flex items-center justify-center ">
                        <button
                          onClick={() => handleSelectScreen(items)}
                          className={`w-[80%] py-2 rounded-lg font-bold font-poppins ${
                            isScreenSelected(items.name)
                              ? "bg-red-500 text-white"
                              : "bg-[#6425FE] text-white"
                          }`}
                        >
                          {isScreenSelected(items.name) ? "Remove" : "Book"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Grid */}

            <div className="mt-1 mb-3 flex items-center justify-center space-x-2">
              <div className="flex space-x-2">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={checkboxes.fillBookingPeriod}
                    onChange={() =>
                      toggleCheckboxAddScreen("fillBookingPeriod")
                    }
                  />
                  <span
                    className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                      checkboxes.fillBookingPeriod ? "bg-white" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 text-white ${
                        checkboxes.fillBookingPeriod
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
                <div className="font-poppins">Fill booking period</div>
              </div>
              <div className="flex space-x-2">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={checkboxes.ignoreUnavailableSlots}
                    onChange={() =>
                      toggleCheckboxAddScreen("ignoreUnavailableSlots")
                    }
                  />
                  <span
                    className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                      checkboxes.ignoreUnavailableSlots ? "bg-white" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 text-white ${
                        checkboxes.ignoreUnavailableSlots
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
                <div className="font-poppins">Ignore unavailable slots</div>
              </div>
            </div>
            <div className="mt-1 mb-3 flex items-center justify-center">
              <div className="text-[#FF0000] font-poppins">
                Invalid : Screen 3 contains unmanageable slots during the
                selected period
              </div>
            </div>
            <div className="mt-1 mb-3 flex items-center justify-center">
              {console.log("selectedScreenItems", selectedScreenItems)}
              <button
                onClick={() => setShowAddScreen(!showAddScreen)}
                className="w-[20%] bg-[#6425FE] text-white text-xl py-2 rounded-lg font-bold font-poppins "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Create_Booking;
