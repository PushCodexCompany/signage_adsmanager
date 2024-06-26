import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import _ from "lodash";
import Swal from "sweetalert2";

const Confirm_Booking = ({
  setOpenConfirmBookingModal,
  openConfirmBookingModal,
  bookingName,
  bookingSelect,
  merchandise,
  booking_slot,
  booking_date,
  screenData,
  booking_id,
}) => {
  const navigate = useNavigate();

  const handleConfirmBookingScreen = () => {
    if (bookingSelect.length > 0) {
      const screen_with_booking_value = [...screenData];
      const group_data = GroupedData(bookingSelect);

      screen_with_booking_value.forEach((screen) => {
        const matchingGroupData = group_data.find(
          (group) => group.ScreenID === screen.ScreenID
        );
        if (matchingGroupData) {
          screen.screen_booking_amount =
            matchingGroupData.screen_booking_amount;
        } else {
          screen.screen_booking_amount = 0;
        }
      });

      const total_slot = bookingSelect.length * booking_slot;

      const obj = {
        bookingid: booking_id,
        bookingaction: "confirmed",
        bookingcontent: [],
      };

      screenData.forEach((screen) => {
        screen.booking.forEach((booking) => {
          const matchingBooking = bookingSelect.find(
            (select) =>
              select.ScreenID === screen.ScreenID &&
              select.BookingDateID === booking.BookingDateID
          );
          const sbdstatus = matchingBooking ? "saved" : "none";
          obj.bookingcontent.push({
            bookingdateid: booking.BookingDateID,
            screenid: screen.ScreenID,
            sbdstatus,
          });
        });
      });

      const booking_obj = {
        screen: screen_with_booking_value,
        booking_name: bookingName,
        period: booking_date,
        slot_per_days: booking_slot,
        merchandise,
        total_slot,
        publish_data: obj,
      };

      const select_obj = {
        BookingID: parseInt(booking_id),
        BookingName: bookingName,
        AdvertiserName: merchandise.AdvertiserName,
        AdvertiserLogo: merchandise.AdvertiserLogo,
        TotalScreen: screen_with_booking_value.length,
        SlotPerDay: booking_slot.toString(),
      };
      navigate(`/booking/booking_pricing_summary`, {
        state: { data: booking_obj, select: select_obj },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกหน้าจอที่ต้องการจอง ...",
      });
    }
  };

  const GroupedData = (data) => {
    const groupedData = data.reduce((acc, curr) => {
      const id = curr.ScreenID;
      acc[id] = acc[id] ? acc[id] + 1 : 1;
      return acc;
    }, {});

    const result = Object.keys(groupedData).map((id) => ({
      ScreenID: parseInt(id), // Convert id to integer
      screen_booking_amount: groupedData[id] * booking_slot,
    }));

    return result;
  };

  return (
    <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[970px] items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[540px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button
            onClick={() => setOpenConfirmBookingModal(!openConfirmBookingModal)}
          >
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] w-4/5 lg:w-2/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
        <div className="mt-28">
          <div className="p-3">
            <div className="flex justify-center items-center">
              <PiWarningCircleFill size={200} color="#2F3847" />
            </div>
            <div className="flex justify-center items-center text-center ">
              <div className="font-poppins text-4xl font-bold">
                Do you want to Confirm Booking <br /> {bookingName} ?
              </div>
            </div>
            <div className="flex justify-center items-center text-center mt-3">
              <div className="font-poppins text-lg ">
                Once confirmed, the content management section will be unlocked.{" "}
                <br /> <b>Important:</b> After this step, editing the booking
                time won't be possible; only cancellation is allowed. Kindly
                ensure the correct booking time <br /> then click ‘OK’ to
                proceed.
              </div>
            </div>
            <div className="flex justify-center items-center text-center mt-5">
              <button
                onClick={() => handleConfirmBookingScreen()}
                className="bg-[#6425FE] hover:bg-[#3b1694] w-[300px] h-[48px] rounded-lg text-white font-poppins font-bold"
              >
                OK
              </button>
            </div>
            <div className="flex justify-center items-center text-center mt-3">
              <button
                onClick={() =>
                  setOpenConfirmBookingModal(!openConfirmBookingModal)
                }
                className="border-2 border-[#6425FE]  w-[300px] h-[48px] rounded-lg text-[#6425FE] font-poppins font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm_Booking;
