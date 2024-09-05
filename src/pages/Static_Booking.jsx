import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import Filter from "../components/Filter";
import { GridTable } from "../libs/static_booking_grid";
import New_Static_Booking from "../components/New_Static_Booking";
import Detail_Screen_Booking from "../components/Detail_Screen_Booking";

const Static_Booking = () => {
  const [showModalAddNewBooking, setShowModalAddNewBooking] = useState(false);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [all_pages, setAllPages] = useState(null);
  const [booking_data, setBookingData] = useState([]);

  const [showDetailScreen, setShowDetailScreen] = useState(false);
  const [detailScreen, setDetailScreen] = useState(null);

  useEffect(() => {
    getBookingData();
  }, [searchTerm]);

  const getBookingData = async () => {
    if (searchTerm === null) {
      // const data = await User.getBooking(token, 1);

      const data = {
        status: "success",
        code: 200,
        pagination: [
          {
            totalrecords: 2,
            currentpage: 1,
            totalpage: 1,
          },
        ],
        booking: [
          {
            BookingID: 1,
            BookingName: "Booking Name 1",
            BookingCode: "CDS-BT-230101-004",
            AdvertiserID: 1,
            AdvertiserName: "TOPS",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715262318_35205.png",
            TotalScreen: 7,
            BookingPeriod: "2023/12/18,2023/12/20",
            Media:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715262318_35205.png",
            BookingStatus: 2,
            BookingExpire: 20,
          },
          {
            BookingID: 2,
            BookingName: "Booking Name 2",
            BookingCode: "CDS-BT-230101-002",
            AdvertiserID: 2,
            AdvertiserName: "Supersports",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308695_31994.jpg",
            TotalScreen: 4,
            BookingPeriod: "2023/12/21,2023/12/31",
            Media:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308695_31994.jpg",
            BookingStatus: 2,
            BookingExpire: 7,
          },
          {
            BookingID: 3,
            BookingName: "Booking Name 3",
            BookingCode: "CDS-BT-230101-003",
            AdvertiserID: 3,
            AdvertiserName: "B2S",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308789_11885.png",
            TotalScreen: 6,
            BookingPeriod: "2023/12/6,2023/12/25",
            Media: "",
            BookingStatus: 1,
            BookingExpire: 0,
          },
        ],
      };

      if (data.booking.length > 0) {
        data.booking?.sort((a, b) => a.BookingID - b.BookingID);
      }
      setBookingData(data.booking);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      // const data = await User.getBooking(token, 1, searchTerm);

      const data = {
        status: "success",
        code: 200,
        pagination: [
          {
            totalrecords: 2,
            currentpage: 1,
            totalpage: 1,
          },
        ],
        booking: [
          {
            BookingID: 1,
            BookingName: "Booking Name 1",
            BookingCode: "CDS-BT-230101-004",
            AdvertiserID: 1,
            AdvertiserName: "TOPS",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715262318_35205.png",
            TotalScreen: 7,
            BookingPeriod: "2023/12/18,2023/12/20",
            Media:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715262318_35205.png",
            BookingStatus: 2,
            BookingExpire: 20,
          },
          {
            BookingID: 2,
            BookingName: "Booking Name 2",
            BookingCode: "CDS-BT-230101-002",
            AdvertiserID: 2,
            AdvertiserName: "Supersports",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308695_31994.jpg",
            TotalScreen: 4,
            BookingPeriod: "2023/12/21,2023/12/31",
            Media:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308695_31994.jpg",
            BookingStatus: 2,
            BookingExpire: 7,
          },
          {
            BookingID: 3,
            BookingName: "Booking Name 3",
            BookingCode: "CDS-BT-230101-003",
            AdvertiserID: 3,
            AdvertiserName: "B2S",
            AdvertiserLogo:
              "https://cds.push-signage.com/adsmanager/content/M3sMgHoUIc/advertiserlogo/1715308789_11885.png",
            TotalScreen: 6,
            BookingPeriod: "2023/12/6,2023/12/25",
            Media: "",
            BookingStatus: 1,
            BookingExpire: 0,
          },
        ],
      };

      if (data.booking.length > 0) {
        data.booking?.sort((a, b) => a.BookingID - b.BookingID);
      }

      setBookingData(data.booking);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"static_booking"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Booking Static Screen
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => setShowModalAddNewBooking(true)}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-full h-[45px] lg:w-[300px]  rounded-md"
              >
                New Booking +
              </button>
            </div>
          </div>
        </div>
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        <div className="mt-5">
          {booking_data.length > 0 ? (
            <GridTable
              booking_data={booking_data}
              all_pages={all_pages}
              searchTerm={searchTerm}
            />
          ) : (
            <div className="flex items-center justify-center h-[550px] text-center ">
              <div className="font-poppins text-5xl text-[#dedede]">
                --- No data ---
              </div>
            </div>
          )}
        </div>
      </div>

      {showModalAddNewBooking && (
        <a
          onClick={() => setShowModalAddNewBooking(!showModalAddNewBooking)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModalAddNewBooking && (
        <New_Static_Booking
          setShowModalAddNewBooking={setShowModalAddNewBooking}
          setShowDetailScreen={setShowDetailScreen}
          showDetailScreen={showDetailScreen}
          setDetailScreen={setDetailScreen}
        />
      )}

      {showDetailScreen && (
        <Detail_Screen_Booking
          setShowDetailScreen={setShowDetailScreen}
          detailScreen={detailScreen}
        />
      )}
    </>
  );
};

export default Static_Booking;
