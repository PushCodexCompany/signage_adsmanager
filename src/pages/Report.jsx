import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import useCheckPermission from "../libs/useCheckPermission";
import Permission from "../libs/permission";
import User from "../libs/admin";
import Swal from "sweetalert2";

import { GridTableReportStatus } from "../libs/dashboard_report_status_grid";
import { GridTableReportScreen } from "../libs/dashboard_report_screen_grid";

import Filter from "../../src/components/Custom_filter_Report_Screen";

const Report = () => {
  useCheckPermission();
  const { token } = User.getCookieData();
  const navigate = useNavigate();

  const tabs = [
    { label: "List of Booking by Status" },
    { label: "List of Digital Screen" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  // Report
  const [report_status_booking, setReportStatusBooking] = useState([]);
  const [all_report_booking_pages, setAllReportBookingPages] = useState(null);
  const [export_booking_data, setExportBookingData] = useState([]);

  const [filterTag, setFilterTag] = useState([]);
  const [filterOption, setFilterOption] = useState([]);

  const [filter_screen, setFilterScreen] = useState([]);

  const [filter_option_screen, setFilterOptionScreen] = useState([]);
  const [filter_tag_screen, setFilterTagScreen] = useState([]);

  const [report_screen_booking, setReportScreenBooking] = useState([]);
  const [all_report_screen_pages, setAllReportScreengPages] = useState(null);

  const [startDatePickers, setStartDatePickers] = useState(new Date());
  const [endDatePickers, setEndDatePickers] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [date_tricker, setDateTricker] = useState(false);
  const [total_page_booking, setTotalPageBooking] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    getReportData();
    getReportScreenData();
  }, []);

  useEffect(() => {
    getPermission();
  }, []);

  const getReportData = async () => {
    const data = await User.getDashboardBooking(token, 1);
    setReportStatusBooking(data?.booking);
    setExportBookingData(data?.booking);
    setAllReportBookingPages(data?.pagination[0].totalpage);
    setTotalPageBooking(data?.pagination[0].totalpage);
  };

  const getReportScreenData = async () => {
    //  const data = await User.getBooking(token, 1);
    const data = {
      status: "success",
      code: 200,
      pagination: [
        {
          totalrecords: 30,
          currentpage: 1,
          totalpage: 3,
        },
      ],
      screens: [
        {
          ScreenID: 1,
          ScreenName: "Supers Sport New Year Sale 2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: false,
          },
        },
        {
          ScreenID: 2,
          ScreenName: "B2S Back to School 012024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: true,
          },
        },
        {
          ScreenID: 3,
          ScreenName: "Power Buy Mid Night Sale 2/10",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: true,
          },
        },
        {
          ScreenID: 4,
          ScreenName: "New Menu Moon Fes 2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: false,
          },
        },
        {
          ScreenID: 5,
          ScreenName: "New Promo 2/2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: false,
            video: true,
          },
        },
        {
          ScreenID: 6,
          ScreenName: "Supers Sport New Year Sale 2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: false,
          },
        },
        {
          ScreenID: 7,
          ScreenName: "B2S Back to School 012024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: true,
          },
        },
        {
          ScreenID: 8,
          ScreenName: "Power Buy Mid Night Sale 2/10",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: true,
          },
        },
        {
          ScreenID: 9,
          ScreenName: "New Menu Moon Fes 2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: true,
            video: false,
          },
        },
        {
          ScreenID: 10,
          ScreenName: "New Promo 2/2024",
          ScreenPhoto: "",
          ScreenLocation: "Mall Entrance (B)  ชั้น 1 ทางเชื่อมCPN test",
          ScreenRule: [
            {
              MediaRuleID: 1,
              MediaRuleName: "1920 x 1080",
              AdsCapacity: "20",
              Width: "1920.00",
              Height: "1080.00",
              ActiveResolution: 1,
            },
          ],
          ScreenSupport: {
            image: false,
            video: true,
          },
        },
      ],
    };
    setReportScreenBooking(data.screens);
    if (data.pagination.length > 0) {
      setAllReportScreengPages(data.pagination[0].totalpage);
    }
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.dBoard.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
  };

  const ListOfBooking = () => {
    return (
      <>
        <Filter
          page_name={"dashBookingRpt"}
          setFilterOptionScreen={setFilterOptionScreen}
          filter_option_screen={filter_option_screen}
          setFilterTagScreen={setFilterTagScreen}
          filter_tag_screen={filter_tag_screen}
          setFilterTag={setFilterTag}
          filterTag={filterTag}
          setFilterOption={setFilterOption}
          filterOption={filterOption}
          getReportData={getReportData}
          setAllReportBookingPages={setAllReportBookingPages}
          setReportStatusBooking={setReportStatusBooking}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setStartDatePickers={setStartDatePickers}
          setEndDatePickers={setEndDatePickers}
          startDatePickers={startDatePickers}
          endDatePickers={endDatePickers}
          setDateTricker={setDateTricker}
          date_tricker={date_tricker}
          setTotalPageBooking={setTotalPageBooking}
        />
        {report_status_booking.length > 0 ? (
          <div className="mt-5">
            <GridTableReportStatus
              report_status_booking={report_status_booking}
              all_report_booking_pages={all_report_booking_pages}
              getReportData={getReportData}
              filter_tag_screen={filter_tag_screen}
              filter_option_screen={filter_option_screen}
              startDate={startDate}
              endDate={endDate}
              date_tricker={date_tricker}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[550px] text-center ">
            <div className="font-poppins text-5xl text-[#dedede]">
              --- No data ---
            </div>
          </div>
        )}
      </>
    );
  };

  const ListOfDigitalScreen = () => {
    return (
      <>
        {/* <Filter page_name={"db_list_screen"} /> */}
        {report_status_booking.length > 0 ? (
          <div className="mt-5">
            <GridTableReportScreen
              report_screen_booking={report_screen_booking}
              all_report_screen_pages={all_report_screen_pages}
              // filter_screen={filter_screen}
              getReportScreenData={getReportScreenData}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[550px] text-center ">
            <div className="font-poppins text-5xl text-[#dedede]">
              --- No data ---
            </div>
          </div>
        )}
      </>
    );
  };

  const exportListBookingCurrent = async () => {};

  const exportListBookingAllPage = async () => {
    Swal.fire({
      title: "กำลังรวบรวมข้อมูล...",
      html: "กรุณารอสักครู่...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let obj;
      if (filter_tag_screen.length > 0 || filter_option_screen.length > 0) {
        const tag_result = filter_tag_screen.join(",");
        const option_result = filter_option_screen.join(",");
        if (filter_tag_screen.length > 0 && filter_option_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: tag_result,
              optionkey: {
                filterfields: option_result,
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              tagids: tag_result,
              optionkey: {
                filterfields: option_result,
              },
            };
          }
        } else if (filter_tag_screen.length > 0) {
          if (date_tricker) {
            obj = {
              tagids: tag_result,
              optionkey: {
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              tagids: tag_result,
            };
          }
        } else if (filter_option_screen.length > 0) {
          if (date_tricker) {
            obj = {
              optionkey: {
                filterfields: option_result,
                startDate: startDate,
                endDate: endDate,
              },
            };
          } else {
            obj = {
              optionkey: {
                filterfields: option_result,
              },
            };
          }
        }
      } else {
        obj = null;
      }

      const export_data = [];

      for (let i = 1; i <= total_page_booking; i++) {
        try {
          const data = await User.getDashboardBooking(
            token,
            i,
            JSON.stringify(obj)
          );
          export_data.push(...data.booking); // Append to the array
        } catch (error) {
          console.error(`Error fetching activity log for page ${i}:`, error);
        }
      }
      console.log(export_data);
      export_data.forEach((item) => {
        item.BookingStatus =
          item.BookingStatus === 0
            ? "Published"
            : item.BookingStatus === 1
            ? "Incomplete Booking"
            : item.BookingStatus === 2
            ? "Non Publish"
            : item.BookingStatus === 3
            ? "Inactive"
            : "No status";
      });

      const logs = export_data.map((entry) => [
        entry.BookingID.toString(),
        entry.BookingName,
        entry.AdvertiserName,
        entry.BookingStatus,
      ]);
      const csvHeader = [
        "Booking ID",
        "Booking Name",
        "Customer Name",
        "Booking Status",
      ].join(",");

      const csvBody = logs.map((row) => row.join(",")).join("\n");
      const csvContent = `${csvHeader}\n${csvBody}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      link.download = `list_booking_status_${date}-${month}-${year}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      Swal.close();
    }

    Swal.fire({
      icon: "success",
      title: "Export Data!",
      text: "ดาวน์โหลดไฟล์เรียบร้อยแล้ว",
    });
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Report"} />
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-2 p-2">
            <div className="font-poppins text-2xl font-bold">Report</div>
          </div>
          {/* Tabs */}
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`col-span-3 p-2 cursor-pointer ${
                activeTab === index ? "bg-gray-200 rounded-lg" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="flex items-center justify-center space-x-2 mt-1">
                <div
                  className={`font-poppins font-bold text-md ${
                    activeTab === index ? "text-black" : "text-[#6359E9]"
                  }`}
                >
                  {tab.label}
                </div>
              </div>
            </div>
          ))}

          {/* Export Button */}
          {activeTab === 0 ? (
            <div className="col-span-4 flex items-center justify-end">
              <div className="flex justify-end space-x-1">
                <button
                  onClick={() => exportListBookingCurrent()}
                  className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
                >
                  Export Current Page
                </button>
                <button
                  onClick={() => exportListBookingAllPage()}
                  className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
                >
                  Export All Page
                </button>
              </div>
            </div>
          ) : (
            <div className="col-span-4 flex items-center justify-end">
              <button
                onClick={() => alert("export list of digital screen")}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export
              </button>
            </div>
          )}
        </div>

        {activeTab === 0 && <ListOfBooking />}
        {activeTab === 1 && <ListOfDigitalScreen />}
      </div>
    </>
  );
};

export default Report;
