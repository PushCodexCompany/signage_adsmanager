import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosEye,
  IoIosEyeOff,
} from "react-icons/io";
import { BiLinkAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import User from "../libs/admin";

const Pair_Screen = ({
  openPairScreenModal,
  setOpenPairScreenModal,
  screen_preselect,
  openSelectPairScreenModel,
  setOpenSelectPairScreenModel,
  screen_select,
  setOpenIsPairModal,
  openIsPairModal,
}) => {
  const [select_screen_data, setSelectScreenData] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pairingCode, setPairingCode] = useState(null);

  useEffect(() => {
    setSelectScreenData(screen_select);
    // console.log("screen_preselect " + JSON.stringify(screen_preselect));
    // if (screen_preselect) {
    //   console.log("select screen " + screen_preselect.ScreenID);
    //   setSelectScreen(screen_preselect.ScreenID);
    // } else {
    //   console.log("deselect screen ");
    //   setSelectScreen(null);
    // }
  }, [screen_select]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePairScreen = async () => {
    if (!select_screen_data) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกจอที่ต้องการ ...",
      });
      return;
    }

    if (!pairingCode) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกรหัสจอ ...",
      });
      return;
    }

    const screenData = {
      AccountCode: select_screen_data.AccountCode,
      BrandCode: select_screen_data.BrandCode,
      BranchCode: select_screen_data.BranchCode,
      ScreenCode: select_screen_data.ScreenCode,
      ScreenName: select_screen_data.ScreenName,
      PairingCode: pairingCode,
    };

    const isScreenWithPairingCodeAvailable = await User.checkScreenAvailable(
      pairingCode
    );
    console.log(
      "isScreenWithPairingCodeAvailable " + isScreenWithPairingCodeAvailable
    );

    const pairScreenResult = await User.pairScreen(
      screenData.AccountCode,
      screenData.BrandCode,
      screenData.BranchCode,
      screenData.ScreenCode,
      screenData.ScreenName,
      pairingCode
    );

    // save data

    try {
      if (pairScreenResult) {
        setOpenPairScreenModal(!openPairScreenModal);
        setOpenIsPairModal(!openIsPairModal);
      } else {
        return "error";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setOpenPairScreenModal(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="bg-[#FFFFFF] md:w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="p-5">
            <div className="flex justify-center items-center">
              <div className="font-poppins text-[#2F3847] text-[50px] font-bold">
                New Pairing Screen
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="font-poppins text-[#2F3847] text-[18px] ">
                Launch the Signage App, obtain the pairing code on your screen,
                and enter it into the pairing code field to complete the pairing
                process.
              </div>
            </div>
            <div className="mt-16">
              <div className="flex justify-center items-center">
                <div className="w-[50%]">
                  <div className="font-poppins font-bold text-[22px]">
                    Screen Name:
                  </div>
                  <div className="mt-5">
                    <div className="relative w-full h-[50px] flex  lg:text-base ml-3 ">
                      <div className="font-poppins  text-[22px]">
                        {select_screen_data?.ScreenName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="font-poppins font-bold text-[22px]">
                      Pairing Code:
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="relative w-full h-[50px] flex justify-center lg:text-base ml-3">
                      <input
                        type="text"
                        // type={passwordVisible ? "text" : "password"}
                        autoComplete={false}
                        onChange={(e) => setPairingCode(e.target.value)}
                        className="block appearance-none w-full bg-[#f2f2f2] font-poppins text-[#2F3847] text-[22px] font-medium border border-gray-300 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      />
                      {/* <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <IoIosEye
                            size={26}
                            className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                          />
                        ) : (
                          <IoIosEyeOff
                            size={26}
                            className="cursor-pointer text-[#6425FE] hover:text-[#3b1694]"
                          />
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-60 mt-28">
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-6 space-x-2">
                  <div className="col-span-3">
                    <button
                      onClick={() => {
                        setOpenPairScreenModal(false);
                        setOpenSelectPairScreenModel(
                          !openSelectPairScreenModel
                        );
                      }}
                      className="w-[300px] h-[48px] border border-[#6425FE] text-[#6425FE] font-poppins font-semibold text-[24px] rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                  <div className="col-span-3">
                    <button
                      onClick={() => handlePairScreen()}
                      className="w-[300px] h-[48px] bg-[#6425FE] hover:bg-[#3b1694] text-white font-poppins font-semibold text-[24px] rounded-lg"
                    >
                      Pair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pair_Screen;
