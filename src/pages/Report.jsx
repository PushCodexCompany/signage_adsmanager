import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Navbar_Booking_Report from "../components/Navbar_Booking_Report";
import Navbar_Screen_Report from "../components/Navbar_Screen_Report";
import { useNavigate } from "react-router-dom";
import useCheckPermission from "../libs/useCheckPermission";
import Permission from "../libs/permission";
import User from "../libs/admin";
import Swal from "sweetalert2";

import { GridTableReportStatus } from "../libs/dashboard_report_status_grid";
import { GridTableReportScreen } from "../libs/dashboard_report_screen_grid";

import Filter from "../components/Custom_filter_Report_Booking";
import Tag_Filter from "../../src/components/Custom_filter_Report_Screen";

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
  const [report_screen_booking, setReportScreenBooking] = useState([]);
  const [all_report_booking_pages, setAllReportBookingPages] = useState(null);
  const [all_report_screen_pages, setAllReportScreenPages] = useState(null);

  const [export_booking_data, setExportBookingData] = useState([]);
  const [currentPageBooking, setCurrentPageBooking] = useState();
  const [filterTag, setFilterTag] = useState([]);
  const [filterOption, setFilterOption] = useState([]);

  const [filter_option_screen, setFilterOptionScreen] = useState([]);
  const [filter_tag_screen, setFilterTagScreen] = useState([]);

  const [startDatePickers, setStartDatePickers] = useState(new Date());
  const [endDatePickers, setEndDatePickers] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [date_tricker, setDateTricker] = useState(false);
  const [total_page_booking, setTotalPageBooking] = useState([]);

  const [searchTermBooking, setSearchTermBooking] = useState(null);
  const [searchTermScreen, setSearchTermScreen] = useState(null);

  // Screen Tab
  const [filter_screen_page, setFilterScreenPage] = useState([]);
  const [filter_tag_screen_page, setFilterTagScreenPage] = useState([]);
  const [export_screen_data, setExportScreenData] = useState([]);
  const [currentPageScreen, setCurrentPageScreen] = useState();
  const [totalPageScreen, setTotalPageScreen] = useState();

  useEffect(() => {
    getReportData();
    getReportScreenData();
  }, []);

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    getReportData();
  }, [searchTermBooking]);

  useEffect(() => {
    getReportScreenData();
  }, [searchTermScreen]);

  const getReportData = async (type) => {
    if (searchTermBooking === null) {
      let obj;

      if (date_tricker) {
        obj = {
          optionkey: {
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
          },
        };
      } else {
        obj = null;
      }

      const data = await User.getDashboardBooking(token, 1, obj);
      setReportStatusBooking(data?.booking);
      setExportBookingData(data?.booking);
      if (data.pagination.length > 0) {
        setAllReportBookingPages(data?.pagination[0].totalpage);
        setTotalPageBooking(data?.pagination[0].totalpage);
        setCurrentPageBooking(data?.pagination[0].currentpage);
      } else {
        setCurrentPageBooking(1);
      }
    } else {
      let data;
      if (!type) {
        if (filter_tag_screen.length > 0 || filter_option_screen.length > 0) {
          let obj;
          const filter_option_screen_output = filter_option_screen
            .map((item) => `${item}`)
            .join(",");

          if (filter_tag_screen.length > 0 && filter_option_screen.length > 0) {
            if (date_tricker) {
              obj = {
                tagids: filter_tag_screen,
                optionkey: {
                  filterfields: filter_option_screen_output,
                  startDate: startDate.toISOString().split("T")[0],
                  endDate: endDate.toISOString().split("T")[0],
                },
              };
            } else {
              obj = {
                tagids: filter_tag_screen,
                optionkey: {
                  filterfields: filter_option_screen_output,
                },
              };
            }
          } else if (filter_tag_screen.length > 0) {
            if (date_tricker) {
              obj = {
                tagids: filter_tag_screen,
                optionkey: {
                  startDate: startDate.toISOString().split("T")[0],
                  endDate: endDate.toISOString().split("T")[0],
                },
              };
            } else {
              obj = {
                tagids: filter_tag_screen,
              };
            }
          } else if (filter_option_screen.length > 0) {
            if (date_tricker) {
              obj = {
                optionkey: {
                  filterfields: filter_option_screen_output,
                  startDate: startDate.toISOString().split("T")[0],
                  endDate: endDate.toISOString().split("T")[0],
                },
              };
            } else {
              obj = {
                optionkey: {
                  filterfields: filter_option_screen_output,
                },
              };
            }
          }
          data = await User.getDashboardBooking(
            token,
            1,
            obj,
            searchTermBooking
          );
        } else {
          let obj;
          if (date_tricker) {
            obj = {
              optionkey: {
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
              },
            };
          } else {
            obj = null;
          }

          data = await User.getDashboardBooking(
            token,
            1,
            obj,
            searchTermBooking
          );
        }
      } else {
        let obj;
        if (date_tricker) {
          obj = {
            optionkey: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          };
        } else {
          obj = null;
        }

        data = await User.getDashboardBooking(token, 1, obj, searchTermBooking);
      }

      setReportStatusBooking(data?.booking);
      setExportBookingData(data?.booking);
      if (data.pagination.length > 0) {
        setAllReportBookingPages(data?.pagination[0].totalpage);
        setTotalPageBooking(data?.pagination[0].totalpage);
        setCurrentPageBooking(data?.pagination[0].currentpage);
      } else {
        setCurrentPageBooking(1);
      }
    }
  };

  const getReportScreenData = async (type) => {
    if (searchTermScreen === null) {
      const data = await User.getDashboardScreen(token, 1);
      setReportScreenBooking(data?.screens);
      setExportScreenData(data?.screens);
      if (data.pagination.length > 0) {
        setCurrentPageScreen(data?.pagination[0].currentpage);
        setAllReportScreenPages(data?.pagination[0]?.totalpage);
        setTotalPageScreen(data?.pagination[0].totalpage);
      } else {
        setCurrentPageScreen(1);
      }
    } else {
      let data;
      if (!type) {
        if (filter_tag_screen_page.length > 0) {
          const result = filter_tag_screen_page.join(",");
          const obj = {
            tagids: result,
          };

          data = await User.getDashboardScreen(token, 1, obj, searchTermScreen);
        } else {
          data = await User.getDashboardScreen(token, 1, "", searchTermScreen);
        }
      } else {
        data = await User.getDashboardScreen(token, 1, "", searchTermScreen);
      }

      setReportScreenBooking(data?.screens);
      setExportScreenData(data?.screens);
      if (data.pagination.length > 0) {
        setCurrentPageScreen(data?.pagination[0].currentpage);
        setAllReportScreenPages(data?.pagination[0]?.totalpage);
        setTotalPageScreen(data?.pagination[0].totalpage);
      } else {
        setCurrentPageScreen(1);
      }
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
          setExportBookingData={setExportBookingData}
          setSearchTermBooking={setSearchTermBooking}
          searchTermBooking={searchTermBooking}
        />
        {report_status_booking.length > 0 ? (
          <div className="mt-5">
            <GridTableReportStatus
              report_status_booking={report_status_booking}
              setReportStatusBooking={setReportStatusBooking}
              all_report_booking_pages={all_report_booking_pages}
              filter_tag_screen={filter_tag_screen}
              filter_option_screen={filter_option_screen}
              startDate={startDate}
              endDate={endDate}
              date_tricker={date_tricker}
              setExportBookingData={setExportBookingData}
              setCurrentPageBooking={setCurrentPageBooking}
              currentPageBooking={currentPageBooking}
              searchTermBooking={searchTermBooking}
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
        <Tag_Filter
          getReportScreenData={getReportScreenData}
          page_name={"dashScreenRpt"}
          filter_screen_page={filter_screen_page}
          filter_tag_screen_page={filter_tag_screen_page}
          setFilterScreenPage={setFilterScreenPage}
          setFilterTagScreenPage={setFilterTagScreenPage}
          setAllReportScreenPages={setAllReportScreenPages}
          setReportScreenBooking={setReportScreenBooking}
          setExportScreenData={setExportScreenData}
          setTotalPageScreen={setTotalPageScreen}
          setSearchTermScreen={setSearchTermScreen}
          searchTermScreen={searchTermScreen}
        />
        {report_screen_booking.length > 0 ? (
          <div className="mt-5">
            <GridTableReportScreen
              report_screen_booking={report_screen_booking}
              all_report_screen_pages={all_report_screen_pages}
              getReportScreenData={getReportScreenData}
              setExportScreenData={setExportScreenData}
              filter_tag_screen_page={filter_tag_screen_page}
              setReportScreenBooking={setReportScreenBooking}
              setCurrentPageScreen={setCurrentPageScreen}
              currentPageScreen={currentPageScreen}
              searchTermScreen={searchTermScreen}
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

  const exportListBookingCurrent = async () => {
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
      export_booking_data.forEach((item) => {
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

      const logs = export_booking_data.map((entry) =>
        [
          entry.ScreenName,
          entry.BranchName,
          entry.ScreenType,
          entry.Resolution.replace(
            /(\d+)(?:\.\d+)? x (\d+)(?:\.\d+)?/,
            "W $1 x H $2"
          ),
          entry.ScreenLocation,
          entry.BookingID,
          entry.BookingName,
          entry.AdvertiserName,
          entry.BookingStatus,
          new Date(entry.BookingDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
            .replace(" ", "-")
            .replace(" ", "-"),
          entry.SlotPerDay,
          entry.TimePerSlot,
        ].map((field) => `"${String(field).replace(/"/g, '""')}"`)
      );

      const csvHeader = [
        "รหัสจอ",
        "ชื่อสาขา",
        "Screen Type",
        "Size from media rule",
        "Location",
        "Booking ID",
        "Booking Name",
        "Customer",
        "Booking Status",
        "Live Date",
        "Slots",
        "Time Per Slot",
      ].join(",");

      const csvBody = logs.map((row) => row.join(",")).join("\n");
      const csvContent = `\uFEFF${csvHeader}\n${csvBody}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      link.download = `list_booking_status_page${currentPageBooking}_${date}-${month}-${year}.csv`;
      document.body.appendChild(link);
      link.click();
    } finally {
      Swal.close();
    }

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Export Data!",
        text: "ดาวน์โหลดไฟล์เรียบร้อยแล้ว",
      });
    }, 300); // Adjust delay as needed
  };

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
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
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
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
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
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
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
        if (date_tricker) {
          obj = {
            optionkey: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          };
        } else {
          obj = null;
        }
      }
      const export_data = [];
      for (let i = 1; i <= total_page_booking; i++) {
        try {
          let data;
          if (searchTermBooking === null) {
            data = await User.getDashboardBooking(token, i, obj);
          } else {
            data = await User.getDashboardBooking(
              token,
              i,
              obj,
              searchTermBooking
            );
          }
          export_data.push(...data.booking); // Append to the array
        } catch (error) {
          console.error(`Error fetching activity log for page ${i}:`, error);
        }
      }
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

      const logs = export_data.map((entry) =>
        [
          entry.ScreenName,
          entry.BranchName,
          entry.ScreenType,
          entry.Resolution.replace(
            /(\d+)(?:\.\d+)? x (\d+)(?:\.\d+)?/,
            "W $1 x H $2"
          ),
          entry.ScreenLocation,
          entry.BookingID,
          entry.BookingName,
          entry.AdvertiserName,
          entry.BookingStatus,
          new Date(entry.BookingDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
            .replace(" ", "-")
            .replace(" ", "-"),
          entry.SlotPerDay,
          entry.TimePerSlot,
        ].map((field) => `"${String(field).replace(/"/g, '""')}"`)
      );

      const csvHeader = [
        "รหัสจอ",
        "ชื่อสาขา",
        "Screen Type",
        "Size from media rule",
        "Location",
        "Booking ID",
        "Booking Name",
        "Customer",
        "Booking Status",
        "Live Date",
        "Slots",
        "Time Per Slot",
      ].join(",");

      const csvBody = logs.map((row) => row.join(",")).join("\n");
      const csvContent = `\uFEFF${csvHeader}\n${csvBody}`;
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

  const exportScreenCurrent = async () => {
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
      const updated_screen_data = export_screen_data.map((screen) => {
        return {
          ...screen,
          ScreenRule: screen.ScreenRule.map((rule) => ({
            ...rule,
            ImageContentTypeID: rule.ImageContentTypeID !== 0 ? true : false,
            VideoContentTypeID: rule.VideoContentTypeID !== 0 ? true : false,
          })),
        };
      });

      const logs = updated_screen_data.map((entry) =>
        [
          entry.ScreenID.toString(),
          entry.ScreenName,
          `W ${parseInt(entry.ScreenRule[0].Width, 10)} x H ${parseInt(
            entry.ScreenRule[0].Height,
            10
          )}`,
          entry.ScreenLocation,
          entry.ScreenRule[0].ImageContentTypeID,
          entry.ScreenRule[0].VideoContentTypeID,
        ].map((field) => `"${String(field).replace(/"/g, '""')}"`)
      );

      const csvHeader = [
        "Screen ID",
        "Screen Name",
        "Size (from media rule)",
        "Location",
        "Image Type",
        "Video Type",
      ].join(",");

      const csvBody = logs.map((row) => row.join(",")).join("\n");
      const csvContent = `\uFEFF${csvHeader}\n${csvBody}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      link.download = `list_screen_page${currentPageScreen}_${date}-${month}-${year}.csv`;
      document.body.appendChild(link);
      link.click();
    } finally {
      Swal.close();

      // Add a small delay before showing the success modal
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Export Data!",
          text: "ดาวน์โหลดไฟล์เรียบร้อยแล้ว",
        });
      }, 300); // Adjust delay as needed
    }
  };

  const exportScreenAll = async () => {
    if (export_screen_data.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่มีข้อมูลในการ export",
      });
      return;
    }

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
      const result = filter_tag_screen_page.join(",");
      const obj = {
        tagids: result,
      };

      const export_data = [];
      for (let i = 1; i <= totalPageScreen; i++) {
        try {
          let data;
          if (searchTermScreen === null) {
            data = await User.getDashboardScreen(token, i, obj);
          } else {
            data = await User.getDashboardScreen(
              token,
              i,
              obj,
              searchTermScreen
            );
          }

          export_data.push(...data.screens); // Append to the array
        } catch (error) {
          console.error(`Error fetching screen log for page ${i}:`, error);
        }
      }

      const updated_screen_data = export_data.map((screen) => {
        return {
          ...screen,
          ScreenRule: screen.ScreenRule.map((rule) => ({
            ...rule,
            ImageContentTypeID: rule.ImageContentTypeID !== 0 ? true : false,
            VideoContentTypeID: rule.VideoContentTypeID !== 0 ? true : false,
          })),
        };
      });

      const logs = updated_screen_data.map((entry) =>
        [
          entry.ScreenID.toString(),
          entry.ScreenName,
          `W ${parseInt(entry.ScreenRule[0].Width, 10)} x H ${parseInt(
            entry.ScreenRule[0].Height,
            10
          )}`,
          entry.ScreenLocation,
          entry.ScreenRule[0].ImageContentTypeID,
          entry.ScreenRule[0].VideoContentTypeID,
        ].map((field) => `"${String(field).replace(/"/g, '""')}"`)
      );

      const csvHeader = [
        "Screen ID",
        "Screen Name",
        "Size (from media rule)",
        "location",
        "Image Type",
        "Video Type",
      ].join(",");

      const csvBody = logs.map((row) => row.join(",")).join("\n");
      const csvContent = `\uFEFF${csvHeader}\n${csvBody}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      link.download = `list_screen_${date}-${month}-${year}.csv`;
      document.body.appendChild(link);
      link.click();
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
      {activeTab === 0 && (
        <Navbar_Booking_Report
          setSearchTermBooking={setSearchTermBooking}
          searchTermBooking={searchTermBooking}
        />
      )}
      {activeTab === 1 && (
        <Navbar_Screen_Report
          setSearchTermScreen={setSearchTermScreen}
          searchTermScreen={searchTermScreen}
        />
      )}

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
              <div className="flex justify-end space-x-1">
                <button
                  onClick={() => exportScreenCurrent()}
                  className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
                >
                  Export Current Page
                </button>
                <button
                  onClick={() => exportScreenAll()}
                  className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
                >
                  Export All Page
                </button>
              </div>
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
