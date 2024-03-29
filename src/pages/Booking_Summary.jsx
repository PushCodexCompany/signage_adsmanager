import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import useCheckPermission from "../libs/useCheckPermission";
import { PiMonitor } from "react-icons/pi";
import { format } from "date-fns";

const Booking_Summary = () => {
  useCheckPermission();
  const location = useLocation();
  const navigate = useNavigate();

  const [screen, setScreen] = useState([]);
  const [booking_name, setBookingName] = useState(null);
  const [period, setPeriod] = useState([]);
  const [slotPerDays, setSlotPerDays] = useState(null);
  const [merchandise, setMerchandise] = useState([]);
  const [total_slot, setTotalSlot] = useState(null);

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
    } = location.state.data;

    setScreen(screen);
    setBookingName(booking_name);
    setPeriod(period);
    setSlotPerDays(slot_per_days);
    setMerchandise(merchandise);
    setTotalSlot(total_slot);
  };

  const handleConfirmBooking = () => {
    const obj = {
      screen: screen,
      booking_name: booking_name,
      period: period,
      slotPerDays: slotPerDays,
      merchandise: merchandise,
      total_slot: total_slot,
    };
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="mt-5">
          <div className="font-poppins font-semibold text-2xl w-[95%] pl-2">
            Booking Pricing Summary
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
                      src={merchandise.AdvertiserLogo}
                      alt={merchandise.AdvertiserName}
                    />
                  </div>
                  <div className="col-span-3 mt-3">
                    <div className="font-poppins text-[18px] font-bold">
                      {booking_name}
                    </div>
                    <div className="font-poppins text-[12px] text-[#59606C]">
                      CDS-BT-230101-004
                    </div>
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
                        className={`border border-gray-300 rounded-lg w-[90%] h-[75px]`}
                      >
                        <div className="grid grid-cols-10">
                          <div className="col-span-2 flex justify-center items-center">
                            <PiMonitor size={45} color={"#59606C"} />
                          </div>
                          <div className="col-span-6">
                            <div className="flex justify-start items-center">
                              <div className="font-poppins md:text-lg lg:text-2xl font-bold">
                                {items.ScreenName}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="font-poppins text-sm text-[#8A8A8A]">
                                {items.ScreenLocation}
                              </div>
                            </div>
                            <div className="flex justify-start items-center space-x-1">
                              {items.status === 0 ? (
                                <div className="bg-red-500 w-[6px] h-[6px]  rounded-xl"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-[6px] h-[6px]  rounded-xl"></div>
                              )}
                              <div className="font-poppins text-xs p-[2px]">
                                {items.status === 0 ? "Offline" : "Online"}
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
                      Merchandise:
                    </div>
                  </div>
                  <div className="col-span-4 flex justify-start items-center">
                    <img
                      className={`block mt-30px w-[56px] h-[56px] rounded-lg object-cover`}
                      src={merchandise.AdvertiserLogo}
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
