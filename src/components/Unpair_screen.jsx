import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUnlink } from "react-icons/bi";
import FirebaseHelper from "../utils/FirebaseHelper";
const Unpair_screen = ({
  setOpenUnPairScreenModal,
  openUnPairScreenModal,
  screen_select,
}) => {
  const handleUnpairScreen = async () => {
    const screenData = {
      AccountCode: screen_select.AccountCode,
      BrandCode: screen_select.BrandCode,
      BranchCode: screen_select.BranchCode,
      ScreenCode: screen_select.ScreenCode,
    };

    FirebaseHelper.setScreenFlag(screenData, "needs_unpair", 1);
    FirebaseHelper.setScreenFlag(screenData, "is_paired", 0);
    FirebaseHelper.setScreenFlag(screenData, "os", "");
    FirebaseHelper.setScreenFlag(screenData, "os_version", "");

    console.log("screenData", screenData);
    setOpenUnPairScreenModal(!openUnPairScreenModal)
  };

  return (
    <>
      <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => setOpenUnPairScreenModal(!openUnPairScreenModal)}
            >
              <AiOutlineClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="p-4">
            <div className="flex justify-center items-center">
              <div className="font-poppins text-[#2F3847] text-[64px] font-bold">
                Unpair Confirmation
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="font-poppins text-[#2F3847] text-[18px] pl-12 pr-12 pt-12">
                {screen_select?.ScreenName} is currently paired to a physical screen. Would you like to unpair them? Please note that after unpaired, you will no longer be able to send new media to the screen unless the physical screen is paired back to the system.
              </div>
            </div>
            <div className="mt-36">
              <div className="flex justify-center items-center">
                <div className="bg-[#2F3847] w-[201px] h-[201px] rounded-full flex justify-center items-center">
                  <BiUnlink size={120} color={"#FFFFFF"} />
                </div>
              </div>

              <div className="flex justify-center  items-center text-center  mt-5">
                <div className="w-[50%]">
                  <div className="font-poppins text-[#2F3847] text-[18px] ">
                    Select "Confirm" to unpair.
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleUnpairScreen()}
                    className="w-[300px] h-[48px] bg-[#6425FE] text-white font-poppins font-semibold text-[24px] rounded-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      setOpenUnPairScreenModal(!openUnPairScreenModal)
                    }
                    className="w-[300px] h-[48px] border border-[#4c4952] text-[#6425FE] font-poppins font-semibold text-[24px] rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unpair_screen;
