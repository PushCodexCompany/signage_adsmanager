import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/activities_log_grid";
import { useNavigate } from "react-router-dom";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Custom_Filter";
import User from "../../libs/admin";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Permission from "../../libs/permission";
import Swal from "sweetalert2";
import { format } from "date-fns";

const Activity_Log = () => {
  useCheckPermission();
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const [log_data, setLogData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter_screen, setFilterScreen] = useState([]);

  const [searchTerm, setSearchTerm] = useState(null);
  const [exportData, setExportData] = useState([]);
  const [currentPagePdf, setCurrentPagePdf] = useState();
  const [page_permission, setPagePermission] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [total_page, setTotalPage] = useState([]);

  const [fact_changeDate, setFact_changeDate] = useState(false);

  useEffect(() => {
    getLogData();
  }, [searchTerm]);

  useEffect(() => {
    setPermission();
  }, []);

  const getLogData = async () => {
    if (searchTerm === null) {
      const data = await User.getActivitylog(token, 1);
      setLogData(data.activitylog);
      setExportData(data.activitylog);
      if (data.pagination.length > 0) {
        setTotalPage(data.pagination[0].totalpage);
        setCurrentPagePdf(data.pagination[0].currentpage);
        setAllPages(data.pagination[0].totalpage);
      } else {
        setCurrentPagePdf(0);
      }
    } else {
      const data = await User.getActivitylog(token, 1, searchTerm);
      setLogData(data.activitylog);
      setExportData(data.activitylog);
      if (data.pagination.length > 0) {
        setCurrentPagePdf(data.pagination[0].currentpage);
        setAllPages(data.pagination[0].totalpage);
      } else {
        setCurrentPagePdf(0);
      }
    }
  };

  const generateActionString = (word) => {
    if (word) {
      let text;

      switch (word) {
        case "U":
          text = "Update";
          break;
        case "D":
          text = "Deleted";
          break;
        case "A":
          text = "Create";
          break;
        default:
          const result = word.charAt(0).toUpperCase() + word.slice(1);
          text = result;
      }

      return text;
    }
  };

  // const handleExportAllPage = async () => {
  //   Swal.fire({
  //     title: "กำลังรวบรวมข้อมูล...",
  //     html: "กรุณารอสักครู่...",
  //     allowEscapeKey: false,
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const result = filter_screen.join(",");
  //     const obj = {
  //       filterfields: result,
  //       startDate: format(new Date(startDate), "yyyy-MM-dd"),
  //       endDate: format(new Date(endDate), "yyyy-MM-dd"),
  //     };

  //     const export_data = [];

  //     for (let i = 1; i <= total_page; i++) {
  //       try {
  //         const data = await User.getActivitylog(
  //           token,
  //           i,
  //           searchTerm,
  //           JSON.stringify(obj)
  //         );
  //         export_data.push(...data.activitylog); // Append to the array
  //       } catch (error) {
  //         console.error(`Error fetching activity log for page ${i}:`, error);
  //       }
  //     }

  //     const doc = new jsPDF();

  //     const logs = export_data.map((entry) => [
  //       entry.ActivitiyID.toString(),
  //       generateActionString(entry.Action),
  //       entry.TargetField,
  //       entry.OnTable,
  //       entry.IndexValue,
  //       entry.OldvValue,
  //       entry.NewValue,
  //       entry.ByUser,
  //       entry.ActionDate,
  //     ]);

  //     doc.autoTable({
  //       head: [
  //         [
  //           "Activitiy ID",
  //           "Action",
  //           "Target Field",
  //           "On Table",
  //           "Index Value",
  //           "Old Value",
  //           "New Value",
  //           "By User",
  //           "Action Date",
  //         ],
  //       ],
  //       body: logs,
  //       startY: 20,
  //       margin: { top: 30 },
  //       styles: { fontSize: 10 }, // Adjust font size if needed
  //     });
  //     const date = new Date().getDate();
  //     const month = new Date().getMonth() + 1;
  //     const year = new Date().getFullYear();
  //     doc.save(`activity_log_${date}/${month}/${year}`);
  //   } finally {
  //     Swal.close();
  //   }

  //   Swal.fire({
  //     icon: "success",
  //     title: "Export Data!",
  //     text: "ดาวน์โหลดไฟล์เรียบร้อยแล้ว",
  //   });
  // };

  // const handleExportCurrent = async () => {
  //   try {
  //     const doc = new jsPDF();

  //     const logs = exportData.map((entry) => [
  //       entry.ActivitiyID.toString(),
  //       generateActionString(entry.Action),
  //       entry.TargetField,
  //       entry.OnTable,
  //       entry.IndexValue,
  //       entry.OldvValue,
  //       entry.NewValue,
  //       entry.ByUser,
  //       entry.ActionDate,
  //     ]);

  //     doc.autoTable({
  //       head: [
  //         [
  //           "Activitiy ID",
  //           "Action",
  //           "Target Field",
  //           "On Table",
  //           "Index Value",
  //           "Old Value",
  //           "New Value",
  //           "By User",
  //           "Action Date",
  //         ],
  //       ],
  //       body: logs,
  //       startY: 20,
  //       margin: { top: 30 },
  //       styles: { fontSize: 10 }, // Adjust font size if needed
  //     });
  //     const date = new Date().getDate();
  //     const month = new Date().getMonth() + 1;
  //     const year = new Date().getFullYear();
  //     doc.save(`activity_log_page${currentPagePdf}_${date}/${month}/${year}`);
  //   } finally {
  //     Swal.close();
  //   }

  //   Swal.fire({
  //     icon: "success",
  //     title: "Export Data!",
  //     text: "ดาวน์โหลดไฟล์เรียบร้อยแล้ว",
  //   });
  // };

  const handleExportAllPage = async () => {
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
      const result = filter_screen.join(",");
      let obj;
      if (fact_changeDate) {
        obj = {
          filterfields: result,
          startDate: format(new Date(startDate), "yyyy-MM-dd"),
          endDate: format(new Date(endDate), "yyyy-MM-dd"),
        };
      } else {
        obj = {
          filterfields: result,
        };
      }
      const export_data = [];

      for (let i = 1; i <= total_page; i++) {
        try {
          const data = await User.getActivitylog(
            token,
            i,
            searchTerm,
            JSON.stringify(obj)
          );
          export_data.push(...data.activitylog); // Append to the array
        } catch (error) {
          console.error(`Error fetching activity log for page ${i}:`, error);
        }
      }

      const logs = export_data.map((entry) => [
        entry.ActivitiyID.toString(),
        generateActionString(entry.Action),
        entry.TargetField,
        entry.OnTable,
        entry.IndexValue,
        entry.OldvValue,
        entry.NewValue,
        entry.ByUser,
        entry.ActionDate,
      ]);

      const csvHeader = [
        "Activitiy ID",
        "Action",
        "Target Field",
        "On Table",
        "Index Value",
        "Old Value",
        "New Value",
        "By User",
        "Action Date",
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
      link.download = `activity_log_${date}-${month}-${year}.csv`;

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

  const handleExportCurrent = async () => {
    try {
      const logs = exportData.map((entry) => [
        entry.ActivitiyID.toString(),
        generateActionString(entry.Action),
        entry.TargetField,
        entry.OnTable,
        entry.IndexValue,
        entry.OldvValue,
        entry.NewValue,
        entry.ByUser,
        entry.ActionDate,
      ]);

      const csvHeader = [
        "Activitiy ID",
        "Action",
        "Target Field",
        "On Table",
        "Index Value",
        "Old Value",
        "New Value",
        "By User",
        "Action Date",
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
      link.download = `activity_log_page${currentPagePdf}_${date}-${month}-${year}.csv`;

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

  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.actLog.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
    setPagePermission(permissions?.actLog);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Log Management"} lv2={"activities_log"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Activities log
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={handleExportCurrent}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export Current Page
              </button>
              <button
                onClick={handleExportAllPage}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export All Page
              </button>
            </div>
          </div>
        </div>

        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
          page_name={"actLog"}
          getLogData={getLogData}
          setLogData={setLogData}
          setAllPages={setAllPages}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setTotalPage={setTotalPage}
          setExportData={setExportData}
          setFact_changeDate={setFact_changeDate}
        />

        <div className="mt-5">
          {log_data.length > 0 ? (
            <GridTable
              log_data={log_data}
              all_pages={all_pages}
              checkboxes={checkboxes}
              setCheckboxes={setCheckboxes}
              selectedScreenItems={selectedScreenItems}
              setSelectedScreenItems={setSelectedScreenItems}
              setSelectAll={setSelectAll}
              selectAll={selectAll}
              searchTerm={searchTerm}
              setExportData={setExportData}
              setCurrentPagePdf={setCurrentPagePdf}
              filter_screen={filter_screen}
              startDate={startDate}
              endDate={endDate}
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
    </>
  );
};

export default Activity_Log;
