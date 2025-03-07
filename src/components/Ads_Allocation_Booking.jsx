import React, { useState, useEffect } from "react";
import {
  IoIosClose,
  IoIosCloseCircle,
  IoIosAdd,
  IoIosRemoveCircle,
  IoIosAddCircle,
  IoMdFolderOpen,
  IoIosPlayCircle,
  IoIosArrowDown,
} from "react-icons/io";
import { RiEditLine, RiSave3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FiImage, FiVideo } from "react-icons/fi";
import { MdDragHandle } from "react-icons/md";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import User from "../libs/admin";
import Ads_Allocation_Apply_Screen from "../components/Ads_Allocation_Apply_Screen";
import Confirm_Allocation from "../components/Confirm_Allocation";
import Create_New_Playlist_Allocation from "../components/Create_New_Playlist_Allocation";
import Detail_Screen_Booking from "../components/Detail_Screen_Booking";
import "./css/alert.css";
import Permission from "../libs/permission";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const Ads_Allocation_Booking = ({
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
  booking_date,
  screenAdsAllocation,
  setScreennAdsAllocation,
  datePickers,
  setDatePickers,
  screen_select,
  media_list,
  itemsPanel1,
  setItemsPanel1,
  itemsPanel2,
  setItemsPanel2,
  setOpenModalUploadMedia,
  openModalUploadNewMedia,
  mediaAdsAllocationTab,
  openMediaAdsAllocationTab,
  searchTerm,
  setSearchTerm,
  setModalPlayerOpen,
  modalPlayerOpen,
  setMediaDisplay,
  setCheckboxes,
  media_rules_select,
  media_rules_select_id,
  checkboxes,
  bookingId,
  setMediaAllocatonUploadIndex,
  screenSelectFromEdit,
  screen,
  allScreenData,
  setFactAllocation,
  fact_allocation,
  fact_panel1,
  isStatic,
  isEvent,
}) => {
  const [isApplyToScreen, setIsApplyToScreen] = useState(false);
  const [full_media_items, setFullMediasItems] = useState([]);

  const [openAddNewScreenModal, setOpenAddNewScreenModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [screenUsePlaylist, setScreenUsePlaylist] = useState([]);

  const [isOpenConfirmAllocation, setIsOpenConfirmAllocation] = useState(false);
  const [isOpenCreateNewPlaylist, setIsOpenCreateNewPlaylist] = useState(false);

  const [showDetailScreen, setShowDetailScreen] = useState(false);
  const [detailScreen, setDetailScreen] = useState(null);

  const { token } = User.getCookieData();

  const [page_permission, setPagePermission] = useState([]);
  const [playlist_permission, setPlaylistPermission] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [file_config, setFileConfig] = useState([]);
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);

  const [default_content_time, setDefaultContentTime] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    setEditData();
    setTempMediaList();
    setDefaultApplyToScreen();
    setDefaultPanel1(itemsPanel1.value.slots, itemsPanel1.value.medias);
    getPermission();
    getConfig();
  }, []);

  const setTempMediaList = async () => {
    setFullMediasItems(itemsPanel2);
  };

  const getConfig = async () => {
    const {
      configuration: { contenttype },
      configuration: { brandconfig },
    } = await User.getConfiguration(token);

    const parameterValue = brandconfig.find(
      (item) => item.ParameterKey === "CONTENTPERSLOT_SEC"
    )?.ParameterValue;
    const result = parameterValue ? parseInt(parameterValue) : null;
    setDefaultContentTime(result);
    setFileConfig(contenttype);
  };

  const setEditData = async () => {
    const data = await User.getPlaylist(bookingId, token);
    const screen_data = data.filter(
      (items) =>
        parseInt(items.MediaPlaylistID) === screen_select.value.mediaplaylistid
    );

    if (screen_data.length > 0) {
      getMediaInPlaylist(screen_data[0].MediaPlaylistID, screen_data[0]);
      setMediaPlaylistId(screen_data[0].MediaPlaylistID);
      setPlaylistName(screen_data[0].PlaylistName);
      setTempPlaylistName(screen_data[0].PlaylistName);
    }
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);

    setPagePermission(permissions?.digiBookContMgt);

    setPlaylistPermission(permissions?.digiPlaylistMgt);
  };

  const setDefaultApplyToScreen = () => {
    if (screenAdsAllocation.length <= 0) {
      const filteredScreen = screen.filter(
        (screen) => screen.ScreenID === screenSelectFromEdit
      );
      setScreennAdsAllocation(filteredScreen);
    }
  };

  const setDefaultPanel1 = (slots, media_list) => {
    const nullFreeList = media_list.filter((it) => it.ContentID !== null);
    const mediaSize = nullFreeList.reduce((acc, b) => {
      var slotSizeB = 1;
      if ("slot_size" in b) slotSizeB = b.slot_size;

      return acc + slotSizeB;
    }, 0);

    const emptySlots = [];

    for (var i = mediaSize; i < slots; i++) {
      emptySlots.push({
        ContentID: null,
        ContentName: null,
        ContentTypeName: null,
        ContentProperties: null,
        slot_size: 1,
        slot_num: i + 1,
      });
    }

    const processedMediaList = [...nullFreeList, ...emptySlots];
    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        medias: processedMediaList,
      },
    }));
  };

  const handleDeleteScreenAdsAllocation = (index, id) => {
    const newData = [...screenAdsAllocation];
    newData.splice(index, 1);
    setScreennAdsAllocation(newData);

    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [id]: !prevCheckboxes[id],
      };

      return updatedCheckboxes;
    });
  };

  const handleToggleDropdownApplyToScreen = () => {
    setIsApplyToScreen(!isApplyToScreen);
    // setOpenAdsAllocationModal(!openAdsAllocationModal);
  };

  const handleStartDateChange = (index, date) => {
    const newDatePickers = [...datePickers];

    newDatePickers[index].startDate = date;
    setDatePickers(newDatePickers);
    generateDateRange(index);
  };

  const handleEndDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].endDate = date;
    if (newDatePickers[index].endDate < newDatePickers[index].startDate) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเลือกวันย้อนหลังได้",
      });
      return;
    }

    setDatePickers(newDatePickers);
    generateDateRange(index);
  };

  const generateDateRange = (index) => {
    const startDate = new Date(datePickers[index].startDate);
    const endDate = new Date(datePickers[index].endDate);

    const newDateRange = [];
    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      newDateRange.push(currentDate.toISOString().split("T")[0]);
    }

    datePickers[index].dateRange = newDateRange;
  };

  const handleAddDatePicker = () => {
    const booking_date_format = booking_date.map((timestamp) =>
      format(timestamp, "yyyy-MM-dd")
    );
    const todayed = new Date().toISOString().split("T")[0];
    const filteredDates = booking_date_format.filter((date) => date >= todayed);

    const today = new Date();
    today.setHours(7, 0, 0, 0); // Set the time to 07:00:00

    if (datePickers.length > 0) {
      const nextStartDate = new Date(
        datePickers[datePickers.length - 1].endDate
      );
      nextStartDate.setDate(nextStartDate.getDate() + 1);
      if (nextStartDate > new Date(booking_date[booking_date.length - 1])) {
        nextStartDate.setDate(nextStartDate.getDate() - 1);
        setDatePickers([
          ...datePickers,
          {
            startDate: nextStartDate,
            endDate: new Date(booking_date[booking_date.length - 1]),
            dateRange: booking_date_format,
          },
        ]);
      } else {
        setDatePickers([
          ...datePickers,
          {
            startDate: nextStartDate,
            endDate: new Date(booking_date[booking_date.length - 1]),
            dateRange: booking_date_format,
          },
        ]);
      }
    } else {
      setDatePickers([
        ...datePickers,
        {
          startDate: today,
          endDate: new Date(booking_date[booking_date.length - 1]),
          dateRange: filteredDates,
        },
      ]);
    }
  };

  const handleRemoveDatePicker = (index) => {
    const newDatePickers = [...datePickers];
    newDatePickers.splice(index, 1);
    setDatePickers(newDatePickers);
  };

  const deepEqualArrayForEditMedia = (obj1, obj2) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (
        !keys2.includes(key) ||
        !deepEqualArrayForEditMedia(obj1[key], obj2[key])
      ) {
        return false;
      }
    }

    return true;
  };

  const checkAreArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) =>
      deepEqualArrayForEditMedia(item, arr2[index])
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // If the drag is within the same panel
      const draggedItem = itemsPanel1.value.medias[source.index];
      const updatedMediaList = [...itemsPanel1.value.medias];
      updatedMediaList.splice(result.source.index, 1); // Remove item from original position
      updatedMediaList.splice(destination.index, 0, draggedItem); // Insert item at destination index
      if (source.droppableId === "panel-1") {
        if (!checkAreArraysEqual(fact_panel1.medias, updatedMediaList)) {
          setIsEdit(true);
        } else {
          setIsEdit(false);
        }

        setItemsPanel1({
          ...itemsPanel1,
          value: {
            ...itemsPanel1.value,
            medias: updatedMediaList,
          },
        });
      }
    } else {
      // If the drag is between different panels
      const sourceItems =
        source.droppableId === "panel-1"
          ? itemsPanel1.value.medias
          : itemsPanel2;

      const destinationItems =
        destination.droppableId === "panel-1"
          ? itemsPanel1.value.medias
          : itemsPanel2;

      const value = destinationItems;
      let lastIndexWithData = -1;
      for (let i = 0; i < value.length; i++) {
        if (value[i].ContentID !== null) {
          lastIndexWithData = i;
        } else {
          lastIndexWithData = 0;
        }
      }
      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1),
      ];

      const getLastNonNullIndex = (arr) => {
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[i].ContentID !== null) {
            return i;
          }
        }
        return -1;
      };

      let newDestinationItems = [...destinationItems];

      newDestinationItems = newDestinationItems.filter(
        (item) => item?.ContentID !== null
      );

      let lastIndex = getLastNonNullIndex(destinationItems);
      let destinationIndex = lastIndex === -1 ? 0 : lastIndex + 1;
      const isFull = newDestinationItems.length >= itemsPanel1.value.slots;
      const hasContentID = itemsPanel1.value.medias[0]?.ContentID !== null;
      const totalDuration = itemsPanel1.value.medias.reduce((sum, item) => {
        // Check if duration exists and is a number
        return sum + (item.duration ? item.duration : 0);
      }, 0);

      if (isFull && hasContentID) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "จำนวน Slot เต็มแล้ว ...",
        });
      } else if (destination.droppableId === "panel-1") {
        if (totalDuration === itemsPanel1.value.slots * 15) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "จำนวน Slot เต็มแล้ว ...",
          });
        } else {
          const draggedItem = sourceItems.find(
            (item) =>
              item.ContentID === parseInt(result.draggableId.split("-")[1])
          );

          newDestinationItems = insert(destinationItems, destinationIndex, {
            ...draggedItem,
            MediaID: 0,
            slot_size: 1,
            duration: default_content_time,
          });

          if (!checkAreArraysEqual(fact_panel1.medias, newDestinationItems)) {
            setIsEdit(true);
          } else {
            setIsEdit(false);
          }

          setItemsPanel1({
            ...itemsPanel1,
            value: {
              ...itemsPanel1.value,
              medias: newDestinationItems,
            },
          });
        }
      }
    }
  };

  const handleAddMediaPlaylistItem = (index) => {
    const updatedMediaList = [...itemsPanel1.value.medias];
    if (!media_rules_select[updatedMediaList[index].ContentTypeName]) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: " คุณไม่สามารถลบ Media ได้ตามสิทธิ Media Rule ...",
      });
      return;
    }
    const target = updatedMediaList[index];
    if ("slot_size" in target) {
      target.slot_size = target.slot_size + 1;
      target.duration = target.duration + default_content_time;
    } else {
      target.slot_size = 2;
    }

    if (fact_panel1.medias !== updatedMediaList) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        medias: updatedMediaList,
      },
    }));
  };

  const handleRemoveMediaPlaylistItem = (index) => {
    const updatedMediaList = [...itemsPanel1.value.medias]; // Access the media_list array inside value object

    const target = { ...updatedMediaList[index] };

    //*** only needed to expand slot_size if at least one empty slot is still available
    if ("slot_size" in target) {
      target.slot_size = target.slot_size - 1;
      target.duration = target.duration - default_content_time;
    } else {
      target.slot_size = 0;
    }

    //remove if size = 0
    if (target.slot_size === 0) {
      Swal.fire({
        text: `คุณต้องการลบ ${target.ContentName} ออกจาก Playlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (!media_rules_select[updatedMediaList[index].ContentTypeName]) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: " คุณไม่สามารถลบ Media ได้ตามสิทธิ Media Rule ...",
            });
            return;
          }

          const nullifiedMediaItem = {
            ContentID: null,
            ContentName: null,
            ContentTypeName: null,
            ContentProperties: null,
          }; // Define a nullified media item

          updatedMediaList[index] = nullifiedMediaItem; // Update the media item in the list

          const output_data = updatedMediaList.reduce((acc, item) => {
            if (item.ContentID !== null) {
              acc.push(item);
            }
            return acc;
          }, []);

          const nullItems = updatedMediaList.filter(
            (item) => item.ContentID === null
          );
          nullItems.forEach((item) => output_data.push(item));

          if (fact_panel1.medias !== output_data) {
            setIsEdit(true);
          } else {
            setIsEdit(false);
          }

          setItemsPanel1((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              medias: output_data,
            },
          }));
        }
      });
    } else {
      // ลบขนาดของ Media
      if (!media_rules_select[updatedMediaList[index].ContentTypeName]) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: " คุณไม่สามารถลบ Media ได้ตามสิทธิ Media Rule ...",
        });
        return;
      }
      updatedMediaList[index] = { ...target };
      const output_data = updatedMediaList.reduce((acc, item) => {
        if (item.ContentID !== null) {
          acc.push(item);
        }
        return acc;
      }, []);

      const nullItems = updatedMediaList.filter(
        (item) => item.ContentID === null
      );
      nullItems.forEach((item) => output_data.push(item));

      if (fact_panel1.medias !== output_data) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }

      setItemsPanel1((prevState) => ({
        ...prevState,
        value: {
          ...prevState.value,
          medias: output_data,
        },
      }));
    }

    // Update the state with the modified media list
  };

  const renderMediaList = (slots, media_list) => {
    const nullFreeList = media_list.filter((it) => it.ContentID !== null);

    var currentIndex = 0;
    var accumulatecSlotSize = 1;

    // *** Need to get the actual booking size
    // const slots = 15;

    const mediaSize = nullFreeList.reduce((acc, b) => {
      var slotSizeB = 1;
      if ("slot_size" in b) slotSizeB = b.slot_size;

      return acc + slotSizeB;
    }, 0);

    const emptySlots = [];

    for (var i = mediaSize; i < slots; i++) {
      emptySlots.push({
        ContentID: null,
        ContentName: null,
        ContentTypeName: null,
        ContentProperties: null,
        slot_size: 1,
        slot_num: i + 1,
        duration: default_content_time,
      });
    }

    const processedMediaList = [...nullFreeList, ...emptySlots];

    return processedMediaList.map((items, index) => {
      const slotSize = "slot_size" in items ? items.slot_size : 1;
      // *** use dynamic height depending on slot_size
      const itemHeight = 80 * slotSize;

      return (
        <Draggable
          key={`panel1-${index}`}
          draggableId={`panel1-${index}`}
          index={index}
          isDragDisabled={
            playlist_permission?.craete || playlist_permission?.update
              ? false
              : true
          }
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`col-span-11`}
            >
              {items?.ContentID ? (
                <div className="flex items-center mr-1">
                  {playlist_permission?.craete ||
                  playlist_permission?.update ? (
                    <div>
                      {processedMediaList.filter(
                        (item) => item.ContentID === null
                      ).length > 0 && (
                        <>
                          {playlist_permission?.create ||
                          playlist_permission?.update ? (
                            <IoIosAddCircle
                              size={24}
                              className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                              onClick={() => handleAddMediaPlaylistItem(index)}
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                      {playlist_permission.create ||
                      playlist_permission.update ? (
                        <IoIosRemoveCircle
                          size={24}
                          className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                          onClick={() => {
                            if (
                              playlist_permission?.create ||
                              playlist_permission?.update
                            ) {
                              handleRemoveMediaPlaylistItem(index);
                            } else {
                              Swal.fire({
                                icon: "error",
                                title: "เกิดข้อผิดพลาด!",
                                text: "คุณไม่มีสิทธิ์ในการจัดการ Playlist ...",
                              });
                            }
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="flex-1">
                    <div
                      className={`grid grid-cols-12 h-[${itemHeight}px] border border-gray-300 w-[265px] lg:w-[335px] rounded-lg shadow-sm`}
                      style={{ height: `${itemHeight}px` }}
                    >
                      <div className="col-span-2 flex justify-center items-center">
                        {items.ContentTypeName === "Video" ? (
                          <FiVideo size={30} className="text-[#6425FE]" />
                        ) : (
                          <FiImage size={30} className="text-[#6425FE]" />
                        )}
                      </div>
                      <div className="col-span-8 flex justify-start items-center">
                        <div>
                          <div className="flex justify-start items-center">
                            <div className="font-poppins text-[15px]">
                              {items.ContentName?.length > 30 ? (
                                <span>
                                  {items.ContentName?.slice(0, 27) + "..."}
                                </span>
                              ) : (
                                <div className="font-poppins font-bold">
                                  {items.ContentName
                                    ? items.ContentName
                                    : "....."}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-start items-center ">
                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                              File Size :{" "}
                              {items.ContentProperties
                                ? parseFloat(
                                    JSON.parse(items.ContentProperties).size
                                  ).toFixed(2)
                                : "....."}{" "}
                              MB
                            </div>
                          </div>
                          <div className="flex justify-start items-center ">
                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                              Duration : {items.duration} sec
                            </div>
                          </div>
                        </div>
                      </div>
                      {playlist_permission?.craete ||
                      playlist_permission?.update ? (
                        <div className="col-span-1 flex justify-start items-center">
                          <MdDragHandle size={26} className="text-[#6425FE]" />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center" key={`empty${currentIndex}`}>
                  <IoIosRemoveCircle
                    size={24}
                    className={`text-[#6425FE] hover:text-[#3b1694] cursor-pointer opacity-0`}
                  />
                  <div className="flex-1">
                    <div
                      onClick={() => {
                        if (
                          playlist_permission?.update ||
                          playlist_permission?.create
                        ) {
                          setOpenModalUploadMedia(!openModalUploadNewMedia);
                          // setOpenAdsAllocationModal(!openAdsAllocationModal);
                          setMediaAllocatonUploadIndex(index);
                        }
                      }}
                      className={`grid grid-cols-11 h-[80px] border border-dashed border-[#2F3847]  w-[265px] lg:w-[320px] ${
                        playlist_permission?.create ||
                        playlist_permission?.update
                          ? "cursor-pointer"
                          : ""
                      }`}
                    >
                      <div className="col-span-2 flex justify-center items-center">
                        <div className="font-poppins text-[#2F3847] text-[40px] font-bold">
                          {items.slot_num}
                        </div>
                      </div>
                      <div className="col-span-8 flex justify-start items-center">
                        <div className="font-poppins text-[#2F3847] text-[16px]">
                          Drag Media From Library or Click for Upload New Media
                        </div>
                      </div>
                      <div className="col-span-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Draggable>
      );
    });
  };

  const searchMediaByName = (value) => {
    setSearchTerm(value);
    if (value) {
      const results = itemsPanel2.filter((item) =>
        item.ContentName.toLowerCase().includes(value.toLowerCase())
      );
      setItemsPanel2(results);
    } else {
      setItemsPanel2(full_media_items);
    }
  };

  const handleDateRangeToString = (datePickers) => {
    let date_range;
    if (datePickers.length > 0) {
      date_range = datePickers
        .reduce((acc, curr) => {
          curr.dateRange.forEach((date) => {
            if (!acc.includes(date)) {
              acc.push(date);
            }
          });
          return acc;
        }, [])
        .join(",");

      return date_range;
    }
  };

  const handleMediaPlaylist = (itemsPanel1) => {
    const itemsPanel1Filtered = { ...itemsPanel1 };

    itemsPanel1Filtered.value.medias = itemsPanel1Filtered.value.medias.filter(
      (media) => media.ContentID !== null
    );

    return itemsPanel1Filtered.value.medias;
  };

  const compareScreenID = (screenSelectFromEdit, screens) => {
    return screens.some((screen) => screen.ScreenID !== screenSelectFromEdit);
  };

  const handleSaveAdsAllocation = async () => {
    if (isEdit) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาทำการบันทึก Playlist",
      });
      return;
    }

    Swal.fire({
      text: `คุณยืนยันการบันทึก Ads Allocation `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const date_range = handleDateRangeToString(datePickers);
        const screenIDs = screenAdsAllocation.map((screen) => ({
          screenid: screen.ScreenID,
        }));
        const screenIdsString = screenIDs
          .map((screen) => screen.screenid)
          .join(",");

        if (screenIDs.length <= 0) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณาเลือกจอที่ต้องการ ...",
          });
          return;
        }
        if (!date_range) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณาเลือกช่วงเวลา ...",
          });
          return;
        }
        if (!media_playlist_id) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณาเลือก Media Playlist ...",
          });
          return;
        }

        let obj;

        if (isEvent) {
          obj = {
            bookingid: bookingId,
            dates: date_range,
            screenids: screenIdsString,
            mediaplaylistid: parseInt(media_playlist_id),
            starttime: openTime,
            endtime: closeTime,
          };
        } else {
          obj = {
            bookingid: bookingId,
            dates: date_range,
            screenids: screenIdsString,
            mediaplaylistid: parseInt(media_playlist_id),
          };
        }

        const obj_check = {
          mediaplaylistid: parseInt(media_playlist_id),
          bookingid: bookingId,
        };

        const data = await User.getMediaPlaylistContent(obj_check, token);

        const containsImage = data.some(
          (item) => item.ContentTypeName === "Image"
        );

        const containsVideo = data.some(
          (item) => item.ContentTypeName === "Video"
        );
        const image_result =
          containsImage && !media_rules_select.Image ? false : true;

        const video_result =
          containsVideo && !media_rules_select.Video ? false : true;

        if (!image_result || !video_result) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: " Media ใน Playlist ไม่ถูกต้องตาม Media Rules ...",
          });
          return;
        }

        try {
          const check_screen = await User.getBookingContentScreen(obj, token);
          const isAnotherScreen = compareScreenID(
            screenSelectFromEdit,
            check_screen.screens
          );
          if (check_screen.screens.length >= 1 && isAnotherScreen) {
            // ถ้ามีจออื่นใช้ playlist นี้ด้วย
            // setScreennAdsAllocation([]);
            setScreenUsePlaylist(check_screen.screens);
            setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
          } else {
            // ถ้าไม่มีจออื่นใช้
            let data;
            if (isEvent) {
              data = await User.updateBookingContent(obj, token, true);
            } else {
              data = await User.updateBookingContent(obj, token, false);
            }

            if (data.code === 200) {
              Swal.fire({
                icon: "success",
                title: "Update Booking Content Success ...",
                text: "แก้ไข Booking Content สำเร็จ!",
              }).then(async (result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  setCheckboxes({});
                  setScreennAdsAllocation([]);
                  setOpenAdsAllocationModal(!openAdsAllocationModal);
                  setFactAllocation(!fact_allocation);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data.message,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCloseModalAdsAllocation = () => {
    setScreennAdsAllocation([]);
    setCheckboxes({});
    setDatePickers([]);
    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        medias: [],
      },
    }));
    setOpenAdsAllocationModal(!openAdsAllocationModal);
    setFactAllocation(!fact_allocation);
  };

  const handleSetOpenTime = (time) => {
    setOpenTime(time.format("HH:mm:ss"));
  };

  const handleSetCloseTime = (time) => {
    setCloseTime(time.format("HH:mm:ss"));
  };

  const handleClearTime = () => {
    setOpenTime();
    setCloseTime();
  };

  const [playlist_name, setPlaylistName] = useState(null);
  const [temp_playlist_name, setTempPlaylistName] = useState(null);
  const [media_playlist_id, setMediaPlaylistId] = useState(null);
  const [checkCreateMediaPlaylist, setCheckCreateMediaPlaylist] =
    useState(false);
  const [editPlaylist, setEditPlaylist] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const getMediaPlaylist = async () => {
    const data = await User.getPlaylist(bookingId, token);
    return data;
  };

  const handleSelectToggle = async () => {
    const data = await getMediaPlaylist();
    data.sort((a, b) => a.PlaylistName.localeCompare(b.PlaylistName));
    setSelectedOption(data);
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = async (option) => {
    getMediaInPlaylist(option.MediaPlaylistID, option);
  };

  const getMediaInPlaylist = async (mediaplaylistid, option) => {
    const obj = {
      bookingid: bookingId,
      mediaplaylistid: mediaplaylistid,
    };

    try {
      const data = await User.getMediaPlaylistContent(obj, token);

      if (data && data.length > 0) {
        if (data.length > itemsPanel1.value.slots) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "จำนวน Media ใน Playlist มากกว่าจำนวน Slot",
          });
          return;
        } else {
          const updatedObj = data.map((item) => {
            const duration = parseInt(item.Duration);

            const newSlotSize = duration / 15;
            return {
              ...item,
              slot_size: newSlotSize,
              slot_num: item.Ordering,
              duration: parseInt(item.Duration),
            };
          });
          const clonedItemsPanel1 = { ...itemsPanel1 };
          // Calculate the total sum of slot_size values
          const totalSlotsUsed = updatedObj.reduce(
            (acc, obj) => acc + obj.slot_size,
            0
          );
          // Add slots only if the total slots used is less than the total number of slots
          if (totalSlotsUsed < clonedItemsPanel1.value.slots) {
            const remainingSlots =
              clonedItemsPanel1.value.slots - totalSlotsUsed;

            const mock = {
              ContentID: null,
              ContentName: null,
              ContentTypeName: null,
              ContentProperties: null,
              slot_size: 1,
              slot_num: updatedObj.length + 1,
            };

            for (let i = 0; i < remainingSlots; i++) {
              updatedObj.push({ ...mock });
              mock.slot_num++;
            }
          }
          clonedItemsPanel1.value.medias = updatedObj;
          setItemsPanel1(clonedItemsPanel1);

          setMediaPlaylistId(option?.MediaPlaylistID);
          setPlaylistName(option?.PlaylistName);
          setTempPlaylistName(option?.PlaylistName);
          setCheckCreateMediaPlaylist(false);
          setIsExpanded(false);
        }
      } else {
        const clonedItemsPanel1 = { ...itemsPanel1 };
        const updatedObj = clonedItemsPanel1.value.medias.map((item, index) => {
          return {
            ContentID: null,
            ContentName: null,
            ContentTypeName: null,
            ContentProperties: null,
            slot_num: index + 1,
            slot_size: 1,
          };
        });
        clonedItemsPanel1.value.medias = updatedObj;

        setItemsPanel1(clonedItemsPanel1);

        setMediaPlaylistId(option?.MediaPlaylistID);
        setPlaylistName(option?.PlaylistName);
        setTempPlaylistName(option?.PlaylistName);
        setCheckCreateMediaPlaylist(false);
        setIsExpanded(false);
      }
    } catch (error) {
      console.error("Error fetching media playlist content:", error);
    }
  };

  const handleButtonNewPlaylist = (event) => {
    setPlaylistName("New Playlist");
    setCheckCreateMediaPlaylist(true);
    setTempPlaylistName("New Playlist");
    setIsExpanded(!isExpanded);
    setMediaPlaylistId(null);

    const clonedItemsPanel1 = JSON.parse(JSON.stringify(itemsPanel1));

    const updatedObj = clonedItemsPanel1.value.medias.map((item, index) => {
      return {
        ContentID: null,
        ContentName: null,
        ContentTypeName: null,
        ContentProperties: null,
        slot_num: index + 1,
        slot_size: 1,
      };
    });
    clonedItemsPanel1.value.medias = updatedObj;

    setItemsPanel1(clonedItemsPanel1);
  };

  const handleSavePlaylist = async () => {
    if (checkCreateMediaPlaylist) {
      // Create
      const playlist = handleMediaPlaylist(itemsPanel1);

      const media_list = playlist.map((media, index) => ({
        contentid: media.ContentID,
        duration: media.duration,
        ordering: index + 1,
      }));

      const playlist_obj = {
        bookingid: bookingId,
        playlistname: playlist_name.trim(),
        mediaruleid: media_rules_select_id,
      };

      if (playlist_name) {
        try {
          const create_return = await User.createMediaplaylist(
            playlist_obj,
            token
          );
          if (create_return.code === 200) {
            Swal.fire({
              icon: "success",
              title: "Create Media Playlist Success ...",
              text: "สร้าง Media Playlist สำเร็จ!",
            }).then(async (result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                const data = await getMediaPlaylist();
                setMediaPlaylistId(create_return.mediaplaylistid);
                setSelectedOption(data);
                setCheckCreateMediaPlaylist(false);
                if (media_list.length > 0) {
                  try {
                    const media_obj = {
                      bookingid: bookingId,
                      mediaplaylistid: create_return.mediaplaylistid,
                      medias: media_list,
                    };
                    const data = await User.createMediaPlaylistContent(
                      media_obj,
                      token
                    );
                    if (data.code === 200) {
                      const data = await getMediaPlaylist();
                      setSelectedOption(data);
                      setCheckCreateMediaPlaylist(false);
                      setIsEdit(false);
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด!",
                        text: data.message,
                      });
                    }
                  } catch (error) {
                    console.log("error");
                  }
                } else {
                  return;
                }
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: create_return.message,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกชื่อ Playlist",
        });
      }
    } else {
      // Edit
      if (playlist_name) {
        // แก้ชื่อ Playlist
        if (playlist_name !== temp_playlist_name) {
          const playlist_obj = {
            bookingid: bookingId,
            mediaplaylistid: media_playlist_id,
            playlistname: playlist_name.trim(),
          };
          try {
            const data = await User.updateMediaplaylist(playlist_obj, token);
            if (data.code === 200) {
              const data = await getMediaPlaylist();
              setSelectedOption(data);
              setTempPlaylistName(playlist_name);
              setIsEdit(false);
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data.message,
              });
            }
          } catch (error) {
            console.log("error");
          }
        }
        const clonedItemsPanel1 = JSON.parse(JSON.stringify(itemsPanel1));
        const isNewMediaInPlaylist = clonedItemsPanel1.value.medias.some(
          (item) => item.MediaID === 0
        );

        // เพิ่มข้อมูล
        if (isNewMediaInPlaylist) {
          const playlist = handleMediaPlaylist(clonedItemsPanel1);
          const media_list = playlist.map((media, index) => ({
            mediaid: media.MediaID,
            contentid: media.ContentID,
            duration: media.duration,
            ordering: index + 1,
            ContentTypeName: media.ContentTypeName,
          }));

          const containsImage = media_list.some(
            (item) => item.ContentTypeName === "Image"
          );

          const containsVideo = media_list.some(
            (item) => item.ContentTypeName === "Video"
          );
          const image_result =
            containsImage && !media_rules_select.Image ? false : true;

          const video_result =
            containsVideo && !media_rules_select.Video ? false : true;

          if (!image_result || !video_result) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: " คุณไม่มีสิทธิในการบันทึก Playlist ตาม Media Rule ...",
            });
            return;
          }

          const playlist_obj = {
            bookingid: bookingId,
            mediaplaylistid: media_playlist_id,
            medias: media_list,
          };
          try {
            const data = await User.updateMediaPlaylistContent(
              playlist_obj,
              token
            );
            if (data.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไข Media to Playlist สำเร็จ ...",
                text: "ดำเนินการแก้ไข Media to Playlist สำเร็จ!",
              }).then(async (result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  const data = await getMediaPlaylist();
                  setSelectedOption(data);
                  setIsEdit(false);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data.message,
              });
            }
          } catch (error) {
            console.log("error");
          }
        } else {
          // เรียงลำดับใหม่ และ ลบ content
          const playlist = handleMediaPlaylist(clonedItemsPanel1);
          const media_list = playlist.map((media, index) => ({
            mediaid: media.MediaID,
            contentid: media.ContentID,
            duration: media.duration,
            ordering: index + 1,
            ContentTypeName: media.ContentTypeName,
          }));

          const containsImage = media_list.some(
            (item) => item.ContentTypeName === "Image"
          );

          const containsVideo = media_list.some(
            (item) => item.ContentTypeName === "Video"
          );
          const image_result =
            containsImage && !media_rules_select.Image ? false : true;

          const video_result =
            containsVideo && !media_rules_select.Video ? false : true;

          if (!image_result || !video_result) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: " คุณไม่มีสิทธิในการบันทึก Playlist ตาม Media Rule ...",
            });
            return;
          }

          const playlist_obj = {
            bookingid: bookingId,
            mediaplaylistid: media_playlist_id,
            medias: media_list,
          };

          try {
            const data = await User.updateMediaPlaylistContent(
              playlist_obj,
              token
            );
            if (data.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไข Media to Playlist สำเร็จ ...",
                text: "ดำเนินการแก้ไข Media to Playlist สำเร็จ!",
              }).then(async (result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  const data = await getMediaPlaylist();
                  setSelectedOption(data);
                  setIsEdit(false);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: data.message,
              });
            }
          } catch (error) {
            console.log("error");
          }
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกชื่อ Playlist",
        });
      }
    }
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    if (newSelectAll) {
      // เลือกทั้งหมด
      allScreenData.forEach((row) => {
        newCheckboxes[row.ScreenID] = newSelectAll;
      });

      setCheckboxes(newCheckboxes);
      setSelectAll(newSelectAll);
      const checkedRowIds = newSelectAll
        ? allScreenData.map((row) => row.ScreenID)
        : [];
      setSelectedScreenItems(checkedRowIds);
    } else {
      // ลบทั้งหมด
      allScreenData.forEach((row) => {
        newCheckboxes[row.ScreenID] = newSelectAll;
      });

      if (newCheckboxes.hasOwnProperty(screenSelectFromEdit)) {
        newCheckboxes[screenSelectFromEdit] = true;
      }
      setCheckboxes(newCheckboxes);
      setSelectAll(newSelectAll);

      const checkedRowIds = newSelectAll
        ? allScreenData.map((row) => row.ScreenID)
        : [screenSelectFromEdit];

      setSelectedScreenItems(checkedRowIds);
    }
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

  const GenerateMediaType = () => {
    const { Image, Video } = media_rules_select;

    function filterContentTypes() {
      return file_config.filter((item) => {
        // Return item if Image is true and ContentTypeName is "Image"
        if (Image && item.ContentTypeName === "Image") {
          return true;
        }
        // Return item if Video is true and ContentTypeName is "Video"
        if (Video && item.ContentTypeName === "Video") {
          return true;
        }
        return false;
      });
    }

    const filteredContentTypes = filterContentTypes();
    const formattedOutput = filteredContentTypes
      .map((type) => {
        const typeName = type.ContentTypeName;
        const extensions = type.ContentTypeSub
          ? type.ContentTypeSub.map((sub) => sub.ContentTypeSubName).join(", ") // Join extensions
          : "";
        return `${typeName}: ${extensions}`; // Format as "Type: ext1, ext2"
      })
      .join(" | "); // Join types together

    return (
      <>
        <div>{formattedOutput}</div>
      </>
    );
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto ${
          isOpenConfirmAllocation || isOpenCreateNewPlaylist
            ? "blur-[3px] opacity-70 bg-black bg-opacity-50 "
            : ""
        }`}
      >
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className="sticky top-0 right-0 z-30 flex justify-end">
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => handleCloseModalAdsAllocation()}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-col lg:flex-row">
              <div
                className={`w-full ${
                  playlist_permission?.view ? "lg:w-1/2" : "lg:w-2/2"
                }  p-1`}
              >
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
                    <div className="grid grid-cols-12">
                      <div className="col-span-1" />
                      <div className="col-span-3 flex justify-end items-center">
                        <div className="font-poppins font-bold">
                          Booking Period :
                        </div>
                      </div>
                      <div className="col-span-1" />
                      <div className="col-span-6">
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
                    {isEvent ? (
                      <div className="grid grid-cols-12 mt-2">
                        <div className="col-span-1" />
                        <div className="col-span-3 flex justify-end items-center">
                          <div className="font-poppins font-bold">
                            Start Time - End Time :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-6">
                          <div className="col-span-3 ml-1">
                            <div className="grid grid-cols-12">
                              <div className="col-span-5">
                                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold">
                                  <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                  >
                                    <TimePicker
                                      ampm={false}
                                      label="Start time"
                                      onChange={handleSetOpenTime}
                                      views={["hours", "minutes", "seconds"]}
                                      defaultValue={
                                        openTime
                                          ? moment(openTime, "HH:mm:ss")
                                          : null
                                      }
                                      value={
                                        openTime
                                          ? moment(openTime, "HH:mm:ss")
                                          : null
                                      }
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                                  <div className="font-poppins font-bold">
                                    -
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-5">
                                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ">
                                  <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                  >
                                    <TimePicker
                                      ampm={false}
                                      label="End time"
                                      onChange={handleSetCloseTime}
                                      views={["hours", "minutes", "seconds"]}
                                      defaultValue={
                                        closeTime
                                          ? moment(closeTime, "HH:mm:ss")
                                          : null
                                      }
                                      value={
                                        closeTime
                                          ? moment(closeTime, "HH:mm:ss")
                                          : null
                                      }
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-10">
                                  <button
                                    onClick={() => handleClearTime()}
                                    className="bg-[#6425FE] hover:bg-[#3b1694] w-[60px] h-[35px] font-poppins text-white rounded-lg "
                                  >
                                    Clear
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="grid grid-cols-12 mt-2">
                      <div className="col-span-1" />
                      <div className="col-span-3 mt-2 flex justify-end items-center">
                        <div className="font-poppins font-bold">
                          Apply to Screens :
                        </div>
                      </div>
                      <div className="col-span-1" />
                      <div className="col-span-6 border border-[#D9D9D9] rounded-md shadow-sm">
                        <div className="p-2">
                          <div className="grid grid-cols-5">
                            <div className="col-span-4">
                              <div className="flex flex-wrap">
                                {screenAdsAllocation.length > 0 &&
                                  screenAdsAllocation.map((screen, index) => (
                                    <div
                                      key={index}
                                      className="border border-gray-300 rounded-sm bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                      style={{ flexBasis: "calc(50% - 8px)" }}
                                    >
                                      <div className="font-poppins text-xs font-bold">
                                        {screen.ScreenName}
                                      </div>
                                      {screenSelectFromEdit !==
                                      screen.ScreenID ? (
                                        <IoIosClose
                                          size={20}
                                          className="cursor-pointer text-[#6425FE]"
                                          onClick={() =>
                                            handleDeleteScreenAdsAllocation(
                                              index,
                                              screen.ScreenID
                                            )
                                          }
                                        />
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="flex">
                                {screenAdsAllocation.length > 1 && (
                                  <IoIosCloseCircle
                                    onClick={() => {
                                      const filteredScreen = screen.filter(
                                        (screen) =>
                                          screen.ScreenID ===
                                          screenSelectFromEdit
                                      );
                                      const output = {
                                        [screenSelectFromEdit]: true,
                                      };
                                      setCheckboxes(output);
                                      setScreennAdsAllocation(filteredScreen);
                                    }}
                                    size={24}
                                    className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                                  />
                                )}
                                {page_permission.update ? (
                                  <div className="relative">
                                    <IoIosAdd
                                      size={24}
                                      className="mt-1 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                      onClick={
                                        handleToggleDropdownApplyToScreen
                                      }
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1" />
                    </div>

                    <div className="grid grid-cols-12 mt-5">
                      <div className="col-span-1" />
                      <div className="col-span-3 flex justify-end items-start pt-3">
                        <div className="font-poppins font-bold">
                          Apply to Period :
                        </div>
                      </div>
                      <div className="col-span-1" />
                      <div
                        className={`col-span-6 space-y-1 ${
                          datePickers.length > 1
                            ? "h-[150px] overflow-y-auto"
                            : isStatic
                            ? "h-[100px]"
                            : "h-[70px]"
                        }`}
                      >
                        {datePickers.map((items, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-6 border border-[#D9D9D9] rounded-md shadow-sm"
                          >
                            <div className="col-span-2 p-2 flex justify-center items-center">
                              <div className="font-poppins">
                                <DatePicker
                                  selected={items.startDate}
                                  selectsStart
                                  startDate={new Date()}
                                  endDate={items.endDate}
                                  minDate={new Date()}
                                  maxDate={
                                    booking_date[booking_date.length - 1]
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  onChange={(date) =>
                                    handleStartDateChange(index, date)
                                  }
                                  className="p-2 rounded-lg shadow-sm w-full text-xs"
                                />
                              </div>
                            </div>
                            <div className="col-span-1 p-2 flex justify-center items-center">
                              -
                            </div>
                            <div className="col-span-2 p-2">
                              <div className="font-poppins">
                                <DatePicker
                                  selected={items.endDate}
                                  selectsEnd
                                  startDate={new Date()}
                                  endDate={items.endDate}
                                  minDate={new Date()}
                                  maxDate={
                                    booking_date[booking_date.length - 1]
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  onChange={(date) =>
                                    handleEndDateChange(index, date)
                                  }
                                  className=" p-2 rounded-lg shadow-sm w-full text-xs"
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
                        <div className="grid grid-cols-5 border border-[#D9D9D9] rounded-md shadow-sm">
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
                              {page_permission?.update ? (
                                <div className="flex justify-center items-center">
                                  <IoIosAddCircle
                                    size={24}
                                    onClick={handleAddDatePicker}
                                    className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1" />
                    </div>
                    {!isStatic ? (
                      <div className="grid grid-cols-12 mt-10">
                        <div className="col-span-1" />
                        <div className="col-span-3 flex justify-end items-center">
                          <div className="font-poppins font-bold">
                            Screen Resolution :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-6">
                          <div className="font-poppins font-medium text-lg">
                            W {media_rules_select?.width} x H{" "}
                            {media_rules_select?.height} px
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="grid grid-cols-12 mt-3">
                      <div className="col-span-1" />
                      <div className="col-span-3 flex justify-end items-center">
                        <div className="font-poppins font-bold">
                          Media Rule File Type :
                        </div>
                      </div>
                      <div className="col-span-1" />
                      <div className="col-span-6">
                        <div className="font-poppins font-medium text-lg">
                          <GenerateMediaType />
                        </div>
                      </div>
                      <div className="col-span-1" />
                    </div>
                    {!isStatic ? (
                      <div className="grid grid-cols-12 mt-3">
                        <div className="col-span-1" />
                        <div className="col-span-3 flex justify-end items-center">
                          <div className="font-poppins font-bold">
                            Media Rule :
                          </div>
                        </div>
                        <div className="col-span-1" />
                        <div className="col-span-6">
                          <div className="h-[40px] bg-[#FD6822] rounded-md">
                            <div className="flex justify-center items-center">
                              <div className="font-poppins font-medium text-lg text-white text-center mt-2">
                                Resolution : W {media_rules_select?.width} x H{" "}
                                {media_rules_select?.height} px
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1" />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div
                      className={`grid grid-cols-10 mt-12  ${
                        datePickers.length > 1
                          ? "lg:mt-22"
                          : isStatic
                          ? "lg:mt-16"
                          : "lg:mt-8"
                      }`}
                    >
                      <div className="col-span-2" />
                      <div className="col-span-7">
                        <div className="flex">
                          <div className="font-poppins">
                            <b>Note :</b> Modifications made will only affect
                            the screens and periods within the booked timeframe.
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1" />
                    </div>
                    {page_permission?.update ? (
                      <div className="flex justify-center items-center space-x-2 mt-3">
                        <button
                          onClick={() => handleSaveAdsAllocation()}
                          className="w-[250px] h-[48px] bg-[#6425FE] hover:bg-[#3b1694] rounded-md text-white font-poppins font-bold"
                        >
                          Confirm
                        </button>
                        {/* <button className="w-[250px] h-[48px] border border-[#6425FE] rounded-md text-[#6425FE] font-poppins font-bold">
                        Clear Slot
                      </button> */}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              {/* Playlist Zone */}
              {playlist_permission?.view ? (
                <div className="w-full  lg:w-1/2 p-1 lg:pl-8 ">
                  <div className="grid grid-cols-6 space-x-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <div className="col-span-3  border border-gray-300 rounded-md">
                        <div className="p-2">
                          <div className="flex items-center justify-start">
                            <div className="w-full">
                              <div className="relative inline-block text-sm lg:text-base w-full">
                                <div
                                  className="flex items-center justify-between w-full h-[45px] border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins cursor-pointer"
                                  onClick={handleSelectToggle}
                                  tabIndex="0"
                                >
                                  <div className="block text-xs lg:text-sm font-poppins text-gray-300">
                                    {temp_playlist_name
                                      ? temp_playlist_name
                                      : "Select Playlist"}
                                  </div>
                                  <div className="flex items-center">
                                    <IoIosArrowDown size={18} color="#6425FE" />
                                  </div>
                                </div>
                                {isExpanded && (
                                  <div className="absolute top-[38px] w-full  bg-white border border-gray-200 rounded mt-1 p-2 shadow-sm">
                                    {playlist_permission?.create ? (
                                      <button
                                        className="bg-[#6425FE] hover:bg-[#3b1694] text-white font-poppins h-[36px] w-[110px] rounded-md"
                                        onClick={() =>
                                          handleButtonNewPlaylist()
                                        }
                                      >
                                        New Playlist
                                      </button>
                                    ) : (
                                      <></>
                                    )}

                                    {selectedOption.map((option, index) => (
                                      <div
                                        key={option.MediaPlaylistID}
                                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer "
                                        onClick={() =>
                                          handleOptionClick(option)
                                        }
                                      >
                                        <div
                                          className={`font-poppins ${
                                            temp_playlist_name ===
                                            option.PlaylistName
                                              ? "text-[#6425FE]"
                                              : ""
                                          } hover:text-[#6425FE]`}
                                        >
                                          {option.PlaylistName}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-start">
                            <div className="font-poppins text-[32px] font-bold">
                              {temp_playlist_name ? (
                                <div className="flex items-center">
                                  <input
                                    className={`w-[80%] text-[#2F3847] mt-2 ${
                                      !editPlaylist
                                        ? "border border-gray-300 pl-2 "
                                        : ""
                                    } `}
                                    placeholder="Playlist Name"
                                    value={playlist_name}
                                    onChange={(e) => {
                                      const newName = e.target.value;
                                      if (temp_playlist_name !== newName) {
                                        setIsEdit(true);
                                      } else {
                                        setIsEdit(false);
                                      }

                                      setPlaylistName(newName);
                                    }}
                                    onBlur={() =>
                                      setEditPlaylist(!editPlaylist)
                                    }
                                    disabled={editPlaylist}
                                  />

                                  {playlist_permission?.update ? (
                                    <>
                                      <RiEditLine
                                        onClick={() =>
                                          setEditPlaylist(!editPlaylist)
                                        }
                                        size={26}
                                        className={`${
                                          isEdit
                                            ? "text-[#6425FE] hover:text-[#6325fe86]"
                                            : "text-gray-500 hover:text-gray-800"
                                        } ml-2 cursor-pointer`}
                                      />
                                      <RiSave3Line
                                        onClick={() => handleSavePlaylist()}
                                        size={26}
                                        className={`${
                                          isEdit
                                            ? "text-[#6425FE] hover:text-[#6325fe86]"
                                            : "text-gray-500 hover:text-gray-800"
                                        } ml-2 cursor-pointer`}
                                        // className="text-red-500 hover:text-red-900 ml-2 cursor-pointer"
                                      />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ) : (
                                <div className="font-poppins text-[32px] font-bold text-[#B4B4B4] mt-2">
                                  Empty Playlist
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-11" style={{ display: "flex" }}>
                            <Droppable droppableId="panel-1">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="h-[550px] overflow-y-auto space-y-2"
                                >
                                  {temp_playlist_name ? (
                                    renderMediaList(
                                      itemsPanel1.value.slots,
                                      itemsPanel1.value.medias
                                    )
                                  ) : (
                                    <></>
                                  )}

                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3  border border-gray-300 rounded-md">
                        <div className="p-2">
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
                                    ? "text-[#6425FE]"
                                    : "text-black"
                                }`}
                              />
                              <div
                                className={`font-poppins text-[14px] ${
                                  mediaAdsAllocationTab === "All"
                                    ? "text-[#6425FE]"
                                    : "text-black"
                                } flex items-center`}
                              >
                                <span className="ml-1">All</span>
                              </div>
                            </button>
                            <button
                              className={`tablink flex items-center justify-center ${
                                mediaAdsAllocationTab === "Video"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => openMediaAdsAllocationTab("Video")}
                            >
                              <FiVideo
                                size={24}
                                className={`mr-2 ${
                                  mediaAdsAllocationTab === "Video"
                                    ? "text-[#6425FE]"
                                    : "text-black"
                                }`}
                              />
                              <div
                                className={`font-poppins text-[14px] ${
                                  mediaAdsAllocationTab === "Video"
                                    ? "text-[#6425FE]"
                                    : "text-black"
                                } flex items-center`}
                              >
                                Video
                              </div>
                            </button>
                            <button
                              className={`tablink flex items-center justify-center ${
                                mediaAdsAllocationTab === "Image"
                                  ? "active"
                                  : ""
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
                                  {isStatic ? (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2.map(
                                                (items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "Video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );

                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                )
                                              )}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  ) : (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2
                                                .filter(
                                                  (item) =>
                                                    (item.ContentTypeName ===
                                                      "Image" &&
                                                      media_rules_select.Image) ||
                                                    (item.ContentTypeName ===
                                                      "Video" &&
                                                      media_rules_select.Video)
                                                )
                                                .filter((item) => {
                                                  const contentProperties =
                                                    JSON.parse(
                                                      item.ContentProperties
                                                    );
                                                  return (
                                                    parseInt(
                                                      contentProperties.width
                                                    ) ===
                                                      media_rules_select?.width &&
                                                    parseInt(
                                                      contentProperties.height
                                                    ) ===
                                                      media_rules_select?.height
                                                  );
                                                })
                                                .map((items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "Video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );

                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  )}
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
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-5">
                                  {isStatic ? (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2
                                                .filter(
                                                  (item) =>
                                                    item.ContentTypeName ===
                                                    "Video"
                                                )
                                                .map((items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "Video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );
                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  ) : (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2
                                                .filter(
                                                  (item) =>
                                                    (item.ContentTypeName ===
                                                      "Image" &&
                                                      media_rules_select.Image) ||
                                                    (item.ContentTypeName ===
                                                      "Video" &&
                                                      media_rules_select.Video)
                                                )
                                                .filter(
                                                  (item) =>
                                                    item.ContentTypeName ===
                                                      "Video" &&
                                                    parseInt(
                                                      JSON.parse(
                                                        item.ContentProperties
                                                      ).width
                                                    ) ===
                                                      media_rules_select?.width &&
                                                    parseInt(
                                                      JSON.parse(
                                                        item.ContentProperties
                                                      ).height
                                                    ) ===
                                                      media_rules_select?.height
                                                )
                                                .map((items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "Video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );
                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  )}
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
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-5">
                                  {isStatic ? (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2
                                                .filter(
                                                  (item) =>
                                                    item.ContentTypeName ===
                                                    "Image"
                                                )
                                                .map((items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );
                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  ) : (
                                    <>
                                      <Droppable droppableId="panel-2">
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="h-[600px] overflow-y-auto space-y-2"
                                          >
                                            {itemsPanel2.length > 0 &&
                                              itemsPanel2
                                                .filter(
                                                  (item) =>
                                                    (item.ContentTypeName ===
                                                      "Image" &&
                                                      media_rules_select.Image) ||
                                                    (item.ContentTypeName ===
                                                      "Video" &&
                                                      media_rules_select.Video)
                                                )
                                                .filter(
                                                  (item) =>
                                                    item.ContentTypeName ===
                                                      "Image" &&
                                                    parseInt(
                                                      JSON.parse(
                                                        item.ContentProperties
                                                      ).width
                                                    ) ===
                                                      media_rules_select?.width &&
                                                    parseInt(
                                                      JSON.parse(
                                                        item.ContentProperties
                                                      ).height
                                                    ) ===
                                                      media_rules_select?.height
                                                )
                                                .map((items, index) => (
                                                  <Draggable
                                                    key={`panel2-${index}`}
                                                    draggableId={`panel2-${items.ContentID}`}
                                                    index={index}
                                                    isDragDisabled={
                                                      playlist_permission?.craete ||
                                                      playlist_permission?.update
                                                        ? false
                                                        : true
                                                    }
                                                  >
                                                    {(provided) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="grid grid-cols-11 h-[80px] border border-gray-300 rounded-lg shadow-sm"
                                                      >
                                                        <div className="col-span-2 flex justify-center items-center">
                                                          {items.ContentTypeName ===
                                                          "video" ? (
                                                            <FiVideo
                                                              size={30}
                                                            />
                                                          ) : (
                                                            <FiImage
                                                              size={30}
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex justify-start items-center mt-2">
                                                            <div className="font-poppins text-[15px]">
                                                              {items.ContentName
                                                                .length > 30 ? (
                                                                <span>
                                                                  {items.ContentName.slice(
                                                                    0,
                                                                    27
                                                                  ) + "..."}
                                                                </span>
                                                              ) : (
                                                                <span>
                                                                  {
                                                                    items.ContentName
                                                                  }
                                                                </span>
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                              File Size :{" "}
                                                              {parseFloat(
                                                                JSON.parse(
                                                                  items.ContentProperties
                                                                ).size
                                                              ).toFixed(2)}{" "}
                                                              MB
                                                            </div>
                                                          </div>
                                                          <div className="flex justify-start items-center ">
                                                            {items.ContentTypeName ===
                                                              "Video" && (
                                                              <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                                Duration :{" "}
                                                                {parseFloat(
                                                                  JSON.parse(
                                                                    items.ContentProperties
                                                                  ).duration
                                                                ).toFixed(
                                                                  2
                                                                )}{" "}
                                                                sec
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                          <IoIosPlayCircle
                                                            size={26}
                                                            className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                                            onClick={() => {
                                                              setModalPlayerOpen(
                                                                !modalPlayerOpen
                                                              );
                                                              setMediaDisplay(
                                                                items
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DragDropContext>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {isApplyToScreen && (
        <Ads_Allocation_Apply_Screen
          setIsApplyToScreen={setIsApplyToScreen}
          isApplyToScreen={isApplyToScreen}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          setSelectedData={setSelectedData}
          booking_date={booking_date}
          setOpenAddNewScreenModal={setOpenAddNewScreenModal}
          openAddNewScreenModal={openAddNewScreenModal}
          selectAll={selectAll}
          toggleAllCheckboxes={toggleAllCheckboxes}
          allScreenData={allScreenData}
          setCheckboxes={setCheckboxes}
          checkboxes={checkboxes}
          toggleCheckboxAddScreen={toggleCheckboxAddScreen}
          setSelectedScreenItems={setSelectedScreenItems}
          selectedScreenItems={selectedScreenItems}
          setScreennAdsAllocation={setScreennAdsAllocation}
          media_rules_select={media_rules_select}
          screenSelectFromEdit={screenSelectFromEdit}
          screen={screen}
          setShowDetailScreen={setShowDetailScreen}
          showDetailScreen={showDetailScreen}
          setDetailScreen={setDetailScreen}
          setSelectAll={setSelectAll}
          isStatic={isStatic}
        />
      )}

      {isOpenConfirmAllocation && (
        <Confirm_Allocation
          setIsOpenConfirmAllocation={setIsOpenConfirmAllocation}
          isOpenConfirmAllocation={isOpenConfirmAllocation}
          temp_playlist_name={temp_playlist_name}
          setIsOpenCreateNewPlaylist={setIsOpenCreateNewPlaylist}
          isOpenCreateNewPlaylist={isOpenCreateNewPlaylist}
          screenUsePlaylist={screenUsePlaylist}
          bookingId={bookingId}
          datePickers={datePickers}
          screenAdsAllocation={screenAdsAllocation}
          media_playlist_id={media_playlist_id}
          setFactAllocation={setFactAllocation}
          fact_allocation={fact_allocation}
          setOpenAdsAllocationModal={setOpenAdsAllocationModal}
          openAdsAllocationModal={openAdsAllocationModal}
          setScreennAdsAllocation={setScreennAdsAllocation}
          setCheckboxes={setCheckboxes}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          isEvent={isEvent}
          openTime={openTime}
          closeTime={closeTime}
        />
      )}

      {isOpenCreateNewPlaylist && (
        <Create_New_Playlist_Allocation
          setIsOpenCreateNewPlaylist={setIsOpenCreateNewPlaylist}
          isOpenCreateNewPlaylist={isOpenCreateNewPlaylist}
          setIsOpenConfirmAllocation={setIsOpenConfirmAllocation}
          isOpenConfirmAllocation={isOpenConfirmAllocation}
          setPlaylistName={setPlaylistName}
          setCheckCreateMediaPlaylist={setCheckCreateMediaPlaylist}
          setTempPlaylistName={setTempPlaylistName}
        />
      )}

      {showDetailScreen && (
        <Detail_Screen_Booking
          setShowDetailScreen={setShowDetailScreen}
          detailScreen={detailScreen}
        />
      )}
    </>
  );
};

export default Ads_Allocation_Booking;
