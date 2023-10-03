import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { MdOutlineCalendarToday, MdCalendarToday } from "react-icons/md";
import central_img from "../assets/img/central.png";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

import { ImArrowUp, ImArrowDown } from "react-icons/im";

import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { dashboardData, dashboardGrid } from "../libs/dashboard_grid";

const Dashboard = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isUp, setIsUp] = useState(true);

  const toggleYearSelect = () => {
    setIsYearOpen((prevIsOpen) => !prevIsOpen);
  };

  const RightPanel = () => {
    const PieChart = () => {
      ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title
      );

      const data = {
        datasets: [
          {
            label: "Total Earning",
            data: [10, 10, 10],
            backgroundColor: ["#5125BC", "#706195", "#A47FFE"],
            borderColor: ["#808080", "#808080", "#808080"],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        cutout: 120, // Adjust this value to control the thickness
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      return (
        <div className="flex items-center justify-center">
          <div className="relative w-[150px] h-[150px] lg:w-[280px] lg:h-[280px]">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="lg:text-5xl text-2xl font-bold flex ">500K</div>
              {isUp ? (
                <div className="flex lg:h-12 items-end">
                  <ImArrowUp
                    color="#05EF00"
                    className="relative bottom-[3px] lg:bottom-[6px]"
                  />
                  <div className="text-[#05EF00] font-poppins font-bold">
                    10%
                  </div>
                </div>
              ) : (
                <div className="flex lg:h-12 items-end ">
                  <ImArrowDown
                    color="red"
                    className="relative bottom-[14px] lg:bottom-[6px]"
                  />
                  <div className="text-red-600 font-poppins font-bold">10%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    const TotalSection = () => {
      return (
        <>
          <div className="flex items-center justify-center mt-2">
            <img className="w-2/5 rounded-md" src={central_img} />
          </div>
          <div className="flex items-center justify-center">
            <div className="font-poppins text-sm lg:text-2xl font-bold">
              CDS
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="font-poppins text-[6px] lg:text-sm text-gray-400">
              Central Department Store
            </div>
          </div>
          <div className="flex mt-5">
            <div class="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              574
            </div>
            <div class="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              1245
            </div>
            <div class="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              148
            </div>
          </div>
          <div className="flex mb-5">
            <div class="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Screen
            </div>
            <div class="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Content
            </div>
            <div class="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Booking
            </div>
          </div>
        </>
      );
    };

    return (
      <div class="col-span-2 row-span-4 ">
        <div className="border border-gray-200 rounded-lg">
          <TotalSection />
        </div>
        <div className="border border-gray-200 rounded-lg mt-8">
          <div className="flex items-center justify-center font-semibold font-poppins lg:text-xl mt-2">
            Total Earning 2023
          </div>
          <div className="flex item-center justify-center mt-10">
            <PieChart />
          </div>
          <div className="space-y-2 mt-3 p-1 mb-5">
            <div className="flex border border-gray-200 rounded-lg ">
              <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#5125BC] rounded-lg" />
              <div className="space-y-[-3px]">
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-xl">
                  YTD Revenue
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-4 lg:gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-3xl">
                      74
                    </div>
                    <div className="flex justify-end items-center min-w-0">
                      <ImArrowUp color="#008A1E" size={15} />
                      <div className="text-[#008A1E] text-xl font-poppins">
                        10%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border border-gray-200 rounded-lg">
              <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#A47FFE] rounded-lg" />
              <div className="space-y-[-3px]">
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-xl">
                  MTD Revenue
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-3xl ">
                      148
                    </div>
                    <div className="flex justify-end items-center min-w-0">
                      <ImArrowUp color="#008A1E" size={15} />
                      <div className="text-[#008A1E] text-xl font-poppins">
                        10%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border border-gray-200 rounded-lg">
              <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#706195] rounded-lg" />
              <div className="space-y-[-3px]">
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-xl">
                  Number of Brand Booking
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-3xl ">
                      14
                    </div>
                    <div className="flex justify-end items-center min-w-0">
                      <ImArrowUp color="#008A1E" size={15} />
                      <div className="text-[#008A1E] text-xl font-poppins">
                        10%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LeftPanel = () => {
    const LineChart = () => {
      const data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "YTD",
            data: [20, 25, 10, 29, 15, 35, 40, 48, 55, 51, 65, 85],
            borderColor: "#5125BC",
            fill: false,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
        },
        scales: {
          y: {
            display: true, // Hide Y axis labels
            suggestedMin: 0,
            suggestedMax: 100,
          },
          x: {
            display: true, // Hide X axis labels
            grid: {
              display: false, // Hide X-axis grid lines
            },
          },
        },
      };

      return <Line data={data} options={options} />;
    };

    return (
      <>
        {/* Top */}
        <div class="col-span-5 row-span-2 ">
          <div className="flex space-x-3">
            <div className=" w-2/4">
              <div className="font-poppins font-bold text-lg mb-3">
                by Month Store
              </div>
              <GridComponent
                dataSource={dashboardData}
                height={400}
                width={"auto"}
              >
                <ColumnsDirective>
                  {dashboardGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />
              </GridComponent>
            </div>
            <div className="w-2/4">
              <div className="font-poppins font-bold text-lg mb-3">
                by Month YTD
              </div>
              <div className="bg-gray-100 h-[445px] border border-gray-200">
                <div className="h-[80%] mt-5 ">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div class="col-span-5 row-span-2 bg-purple-500">
          <div className="flex space-x-3">
            <div className="bg-red-500 w-2/3">
              <div>box</div>
            </div>
            <div className="bg-yellow-500 w-1/3">
              <div className="font-poppins font-bold text-lg">
                by Category YTD
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Home" subtitle="Welcome to Dashboard" />

      <div className="mt-5 flex">
        <div className=" font-poppins font-semibold text-3xl flex justify-center items-center">
          Revenue
        </div>
        <div className="font-poppins font-semibold text-xl flex justify-center items-center space-x-3 ml-16 lg:ml-28">
          <div class="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
            <select
              name="year"
              id="year"
              onClick={toggleYearSelect}
              class="block appearance-none w-full bg-[#f2f2f2]  text-lg font-poppins  rounded p-1 pr-6  "
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isYearOpen ? (
                <MdCalendarToday size={28} color={"#6425FE"} />
              ) : (
                <MdOutlineCalendarToday size={28} color={"#6425FE"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-rows-4 grid-cols-7 grid-flow-col gap-4 mt-10">
        {/* Left Panel */}
        <LeftPanel />
        {/* RightPanel  */}
        <RightPanel />
      </div>
    </div>
  );
};

export default Dashboard;
