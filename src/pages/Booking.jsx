import React, { useState } from "react";
import { Header } from "../components";
import { GridTable } from "../libs/booking_grid";
import { Navbar } from "../components";
import useCheckPermission from "../libs/useCheckPermission";
import New_Booking from "../components/New_Booking";
import Filter from "../components/Filter";

const Booking = () => {
  useCheckPermission();
  const [showModalAddNewBooking, setShowModalAddNewBooking] = useState(false);

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              My booking
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => setShowModalAddNewBooking(true)}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
              >
                New Booking +
              </button>
            </div>
          </div>
        </div>
        <Filter />
        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </div>

      {showModalAddNewBooking && (
        <a
          onClick={() => setShowModalAddNewBooking(!showModalAddNewBooking)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModalAddNewBooking && (
        <New_Booking setShowModalAddNewBooking={setShowModalAddNewBooking} />
      )}
    </>
  );
};

export default Booking;
