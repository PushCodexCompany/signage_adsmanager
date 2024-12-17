import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import User from "../libs/admin";
import Swal from "sweetalert2";
import { GridTable } from "../libs/allocation_screen_dub_grid";

const Confirm_Allocation = ({
  setIsOpenConfirmAllocation,
  isOpenConfirmAllocation,
  temp_playlist_name,
  setIsOpenCreateNewPlaylist,
  isOpenCreateNewPlaylist,
  screenUsePlaylist,
  bookingId,
  datePickers,
  screenAdsAllocation,
  media_playlist_id,
  setFactAllocation,
  fact_allocation,
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
  setScreennAdsAllocation,
  setCheckboxes,
  setIsEdit,
  isEdit,
}) => {
  const [screen, setScreen] = useState([]);
  const { token } = User.getCookieData();

  useEffect(() => {
    // generateTextToScreen();
  }, []);

  const generateTextToScreen = () => {
    // Extract ScreenID values and join them with commas
    const outputString = screenUsePlaylist
      .map((screen) => screen.ScreenID)
      .join(",");

    // Split the outputString by commas and set it to the screen
    const outputArray = outputString.split(",");
    setScreen(outputArray);
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

  const handleSaveReplace = async () => {
    const date_range = handleDateRangeToString(datePickers);
    const screenIDs = screenAdsAllocation.map((screen) => ({
      screenid: screen.ScreenID,
    }));

    const screenIdsString = screenIDs
      .map((screen) => screen.screenid)
      .join(",");

    const obj = {
      bookingid: bookingId,
      dates: date_range,
      screenids: screenIdsString,
      mediaplaylistid: parseInt(media_playlist_id),
    };

    try {
      const data = await User.updateBookingContent(obj, token);
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
            setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className="sticky top-0 right-0 z-30 flex justify-end">
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Content  */}
          <div className="mt-10">
            <div className="p-3">
              <div className="flex justify-center items-center">
                <PiWarningCircleFill size={150} color="#2F3847" />
              </div>
              <div className="p-3">
                <div className="mt-4 flex justify-center items-center">
                  <div className="font-poppins text-[24px] font-bold">
                    This playlist will replace the current content on{" "}
                    <span className="text-[#6425FE] font-bold">
                      {screenUsePlaylist.length} Screen
                    </span>{" "}
                    <div className="h-[300px] overflow-y-auto mb-2">
                      <GridTable screenUsePlaylist={screenUsePlaylist} />
                    </div>
                    during the selected periods. Please note that this applies
                    exclusively to the dates within the booking period.
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center text-center mt-5">
                <button
                  onClick={() => {
                    setIsOpenCreateNewPlaylist(!isOpenCreateNewPlaylist);
                    setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
                    setIsEdit(!isEdit);
                  }}
                  className="bg-[#6425FE] hover:bg-[#3b1694] w-[300px] h-[48px] rounded-lg text-white font-poppins font-bold"
                >
                  Create New Playlist
                </button>
              </div>
              <div className="flex justify-center items-center text-center mt-3">
                <button
                  onClick={() => handleSaveReplace()}
                  className="border-2 border-[#6425FE]  w-[300px] h-[48px] rounded-lg text-[#6425FE] font-poppins font-bold"
                >
                  {`Replace to ${temp_playlist_name}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm_Allocation;
