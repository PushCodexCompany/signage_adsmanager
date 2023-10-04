import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { MdOutlineCalendarToday, MdCalendarToday } from "react-icons/md";
import central_img from "../assets/img/central.png";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";

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
import "./css/dashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isUp, setIsUp] = useState(true);

  const toggleYearSelect = () => {
    setIsYearOpen((prevIsOpen) => !prevIsOpen);
  };

  const RightPanel = () => {
    const PieChart = () => {
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
      <div class="col-span-2 row-span-4 mt-12">
        {/* Top */}
        <div className="border border-gray-200 rounded-lg">
          <TotalSection />
        </div>
        {/* Buttom */}
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
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
                  YTD Revenue
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-4 lg:gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px]">
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
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
                  MTD Revenue
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px] ">
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
                <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
                  Number of Brand Booking
                </div>
                <div className="flex ml-2">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px] ">
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

  const LeftPanale = () => {
    return (
      <>
        <div className="grid grid-cols-8 space-x-1">
          <div className="col-span-4 lg:col-span-5">
            <MonthStore />
          </div>
          <div className="col-span-4 lg:col-span-3">
            <MonthYTD />
          </div>
        </div>
        <div className="grid grid-cols-8 space-x-1">
          <div className="col-span-4 lg:col-span-5">
            <BarChart />
          </div>
          <div className="col-span-4 lg:col-span-3">
            <CategoryYtd />
          </div>
        </div>
      </>
    );
  };

  const MonthStore = () => {
    return (
      <>
        <div className="font-poppins font-bold text-lg mb-3">
          by Month Store
        </div>
        <GridComponent dataSource={dashboardData} height={400} width={"auto"}>
          <ColumnsDirective>
            {dashboardGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </>
    );
  };

  const MonthYTD = () => {
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
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
          x: {
            display: true, // Hide X axis labels
            grid: {
              display: false, // Hide X-axis grid lines
            },
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
        },
      };

      return <Line data={data} options={options} />;
    };
    return (
      <>
        <div className="font-poppins font-bold text-lg mb-3">by Month YTD</div>
        <div className="bg-gray-100 h-[445px] border border-gray-200">
          <div className="h-[80%] mt-5 ">
            <LineChart />
          </div>
        </div>
      </>
    );
  };

  const BarChart = () => {
    const [isBannerByMonthChecked, setIsBannerByMonthChecked] = useState(true);
    const [isBookingByMonthChecked, setIsBookingByMonthChecked] =
      useState(true);
    const [isBookingByStoreChecked, setIsBookingByStoreChecked] =
      useState(true);
    const [isBookingByCtChecked, setIsBookingByCtChecked] = useState(true);

    const [banner_by_month, setBannerByMonth] = useState([
      35, 45, 32, 40, 25, 32, 42, 22, 40, 25, 23, 40,
    ]);
    const [booking_by_month, setBookingByMonth] = useState([
      45, 18, 55, 52, 35, 45, 18, 55, 52, 35, 55, 52,
    ]);
    const [booking_by_store, setBookingByStore] = useState([
      21, 21, 15, 25, 28, 22, 22, 15, 25, 28, 15, 25,
    ]);
    const [booking_by_ct, setBookingByCt] = useState([
      25, 15, 40, 30, 32, 25, 15, 40, 30, 32, 40, 30,
    ]);

    const toggleBannerByMonthCheckbox = () => {
      if (isBannerByMonthChecked) {
        setBannerByMonth([]);
      } else {
        setBannerByMonth([35, 45, 32, 40, 25, 32, 42, 22, 40, 25, 23, 40]);
      }

      setIsBannerByMonthChecked(!isBannerByMonthChecked);
    };

    const toggleBookingByMonthCheckbox = () => {
      if (isBookingByMonthChecked) {
        setBookingByMonth([]);
      } else {
        setBookingByMonth([45, 18, 55, 52, 35, 45, 18, 55, 52, 35, 55, 52]);
      }

      setIsBookingByMonthChecked(!isBookingByMonthChecked);
    };

    const toggleBookingByStoreCheckbox = () => {
      if (isBookingByStoreChecked) {
        setBookingByStore([]);
      } else {
        setBookingByStore([21, 21, 15, 25, 28, 22, 22, 15, 25, 28, 15, 25]);
      }
      setIsBookingByStoreChecked(!isBookingByStoreChecked);
    };

    const toggleBookingByCtCheckbox = () => {
      if (isBookingByStoreChecked) {
        setBookingByCt([]);
      } else {
        setBookingByCt([25, 15, 40, 30, 32, 25, 15, 40, 30, 32, 40, 30]);
      }
      setIsBookingByCtChecked(!isBookingByCtChecked);
    };
    const BarChart = () => {
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
            label: "Banner by  Month",
            backgroundColor: "#6425FE",
            borderColor: "#6425FE",
            borderWidth: 1,
            data: banner_by_month,
            barThickness: 10,
          },
          {
            label: "Booking by Month",
            backgroundColor: "#66BD10",
            borderColor: "#66BD10",
            borderWidth: 1,
            data: booking_by_month,
            barThickness: 10,
          },
          {
            label: "Booking by Store",
            backgroundColor: "#E02020",
            borderColor: "#E02020",
            borderWidth: 1,
            data: booking_by_store,
            barThickness: 10,
          },
          {
            label: "Booking by Content Type",
            backgroundColor: "#A9A9A9",
            borderColor: "#A9A9A9",
            borderWidth: 1,
            data: booking_by_ct,
            barThickness: 10,
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
            beginAtZero: true, // Start the Y-axis from zero
            display: true,
            min: 0, // Set the minimum value for the Y-axis
            max: 70, // Set the maximum value for the Y-axis
            ticks: {
              display: false,
            },
          },
          x: {
            display: true, // Hide X axis labels
            grid: {
              display: false, // Hide X-axis grid lines
            },
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
        },
      };

      return <Bar data={data} options={options} />;
    };
    return (
      <>
        <div className="grid grid-cols-4 gap-2 w-auto mb-3">
          <div className="grid grid-cols-6 gap-1">
            <div className="bg-[#6425FE] w-4 h-4" />
            <div className="col-span-5 grid grid-rows-2 gap-[-6px]">
              <div className="font-poppins text-sm text-[#8A8A8A]">
                Banner by Month
              </div>
              <div className="font-poppins text-xl font-bold">108</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            <div className="bg-[#66BD10] w-4 h-4" />
            <div className="col-span-5 grid grid-rows-2 gap-[1px]">
              <div className="font-poppins text-sm text-[#8A8A8A]">
                Booking by Month
              </div>
              <div className="font-poppins text-xl font-bold">21</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            <div className="bg-[#E02020] w-4 h-4" />
            <div className="col-span-5 grid grid-rows-2 gap-[1px]">
              <div className="font-poppins text-sm text-[#8A8A8A]">
                Booking by Store
              </div>
              <div className="font-poppins text-xl font-bold">574</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            <div className="bg-[#A9A9A9] w-4 h-4" />
            <div className="col-span-5 grid grid-rows-2 gap-[1px]">
              <div className="font-poppins text-sm text-[#8A8A8A]">
                Booking by CT
              </div>
              <div className="font-poppins text-xl font-bold">148</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 h-[445px]">
          <BarChart />
          <div className="grid grid-cols-4 gap-1 w-auto mt-3">
            <div className="grid grid-cols-6 gap-1 p-1 space-x-1">
              <div className="col-span-1">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={isBannerByMonthChecked}
                    onChange={toggleBannerByMonthCheckbox}
                  />
                  <span
                    className={`h-6 w-6 border border-[#6425FE] rounded-md cursor-pointer flex items-center justify-center ${
                      isBannerByMonthChecked ? "bg-white" : "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3 w-3 text-white ${
                        isBannerByMonthChecked ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 ease-in-out`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6425FE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="col-span-5 flex justify-center items-center">
                <div className="font-poppins text-xs font-bold">
                  Banner by Month
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1 p-1 space-x-1">
              <div className="col-span-1">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={isBookingByMonthChecked}
                    onChange={toggleBookingByMonthCheckbox}
                  />
                  <span
                    className={`h-6 w-6 border border-[#6425FE] rounded-md cursor-pointer flex items-center justify-center ${
                      isBookingByMonthChecked ? "bg-white" : "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3 w-3 text-white ${
                        isBookingByMonthChecked ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 ease-in-out`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6425FE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="col-span-5 flex justify-center items-center">
                <div className="font-poppins text-xs font-bold">
                  Booking by Month
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1 p-1 space-x-1">
              <div className="col-span-1">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={isBookingByStoreChecked}
                    onChange={toggleBookingByStoreCheckbox}
                  />
                  <span
                    className={`h-6 w-6 border border-[#6425FE] rounded-md cursor-pointer flex items-center justify-center ${
                      isBookingByStoreChecked ? "bg-white" : "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3 w-3 text-white ${
                        isBookingByStoreChecked ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 ease-in-out`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6425FE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="col-span-5 flex justify-center items-center">
                <div className="font-poppins text-xs font-bold">
                  Booking by Store
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1 p-1 space-x-1">
              <div className="col-span-1">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    checked={isBookingByCtChecked}
                    onChange={toggleBookingByCtCheckbox}
                  />
                  <span
                    className={`h-6 w-6 border border-[#6425FE] rounded-md cursor-pointer flex items-center justify-center ${
                      isBookingByCtChecked ? "bg-white" : "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3 w-3 text-white ${
                        isBookingByCtChecked ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 ease-in-out`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6425FE"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </label>
              </div>

              <div className="col-span-5 flex justify-center items-center">
                <div className="font-poppins text-xs font-bold">
                  Booking by CT
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CategoryYtd = () => {
    const BarHorizontal = () => {
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
            label: "Banner by  Month",
            backgroundColor: "#5125BC",
            borderColor: "#5125BC",
            borderWidth: 1,
            data: [98, 65, 38, 60, 48, 25, 38, 48, 35, 52, 65, 88],
            barThickness: 10,
          },
        ],
      };

      const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
            labels: {
              font: {
                family: "Poppins",
              },
            },
          },
          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
        },
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const data = dataset.data;
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar, index) => {
              const barValue = data[index];
              const x = bar.x;
              const y = bar.y;
              ctx.fillStyle = "black"; // Customize the text color
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              ctx.fillText(`Value: ${barValue}`, x, y - 10);
            });
          });
        },
        scales: {
          y: {
            beginAtZero: true, // Start the Y-axis from zero
            display: true,
            min: 0, // Set the minimum value for the Y-axis
            max: 100, // Set the maximum value for the Y-axis
            grid: {
              display: false, // Hide X-axis grid lines
            },
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
          x: {
            beginAtZero: true,
            display: true, // Hide X axis labels
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
        },
      };

      return <Bar data={data} options={options} />;
    };
    return (
      <>
        <div className="font-poppins font-bold text-lg mb-3">
          by Category YTD
        </div>
        <div className="bg-gray-100 h-[445px] border border-gray-200">
          <div className="h-[110%] mt-5 ">
            <BarHorizontal />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header title="Home" subtitle="Welcome to Dashboard" />

      <div className="grid grid-cols-8 mt-3">
        <div className="lg:col-span-1 col-span-2">
          <div className="font-poppins font-semibold text-3xl">Revenue</div>
        </div>
        <div className="relative lg:col-span-1 col-span-1 lg:ml-12 mr-1">
          <select
            name="year"
            id="year"
            onClick={toggleYearSelect}
            class="block appearance-none w-full bg-[#f2f2f2] font-bold text-lg font-poppins rounded p-1"
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
      <div className="grid grid-cols-8 mt-3">
        <div className="col-span-6 mt-2 space-y-2">
          <LeftPanale />
        </div>
        <div className="col-span-2">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
