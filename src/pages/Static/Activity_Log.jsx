import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/activities_log_grid";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";

const Activity_Log = () => {
  useCheckPermission();

  const [log_data, setLogData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter_screen, setFilterScreen] = useState([]);

  useEffect(() => {
    getLogData();
  }, []);

  const getLogData = async () => {
    const media_log_mockup = {
      items: [
        {
          id: 1,
          user: "Admin01",
          page: "Requests",
          time: 1658469600000,
          action: "Approve",
          action_on: "Booking",
          value: "#001",
        },
        {
          id: 2,
          user: "Admin02",
          page: "Booking",
          time: 1658468700000,
          action: "Submit Request",
          action_on: "Content",
          value: "#002",
        },
        {
          id: 3,
          user: "Sale01",
          page: "Content",
          time: 1658468700000,
          action: "Reject",
          action_on: "Content",
          value: "#003",
        },
        {
          id: 4,
          user: "Supachai4",
          page: "Booking",
          time: 1658468700000,
          action: "Submit Request",
          action_on: "Content",
          value: "#004",
        },
        {
          id: 5,
          user: "Nidarat_ssu",
          page: "Content",
          time: 1658468700000,
          action: "Reject",
          action_on: "Content",
          value: "#005",
        },
        {
          id: 6,
          user: "Admin_sale",
          page: "Request",
          time: 1658468700000,
          action: "Approve",
          action_on: "Booking",
          value: "#006",
        },
        {
          id: 7,
          user: "Admin05",
          page: "Content",
          time: 1658468700000,
          action: "Reject",
          action_on: "Booking",
          value: "#007",
        },
        {
          id: 8,
          user: "Admin010",
          page: "Booking",
          time: 1658468700000,
          action: "Approve",
          action_on: "Content",
          value: "#008",
        },
        {
          id: 9,
          user: "Admin12",
          page: "Requests",
          time: 1658468700000,
          action: "Submit Request",
          action_on: "Booking",
          value: "#009",
        },
        {
          id: 10,
          user: "Admin_sale",
          page: "Request",
          time: 1658468700000,
          action: "Approve",
          action_on: "Booking",
          value: "#006",
        },
      ],
      pages: 1,
      lenght: 10,
      all_page: 7,
    };
    setLogData(media_log_mockup.items);
    setAllPages(media_log_mockup.all_page);
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Activities log
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => alert("export")}
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
              checkboxes={checkboxes}
              setCheckboxes={setCheckboxes}
              selectedScreenItems={selectedScreenItems}
              setSelectedScreenItems={setSelectedScreenItems}
              setSelectAll={setSelectAll}
              selectAll={selectAll}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Activity_Log;
