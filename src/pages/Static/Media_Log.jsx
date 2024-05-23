import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_logs_grid";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";

const Media_Log = () => {
  useCheckPermission();

  const [log_data, setLogData] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filter_screen, setFilterScreen] = useState([]);

  useEffect(() => {
    getLogData();
  }, []);

  const getLogData = async () => {
    const media_log_mockup = [
      {
        id: 1,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Nike",
        screen: "Screen 1",
        start_time: 1658901600000,
        end_time: 1658901600000,
        Duration: 15,
      },
      {
        id: 2,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 3,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 4,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 5,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 6,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 7,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 8,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 9,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 10,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Nike",
        screen: "Screen 1",
        start_time: 1658901600000,
        end_time: 1658901600000,
        Duration: 15,
      },
      {
        id: 11,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 12,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 13,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 14,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 15,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 16,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 17,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 18,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 19,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Nike",
        screen: "Screen 1",
        start_time: 1658901600000,
        end_time: 1658901600000,
        Duration: 15,
      },
      {
        id: 20,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 21,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 22,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 23,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 24,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 25,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 26,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 27,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 28,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 29,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 30,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 31,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 32,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 33,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 34,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 35,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 36,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 37,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 38,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 39,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 40,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 41,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 42,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 43,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 44,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 45,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 46,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 47,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 48,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 49,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 50,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 51,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 52,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 53,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 54,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 55,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 56,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 57,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 58,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 59,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 60,
        media_name: "Promotion Summer.mp4",
        merchandise: "Adidas",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 61,
        media_name: "Sample Ads.png",
        merchandise: "Adidas 3",
        screen: "Screen 2",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 62,
        media_name: "Mid Night Sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 3",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 63,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "FILA",
        screen: "Screen 4",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 64,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "BAOBAO",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 65,
        media_name: "Food Hall Ads.png",
        merchandise: "After You",
        screen: "Screen 5",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 66,
        media_name: "Mid year sale 2023.mp4",
        merchandise: "Adidas",
        screen: "Screen 7",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
      {
        id: 67,
        media_name: "Pet Show 2023.mp4",
        merchandise: "Tops",
        screen: "Screen 10",
        start_time: 1658900700000,
        end_time: 1658900700000,
        Duration: 15,
      },
    ];

    setLogData(media_log_mockup);
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl">Media log</div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() =>
                  (window.location.href = "/setting/media_rule/create")
                }
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
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

export default Media_Log;
