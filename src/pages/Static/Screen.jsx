import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/screen_grid";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";
import User from "../../libs/admin";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Screen = () => {
  useCheckPermission();
  const { token } = User.getCookieData();
  const [log_data, setLogData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [exportData, setExportData] = useState([]);
  const [currentPagePdf, setCurrentPagePdf] = useState();

  useEffect(() => {
    getLogData();
  }, [searchTerm]);

  const getLogData = async () => {
    if (searchTerm === null) {
      const data = await User.getScreenlog(token, 1);
      setLogData(data.screenlog);
      setExportData(data.screenlog);
      setCurrentPagePdf(data.pagination[0].currentpage);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      const data = await User.getScreenlog(token, 1, searchTerm);
      setLogData(data.screenlog);
      setExportData(data.screenlog);
      setCurrentPagePdf(data.pagination[0].currentpage);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();

    // Convert log_data to an array of objects for the table
    const logs = exportData.map((entry) => [
      entry.SceenStatusID.toString(),
      entry.ScreenName,
      entry.SceenDateTime,
      entry.ScreenStatus === 1 ? "UP" : "DOWN",
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [
        ["Sceen Status ID", "Screen Name", "Sceen Date Time", "Screen Status"],
      ],
      body: logs,
      startY: 20,
      margin: { top: 30 },
      styles: { fontSize: 10 }, // Adjust font size if needed
    });
    // Save the PDF
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    doc.save(`screenlog_page${currentPagePdf}_${date}/${month}/${year}`);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />

        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Screen (Only available up to last 15 days)
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={handleExport}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export
              </button>
            </div>
          </div>
        </div>
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        <div className="mt-5">
          {log_data.length > 0 ? (
            <GridTable
              log_data={log_data}
              all_pages={all_pages}
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

export default Screen;
