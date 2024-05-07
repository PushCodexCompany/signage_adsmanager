import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import User from "../libs/admin";
import Swal from "sweetalert2";

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
}) => {
  const [screen, setScreen] = useState([]);
  const { token } = User.getCookieData();

  useEffect(() => {
    generateTextToScreen();
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
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "Update Booking Content Success ...",
          text: "แก้ไข Booking Content สำเร็จ!",
        }).then(async (result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
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
      <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[540px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
              }}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-2/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="mt-28">
            <div className="p-3">
              <div className="flex justify-center items-center">
                <PiWarningCircleFill size={200} color="#2F3847" />
              </div>
              <div className="p-8">
                <div className="mt-4 flex justify-center items-center text-center ">
                  <div className="font-poppins text-[24px] font-bold">
                    This playlist will replace the current content on{" "}
                    {screen.length > 0 &&
                      screen.map((items, index) => (
                        <>
                          <span key={index} className="text-[#6425FE] ">
                            screen{items}
                          </span>{" "}
                          {index !== screen.length - 1 && " and "}
                        </>
                      ))}
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
