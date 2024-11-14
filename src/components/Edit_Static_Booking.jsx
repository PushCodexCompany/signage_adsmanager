import React, { useState, useEffect } from "react";
import { IoIosClose, IoIosArrowDown } from "react-icons/io";
const Edit_Static_Booking = ({
  setModalEditBooking,
  modalEditBooking,
  edit_booking_data,
}) => {
  const [booking_data, setEditBookingData] = useState([]);

  const [booking_name, setBookingName] = useState(null);

  useEffect(() => {
    setBookingData();
  }, [edit_booking_data]);

  const setBookingData = () => {
    setEditBookingData(edit_booking_data);
    setBookingName(edit_booking_data.BookingName);
  };

  const formatBookingPeriod = (period) => {
    // Split the input string into start and end dates
    const dates = period.split(",");

    // Function to convert date string to desired format
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const dateParts = date.toLocaleDateString("en-US", options).split(" ");
      let cleanedList = dateParts.map((item) => item.replace(",", ""));

      // Reorder parts to match the desired format and remove commas
      return `${cleanedList[0]} ${cleanedList[2]} ${cleanedList[1]} ${cleanedList[3]}`;
    };

    // Format both dates
    const startDate = formatDate(dates[0]);
    const endDate = formatDate(dates[1]);

    // Join the formatted dates with ' - '
    return `${startDate} - ${endDate}`;
  };

  return (
    <>
      <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setModalEditBooking(!modalEditBooking)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="bg-[#FFFFFF] md:w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="p-5">
            <div className="flex items-center justify-center mt-5">
              <div className="text-[50px] font-poppins font-bold text-[#2F3847]">
                {edit_booking_data.BookingName}
              </div>
            </div>
            <div className="flex items-center justify-center mt-2 text-center">
              <div className="text-xl font-poppins text-[#2F3847]">
                {edit_booking_data.BookingCode}
              </div>
            </div>
            <div className="mt-6 h-[350px] overflow-y-auto">
              <div className="flex flex-row lg:flex-row">
                <div className="w-full lg:w-1/2 p-2">
                  <div>
                    <img
                      className="block mx-auto w-[250px] h-[250px] border border-[#dedede] rounded-3xl object-cover"
                      src={edit_booking_data.AdvertiserLogo}
                      alt={edit_booking_data.AdvertiserName}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-xl font-bold text-[#2F3847]">
                        {edit_booking_data.AdvertiserName}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-sm text-[#6F6F6F]">
                        {edit_booking_data.AccountCode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-2 lg:pl-4 border border-gray-300">
                  <div>
                    <div className="font-poppins font-bold">Booking Name :</div>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setBookingName(e.target.value)}
                      value={booking_name}
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300"
                      placeholder="Enter Booking Name"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="font-poppins font-bold">Select Screen</div>
                  </div>
                  <div className="mt-2">
                    <select
                      name="screen"
                      id="screen"
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300"
                    >
                      <option value="" disabled selected hidden>
                        Select Screen
                      </option>
                      <option value="1">Screen 1</option>
                      <option value="2">Screen 2</option>
                      <option value="3">Screen 3</option>
                    </select>
                    {/* <div className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300">
                      <select
                        name="screen"
                        id="screen"
                        className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                      >
                        <option value="" disabled selected hidden>
                          Select Screen
                        </option>
                        <option value="test">Screen 1</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IoIosArrowDown size={18} color="#6425FE" />
                      </div>
                    </div> */}
                  </div>
                  <div className="mt-6">
                    <div className="font-poppins font-bold">
                      Booking Period :
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center items-center">
                    <div className="font-poppins text-[#7C7B7B]">
                      You Booking Period :{" "}
                      {formatBookingPeriod(edit_booking_data.BookingPeriod)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-28">
              <button
                onClick={() => setModalEditBooking(!modalEditBooking)}
                className="border-2 border-[#6425FE]  w-[300px] h-[48px] rounded-lg text-[#6425FE] font-poppins font-bold"
              >
                Cancel
              </button>
              <button
                // onClick={() => handleConfirmBookingScreen()}
                className="bg-[#6425FE] hover:bg-[#3b1694] w-[300px] h-[48px] rounded-lg text-white font-poppins font-bold"
              >
                Save
              </button>
            </div>
            <div className="flex justify-center items-center mt-5">
              <div className="text-xs font-poppins">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Static_Booking;
