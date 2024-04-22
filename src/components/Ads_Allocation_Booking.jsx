import React from "react";
import {
  IoIosClose,
  IoIosCloseCircle,
  IoIosAdd,
  IoIosRemoveCircle,
  IoIosAddCircle,
  IoMdFolderOpen,
  IoIosPlayCircle,
} from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { FiImage, FiVideo } from "react-icons/fi";
import { MdDragHandle } from "react-icons/md";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import { mediaMockup } from "../data/mockup";

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
}) => {
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
  };

  const handleEndDateChange = (index, date) => {
    const newDatePickers = [...datePickers];
    newDatePickers[index].endDate = date;
    setDatePickers(newDatePickers);
  };

  const handleRemoveDatePicker = (index) => {
    const newDatePickers = [...datePickers];
    newDatePickers.splice(index, 1);
    setDatePickers(newDatePickers);
  };

  const handleAddDatePicker = () => {
    setDatePickers([
      ...datePickers,
      { startDate: new Date(), endDate: new Date() },
    ]);
  };

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
            ...itemsPanel1.value,
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

      const value = destinationItems;

      let lastIndexWithData = -1;

      for (let i = 0; i < value.length; i++) {
        if (value[i].media_id !== null) {
          lastIndexWithData = i;
        }
      }

      const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),

        newItem,

        ...arr.slice(index),
      ];

      //ToDo
      // 1. Check if droppableID is panel-1
      // 2. Check if destination still has empty slot
      // 3. Check dropped index to determine where to insert new media

      var newDestinationItems = [...destinationItems];
      if (destination.droppableId === "panel-1") {
        const draggedItem = sourceItems.find(
          (item) =>
            item.media_id === parseInt(result.draggableId.split("-")[1]) + 1
        );

        newDestinationItems = insert(destinationItems, destination.index, {
          ...draggedItem,
          slot_size: 1,
        });
      }

      if (destination.droppableId === "panel-1") {
        setItemsPanel1({
          ...itemsPanel1,
          value: {
            ...itemsPanel1.value,
            media_list: newDestinationItems,
          },
        });
      }
    }
  };

  const renderMediaList = (slots, media_list) => {
    const nullFreeList = media_list.filter((it) => it.media_id !== null);
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
        media_id: null,
        media_name: null,
        media_type: null,
        media_size: null,
        media_duration: null,
        slot_size: 1,
        slot_num: i + 1,
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
              {items?.media_id ? (
                <div className="flex items-center mr-1">
                  <div>
                    {processedMediaList.filter((item) => item.media_id === null)
                      .length > 0 && (
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
                        {items.media_type === "video" ? (
                          <FiVideo size={30} className="text-[#6425FE]" />
                        ) : (
                          <FiImage size={30} className="text-[#6425FE]" />
                        )}
                      </div>
                      <div className="col-span-8 flex justify-start items-center">
                        <div>
                          <div className="flex justify-start items-center">
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
                        setOpenAdsAllocationModal(!openAdsAllocationModal);
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

  const handleAddMediaPlaylistItem = (index) => {
    const updatedMediaList = [...itemsPanel1.value.media_list];

    const target = updatedMediaList[index];

    //*** only needed to expand slot_size if at least one empty slot is still available
    if ("slot_size" in target) {
      target.slot_size = target.slot_size + 1;
    } else {
      target.slot_size = 2;
    }

    // console.log("updatedMediaList " + JSON.stringify(updatedMediaList));
    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        media_list: updatedMediaList,
      },
    }));
  };

  const handleRemoveMediaPlaylistItem = (index) => {
    const updatedMediaList = [...itemsPanel1.value.media_list]; // Access the media_list array inside value object

    const target = { ...updatedMediaList[index] };

    //*** only needed to expand slot_size if at least one empty slot is still available
    if ("slot_size" in target) {
      target.slot_size = target.slot_size - 1;
    } else {
      target.slot_size = 0;
    }

    //remove if size = 0
    if (target.slot_size === 0) {
      Swal.fire({
        text: `คุณต้องการลบ ${target.media_name} ออกจาก Playlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const nullifiedMediaItem = {
            media_id: null,
            media_name: null,
            media_type: null,
            media_size: null,
            media_duration: null,
          }; // Define a nullified media item
          updatedMediaList[index] = nullifiedMediaItem; // Update the media item in the list
          const output_data = updatedMediaList.reduce((acc, item) => {
            if (item.media_id !== null) {
              acc.push(item);
            }
            return acc;
          }, []);

          const nullItems = updatedMediaList.filter(
            (item) => item.media_id === null
          );
          nullItems.forEach((item) => output_data.push(item));

          // console.log("output_data " + JSON.stringify(output_data));
          setItemsPanel1((prevState) => ({
            ...prevState,
            value: {
              ...prevState.value,
              media_list: output_data,
            },
          }));
        }
      });
    } else {
      updatedMediaList[index] = { ...target };
      const output_data = updatedMediaList.reduce((acc, item) => {
        if (item.media_id !== null) {
          acc.push(item);
        }
        return acc;
      }, []);

      const nullItems = updatedMediaList.filter(
        (item) => item.media_id === null
      );
      nullItems.forEach((item) => output_data.push(item));

      // console.log("output_data " + JSON.stringify(output_data));
      setItemsPanel1((prevState) => ({
        ...prevState,
        value: {
          ...prevState.value,
          media_list: output_data,
        },
      }));
    }

    // Update the state with the modified media list
  };

  const searchMediaByName = (value) => {
    setSearchTerm(value);

    const results = mediaMockup.filter((item) =>
      item.media_name.toLowerCase().includes(value.toLowerCase())
    );

    setItemsPanel2(results);
  };

  return (
    <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[120px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button
            onClick={() => setOpenAdsAllocationModal(!openAdsAllocationModal)}
          >
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
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex">
                              {screenAdsAllocation.length > 0 && (
                                <IoIosCloseCircle
                                  onClick={() => setScreennAdsAllocation([])}
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
                        <div
                          key={index}
                          className="grid grid-cols-6 border border-[#D9D9D9] rounded-md"
                        >
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
                                selected={datePicker.endDate}
                                selectsEnd
                                startDate={datePicker.startDate}
                                endDate={datePicker.endDate}
                                minDate={datePicker.startDate}
                                dateFormat="dd/MM/yyyy"
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
                        {media_rules_select?.width}x{media_rules_select?.height}{" "}
                        px
                      </div>
                    </div>
                    <div className="col-span-1" />
                  </div>

                  <div className="grid grid-cols-10 mt-3">
                    <div className="col-span-2" />
                    <div className="col-span-2">
                      <div className="font-poppins font-bold">Media Rule :</div>
                    </div>
                    <div className="col-span-1" />
                    <div className="col-span-4">
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
                      onClick={() => console.log("item", media_list)}
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
                      <div className="flex items-center justify-center">
                        <div className="font-poppins text-[32px] font-bold">
                          Media Playlist
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
                              {renderMediaList(
                                itemsPanel1.value.slots,
                                itemsPanel1.value.medias
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
                              <Droppable droppableId="panel-2">
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="h-[680px] overflow-y-auto space-y-2"
                                  >
                                    {itemsPanel2.map((items, index) => (
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
                                            className="grid grid-cols-11 h-[80px] border border-gray-300"
                                          >
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
                                                    Duration :{" "}
                                                    {items.media_duration} sec
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-span-1 flex justify-start items-center">
                                              <IoIosPlayCircle
                                                size={26}
                                                className="text-[#6425FE] hover:text-[#3b1694]"
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
                                    {itemsPanel2
                                      .filter(
                                        (item) => item.media_type === "video"
                                      )
                                      .map((items, index) => (
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
                                              className="grid grid-cols-11 h-[80px] border border-gray-300"
                                            >
                                              <div className="col-span-2 flex justify-center items-center">
                                                {items.media_type ===
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
                                                    {items.media_name}
                                                  </div>
                                                </div>
                                                <div className="flex justify-start items-center ">
                                                  <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                    File Size :{" "}
                                                    {items.media_size}
                                                  </div>
                                                </div>
                                                <div className="flex justify-start items-center ">
                                                  {items.media_duration > 0 && (
                                                    <div className="font-poppins text-[15px]">
                                                      Duration :{" "}
                                                      {items.media_duration} sec
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-span-1 flex justify-start items-center">
                                                <IoIosPlayCircle
                                                  size={26}
                                                  className="text-[#6425FE] hover:text-[#3b1694]"
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
                                    {itemsPanel2
                                      .filter(
                                        (item) => item.media_type === "image"
                                      )
                                      .map((items, index) => (
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
                                              className="grid grid-cols-11 h-[80px] border border-gray-300"
                                            >
                                              <div className="col-span-2 flex justify-center items-center">
                                                {items.media_type ===
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
                                                    {items.media_name}
                                                  </div>
                                                </div>
                                                <div className="flex justify-start items-center ">
                                                  <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                                    File Size :{" "}
                                                    {items.media_size}
                                                  </div>
                                                </div>
                                                <div className="flex justify-start items-center ">
                                                  {items.media_duration > 0 && (
                                                    <div className="font-poppins text-[15px]">
                                                      Duration :{" "}
                                                      {items.media_duration} sec
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="col-span-1 flex justify-start items-center">
                                                <IoIosPlayCircle
                                                  size={26}
                                                  className="text-[#6425FE] hover:text-[#3b1694]"
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
