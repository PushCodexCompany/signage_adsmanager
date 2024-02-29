import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoIosArrowDown,
  IoIosClose,
  IoIosArrowUp,
  IoIosPlayCircle,
  IoIosCalendar,
  IoIosInformationCircleOutline,
  IoMdTrash,
  IoIosSearch,
  IoIosCloseCircle,
  IoIosAddCircle,
  IoIosAdd,
  IoIosRemoveCircle,
  IoMdFolderOpen,
} from "react-icons/io";
import { FiImage, FiVideo } from "react-icons/fi";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineModeEditOutline, MdDragHandle } from "react-icons/md";
import { PiMonitor, PiWarningCircleFill } from "react-icons/pi";
import { BsCheckCircle } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { format } from "date-fns";
import useCheckPermission from "../libs/useCheckPermission";
import Screen_Info from "../components/Screen_Info";
import New_Screen from "../components/New_Screen";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { screens, mediaMockup } from "../data/mockup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Create_Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useCheckPermission();

  const [bookingName, setBookingName] = useState("");
  const [bookingCode, setBookingCode] = useState("CDS-BT-230101-004");
  const [merchandise, setMerchandise] = useState([]);
  const [booking_date, setBookingDate] = useState([]);
  const [booking_slot, setBookingSlot] = useState();
  const [filter, setFilter] = useState(["Available", "Low < 5"]);
  const [filter_publish_screen, setFilterPublishCreen] = useState([
    "Flagship",
    "5 Floor",
    "Beauty",
    "Portrait",
  ]);
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

  const [showAddScreen, setShowAddScreen] = useState(false);
  const [showPublishScreen, setShowPublishScreen] = useState(false);

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

  const [screenAdsAllocation, setScreennAdsAllocation] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const [checkboxPublishScreen, setCheckboxPublishScreen] = useState({});
  const [selectAllPubishScreen, setSelectAllPublishScreen] = useState(false);
  const [selectPublihsScreen, setSelectPublishScreen] = useState([]);

  const [deleteModalIndex, setDeleteModalIndex] = useState({});

  const [bookingSelect, setBookingSelect] = useState([]);

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const [openAddNewScreenModal, setOpenAddNewScreenModal] = useState(false);

  const [openConfirmBookingModal, setOpenConfirmBookingModal] = useState(false);

  const [isConfirmed, setIsComfirmed] = useState(false);

  const [booking_col, setBookingCol] = useState();

  const [screen_select, setScreenSelect] = useState({
    screen: null,
    value: {},
  });

  const [openAdsAllocationModal, setOpenAdsAllocationModal] = useState(false);

  const [isAddScreenOpen, setIsAddScreenOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [openModalUploadNewMedia, setOpenModalUploadMedia] = useState(false);

  const [datePickers, setDatePickers] = useState([]);

  const [uploads, setUploads] = useState({});

  const [mediaAdsAllocationTab, setMediaAdsAllocationTab] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [media_list, setMediaList] = useState(mediaMockup);

  useEffect(() => {
    if (location.state.isConfirmed) {
      setConfirmBookingData();
      setIsComfirmed(true);
    } else {
      setBookingData();
      setIsComfirmed(false);
    }

    getAllScreen();
  }, []);

  const setBookingData = () => {
    const { booking_name, merchandise, booking_slot, booking_date } =
      location.state.data;

    setBookingName(booking_name);
    setMerchandise(merchandise);
    setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
    setBookingSlot(parseInt(booking_slot));
  };

  const setConfirmBookingData = () => {
    const { booking_name, merchandise, booking_slot, booking_date, screen } =
      location.state.data;

    setBookingName(booking_name[0]);
    setBookingCode(booking_name[1]);
    setMerchandise(merchandise);
    setBookingDate(booking_date.map((booking_date) => new Date(booking_date)));
    setBookingSlot(booking_slot);
    setScreenData(screen);
    calculateSize(screen);
  };

  const calculateSize = (screen) => {
    let maxLength = 0;
    screen.forEach((screen) => {
      screen.booking.forEach((booking) => {
        const bookingLength = booking.media_list.length;
        if (bookingLength > maxLength) {
          maxLength = bookingLength;
        }
      });
    });

    const col_booking = Math.ceil(maxLength / 5);
    setBookingCol(col_booking);
  };

  const getAllScreen = () => {
    setAllScreenData(screens);
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

  const handleStatusPublishScreenChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilterPublishCreen((prevFilter) => {
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

  const removePublishCreenFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter_publish_screen.filter(
      (value) => value !== selectedValue
    );
    setFilterPublishCreen(updatedFilter);
  };

  const clearPublishScreenFilter = () => {
    setFilterPublishCreen([]);
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

  const toggleCheckboxPublishScreen = (rowId) => {
    setCheckboxPublishScreen((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectPublishScreen(intArray);

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
    screens.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? screens.map((row) => row.id) : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const toggleAllCheckboxesPublishScreen = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAllPubishScreen;

    // Set all checkboxes to the new state
    screens.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxPublishScreen(newCheckboxes);
    setSelectAllPublishScreen(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? screens.map((row) => row.id) : [];
    setSelectPublishScreen(checkedRowIds);
  };

  const handleCloseAddScreen = () => {
    setShowAddScreen(!showAddScreen);
    // setSelectedScreenItems([]);
  };

  const handleAddScreen = () => {
    const screensToReturn = screens.filter((screen) =>
      selectedScreenItems.includes(screen.id)
    );
    setScreenData(screensToReturn);
    setShowAddScreen(!showAddScreen);
  };

  const handleAddScreenAllocation = () => {
    const screensToReturn = screens.filter((screen) =>
      selectedScreenItems.includes(screen.id)
    );
    setScreennAdsAllocation(screensToReturn);
    setIsAddScreenOpen(!isAddScreenOpen);
    setOpenAdsAllocationModal(!openAdsAllocationModal);
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

  const handleSelectScreen = (screenIndex, dateIndex) => {
    // Check if the selection already exists in bookingSelect
    const isDuplicate = bookingSelect.some(
      (selected) =>
        selected.screenIndex === screenIndex && selected.dateIndex === dateIndex
    );

    if (!isDuplicate) {
      // If not a duplicate, add the selection to bookingSelect
      const newBookingSelect = [
        ...bookingSelect,
        { screenIndex, dateIndex, id: screenIndex + 1 },
      ];
      setBookingSelect(newBookingSelect);
    } else {
      // If it's a duplicate, you may choose to remove it or handle it accordingly
      // For this example, I'm removing the duplicate
      const filteredBookingSelect = bookingSelect.filter(
        (selected) =>
          !(
            selected.screenIndex === screenIndex &&
            selected.dateIndex === dateIndex
          )
      );
      setBookingSelect(filteredBookingSelect);
    }
  };

  const handleSaveScreen = () => {
    if (bookingSelect.length > 0) {
      const updatedData = bookingSelect.map((item) => {
        return { ...item, status: true };
      });

      setBookingSelect(updatedData);
    } else {
      alert("No select screen");
    }
  };

  const handleSelectInfoScreen = (screen) => {
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const handleConfirmbooking = () => {
    setOpenConfirmBookingModal(!openConfirmBookingModal);
  };

  const GroupedData = (data) => {
    const groupedData = data.reduce((acc, curr) => {
      const id = curr.id;
      acc[id] = acc[id] ? acc[id] + 1 : 1;
      return acc;
    }, {});

    // Convert the grouped data into an array of objects
    const result = Object.keys(groupedData).map((id) => ({
      id: parseInt(id), // Convert id to integer
      screen_booking_amount: groupedData[id],
    }));

    return result;
  };

  const handleConfirmBookingScreen = () => {
    const screen = screens.filter((_, index) =>
      selectedScreenItems.includes(index + 1)
    );

    const group_data = GroupedData(bookingSelect);

    group_data.forEach((booking) => {
      let screen_result = screen.find((screen) => screen.id === booking.id);
      if (screen_result) {
        screen_result.screen_booking_amount = booking.screen_booking_amount;
      }
    });

    const total_slot = bookingSelect.length * booking_slot;

    const booking_obj = {
      screen,
      booking_name: bookingName,
      period: booking_date,
      slot_per_days: booking_slot,
      merchandise,
      total_slot,
    };

    navigate(`/booking/booking_pricing_summary`, {
      state: { data: booking_obj },
    });
  };

  const handleSelectScreenAddmedia = (screen, obj) => {
    setScreenSelect({ screen, value: obj });
    setItemsPanel1({ screen, value: obj });
    setOpenAdsAllocationModal(!openAdsAllocationModal);
  };

  const handleToggleDropdownApplyToScreen = () => {
    setIsAddScreenOpen(!isAddScreenOpen);
    setOpenAdsAllocationModal(!openAdsAllocationModal);
  };

  const handleDeleteScreenAdsAllocation = (index) => {
    const newData = [...screenAdsAllocation];
    newData.splice(index, 1);
    setScreennAdsAllocation(newData);
  };

  const handleStartDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].startDate = date;
    setDatePickers(newDatePickers);
  };

  const handleEndDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].endDate = date;
    setDatePickers(newDatePickers);
  };

  const handleAddDatePicker = () => {
    setDatePickers([
      ...datePickers,
      { startDate: new Date(), endDate: new Date() },
    ]);
  };

  const handleRemoveDatePicker = (index) => {
    const newDatePickers = [...datePickers];
    newDatePickers.splice(index, 1);
    setDatePickers(newDatePickers);
  };

  const uploadFile = (uploadKey) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".mp4, .m3u8, .jpg, .png";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploads((prevUploads) => ({
            ...prevUploads,

            content: e.target.result,
            name: file.name,
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  };

  // const handleOnDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const items = Array.from(screen_select.value.media_list);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   setScreenSelect({
  //     value: {
  //       ...screen_select.value,
  //       media_list: items,
  //     },
  //   });
  // };

  const handleScreenInfo = (screen_id) => {
    const screen = screens.find((a) => a.id === screen_id);
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  const openMediaAdsAllocationTab = (tabName) => {
    setMediaAdsAllocationTab(tabName);
  };

  const searchMediaByName = (value) => {
    setSearchTerm(value);

    const results = mediaMockup.filter((item) =>
      item.media_name.toLowerCase().includes(value.toLowerCase())
    );

    setMediaList(results);
  };

  // Test zone

  const [itemsPanel1, setItemsPanel1] = useState();
  const [itemsPanel2, setItemsPanel2] = useState(media_list);

  // const handleOnDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const sourceDroppableId = result.source.droppableId;
  //   const destinationDroppableId = result.destination.droppableId;

  //   if (sourceDroppableId === "media-all" && destinationDroppableId === "media-list") {
  //     // If dragging from "media-all" to "media-list"
  //     const draggedItem = screen_select.value.media_list[result.source.index];
  //     const updatedMediaList = [...screen_select.value.media_list];
  //     updatedMediaList.splice(result.destination.index, 0, draggedItem);

  //     setScreenSelect({
  //       ...screen_select,
  //       value: {
  //         ...screen_select.value,
  //         media_list: updatedMediaList,
  //       },
  //     });
  //   } else {
  //     // Handle other cases if needed
  //   }
  // };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // If the drag is within the same panel
    if (source.droppableId === destination.droppableId) {
      const draggedItem = itemsPanel1.value.media_list[result.source.index];
      const updatedMediaList = [...itemsPanel1.value.media_list];
      updatedMediaList.splice(result.source.index, 1); // Remove item from original position
      updatedMediaList.splice(destination.index, 0, draggedItem); // Insert item at destination index
      if (source.droppableId === "panel-1") {
        setItemsPanel1({
          ...itemsPanel1,
          value: {
            media_list: updatedMediaList,
          },
        });
      }
    } else {
      // If the drag is between different panels
      const sourceItems =
        source.droppableId === "panel-1"
          ? itemsPanel1.value.media_list
          : itemsPanel2;
      const destinationItems =
        destination.droppableId === "panel-1"
          ? itemsPanel1.value.media_list
          : itemsPanel2;
      console.log("sourceItems", sourceItems);
      // console.log("destinationItems", destinationItems);
      // If the destination content is null, update it with the dragged item
      if (
        destination.droppableId === "panel-1" &&
        destinationItems[destination.index].media_id === null
      ) {
        // const draggedItem = sourceItems.find(
        //   (item) => item.media_id === result.draggableId
        // );
        const draggedItem = sourceItems.find(
          (item) =>
            item.media_id === parseInt(result.draggableId.split("-")[1]) + 1
        );
        destinationItems[destination.index] = { ...draggedItem };
        console.log("destinationItems", destinationItems);
      }
      // Update state
      if (source.droppableId === "panel-1") {
        setItemsPanel1({
          ...itemsPanel1,
          value: {
            media_list: destinationItems,
          },
        });
      }
    }
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
              {isConfirmed ? (
                <button
                  onClick={() => setShowPublishScreen(true)}
                  className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                >
                  Publish
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddScreen(true)}
                    className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                  >
                    Add Screen+
                  </button>
                  <button
                    onClick={() => handleSaveScreen()}
                    className="w-52 h-10 rounded-md text-white bg-[#6425FE] hover:bg-[#3b1694] font-poppins"
                  >
                    Save Booking
                  </button>
                  <button
                    onClick={() => handleConfirmbooking()}
                    className="w-52 h-10 rounded-md text-white bg-[#6425FE] font-poppins"
                  >
                    Confirm Booking
                  </button>
                </>
              )}
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
          {isConfirmed ? (
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
                    {bookingCode}
                  </div>
                </div>
                <div className="h-[350px] overflow-y-auto mt-5">
                  {screenData.length > 0 &&
                    screenData.map((items, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center mt-3 "
                      >
                        <div
                          className={`border border-gray-300 rounded-lg w-[80%] h-[75px] `}
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
                              <IoIosInformationCircleOutline
                                onClick={() => handleScreenInfo(items.id)}
                                color={"#6425FE"}
                                size={22}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
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
                    {bookingCode}
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
                              <IoIosInformationCircleOutline
                                onClick={() => handleSelectInfoScreen(items)}
                                color={"#6425FE"}
                                size={22}
                                className="cursor-pointer"
                              />
                              {screenData.some(
                                (screen) => screen.id === items.id
                              ) && (
                                <>
                                  <IoMdTrash
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(index);
                                    }}
                                    size={22}
                                    className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                                  />
                                  {deleteModalIndex[index] && (
                                    <div className="absolute left-[680px] top-[800px] flex items-center">
                                      <div className="bg-black bg-opacity-80 w-[400px] h-[130px] p-8 rounded shadow-md">
                                        <p className="font-poppins text-xs text-white">
                                          Do You Want to Delete This Screen.
                                          Lorem Ipsum is simply dummy text of
                                          the printing and typesetting industry.
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
          )}
          {/* Left Panel */}

          {/* Right Panel */}
          {isConfirmed ? (
            <div className="col-span-6 border-1 border-gray-300">
              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <IoIosCalendar
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
                          onClick={() => console.log("Clear Selection")}
                          className="min-w-[20px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center"
                        >
                          <div className="text-xs font-poppins text-white">
                            Clear
                          </div>
                          <div className="text-xs font-poppins text-white">
                            Selection
                          </div>
                        </div>
                        <div>
                          {booking_date.length > 0 &&
                            booking_date.map((items, index) => (
                              <div key={index} className="mt-3 space-x-2">
                                <div
                                  className={`min-w-[20px]  
                                  ${
                                    booking_col === 1
                                      ? "h-[80px]"
                                      : booking_col === 2
                                      ? "h-[100px]"
                                      : booking_col === 3
                                      ? "h-[150px]"
                                      : booking_col === 4
                                      ? "h-[400px]"
                                      : "h-[100px]"
                                  } 
                                  bg-[#59606C] rounded-lg flex flex-col justify-center items-center`}
                                >
                                  <div className="text-xs font-poppins text-white">
                                    {format(items, "EEE")}
                                  </div>
                                  <div className="text-3xl font-poppins text-white">
                                    {format(items, "dd")}
                                  </div>
                                  <div className="text-xs font-poppins text-white">
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
                            screenData.map((items, screenIndex) => (
                              <>
                                <div
                                  key={screenIndex}
                                  className="h-[70px] min-w-[250px] rounded-lg"
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
                                        <div className="font-poppins text-sm text-[#8A8A8A]">
                                          {items.location}
                                        </div>
                                      </div>
                                      <div className="flex justify-start items-center">
                                        <div className="font-poppins text-xs bg-[#FD6822] text-white rounded-lg p-[2px]">
                                          Media Rule : {items.media_rule}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-2 flex justify-center items-center">
                                      <IoIosInformationCircleOutline
                                        onClick={() =>
                                          handleScreenInfo(items.id)
                                        }
                                        size={22}
                                        color={"#6425FE"}
                                        className="cursor-pointer"
                                      />
                                    </div>
                                  </div>

                                  {items.booking.map((items, index) => (
                                    <div className="mt-2">
                                      <div className="p-2">
                                        <div className="grid grid-cols-6 space-x-1">
                                          <div className="col-span-5">
                                            <div className="flex flex-wrap">
                                              {items.media_list.map(
                                                (item, index2) => (
                                                  <div
                                                    key={index2}
                                                    className="w-[20%] p-1"
                                                  >
                                                    <div
                                                      className={`w-[36px] h-[36px] ${
                                                        item.media_id
                                                          ? "bg-white border border-[#D9D9D9]"
                                                          : "bg-[#D9D9D9] "
                                                      } flex justify-center items-center`}
                                                    >
                                                      {item.media_id ? (
                                                        <IoIosPlayCircle color="#6425FE" />
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            onClick={() =>
                                              handleSelectScreenAddmedia(
                                                screenIndex + 1,
                                                items
                                              )
                                            }
                                            className="col-span-1 flex justify-center items-center cursor-pointer"
                                          >
                                            <MdOutlineModeEditOutline
                                              size={26}
                                              className="text-[#6425FE] hover:text-[#3b1694]"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
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
          ) : (
            <div className="col-span-6 border-1 border-gray-300">
              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <IoIosCalendar
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
                            console.log("Select all", booking_date)
                          }
                          className="min-w-[20px] h-[70px] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg flex flex-col items-center justify-center"
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
                                <div className="min-w-[20px] h-[70px] bg-[#59606C] rounded-lg">
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
                            screenData.map((items, screenIndex) => (
                              <>
                                <div
                                  key={screenIndex}
                                  className="h-[70px] min-w-[250px] rounded-lg"
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
                                          Media Rule : {items.media_rule}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-span-2 flex justify-center items-center">
                                      <IoIosInformationCircleOutline
                                        onClick={() =>
                                          handleSelectInfoScreen(items)
                                        }
                                        color={"#6425FE"}
                                        size={22}
                                        className="cursor-pointer"
                                      />
                                    </div>
                                  </div>

                                  <div className="mt-3 space-y-3">
                                    {items.booking
                                      .slice(0, booking_date.length)
                                      .map((items2, dateIndex) => (
                                        <div
                                          key={dateIndex}
                                          onClick={() =>
                                            items2.slot - items2.booking > 0
                                              ? handleSelectScreen(
                                                  screenIndex,
                                                  dateIndex
                                                )
                                              : null
                                          }
                                          className={`${
                                            bookingSelect.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                bookingItem.status === true
                                            )
                                              ? "bg-[#FD6822] cursor-pointer"
                                              : bookingSelect.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? "bg-[#FFBD49] cursor-pointer"
                                              : items2.slot - items2.booking >=
                                                booking_slot
                                              ? "bg-[#018C41] cursor-pointer"
                                              : "bg-[#5C5C5C] pointer-events-none"
                                          } h-[70px] min-w-[250px] rounded-lg flex justify-center items-center`}
                                        >
                                          <div
                                            className={`font-poppins ${
                                              bookingSelect.some(
                                                (bookingItem) =>
                                                  bookingItem.screenIndex ===
                                                    screenIndex &&
                                                  bookingItem.dateIndex ===
                                                    dateIndex &&
                                                  bookingItem.status === true
                                              )
                                                ? "text-white"
                                                : bookingSelect.some(
                                                    (bookingItem) =>
                                                      bookingItem.screenIndex ===
                                                        screenIndex &&
                                                      bookingItem.dateIndex ===
                                                        dateIndex
                                                  )
                                                ? "text-[#4A4A4A]"
                                                : items2.slot -
                                                    items2.booking >=
                                                  booking_slot
                                                ? "text-white"
                                                : "text-white"
                                            }`}
                                          >
                                            {bookingSelect.some(
                                              (bookingItem) =>
                                                bookingItem.screenIndex ===
                                                  screenIndex &&
                                                bookingItem.dateIndex ===
                                                  dateIndex &&
                                                bookingItem.status === true
                                            )
                                              ? `Booked ${
                                                  items2.booking + booking_slot
                                                }/${items2.slot}`
                                              : bookingSelect.some(
                                                  (bookingItem) =>
                                                    bookingItem.screenIndex ===
                                                      screenIndex &&
                                                    bookingItem.dateIndex ===
                                                      dateIndex
                                                )
                                              ? `Selected ${
                                                  items2.booking + booking_slot
                                                }/${items2.slot}`
                                              : items2.slot - items2.booking >=
                                                booking_slot
                                              ? `Available ${items2.booking}/${items2.slot}`
                                              : items2.slot - items2.booking ===
                                                0
                                              ? `Full ${items2.booking}/${items2.slot}`
                                              : items2.slot - items2.booking <=
                                                booking_slot
                                              ? `Not Available ${items2.booking}/${items2.slot}`
                                              : ""}
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
          )}

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
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen  relative">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl text-[#2F3847] font-bold">
                Add Screens
              </div>
            </div>
            <div className="mt-1">
              <div className="grid grid-cols-4">
                <div className="flex justify-end items-center col-span-3">
                  <div className="font-poppins text-xs lg:text-xl text-[#2F3847] mr-28">
                    {`You Booking Period : ${format(
                      booking_date[0],
                      "EEE dd MMM yyyy"
                    )} - ${format(
                      booking_date[booking_date.length - 1],
                      "EEE dd MMM yyyy"
                    )}`}
                  </div>
                </div>
                <div className="flex justify-end items-center col-span-1 ">
                  <button
                    onClick={() =>
                      setOpenAddNewScreenModal(!openAddNewScreenModal)
                    }
                    className="bg-[#6425FE] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
                  >
                    New Screen
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
                    icon={<IoIosSearch />}
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
              <div className="w-auto h-[350px] overflow-y-auto">
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
                    {screens.map((row, key) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className=" h-5 w-5 cursor-pointer"
                              checked={checkboxes[row.id] || false}
                              onChange={() => toggleCheckboxAddScreen(row.id)}
                            />
                            {/* <span className="h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center bg-white">
                              {checkboxes[row.id] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-white"
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
                              )}
                            </span> */}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="flex items-center">
                            <div className="font-poppins text-xl font-bold">
                              {row.name}
                            </div>
                            <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
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
                                className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                style={{ flexBasis: "calc(20% - 8px)" }}
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

      {showPublishScreen && (
        <a
          onClick={() => setShowPublishScreen(!showPublishScreen)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showPublishScreen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-10 top-14 lg:top-7 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowPublishScreen(!showPublishScreen)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md relative">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl text-[#2F3847] font-bold">
                Publish to Screens
              </div>
            </div>
            <div className="mt-1">
              <div className="flex justify-center items-center col-span-3">
                <div className="font-poppins text-xs lg:text-sm text-[#7C7B7B]">
                  {selectPublihsScreen.length} out of {screens.length} Screens
                  Selected
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
                    icon={<IoIosSearch />}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                          onChange={handleStatusPublishScreenChange}
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
                  {filter_publish_screen &&
                    filter_publish_screen.map((items) => (
                      <button onClick={() => removePublishCreenFilter(items)}>
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
                  {filter_publish_screen.length > 0 && (
                    <button onClick={() => clearPublishScreenFilter()}>
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
              <div className="w-auto h-[350px] overflow-y-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        <label className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="opacity-0 absolute h-5 w-5 cursor-pointer"
                            checked={selectAllPubishScreen}
                            onChange={toggleAllCheckboxesPublishScreen}
                          />
                          <span
                            className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                              selectAllPubishScreen ? "bg-white" : ""
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 text-white ${
                                selectAllPubishScreen
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
                    </tr>
                  </thead>
                  <tbody>
                    {screens.map((row) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className=" h-5 w-5 cursor-pointer"
                              checked={checkboxPublishScreen[row.id] || false}
                              onChange={() =>
                                toggleCheckboxPublishScreen(row.id)
                              }
                            />
                            {/* <span className="h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center bg-white">
                              {checkboxPublishScreen[row.id] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-white"
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
                              )}
                            </span> */}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="font-poppins text-xl font-bold">
                              {row.name}
                            </div>
                            <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="font-poppins text-sm text-[#59606C] font-bold">
                            {row.location}
                          </div>
                          <div className="font-poppins text-sm font-bold">
                            {row.province}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="font-poppins font-bold">
                            {row.media_rule}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex flex-wrap">
                            {row.tag.map((items, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                style={{ flexBasis: "calc(20% - 8px)" }}
                              >
                                <div className="font-poppins text-xs font-bold">
                                  {items}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-3 mb-2 flex items-center justify-center">
              <button
                onClick={() => alert("Publish")}
                className="w-[30%] bg-[#6425FE] text-white text-lg py-2 rounded-lg font-bold font-poppins "
              >
                Publish to Selected Screens
              </button>
            </div>
          </div>
        </div>
      )}

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

      {openAddNewScreenModal && (
        <a
          onClick={() => setOpenAddNewScreenModal(!openAddNewScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openAddNewScreenModal && (
        <New_Screen setOpenAddNewScreenModal={setOpenAddNewScreenModal} />
      )}

      {openConfirmBookingModal && (
        <a
          onClick={() => setOpenConfirmBookingModal(!openConfirmBookingModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openConfirmBookingModal && (
        <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[970px] items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[540px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() =>
                  setOpenConfirmBookingModal(!openConfirmBookingModal)
                }
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-2/5 lg:w-2/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="mt-28">
              <div className="p-2">
                <div className="flex justify-center items-center">
                  <PiWarningCircleFill size={200} color="#2F3847" />
                </div>
                <div className="flex justify-center items-center text-center ">
                  <div className="font-poppins text-4xl font-bold">
                    Do you want to Confirm Booking <br /> {bookingName} ?
                  </div>
                </div>
                <div className="flex justify-center items-center text-center mt-3">
                  <div className="font-poppins text-lg ">
                    Once confirmed, the content management section will be
                    unlocked. <br /> <b>Important:</b> After this step, editing
                    the booking time won't be possible; only cancellation is
                    allowed. Kindly ensure the correct booking time <br /> then
                    click ‘OK’ to proceed.
                  </div>
                </div>
                <div className="flex justify-center items-center text-center mt-5">
                  <button
                    onClick={() => handleConfirmBookingScreen()}
                    className="bg-[#6425FE] w-[300px] h-[48px] rounded-lg text-white font-poppins font-bold"
                  >
                    OK
                  </button>
                </div>
                <div className="flex justify-center items-center text-center mt-3">
                  <button
                    onClick={() =>
                      setOpenConfirmBookingModal(!openConfirmBookingModal)
                    }
                    className="border-2 border-[#6425FE] w-[300px] h-[48px] rounded-lg text-[#6425FE] font-poppins font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openAdsAllocationModal && (
        <a
          onClick={() => setOpenAdsAllocationModal(!openAdsAllocationModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openAdsAllocationModal && (
        <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[970px] items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[120px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() =>
                  setOpenAdsAllocationModal(!openAdsAllocationModal)
                }
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-5/6 lg:w-5/6 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="p-3">
              <div className="grid grid-cols-12 space-x-1">
                {/* col 1 */}
                <div className="col-span-6 border border-gray-300 rounded-md">
                  <div className="mt-10">
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-[#2F3847] text-[44px] font-bold">
                        Ads Allocation
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-[#2F3847] text-[14px] text-center">
                        Define when and where your advertisements will be <br />
                        displayed for maximum impact.
                      </div>
                    </div>
                    <div className="mt-10">
                      {/* Booking Period */}
                      <div className="grid grid-cols-10">
                        <div className="col-span-2" />
                        <div className="col-span-2">
                          <div className="font-poppins font-bold">
                            Booking Period :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4">
                          <div className="font-poppins font-medium  text-lg">
                            {` ${format(
                              booking_date[0],
                              "EEE dd MMM yyyy"
                            )} - ${format(
                              booking_date[booking_date.length - 1],
                              "EEE dd MMM yyyy"
                            )}`}
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Booking Period */}

                      {/* Apply To Screens */}
                      <div className="grid grid-cols-10 mt-2">
                        <div className="col-span-2" />
                        <div className="col-span-2 mt-2">
                          <div className="font-poppins font-bold">
                            Apply to Screens :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4 border border-[#D9D9D9] rounded-md">
                          <div className="p-2">
                            <div className="grid grid-cols-5">
                              <div className="col-span-4">
                                <div className="flex flex-wrap">
                                  {screenAdsAllocation.map((screen, index) => (
                                    <div
                                      key={index}
                                      className="border border-gray-300 rounded-sm bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                      style={{ flexBasis: "calc(50% - 8px)" }}
                                    >
                                      <div className="font-poppins text-xs font-bold">
                                        {screen.name}
                                      </div>

                                      <IoIosClose
                                        size={20}
                                        className="cursor-pointer text-[#6425FE]"
                                        onClick={() =>
                                          handleDeleteScreenAdsAllocation(index)
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="flex">
                                  {screenAdsAllocation.length > 0 && (
                                    <IoIosCloseCircle
                                      onClick={() =>
                                        setScreennAdsAllocation([])
                                      }
                                      size={24}
                                      className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                                    />
                                  )}

                                  <div className="relative">
                                    <IoIosAdd
                                      size={24}
                                      className="mt-1 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                      onClick={
                                        handleToggleDropdownApplyToScreen
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Apply To Screens */}

                      {/* Apply To Periods */}
                      <div className="grid grid-cols-10 mt-5">
                        <div className="col-span-2" />
                        <div className="col-span-2">
                          <div className="font-poppins font-bold">
                            Apply to Period :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4 space-y-1 ">
                          {datePickers.map((datePicker, index) => (
                            <div className="grid grid-cols-5 border border-[#D9D9D9] rounded-md">
                              <div className="col-span-2 p-2 flex justify-center items-center">
                                <div className="font-poppins">
                                  <DatePicker
                                    selected={datePicker.startDate}
                                    selectsStart
                                    startDate={datePicker.startDate}
                                    endDate={datePicker.endDate}
                                    dateFormat="dd/MM/yyyy"
                                    onChange={(date) =>
                                      handleStartDateChange(index, date)
                                    }
                                    className="p-2 rounded-lg shadow-md w-full"
                                  />
                                </div>
                              </div>
                              <div className="col-span-2 p-2">
                                <div className="font-poppins">
                                  <DatePicker
                                    selected={datePicker.endDate}
                                    selectsEnd
                                    startDate={datePicker.startDate}
                                    endDate={datePicker.endDate}
                                    minDate={datePicker.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    onChange={(date) =>
                                      handleEndDateChange(index, date)
                                    }
                                    className=" p-2 rounded-lg shadow-md w-full"
                                  />
                                </div>
                              </div>
                              <div className="col-span-1 p-2 flex justify-center items-center">
                                <IoIosRemoveCircle
                                  size={24}
                                  className="mt-1 ml-2 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                  onClick={() => handleRemoveDatePicker(index)}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="grid grid-cols-5 border border-[#D9D9D9] rounded-md">
                            <div className="col-span-4">
                              <div className="p-2">
                                <div className="flex flex-wrap">
                                  <div className="font-poppins text-[#AFAFAF]">
                                    Add Period
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="p-2">
                                <div className="flex justify-center items-center">
                                  <IoIosAddCircle
                                    size={24}
                                    onClick={handleAddDatePicker}
                                    className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Apply To Periods */}

                      {/* Screen Resolution */}
                      <div className="grid grid-cols-10 mt-10">
                        <div className="col-span-2" />
                        <div className="col-span-2">
                          <div className="font-poppins font-bold">
                            Screen Resolution :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4">
                          <div className="font-poppins font-medium text-lg">
                            {screen_select.value.resolutions} px
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Screen Resolution */}

                      {/* Media Rule */}
                      <div className="grid grid-cols-10 mt-3">
                        <div className="col-span-2" />
                        <div className="col-span-2">
                          <div className="font-poppins font-bold">
                            Media Rule :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-4">
                          <div className="h-[40px] bg-[#FD6822] rounded-md">
                            <div className="flex justify-center items-center">
                              <div className="font-poppins font-medium text-lg text-white text-center mt-2">
                                Resolution : {screen_select.value.resolutions}{" "}
                                px
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Media Rule */}

                      {/* Note */}
                      <div className="grid grid-cols-10 mt-40">
                        <div className="col-span-2" />
                        <div className="col-span-7">
                          <div className="flex">
                            <div className="font-poppins">
                              <b>Note :</b> Modifications made will only affect
                              the screens and periods within the booked
                              timeframe.
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                      {/* Note */}

                      <div className="flex justify-center items-center space-x-2 mt-3 mb-2">
                        <button className="w-[250px] h-[48px] bg-[#6425FE] rounded-md text-white font-poppins font-bold">
                          Confirm
                        </button>
                        <button className="w-[250px] h-[48px] border border-[#6425FE] rounded-md text-[#6425FE] font-poppins font-bold">
                          Clear Slot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col 1 */}

                {/* col 2 */}
                <div className="col-span-6 border border-gray-300 rounded-md">
                  <div className="grid grid-cols-6 space-x-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <div className="col-span-3">
                        <div className="p-2">
                          <div className="flex items-center justify-center">
                            <div className="font-poppins text-[32px] font-bold">
                              Media Playlist
                            </div>
                          </div>

                          <div style={{ display: "flex" }}>
                            {/* Panel 1 */}
                            <Droppable droppableId="panel-1">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="m-[8px] p-[8px] w-[400px] min-h-[400px] bg-gray-300"
                                >
                                  {itemsPanel1.value.media_list.map(
                                    (item, index) => (
                                      <Draggable
                                        key={`panel1-${index}`}
                                        draggableId={`panel1-${index}`}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="select-none p-4 m-0 mb-2 min-h-50 bg-white"
                                            style={{
                                              margin: "0 0 8px 0",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            {item.media_name ||
                                              `panel1-${index}`}
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        {/* Panel 2 */}
                        <Droppable droppableId="panel-2">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                margin: 8,
                                padding: 8,
                                width: 200,
                                minHeight: 400,
                                backgroundColor: "lightgrey",
                              }}
                            >
                              {itemsPanel2.map((item, index) => (
                                <Draggable
                                  key={`panel2-${index}`}
                                  draggableId={`panel2-${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.media_name}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </DragDropContext>
                  </div>
                </div>
                {/* col 2 */}

                {/* col 3 */}
                {/* <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className={`tablink flex items-center justify-center ${
                        mediaAdsAllocationTab === "All" ? "active" : ""
                      }`}
                      onClick={() => openMediaAdsAllocationTab("All")}
                    >
                      <IoMdFolderOpen
                        size={24}
                        className={`mr-2 ${
                          mediaAdsAllocationTab === "All"
                            ? "text-purple-600"
                            : "text-black"
                        }`}
                      />
                      <div
                        className={`font-poppins text-[14px] ${
                          mediaAdsAllocationTab === "All"
                            ? "text-purple-600"
                            : "text-black"
                        } flex items-center`}
                      >
                        <span className="ml-1">All</span>
                      </div>
                    </button>
                    <button
                      className={`tablink flex items-center justify-center ${
                        mediaAdsAllocationTab === "Video" ? "active" : ""
                      }`}
                      onClick={() => openMediaAdsAllocationTab("Video")}
                    >
                      <FiVideo
                        size={24}
                        className={`mr-2 ${
                          mediaAdsAllocationTab === "Video"
                            ? "text-purple-600"
                            : "text-black"
                        }`}
                      />
                      <div
                        className={`font-poppins text-[14px] ${
                          mediaAdsAllocationTab === "Video"
                            ? "text-purple-600"
                            : "text-black"
                        } flex items-center`}
                      >
                        Video
                      </div>
                    </button>
                    <button
                      className={`tablink flex items-center justify-center ${
                        mediaAdsAllocationTab === "Image" ? "active" : ""
                      }`}
                      onClick={() => openMediaAdsAllocationTab("Image")}
                    >
                      <FiImage
                        size={24}
                        className={`mr-2 ${
                          mediaAdsAllocationTab === "Image"
                            ? "text-purple-600"
                            : "text-black"
                        }`}
                      />
                      <div
                        className={`font-poppins text-[14px] ${
                          mediaAdsAllocationTab === "Image"
                            ? "text-purple-600"
                            : "text-black"
                        } flex items-center`}
                      >
                        Image
                      </div>
                    </button>
                  </div>

                  <div className="tabcontent mt-3">
                    {mediaAdsAllocationTab === "All" && (
                      <div className="p-2">
                        <div className="grid grid-cols-10">
                          <div className="col-span-1">
                            <div className="flex items-center justify-start">
                              <AiOutlineSearch size={24} />
                            </div>
                          </div>
                          <div className="col-span-9">
                            <input
                              type="text"
                              placeholder="Search"
                              className="font-poppins pl-2 rounded-md w-full h-full"
                              value={searchTerm}
                              onChange={(e) =>
                                searchMediaByName(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="h-[680px] overflow-y-auto space-y-2">
                            {media_list.map((items, index) => (
                              <div className="grid grid-cols-11 h-[80px] border border-gray-300">
                                <div className="col-span-2 flex justify-center items-center">
                                  {items.media_type === "video" ? (
                                    <FiVideo
                                      size={30}
                                      className="text-[#6425FE]"
                                    />
                                  ) : (
                                    <FiImage
                                      size={30}
                                      className="text-[#6425FE]"
                                    />
                                  )}
                                </div>
                                <div className="col-span-8">
                                  <div className="flex justify-start items-center mt-2">
                                    <div className="font-poppins text-[15px]">
                                      {items.media_name}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center ">
                                    <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                      File Size : {items.media_size}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center ">
                                    {items.media_duration > 0 && (
                                      <div className="font-poppins text-[15px]">
                                        Duration : {items.media_duration} sec
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-1 flex justify-start items-center">
                                  <IoIosPlayCircle
                                    size={26}
                                    className="text-[#6425FE]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {mediaAdsAllocationTab === "Video" && (
                      <div className="p-2">
                        <div className="grid grid-cols-10">
                          <div className="col-span-1">
                            <div className="flex items-center justify-start">
                              <AiOutlineSearch size={24} />
                            </div>
                          </div>
                          <div className="col-span-9">
                            <input
                              type="text"
                              placeholder="Search"
                              className="font-poppins pl-2 rounded-md w-full h-full"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="h-[680px] overflow-y-auto space-y-2">
                            {media_list
                              .filter((item) => item.media_type === "video")
                              .map((items, index) => (
                                <div className="grid grid-cols-11 h-[80px] border border-gray-300">
                                  <div className="col-span-2 flex justify-center items-center">
                                    {items.media_type === "video" ? (
                                      <FiVideo
                                        size={30}
                                        className="text-[#6425FE]"
                                      />
                                    ) : (
                                      <FiImage
                                        size={30}
                                        className="text-[#6425FE]"
                                      />
                                    )}
                                  </div>
                                  <div className="col-span-8">
                                    <div className="flex justify-start items-center mt-2">
                                      <div className="font-poppins text-[15px]">
                                        {items.media_name}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center ">
                                      <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                        File Size : {items.media_size}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center ">
                                      {items.media_duration > 0 && (
                                        <div className="font-poppins text-[15px]">
                                          Duration : {items.media_duration} sec
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-span-1 flex justify-start items-center">
                                    <IoIosPlayCircle
                                      size={26}
                                      className="text-[#6425FE]"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {mediaAdsAllocationTab === "Image" && (
                      <div className="p-2">
                        <div className="grid grid-cols-10">
                          <div className="col-span-1">
                            <div className="flex items-center justify-start">
                              <AiOutlineSearch size={24} />
                            </div>
                          </div>
                          <div className="col-span-9">
                            <input
                              type="text"
                              placeholder="Search"
                              className="font-poppins pl-2 rounded-md w-full h-full"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="h-[680px] overflow-y-auto space-y-2">
                            {media_list
                              .filter((item) => item.media_type === "image")
                              .map((items, index) => (
                                <div className="grid grid-cols-11 h-[80px] border border-gray-300">
                                  <div className="col-span-2 flex justify-center items-center">
                                    {items.media_type === "video" ? (
                                      <FiVideo
                                        size={30}
                                        className="text-[#6425FE]"
                                      />
                                    ) : (
                                      <FiImage
                                        size={30}
                                        className="text-[#6425FE]"
                                      />
                                    )}
                                  </div>
                                  <div className="col-span-8">
                                    <div className="flex justify-start items-center mt-2">
                                      <div className="font-poppins text-[15px]">
                                        {items.media_name}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center ">
                                      <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                        File Size : {items.media_size}
                                      </div>
                                    </div>
                                    <div className="flex justify-start items-center ">
                                      {items.media_duration > 0 && (
                                        <div className="font-poppins text-[15px]">
                                          Duration : {items.media_duration} sec
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-span-1 flex justify-start items-center">
                                    <IoIosPlayCircle
                                      size={26}
                                      className="text-[#6425FE]"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div> */}
                {/* col 3 */}
              </div>
            </div>
          </div>
        </div>
      )}

      {openModalUploadNewMedia && (
        <a
          onClick={() => {
            setOpenModalUploadMedia(!openModalUploadNewMedia);
            setOpenAdsAllocationModal(!openAdsAllocationModal);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openModalUploadNewMedia && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-14 lg:top-12 lg:right-[350px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setOpenModalUploadMedia(!openModalUploadNewMedia);
                  setOpenAdsAllocationModal(!openAdsAllocationModal);
                  setUploads({});
                }}
              >
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-3/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">New Media</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
            </div>

            <div className="flex justify-center items-center mt-2 p-5">
              <div className="col-span-1 border-dashed border-gray-300 border-1">
                <div className="p-4">
                  <div className="flex items-center justify-center mt-2">
                    <div className="font-poppins text-3xl font-bold">
                      Rule Set 1
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-7">
                    {!uploads.content ? (
                      <div>
                        <button onClick={() => uploadFile()}>
                          <AiOutlineCloudUpload size={100} color={"#D9D9D9"} />
                        </button>
                        {uploads.content && (
                          <div>
                            <p>File Uploaded:</p>
                            <img src={uploads} alt="Uploaded File" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <BsCheckCircle size={100} color={"#00CB45"} />
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-14">
                    <div className="font-poppins text-xl font-bold">
                      {uploads.name}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    <div className="font-poppins text-xl font-bold">
                      Requirements *
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <div className="font-poppins text-xl font-bold">
                      Resolution : 1920 x 1080
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-16">
                    <div className="font-poppins text-xl font-bold">
                      {`Size : <100Mb`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-1">
              <button
                onClick={() => console.log(uploads)}
                className="bg-[#6425FE] w-72 h-10 text-white font-poppins"
              >
                Submit
              </button>
            </div>
            <div className="flex justify-center items-center mt-3 mb-3">
              <div className="text-sm font-poppins">
                Ensure compliance with predefined media rules for each screen.
                Your ads must adhere to specific guidelines for seamless display
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddScreenOpen && (
        <a
          onClick={() => {
            setIsAddScreenOpen(!isAddScreenOpen);
            setOpenAdsAllocationModal(!openAdsAllocationModal);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {isAddScreenOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-10 top-14 lg:top-5 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setIsAddScreenOpen(!isAddScreenOpen);
                  setOpenAdsAllocationModal(!openAdsAllocationModal);
                  setSelectedData([]);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen  relative">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl font-bold">
                Select Screens
              </div>
            </div>
            <div className="mt-1">
              <div className="grid grid-cols-4">
                <div className="flex justify-end items-center col-span-3">
                  <div className="font-poppins text-xs lg:text-xl text-[#2F3847] mr-28">
                    {`You Booking Period : ${format(
                      booking_date[0],
                      "EEE dd MMM yyyy"
                    )} - ${format(
                      booking_date[booking_date.length - 1],
                      "EEE dd MMM yyyy"
                    )}`}
                  </div>
                </div>
                <div className="flex justify-end items-center col-span-1 ">
                  <button
                    onClick={() =>
                      setOpenAddNewScreenModal(!openAddNewScreenModal)
                    }
                    className="bg-[#6425FE] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
                  >
                    New Screen
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
                    icon={<IoIosSearch />}
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
              <div className="w-auto h-[350px] overflow-y-auto">
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
                    {screens.map((row, key) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className=" h-5 w-5 cursor-pointer"
                              checked={checkboxes[row.id] || false}
                              onChange={() => toggleCheckboxAddScreen(row.id)}
                            />
                            {/* <span className="h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center bg-white">
                              {checkboxes[row.id] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-white"
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
                              )}
                            </span> */}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="flex items-center">
                            <div className="font-poppins text-xl font-bold">
                              {row.name}
                            </div>
                            <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
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
                                className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                style={{ flexBasis: "calc(20% - 8px)" }}
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
                onClick={() => handleAddScreenAllocation()}
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
