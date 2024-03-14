import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

const Booking_Upload_Media = ({
  setOpenModalUploadMedia,
  openModalUploadNewMedia,
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
}) => {
  const [uploads, setUploads] = useState({});

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

  return (
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
            Ensure compliance with predefined media rules for each screen. Your
            ads must adhere to specific guidelines for seamless display
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking_Upload_Media;
