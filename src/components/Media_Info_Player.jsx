import React from "react";
import { IoIosClose } from "react-icons/io";
import ReactPlayer from "react-player";

const Media_Player = ({
  mediaDisplay,
  setModalPlayerOpen,
  modalPlayerOpen,
  setMediaDisplay,
  setOpenMediaScheduleModal,
  openMediaScheduleModal,
}) => {
  // Parse ContentProperties JSON string to object
  const contentProperties = JSON.parse(mediaDisplay.ContentProperties);
  const width = parseInt(contentProperties.width);
  const height = parseInt(contentProperties.height);

  // Determine if image is horizontal or vertical
  const isHorizontal = width > height;
  const baseWidth = isHorizontal ? "600px" : "400px";
  const baseHeight = isHorizontal ? "400px" : "600px";
  const lgWidth = isHorizontal ? "890px" : "500px";
  const lgHeight = isHorizontal ? "500px" : "890px";

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className={`absolute -top-4 -right-4 m-4 z-30`}>
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                setModalPlayerOpen(!modalPlayerOpen);
                setMediaDisplay([]);
                if (!openMediaScheduleModal) {
                  setOpenMediaScheduleModal(!openMediaScheduleModal);
                }
              }}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center text-center mt-5">
          <div className="font-poppins text-xl lg:text-4xl font-bold">
            Media : {mediaDisplay.ContentName}
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-center items-center">
            {mediaDisplay.ContentTypeName === "Image" ? (
              <img
                className={`block mx-auto mt-30px w-[${baseWidth}] h-[${baseHeight}] lg:w-[${lgWidth}] lg:h-[${lgHeight}] object-cover rounded-3xl`}
                src={mediaDisplay.ContentSource}
                alt={mediaDisplay.ContentName}
              />
            ) : (
              <ReactPlayer
                className="react-player"
                url={mediaDisplay.ContentSource}
                muted
                autoplay
                loop
                playing
                width={isHorizontal ? "60%" : "20%"}
                height={isHorizontal ? "60%" : "20%"}
                controls={true}
              />
            )}
          </div>
          <div className="mt-5 mb-5">
            <div className="flex justify-center items-center">
              <div className="font-poppins text-2xl">
                <b>Media Size :</b>{" "}
                {parseFloat(
                  JSON.parse(mediaDisplay.ContentProperties).size
                ).toFixed(2)}{" "}
                MB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media_Player;
