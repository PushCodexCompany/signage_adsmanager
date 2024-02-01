import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { PiMonitor } from "react-icons/pi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { format } from "date-fns";
import useCheckPermission from "../libs/useCheckPermission";

const mockup = [
  {
    id: 1,
    name: "Screen 1",
    location: "Central World,FL1",
    province: "Bangkok",
    media_rule: "1920x1080",
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
      "1920x1080",
      "1000MB",
    ],
    price: 500,
  },
  {
    id: 2,
    name: "Screen 2",
    location: "Central World,FL1",
    province: "Bangkok",
    media_rule: "1920x1080",
    tag: ["Portrait", "North", "Fashion"],
    price: 500,
  },
  {
    id: 3,
    name: "Screen 3",
    location: "Central World,FL1",
    province: "Bangkok",
    media_rule: "1080x1920",
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
    ],
    price: 500,
  },
  {
    id: 4,
    name: "Screen 4",
    location: "Central World,FL1",
    province: "Bangkok",
    media_rule: "1080x1920",
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
    ],
    price: 500,
  },
];

const all_screen = [
  {
    id: 1,
    name: "Screen 1",
    location: "Central Chidlom F3",
    status: 1,
  },
  {
    id: 2,
    name: "Screen 2",
    location: "Central Chidlom F3",
    status: 1,
  },
  {
    id: 3,
    name: "Screen 3",
    location: "Central Chidlom F3",
    status: 1,
  },
  {
    id: 4,
    name: "Screen 4",
    location: "Central Chidlom F3",
    status: 1,
  },
  {
    id: 5,
    name: "Screen 5",
    location: "Central Chidlom F3",
    status: 0,
  },
];

const screens = [
  {
    id: 1,
    name: "Screen 1",
    capacity: 15,
    rule: "1920x1080",
    booking: [
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
      {
        slot: 15,
        free: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Screen 2",
    capacity: 15,
    rule: "1920x1080",
    booking: [
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
      {
        slot: 10,
        free: 0,
      },
    ],
  },
  {
    id: 3,
    name: "Screen 3",
    capacity: 15,
    rule: "1080x1920",
    booking: [
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
    ],
  },
  {
    id: 4,
    name: "Screen 4",
    capacity: 15,
    rule: "1080x1920",
    booking: [
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
      {
        slot: 20,
        free: 0,
      },
    ],
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
  const [screenData, setScreenData] = useState([]);
  const [allScreenData, setAllScreenData] = useState([]);

  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalIndex, setDeleteModalIndex] = useState({});

  useEffect(() => {
    setBookingData();
    getAllScreen();
  }, []);

  const setBookingData = () => {
    const { booking_name, merchandise, booking_slot, booking_date } =
      location.state.data;

    setBookingName(booking_name);
    setMerchandise(merchandise);
    setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
    setBookingSlot(booking_slot);
  };

  const getAllScreen = () => {
    setAllScreenData(all_screen);
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

  const toggleScreenFromAllScreen = (id) => {
    if (selectedScreenItems.some((screen) => screen === id)) {
      // มีจอแล้ว
    } else {
      //ยังไม่มีจอ

      const new_select_screen = [...selectedScreenItems];
      new_select_screen.push(id);
      setSelectedScreenItems(new_select_screen);
      setCheckboxes((prevCheckboxes) => {
        const updatedCheckboxes = {
          ...prevCheckboxes,
          [id]: !prevCheckboxes[id],
        };

        return updatedCheckboxes;
      });

      const screensToReturn = screens.filter((screen) =>
        new_select_screen.includes(screen.id)
      );
      setScreenData(screensToReturn);
    }
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    // Set all checkboxes to the new state
    mockup.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? mockup.map((row) => row.id) : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const handleCloseAddScreen = () => {
    setShowAddScreen(!showAddScreen);
    // setSelectedScreenItems([]);
  };

  const handleAddScreen = () => {
    // const data = User.getScreen()

    const screensToReturn = screens.filter((screen) =>
      selectedScreenItems.includes(screen.id)
    );
    setScreenData(screensToReturn);
    setShowAddScreen(!showAddScreen);
  };

  const handleDeleteClick = (index) => {
    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };

      return updatedModal;
    });
  };

  const handleConfirmDelete = (index, id) => {
    const select_screen = [...selectedScreenItems];
    const new_select_screen = select_screen.filter((item) => item !== id);
    setSelectedScreenItems(new_select_screen);

    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [id]: !prevCheckboxes[id],
      };

      return updatedCheckboxes;
    });

    const screensToReturn = screens.filter((screen) =>
      new_select_screen.includes(screen.id)
    );
    setScreenData(screensToReturn);

    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };

      return updatedModal;
    });
  };

  const handleCancelDelete = (index) => {
    setDeleteModalIndex((prevModal) => {
      const updatedModal = {
        ...prevModal,
        [index]: !prevModal[index],
      };

      return updatedModal;
    });
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
            <div className="flex justify-end space-x-1">
              {/* <button
                onClick={() => alert("edit")}
                className="w-52 h-10 rounded-md text-[#6425FE] border-2 border-[#6425FE] font-poppins font-bold"
              >
                Edit
              </button> */}
              <button
                onClick={() => setShowAddScreen(true)}
                className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
              >
                Add Screen+
              </button>
              {/* <button
                onClick={() => alert("Comfirm Booking")}
                className="w-52 h-10 rounded-md text-white bg-[#6425FE] font-poppins"
              >
                Confirm Booking
              </button> */}
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

              <div className="h-[350px] overflow-y-auto mt-5">
                {allScreenData.length > 0 &&
                  allScreenData.map((items, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mt-3 cursor-pointer"
                    >
                      <div
                        className={`border border-gray-300 rounded-lg w-[80%] h-[75px] ${
                          screenData.some((screen) => screen.id === items.id)
                            ? "bg-[#FFBD49]"
                            : ""
                        }`}
                        onClick={() => toggleScreenFromAllScreen(items.id)}
                      >
                        <div className="grid grid-cols-10">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={40} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center">
                              <div className="font-poppins text-xl font-bold">
                                {items.name}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="font-poppins text-sm">
                                {items.location}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              {items.status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.status === 0 ? "Offline" : "Online"}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-center items-center space-y-2">
                            <BsInfoCircle
                              color={"#6425FE"}
                              className="cursor-pointer"
                            />
                            {screenData.some(
                              (screen) => screen.id === items.id
                            ) && (
                              <>
                                <ImBin
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(index);
                                  }}
                                  className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                />
                                {deleteModalIndex[index] && (
                                  <div className="absolute  left-[450px] flex items-center">
                                    <div className=" bg-black bg-opacity-80 w-[400px] h-[130px]  p-8 rounded shadow-md">
                                      <p className=" font-poppins text-xs text-white">
                                        Do You Want to Delete This Screen. Lorem
                                        Ipsum is simply dummy text of the
                                        printing and typesetting industry.
                                      </p>
                                      <div className="flex justify-center items-center">
                                        <button
                                          className="bg-[#6425FE] w-[76px] h-[30px] text-white font-poppins text-xs px-4 py-2 mr-2 rounded"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleConfirmDelete(
                                              index,
                                              items.id
                                            );
                                          }}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          className="bg-[#6425FE] w-[76px] h-[30px] text-white font-poppins text-xs px-4 py-2 rounded"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelDelete(index);
                                          }}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Left Panel */}

          {/* Right Panel */}
          <div className="col-span-6 border-1 border-gray-300">
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <CiCalendar
                    size={20}
                    className="bg-[#59606C] text-[#FFFFFF] w-10 h-10 rounded-lg"
                  />
                  <div>
                    <div className="flex justify-center items-center space-x-2">
                      <div className="font-poppins text-xl font-bold">
                        Booking Period :
                      </div>
                      <div className="font-poppins text-2xl ">
                        {booking_date.length > 0 && (
                          <div>{` ${format(
                            booking_date[0],
                            "EEE dd MMM yyyy"
                          )} - ${format(
                            booking_date[booking_date.length - 1],
                            "EEE dd MMM yyyy"
                          )}`}</div>
                        )}
                      </div>
                    </div>

                    <div className="font-poppins text-xs">
                      {`You Select ${booking_slot} Slot(s) Per Day`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[1140px] h-[630px] overflow-x-auto overflow-y-auto  mt-5">
                <div className="grid grid-cols-12 space-x-1 mt-3">
                  <div className="col-span-1">
                    <div className="min-w-[100%]">
                      <div
                        onClick={() =>
                          console.log(
                            "selectedScreenItems",
                            selectedScreenItems
                          )
                        }
                        className="min-w-[70px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center"
                      >
                        <div className="text-xs font-poppins text-white">
                          Select all
                        </div>
                        <div className="text-xs font-poppins text-white">
                          available
                        </div>
                      </div>
                      <div>
                        {booking_date.length > 0 &&
                          booking_date.map((items, index) => (
                            <div key={index} className="mt-3 space-x-2">
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
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-11">
                    <div className="grid grid-cols-6 ">
                      <div className="flex space-x-2">
                        {screenData.length > 0 &&
                          screenData.map((items, index) => (
                            <>
                              <div
                                key={index}
                                className="h-[70px] min-w-[310px] rounded-lg"
                              >
                                <div className="grid grid-cols-10">
                                  <div className="col-span-2 flex justify-center items-center">
                                    <PiMonitor size={40} color={"#59606C"} />
                                  </div>
                                  <div className="col-span-6">
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xl font-bold">
                                        {items.name}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-sm">
                                        Max Capacity {items.capacity}/Day
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center">
                                      <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                        Media Rule : {items.rule}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-center items-center">
                                    <BsInfoCircle color={"#6425FE"} />
                                  </div>
                                </div>

                                <div className="mt-3 space-y-3">
                                  {items.booking
                                    .slice(0, booking_date.length)
                                    .map((items2, index2) => (
                                      <div className="bg-[#018C41] h-[70px] min-w-[310px] rounded-lg flex justify-center items-center">
                                        <div className="font-poppins text-white">
                                          Available {items2.free}/{items2.slot}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
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
          <div className="absolute right-10 top-14 lg:top-5 lg:right-[160px] m-4 z-30">
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
            <div className="mt-5 p-6">
              <div className="font-poppins">
                *Search result displays only screens available in your booking
              </div>
            </div>

            <div className="p-4">
              <div className="w-auto h-[350px] overflow-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
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
                      <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Screen Name
                      </th>
                      <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Media Rule
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
                    {mockup.map((row, key) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                    checkboxes[row.id]
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
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="flex">
                            <div className="font-poppins text-xl font-bold">
                              {row.name}
                            </div>
                            <div className="bg-[#00C32B] w-[5px] h-[5px] mt-2 ml-1 rounded-xl"></div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="font-poppins text-sm text-[#59606C] font-bold">
                            {row.location}
                          </div>
                          <div className="font-poppins text-sm font-bold">
                            {row.province}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="font-poppins font-bold">
                            {row.media_rule}
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
                            <button
                              className="w-36 h-6 bg-[#6425FE] text-white text-sm font-poppins rounded-md"
                              onClick={() => alert(key)}
                            >
                              View Detail
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-1 mb-3 flex items-center justify-center">
              <button
                onClick={() => handleAddScreen()}
                className="w-[20%] bg-[#6425FE] text-white text-xl py-2 rounded-lg font-bold font-poppins "
              >
                Add Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Create_Booking;
