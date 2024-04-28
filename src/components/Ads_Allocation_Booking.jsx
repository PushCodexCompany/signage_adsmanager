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
import { AiOutlineSearch } from "react-icons/ai";
import { FiImage, FiVideo } from "react-icons/fi";
import { MdDragHandle } from "react-icons/md";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import { mediaMockup } from "../data/mockup";
import User from "../libs/admin";

const Ads_Allocation_Booking = ({
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
  booking_date,
  screenAdsAllocation,
  setScreennAdsAllocation,
  setIsApplyToScreen,
  isApplyToScreen,
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
  checkboxes,
  bookingId,
  setMediaAllocatonUploadIndex,
  screenSelectFromEdit,
  screen,
}) => {
  const [full_media_items, setFullMediasItems] = useState([]);
  const { token } = User.getCookieData();

  useEffect(() => {
    setTempMediaList();
    setDefaultApplyToScreen();
    setDefaultPanel1(itemsPanel1.value.slots, itemsPanel1.value.medias);
  }, []);

  const setTempMediaList = async () => {
    setFullMediasItems(itemsPanel2);
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
    setOpenAdsAllocationModal(!openAdsAllocationModal);
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

    // Replace the old dateRange with the new one
    datePickers[index].dateRange = newDateRange;
  };

  const handleRemoveDatePicker = (index) => {
    const newDatePickers = [...datePickers];
    newDatePickers.splice(index, 1);
    setDatePickers(newDatePickers);
  };

  const handleAddDatePicker = () => {
    const booking_date_format = booking_date.map((timestamp) =>
      format(timestamp, "yyyy-MM-dd")
    );

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
          startDate: new Date(booking_date[0]),
          endDate: new Date(booking_date[booking_date.length - 1]),
          dateRange: booking_date_format,
        },
      ]);
    }
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
      //ToDo
      // 1. Check if droppableID is panel-1
      // 2. Check if destination still has empty slot
      // 3. Check dropped index to determine where to insert new media
      var newDestinationItems = [...destinationItems];

      if (destination.droppableId === "panel-1") {
        const draggedItem = sourceItems.find(
          (item) =>
            item.ContentID === parseInt(result.draggableId.split("-")[1])
        );

        newDestinationItems = insert(destinationItems, destination.index, {
          ...draggedItem,
          slot_size: 1,
          slot_duration: 15,
        });
      }

      if (destination.droppableId === "panel-1") {
        setItemsPanel1({
          ...itemsPanel1,
          value: {
            ...itemsPanel1.value,
            medias: newDestinationItems,
          },
        });
      }
    }
  };

  const handleAddMediaPlaylistItem = (index) => {
    const updatedMediaList = [...itemsPanel1.value.medias];

    const target = updatedMediaList[index];

    //*** only needed to expand slot_size if at least one empty slot is still available
    if ("slot_size" in target) {
      target.slot_size = target.slot_size + 1;
      target.slot_duration = target.slot_duration + 15;
    } else {
      target.slot_size = 2;
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
      target.slot_duration = target.slot_duration - 15;
    } else {
      target.slot_size = 0;
    }

    //remove if size = 0
    if (target.slot_size === 0) {
      Swal.fire({
        text: `คุณต้องการลบ ${target.ContentName} ออกจาก Playlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน!",
      }).then(async (result) => {
        if (result.isConfirmed) {
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
        slot_duration: 15,
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
                  <div>
                    {processedMediaList.filter(
                      (item) => item.ContentID === null
                    ).length > 0 && (
                      <>
                        <IoIosAddCircle
                          size={24}
                          className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                          onClick={() => handleAddMediaPlaylistItem(index)}
                        />
                      </>
                    )}

                    <IoIosRemoveCircle
                      size={24}
                      className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      onClick={() => handleRemoveMediaPlaylistItem(index)}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`grid grid-cols-11 h-[${itemHeight}px] border border-gray-300 w-[265px] lg:w-[320px]`}
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
                              {items.ContentName.length > 30 ? (
                                <span>
                                  {items.ContentName.slice(0, 27) + "..."}
                                </span>
                              ) : (
                                <span>{items.ContentName}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-start items-center ">
                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                              File Size :{" "}
                              {parseFloat(
                                JSON.parse(items.ContentProperties).size
                              ).toFixed(2)}{" "}
                              MB
                            </div>
                          </div>
                          <div className="flex justify-start items-center ">
                            <div className="font-poppins text-[#8A8A8A] text-[12px]">
                              Duration : {items.slot_duration} sec
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-start items-center">
                        <MdDragHandle size={26} className="text-[#6425FE]" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center" key={`empty${currentIndex}`}>
                  <IoIosRemoveCircle
                    size={24}
                    className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer opacity-0"
                  />
                  <div className="flex-1">
                    <div
                      onClick={() => {
                        setOpenModalUploadMedia(!openModalUploadNewMedia);
                        // setOpenAdsAllocationModal(!openAdsAllocationModal);
                        setMediaAllocatonUploadIndex(index);
                      }}
                      className="grid grid-cols-11 h-[80px] border border-dashed border-[#2F3847] cursor-pointer w-[265px] lg:w-[320px]"
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

  const handleSaveAdsAllocation = () => {
    const date_range = handleDateRangeToString(datePickers);

    const playlist = handleMediaPlaylist(itemsPanel1);
    const screenIDs = screenAdsAllocation.map((screen) => ({
      screenid: screen.ScreenID,
    }));

    const screenIdsString = screenIDs
      .map((screen) => screen.screenid)
      .join(",");

    const media_list = playlist.map((media, index) => ({
      contentid: media.ContentID,
      duration: media.slot_duration,
      odering: index,
    }));

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

    if (media_list.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือก Media ...",
      });
      return;
    }

    const obj = {
      bookingid: bookingId,
      dates: date_range,
      screenids: screenIdsString,
      playlist: media_list,
    };

    console.log("obj", obj);
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
  };

  const [playlist_name, setPlaylistName] = useState(null);
  const [temp_playlist_name, setTempPlaylistName] = useState(null);
  const [media_playlist_id, setMediaPlaylistId] = useState(null);
  const [checkCreateMediaPlaylist, setCheckCreateMediaPlaylist] =
    useState(true);
  const [editPlaylist, setEditPlaylist] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const getMediaPlaylist = async () => {
    const data = await User.getPlaylist(bookingId, token);
    return data;
  };

  const handleSelectToggle = async () => {
    const data = await getMediaPlaylist();
    setSelectedOption(data);
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = async (option) => {
    setMediaPlaylistId(option.MediaPlaylistID);
    setPlaylistName(option.PlaylistName);
    setTempPlaylistName(option.PlaylistName);
    setCheckCreateMediaPlaylist(false);
    setIsExpanded(false);
  };

  const handleButtonClick = (event) => {
    setPlaylistName("New Playlist");
    setCheckCreateMediaPlaylist(true);
    setTempPlaylistName("New Playlist");
    setIsExpanded(!isExpanded);
  };

  const handleSavePlaylist = async () => {
    if (checkCreateMediaPlaylist) {
      // Create
      const obj = {
        bookingid: bookingId,
        playlistname: playlist_name,
      };
      try {
        const data = await User.createPlaylist(obj, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "Create Tag Category Success ...",
            text: "สร้าง Tag Category สำเร็จ!",
          }).then(async (result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              const data = await getMediaPlaylist();
              setSelectedOption(data);
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
        console.log(error);
      }
    } else {
      // Edit
      const playlist = handleMediaPlaylist(itemsPanel1);
      const media_list = playlist.map((media, index) => ({
        contentid: media.ContentID,
        duration: media.slot_duration,
        odering: index,
      }));

      const obj = {
        bookingid: bookingId,
        playlistname: playlist_name,
        mediaplaylistid: media_playlist_id,
        medias: media_list,
      };

      try {
        console.log("obj", obj);
      } catch (error) {
        console.log("error");
      }

      // if(temp_playlist_name === playlist_name){
      //   // Edit name only
      //   console.log("obj", obj);
      // }else{

      // }
    }
  };

  return (
    <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[120px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button onClick={() => handleCloseModalAdsAllocation()}>
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] w-5/6 lg:w-5/6 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
        <div className="p-3">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-1">
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

                  <div className="grid grid-cols-12 mt-2">
                    <div className="col-span-1" />
                    <div className="col-span-3 mt-2 flex justify-end items-center">
                      <div className="font-poppins font-bold">
                        Apply to Screens :
                      </div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-6 border border-[#D9D9D9] rounded-md">
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
                                        screen.ScreenID === screenSelectFromEdit
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

                              <div className="relative">
                                <IoIosAdd
                                  size={24}
                                  className="mt-1 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                  onClick={handleToggleDropdownApplyToScreen}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>

                  <div className="grid grid-cols-12 mt-5">
                    <div className="col-span-1" />
                    <div className="col-span-3 flex justify-end items-center">
                      <div className="font-poppins font-bold">
                        Apply to Period :
                      </div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-6 space-y-1 ">
                      {datePickers.map((items, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-6 border border-[#D9D9D9] rounded-md"
                        >
                          <div className="col-span-2 p-2 flex justify-center items-center">
                            <div className="font-poppins">
                              <DatePicker
                                selected={items.startDate}
                                selectsStart
                                startDate={items.startDate}
                                endDate={items.endDate}
                                minDate={booking_date[0]}
                                maxDate={booking_date[booking_date.length - 1]}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) =>
                                  handleStartDateChange(index, date)
                                }
                                className="p-2 rounded-lg shadow-md w-full text-xs"
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
                                startDate={items.startDate}
                                endDate={items.endDate}
                                minDate={booking_date[0]}
                                maxDate={booking_date[booking_date.length - 1]}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) =>
                                  handleEndDateChange(index, date)
                                }
                                className=" p-2 rounded-lg shadow-md w-full text-xs"
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
                        {media_rules_select?.width}x{media_rules_select?.height}{" "}
                        px
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>

                  <div className="grid grid-cols-12 mt-3">
                    <div className="col-span-1" />
                    <div className="col-span-3 flex justify-end items-center">
                      <div className="font-poppins font-bold">Media Rule :</div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-6">
                      <div className="h-[40px] bg-[#FD6822] rounded-md">
                        <div className="flex justify-center items-center">
                          <div className="font-poppins font-medium text-lg text-white text-center mt-2">
                            Resolution : {media_rules_select?.width}x
                            {media_rules_select?.height} px
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>

                  <div className="grid grid-cols-10 mt-16 lg:mt-36">
                    <div className="col-span-2" />
                    <div className="col-span-7">
                      <div className="flex">
                        <div className="font-poppins">
                          <b>Note :</b> Modifications made will only affect the
                          screens and periods within the booked timeframe.
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>
                  <div className="flex justify-center items-center space-x-2 mt-3">
                    <button
                      onClick={() => handleSaveAdsAllocation()}
                      className="w-[250px] h-[48px] bg-[#6425FE] hover:bg-[#3b1694] rounded-md text-white font-poppins font-bold"
                    >
                      Confirm
                    </button>
                    <button className="w-[250px] h-[48px] border border-[#6425FE] rounded-md text-[#6425FE] font-poppins font-bold">
                      Clear Slot
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-1 lg:pl-8">
              <div className="grid grid-cols-6 space-x-2">
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="col-span-3 border border-gray-300 rounded-md">
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
                              <div className="absolute top-[38px] w-full  bg-white border border-gray-200 rounded mt-1 p-2">
                                <button
                                  className="bg-[#6425FE] hover:bg-[#3b1694] text-white font-poppins h-[36px] w-[110px] rounded-md"
                                  onClick={() => handleButtonClick()}
                                >
                                  New Playlist
                                </button>
                                {selectedOption.map((option, index) => (
                                  <div
                                    key={option.MediaPlaylistID}
                                    className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionClick(option)}
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
                          {playlist_name ? (
                            <div className="flex items-center">
                              <input
                                className={`w-[80%] text-[#2F3847] mt-2 ${
                                  !editPlaylist
                                    ? "border border-gray-300 pl-2"
                                    : ""
                                }`}
                                placeholder="Playlist"
                                value={playlist_name}
                                onChange={(e) => {
                                  const newName = e.target.value;
                                  if (newName.length < 1) {
                                    Swal.fire({
                                      icon: "error",
                                      title: "เกิดข้อผิดพลาด!",
                                      text: "กรุณากรอกชื่อ Playlist ...",
                                    });
                                  } else {
                                    setPlaylistName(newName);
                                  }
                                }}
                                onBlur={() => setEditPlaylist(!editPlaylist)}
                                disabled={editPlaylist}
                              />
                              <RiEditLine
                                onClick={() => setEditPlaylist(!editPlaylist)}
                                size={26}
                                className="text-[#6425FE] hover:text-[#3b1694] ml-2 cursor-pointer"
                              />
                              <RiSave3Line
                                onClick={() => handleSavePlaylist()}
                                size={26}
                                className="text-[#6425FE] hover:text-[#3b1694] ml-2 cursor-pointer"
                              />
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
                              className="h-[680px] overflow-y-auto space-y-2"
                            >
                              {playlist_name ? (
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
                  <div className="col-span-3 border border-gray-300 rounded-md">
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
                            mediaAdsAllocationTab === "Video" ? "active" : ""
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
                              <Droppable droppableId="panel-2">
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="h-[680px] overflow-y-auto space-y-2"
                                  >
                                    {itemsPanel2.length > 0 &&
                                      itemsPanel2.map((items, index) => (
                                        <Draggable
                                          key={`panel2-${index}`}
                                          draggableId={`panel2-${items.ContentID}`}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="grid grid-cols-11 h-[80px] border border-gray-300"
                                            >
                                              <div className="col-span-2 flex justify-center items-center">
                                                {items.ContentTypeName ===
                                                "Video" ? (
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
                                                    {items.ContentName.length >
                                                    30 ? (
                                                      <span>
                                                        {items.ContentName.slice(
                                                          0,
                                                          27
                                                        ) + "..."}
                                                      </span>
                                                    ) : (
                                                      <span>
                                                        {items.ContentName}
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
                                                      ).toFixed(2)}{" "}
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
                                                    setOpenAdsAllocationModal(
                                                      !openAdsAllocationModal
                                                    );
                                                    setMediaDisplay(items);
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
                              <Droppable droppableId="panel-2">
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="h-[680px] overflow-y-auto space-y-2"
                                  >
                                    {itemsPanel2.length > 0 &&
                                      itemsPanel2
                                        .filter(
                                          (item) =>
                                            item.ContentTypeName === "Video"
                                        )
                                        .map((items, index) => (
                                          <Draggable
                                            key={`panel2-${index}`}
                                            draggableId={`panel2-${items.ContentID}`}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="grid grid-cols-11 h-[80px] border border-gray-300"
                                              >
                                                <div className="col-span-2 flex justify-center items-center">
                                                  {items.ContentTypeName ===
                                                  "Video" ? (
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
                                                          {items.ContentName}
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
                                                        ).toFixed(2)}{" "}
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
                                                      setOpenAdsAllocationModal(
                                                        !openAdsAllocationModal
                                                      );
                                                      setMediaDisplay(items);
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
                              <Droppable droppableId="panel-2">
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="h-[680px] overflow-y-auto space-y-2"
                                  >
                                    {itemsPanel2.length > 0 &&
                                      itemsPanel2
                                        .filter(
                                          (item) =>
                                            item.ContentTypeName === "Image"
                                        )
                                        .map((items, index) => (
                                          <Draggable
                                            key={`panel2-${index}`}
                                            draggableId={`panel2-${items.ContentID}`}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="grid grid-cols-11 h-[80px] border border-gray-300"
                                              >
                                                <div className="col-span-2 flex justify-center items-center">
                                                  {items.ContentTypeName ===
                                                  "video" ? (
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
                                                          {items.ContentName}
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
                                                        ).toFixed(2)}{" "}
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
                                                      setOpenAdsAllocationModal(
                                                        !openAdsAllocationModal
                                                      );
                                                      setMediaDisplay(items);
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
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads_Allocation_Booking;
