import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import Swal from "sweetalert2";

const Create_New_Playlist_Allocation = ({
  setIsOpenCreateNewPlaylist,
  isOpenCreateNewPlaylist,
  setIsOpenConfirmAllocation,
  isOpenConfirmAllocation,
  setPlaylistName,
  setCheckCreateMediaPlaylist,
  setTempPlaylistName,
}) => {
  const [new_playlist, setNewPlaylistName] = useState(null);
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
                  setIsOpenCreateNewPlaylist(!isOpenCreateNewPlaylist);
                  setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Content  */}
          <div className="mt-28">
            <div className="p-3">
              <div className="flex justify-center items-center">
                <PiWarningCircleFill size={200} color="#2F3847" />
              </div>
              <div className="p-8">
                <div className="flex justify-center items-center text-center ">
                  <div className="font-poppins text-[36px] font-bold">
                    Create New Playlist
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center text-center">
                  <input
                    placeholder={"Playlist Name"}
                    onChange={(e) => {
                      setTempPlaylistName(e.target.value);
                      setNewPlaylistName(e.target.value);
                      setPlaylistName(e.target.value);
                    }}
                    className="pl-2 border border-gray-300 h-[48px] w-[370px] font-poppins rounded-md"
                  />
                </div>
                <div className="mt-4 flex justify-center items-center text-center ">
                  <div className="font-poppins text-[24px]">
                    <b>Note:</b> Modifications made will only affect the screens
                    and periods within the booked timeframe.
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center text-center mt-5">
                <button
                  onClick={() => {
                    if (new_playlist) {
                      setCheckCreateMediaPlaylist(true);
                      setIsOpenCreateNewPlaylist(false);
                      setIsOpenConfirmAllocation(false);
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด!",
                        text: "กรุณากรอกชื่อ Playlist ใหม่ ....",
                      });
                    }
                  }}
                  className="bg-[#6425FE] hover:bg-[#3b1694] w-[300px] h-[48px] rounded-lg text-white font-poppins font-bold"
                >
                  OK
                </button>
              </div>
              <div className="flex justify-center items-center text-center mt-3">
                <button
                  onClick={() => {
                    setIsOpenCreateNewPlaylist(!isOpenCreateNewPlaylist);
                    setIsOpenConfirmAllocation(!isOpenConfirmAllocation);
                  }}
                  className="border-2 border-[#6425FE]  w-[300px] h-[48px] rounded-lg text-[#6425FE] font-poppins font-bold"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_New_Playlist_Allocation;
