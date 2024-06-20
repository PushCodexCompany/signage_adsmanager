import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/screen_grid";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";

const Screen = () => {
  useCheckPermission();

  const [log_data, setLogData] = useState([]);
  const [all_pages, setAllPages] = useState(null);

  useEffect(() => {
    getLogData();
  }, []);

  const getLogData = async () => {
    const media_log_mockup = {
      items: [
        {
          id: 1,
          screen_name: "Screen 1",
          event: "Event 1",
          time: 1658901600000,
          status: "Up",
        },
        {
          id: 2,
          screen_name: "Screen 2",
          event: "Event 2",
          time: 1658900700000,
          status: "Up",
        },
        {
          id: 3,
          screen_name: "Screen 3",
          event: "Event 3",
          time: 1658900700000,
          status: "Down",
        },
        {
          id: 4,
          screen_name: "Screen 4",
          event: "Event 4",
          time: 1658900700000,
          status: "Down",
        },
        {
          id: 5,
          screen_name: "Screen 5",
          event: "Event 5",
          time: 1658900700000,
          status: "Up",
        },
        {
          id: 6,
          screen_name: "Screen 6",
          event: "Event 6",
          time: 1658900700000,
          status: "Down",
        },
        {
          id: 7,
          screen_name: "Screen 7",
          event: "Event 7",
          time: 1658900700000,
          status: "Down",
        },
        {
          id: 8,
          screen_name: "Screen 8",
          event: "Event 8",
          time: 1658900700000,
          status: "Up",
        },
        {
          id: 9,
          screen_name: "Screen 9",
          event: "Event 9",
          time: 1658900700000,
          status: "Up",
        },
        {
          id: 10,
          screen_name: "Screen 10",
          event: "Event 10",
          time: 1658900700000,
          status: "Down",
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
              Screen (Only available up to last 15 days)
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() =>
                  (window.location.href = "/setting/media_rule/create")
                }
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export
              </button>
            </div>
          </div>
        </div>
        <Filter />
        <div className="mt-5">
          {log_data.length > 0 ? (
            <GridTable log_data={log_data} all_pages={all_pages} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Screen;
