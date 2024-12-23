import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/media_logs_grid";
import { useNavigate } from "react-router-dom";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";
import User from "../../libs/admin";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Permission from "../../libs/permission";
import Swal from "sweetalert2";

const Media_Log = () => {
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
  const [total_page, setTotalPage] = useState([]);

  useEffect(() => {
    getLogData();
  }, [searchTerm]);

  useEffect(() => {
    setPermission();
  }, []);
  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.mdLog.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
    setPagePermission(permissions?.mdLog);
  };

  const getLogData = async () => {
    if (searchTerm === null) {
      const data = await User.getMedialog(token, 1);
      setLogData(data.medialog);
      setExportData(data.medialog);
      if (data.pagination.length > 0) {
        setTotalPage(data.pagination[0].totalpage);
        setCurrentPagePdf(data.pagination[0].currentpage);
        setAllPages(data.pagination[0].totalpage);
      } else {
        setCurrentPagePdf(0);
      }
    } else {
      const data = await User.getMedialog(token, 1, searchTerm);
      setLogData(data.medialog);
      setExportData(data.medialog);
      if (data.pagination.length > 0) {
        setTotalPage(data.pagination[0].totalpage);
        setCurrentPagePdf(data.pagination[0].currentpage);
        setAllPages(data.pagination[0].totalpage);
      } else {
        setCurrentPagePdf(0);
      }
    }
  };

  const handleExportAllPage = async () => {
    Swal.fire({
      title: "กำลังรวบรวมข้อมูล...",
      html: "กรุณารอสักครู่...",
      allowEscapeKey: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const export_data = [];
      for (let i = 1; i <= total_page; i++) {
        try {
          const data = await User.getMedialog(token, i);
          export_data.push(...data.medialog); // Append to the array
        } catch (error) {
          console.error(`Error fetching media log for page ${i}:`, error);
        }
      }

      const doc = new jsPDF();

      const logs = export_data.map((entry) => [
        entry.MediaLogID.toString(),
        entry.ContentName,
        entry.AdvertiserName,
        entry.ScreenName,
        entry.EndTime,
        entry.StartTime,
        entry.Duration,
      ]);

      doc.autoTable({
        head: [
          [
            "MediaID",
            "Media Name",
            "Customer",
            "Screen",
            "Start Time",
            "End Time",
            "Duration",
          ],
        ],
        body: logs,
        startY: 20,
        margin: { top: 30 },
        styles: { fontSize: 10 },
      });
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      doc.save(`medialog_${date}/${month}/${year}`);
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
      const doc = new jsPDF();

      const logs = exportData.map((entry) => [
        entry.MediaLogID.toString(),
        entry.ContentName,
        entry.AdvertiserName,
        entry.ScreenName,
        entry.EndTime,
        entry.StartTime,
        entry.Duration,
      ]);

      doc.autoTable({
        head: [
          [
            "MediaID",
            "Media Name",
            "Customer",
            "Screen",
            "Start Time",
            "End Time",
            "Duration",
          ],
        ],
        body: logs,
        startY: 20,
        margin: { top: 30 },
        styles: { fontSize: 10 },
      });
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      doc.save(`medialog_page${currentPagePdf}_${date}/${month}/${year}`);
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
        <Header lv1={"Log Management"} lv2={"media_log"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl">Media log</div>
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
          page_name={"mdLog"}
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

export default Media_Log;
