import React from "react";
import { IoIosClose } from "react-icons/io";
import ReactPlayer from "react-player";

const Media_Player = ({
  mediaDisplay,
  setModalPlayerOpen,
  modalPlayerOpen,
  setMediaDisplay,
  setMainModal,
  main_modal,
}) => {
  // Parse ContentProperties JSON string to object
  const contentProperties = mediaDisplay.ContentProperties
    ? JSON.parse(mediaDisplay.ContentProperties)
    : "";
  const width = contentProperties.width
    ? parseInt(contentProperties.width)
    : 200;
  const height = contentProperties.height
    ? parseInt(contentProperties.height)
    : 100;

  // Determine if image is horizontal or vertical
  const isHorizontal = width > height;
  const baseWidth = isHorizontal ? "600px" : "400px";
  const baseHeight = isHorizontal ? "400px" : "600px";
  const lgWidth = isHorizontal ? "890px" : "500px";
  const lgHeight = isHorizontal ? "500px" : "890px";

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      {/* First div (circle) */}
      <div
        className={`absolute ${
          mediaDisplay.ContentTypeName === "Image"
            ? `${
                isHorizontal
                  ? "lg:top-36 lg:right-[160px] right-10 top-[270px]"
                  : "lg:top-12 lg:right-[160px] right-10 top-[180px]"
              } `
            : `${
                isHorizontal
                  ? "lg:top-1 lg:right-[160px] right-10 top-[330px]"
                  : "lg:top-[5px] lg:right-[160px] right-10 top-[330px]"
              } `
        } m-4 z-30`}
      >
        <div
          className={`bg-[#E8E8E8] border-3 border-black  rounded-full  w-10 h-10 flex justify-center items-center`}
        >
          <button
            onClick={() => {
              setModalPlayerOpen(!modalPlayerOpen);
              setMediaDisplay([]);
              setMainModal(!main_modal);
            }}
          >
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
      {/* Second div (gray background) */}
      <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen  relative">
        <div className="flex justify-center items-center text-center mt-5">
          <div className="font-poppins text-xl lg:text-4xl font-bold">
            Media :{" "}
            {mediaDisplay.ContentName
              ? mediaDisplay.ContentName
              : "No Media Name ..."}
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
                width={isHorizontal ? "80%" : "25%"}
                height={isHorizontal ? "80%" : "25%"}
                controls={true}
              />
            )}
          </div>
          <div className="mt-5 mb-5">
            <div className="flex justify-center items-center">
              <div className="font-poppins text-2xl">
                <b>Media Size :</b>{" "}
                {mediaDisplay.ContentProperties
                  ? parseFloat(
                      JSON.parse(mediaDisplay.ContentProperties).size
                    ).toFixed(2)
                  : "0"}{" "}
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
