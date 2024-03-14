import React from "react";
import { IoIosClose } from "react-icons/io";
import ReactPlayer from "react-player";

const Media_Player = ({
  mediaDisplay,
  setModalPlayerOpen,
  modalPlayerOpen,
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
  setMediaDisplay,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      {/* First div (circle) */}
      <div
        className={`absolute right-10 top-14  ${
          mediaDisplay.media_type === "image" ? " lg:top-24" : "lg:top-10"
        }  lg:right-[160px] m-4 z-30`}
      >
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button
            onClick={() => {
              setModalPlayerOpen(!modalPlayerOpen);
              setOpenAdsAllocationModal(!openAdsAllocationModal);
              setMediaDisplay([]);
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
            Media : {mediaDisplay.media_name}
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-center items-center">
            {mediaDisplay.media_type === "image" ? (
              <img
                className={`block mx-auto mt-30px w-[890px] h-[500px] rounded-3xl `}
                src={mediaDisplay.media}
                alt={mediaDisplay.media_name}
              />
            ) : (
              <ReactPlayer
                className="react-player"
                url={mediaDisplay.media}
                muted
                autoplay
                loop
                playing
                width="70%"
                height="70%"
                controls={true}
              />
            )}
          </div>
          <div className="mt-5 mb-5">
            <div className="flex justify-center items-center">
              <div className="font-poppins text-2xl">
                <b>Media Size :</b> {mediaDisplay.media_size}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media_Player;
