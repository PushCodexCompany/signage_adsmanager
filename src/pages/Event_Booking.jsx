import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { GridTable } from "../libs/event_booking_grid";
import useCheckPermission from "../libs/useCheckPermission";
import New_Event_Booking from "../components/New_Event_Booking";
import User from "../libs/admin";
import Swal from "sweetalert2";
import Permission from "../libs/permission";
import Filter from "../components/Filter";

const Event_Booking = () => {
  useCheckPermission();
  const { token } = User.getCookieData();
  const [showModalAddNewBooking, setShowModalAddNewBooking] = useState(false);
  const [booking_data, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [filter_screen, setFilterScreen] = useState([]);
  const [page_permission, setPagePermission] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [page_permission_content, setPagePermissionContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookingData();
  }, [searchTerm]);

  useEffect(() => {
    getPermission();
  }, []);

  const getBookingData = async () => {
    if (searchTerm === null) {
      const data = await User.getBooking(token, 1, "", "", 2);
      setBookingData(data.booking);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      let data;

      if (filter_screen.length > 0) {
        const result = filter_screen.join(",");
        const obj = {
          tagids: result,
        };
        data = await User.getBooking(token, 1, searchTerm, obj, 2);
      } else {
        data = await User.getBooking(token, 1, searchTerm, "", 2);
      }
      setBookingData(data.booking);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.digiBookingMgt.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }

    setPagePermission(permissions?.digiBookingMgt);
    setPagePermissionContent(permissions?.digiBookContMgt);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Event Booking"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl">
              Event Booking
            </div>
          </div>
          {page_permission?.create ? (
            <div className="col-span-4 flex justify-end">
              <button
                onClick={() => setShowModalAddNewBooking(true)}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md shadow-sm"
              >
                New Event Booking +
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
          page_name={"digiBookingMgt"}
          setBookingData={setBookingData}
          setAllPages={setAllPages}
          getBookingData={getBookingData}
        /> */}

        {booking_data.length > 0 ? (
          <div className="mt-5">
            <GridTable
              booking_data={booking_data}
              all_pages={all_pages}
              searchTerm={searchTerm}
              page_permission={page_permission}
              page_permission_content={page_permission_content}
              filter_screen={filter_screen}
              getBookingData={getBookingData}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[550px] text-center ">
            <div className="font-poppins text-5xl text-[#dedede]">
              --- No data ---
            </div>
          </div>
        )}
      </div>

      {showModalAddNewBooking && (
        <a
          onClick={() => setShowModalAddNewBooking(!showModalAddNewBooking)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModalAddNewBooking && (
        <New_Event_Booking
          setShowModalAddNewBooking={setShowModalAddNewBooking}
        />
      )}
    </>
  );
};

export default Event_Booking;
