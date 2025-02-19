import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import useCheckPermission from "../libs/useCheckPermission";
import { PiMonitor } from "react-icons/pi";
import { format } from "date-fns";
import User from "../libs/admin";
import Swal from "sweetalert2";
import firebase_func from "../libs/firebase_func";

const Booking_Summary = () => {
  useCheckPermission();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const [screen, setScreen] = useState([]);
  const [booking_name, setBookingName] = useState(null);
  const [period, setPeriod] = useState([]);
  const [slotPerDays, setSlotPerDays] = useState(null);
  const [merchandise, setMerchandise] = useState([]);
  const [total_slot, setTotalSlot] = useState(null);
  const [publish_data, setPublishData] = useState([]);

  useEffect(() => {
    setBookingData();
  }, []);

  const setBookingData = () => {
    const {
      screen,
      booking_name,
      period,
      slot_per_days,
      merchandise,
      total_slot,
      publish_data,
    } = location.state.data;
    setScreen(screen);
    setBookingName(booking_name);

    const booking_date = period.map((timestamp) =>
      format(timestamp, "yyyy-MM-dd")
    );

    setPeriod(booking_date);
    setSlotPerDays(slot_per_days);
    setMerchandise(merchandise);
    setTotalSlot(total_slot);
    setPublishData(publish_data);
  };

  const handleConfirmBooking = async () => {
    if (publish_data) {
      try {
        const data = await User.updateBookingSlots(publish_data, token, 3);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ!",
            text: `บันทึกสำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              const replacedString = booking_name.replace(/\//g, "_");
              console.log("location.state.select", location.state.select);
              navigate(`/static_booking/select/${replacedString}`, {
                state: { data: location.state.select },
              });
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
        console.log(error);
      }
    }
  };

  // const generateStatus = async () => {
  //   screens_data.map(async (items) => {
  //     const screen_status = await firebase_func.getStatusScreen(items);
  //     items.screen_status = screen_status;
  //   });
  //   setData(screens_data);
  // };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header
          lv1={"Static Booking"}
          lv1Url={"/static_booking"}
          lv2={"booking_static_pricing_summary"}
        />
        <div className="mt-5">
          <div className="font-poppins font-semibold text-2xl w-[95%] pl-2">
            Booking Static Pricing Summary
          </div>
        </div>
        <div className="mt-7 grid grid-cols-8 space-x-1">
          {/* Left Panel */}
          <div className="col-span-3 lg:col-span-2 border border-[#CDCDCD] rounded-lg">
            <div className="p-4">
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-5 space-x-3">
                  <div className="col-span-2">
                    <img
                      className={`block mx-auto mt-30px w-[100px] h-[100px] lg:w-[75px] lg:h-[75px] rounded-lg object-cover`}
                      src={
                        merchandise.AdvertiserLogo
                          ? merchandise.AdvertiserLogo
                          : `https://ui-avatars.com/api/?name=${
                              merchandise.AdvertiserName
                            }&background=${"000000"}&color=fff`
                      }
                      alt={merchandise.AdvertiserName}
                    />
                  </div>
                  <div className="col-span-3 mt-3">
                    <div className="font-poppins text-[18px] font-bold">
                      {booking_name}
                    </div>
                    {/* <div className="font-poppins text-[12px] text-[#59606C]">
                      CDS-BT-230101-004
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="h-[550px] overflow-y-auto mt-5">
                {screen.length > 0 &&
                  screen.map((items, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mt-2 "
                    >
                      <div
                        className={`border border-gray-300 rounded-lg w-[90%] h-[75px] shadow-sm`}
                      >
                        <div className="grid grid-cols-10">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={45} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center group relative">
                              <div className="font-poppins md:text-lg lg:text-md font-bold">
                                {items.ScreenName.length > 15 ? (
                                  <>
                                    {items.ScreenName.slice(0, 12) + "..."}
                                    <span
                                      style={{ pointerEvents: "none" }}
                                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                    >
                                      {items.ScreenName}
                                    </span>
                                  </>
                                ) : (
                                  <>{items.ScreenName}</>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-start items-center group relative">
                              <div className="font-poppins text-sm text-[#8A8A8A]">
                                {items.ScreenLocation.length > 25 ? (
                                  <>
                                    {items.ScreenLocation.slice(0, 23) + "..."}
                                    <div
                                      style={{ pointerEvents: "none" }}
                                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                                    >
                                      {items.ScreenLocation}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {items.ScreenLocation || "No Location ..."}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-start items-center space-x-1">
                              {items.screen_status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.screen_status === 0
                                  ? "Offline"
                                  : "Online"}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-center items-center mr-3">
                            <div className="border border-[#6425FE] w-[50px] rounded-md">
                              <div className="flex justify-center items-center">
                                <div className="font-poppins text-[12px] font-bold">
                                  {items.screen_booking_amount} Slots
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Left Panel */}

          {/* Right Panel */}
          <div className="col-span-5 lg:col-span-6 border border-[#CDCDCD] rounded-lg">
            <div className="p-4">
              <div className="flex justify-center items-center mt-20">
                <div className="font-poppins text-[48px] font-bold">
                  {booking_name} Summary
                </div>
              </div>
              <div className="flex justify-center items-center text-center">
                <div className="font-poppins text-[#8A8A8A] text-[18px] ">
                  Review an Estimated Advertising Costs for Your Booking
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <div className="grid grid-cols-8 space-x-3 w-full">
                  <div className="col-span-2" />
                  <div className="col-span-2 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold ">
                      Period:
                    </div>
                  </div>
                  <div className="col-span-4 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold">
                      {period.length > 0 && (
                        <div>{` ${format(
                          period[0],
                          "EEE dd MMM yyyy"
                        )} - ${format(
                          period[period.length - 1],
                          "EEE dd MMM yyyy"
                        )}`}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <div className="grid grid-cols-8 space-x-3 w-full">
                  <div className="col-span-1 lg:col-span-2" />
                  <div className="col-span-3 lg:col-span-2 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold ">
                      Slot Per Day:
                    </div>
                  </div>
                  <div className="col-span-4 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold">
                      {slotPerDays}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <div className="grid grid-cols-8 space-x-3 w-full">
                  <div className="col-span-1 lg:col-span-2" />
                  <div className="col-span-3 lg:col-span-2 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold ">
                      Customer:
                    </div>
                  </div>
                  <div className="col-span-4 flex justify-start items-center">
                    <img
                      className={`block mt-30px w-[56px] h-[56px] rounded-lg object-cover`}
                      src={
                        merchandise.AdvertiserLogo
                          ? merchandise.AdvertiserLogo
                          : `https://ui-avatars.com/api/?name=${
                              merchandise.AdvertiserName
                            }&background=${"000000"}&color=fff`
                      }
                      alt={merchandise.AdvertiserName}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <div className="grid grid-cols-8 space-x-3 w-full">
                  <div className="col-span-2" />
                  <div className="col-span-2 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold ">
                      Total Slot:
                    </div>
                  </div>
                  <div className="col-span-4 flex justify-start items-center">
                    <div className="font-poppins text-[18px] lg:text-[24px] font-bold">
                      {total_slot}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-3 mt-10">
                <button
                  onClick={() => navigate(-1)}
                  className="border border-[#6425FE] w-[187px] h-[48px] rounded-lg font-poppins font-bold text-[#6425FE]"
                >
                  Back
                </button>
                <button
                  onClick={() => handleConfirmBooking()}
                  className="bg-[#6425FE] w-[187px] h-[48px] rounded-lg font-poppins font-bold text-white"
                >
                  Confirm
                </button>
              </div>
              <div className="flex justify-center items-center space-x-3 mt-3">
                <div className="font-poppins text-[15px]">
                  Please Confirm to Proceed
                </div>
              </div>
            </div>
          </div>
          {/* Right Panel */}
        </div>
      </div>
    </>
  );
};

export default Booking_Summary;
