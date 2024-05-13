import React from "react";
import { IoIosClose } from "react-icons/io";
import { BiLinkAlt } from "react-icons/bi";

const IsPairScreen = ({
  setOpenIsPairModal,
  openIsPairModal,
  screen_select,
}) => {
  return (
    <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
      {/* First div (circle) */}
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button
            onClick={() => {
              setOpenIsPairModal(!openIsPairModal);
            }}
          >
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
        <div className="p-4">
          <div className="flex justify-center items-center">
            <div className="font-poppins text-[#2F3847] text-[64px] font-bold">
              {screen_select.ScreenName} Is Paired
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="font-poppins text-[#2F3847] text-[18px] ">
              The selected screen has been successfully paired.
            </div>
          </div>
          <div className="mt-36">
            <div className="flex justify-center items-center">
              <div className="bg-[#2F3847] w-[201px] h-[201px] rounded-full flex justify-center items-center">
                <BiLinkAlt size={120} color={"#FFFFFF"} />
              </div>
            </div>

            <div className="flex justify-center  items-center text-center  mt-5">
              <div className="w-[50%]">
                <div className="font-poppins text-[#2F3847] text-[18px] ">
                  Press ‘Close’ to proceed. You may cancel the pairing at any
                  time should it become unnecessary.
                </div>
              </div>
            </div>
            <div className="mt-16">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => {
                    setOpenIsPairModal(!openIsPairModal);
                  }}
                  className="w-[300px] h-[48px] border border-[#6425FE] text-[#6425FE] font-poppins font-semibold text-[24px] rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsPairScreen;
