import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../components";
import { MdOutlineCalendarToday, MdCalendarToday } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

import { GridTable } from "../libs/dashboard_grid";
import "./css/dashboard.css";

import User from "../libs/admin";
import useCheckPermission from "../libs/useCheckPermission";

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
  useCheckPermission();
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isYearAnalyticOpen, setIsYearAnalyticOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isUp, setIsUp] = useState(true);
  const navigate = useNavigate();

  const toggleYearSelect = () => {
    setIsYearOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleYearSelectAnalytic = () => {
    setIsYearAnalyticOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleBrandSelect = () => {
    setIsBrandOpen((prevIsOpen) => !prevIsOpen);
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
            <img className="w-2/5 rounded-md object-cover" src={central_img} />
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
            <div className="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              574
            </div>
            <div className="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              1245
            </div>
            <div className="flex justify-center items-center w-1/3  font-poppins text-xs lg:text-lg">
              148
            </div>
          </div>
          <div className="flex mb-5">
            <div className="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Screen
            </div>
            <div className="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Content
            </div>
            <div className="flex justify-center items-center w-1/3  font-poppins text-[7px] lg:text-xs text-gray-400">
              Total Booking
            </div>
          </div>
        </>
      );
    };

    return (
      // <div className="col-span-2 row-span-4 mt-12">
      //   {/* Top */}
      //   <div className="border border-gray-200 rounded-lg">
      //     <TotalSection />
      //   </div>
      //   {/* Buttom */}
      //   <div className="border border-gray-200 rounded-lg mt-8">
      //     <div className="flex items-center justify-center font-semibold font-poppins lg:text-xl mt-2">
      //       Total Earning 2023
      //     </div>
      //     <div className="flex item-center justify-center mt-10">
      //       <PieChart />
      //     </div>
      //     <div className="space-y-2 mt-3 p-1 mb-5">
      //       <div className="flex border border-gray-200 rounded-lg ">
      //         <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#5125BC] rounded-lg" />
      //         <div className="space-y-[-3px]">
      //           <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
      //             YTD Revenue
      //           </div>
      //           <div className="flex ml-2">
      //             <div className="grid grid-cols-5 gap-4 lg:gap-6">
      //               <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px]">
      //                 74
      //               </div>
      //               <div className="flex justify-end items-center min-w-0">
      //                 <ImArrowUp color="#008A1E" size={15} />
      //                 <div className="text-[#008A1E] text-xl font-poppins">
      //                   10%
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="flex border border-gray-200 rounded-lg">
      //         <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#A47FFE] rounded-lg" />
      //         <div className="space-y-[-3px]">
      //           <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
      //             MTD Revenue
      //           </div>
      //           <div className="flex ml-2">
      //             <div className="grid grid-cols-5 gap-6">
      //               <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px] ">
      //                 148
      //               </div>
      //               <div className="flex justify-end items-center min-w-0">
      //                 <ImArrowUp color="#008A1E" size={15} />
      //                 <div className="text-[#008A1E] text-xl font-poppins">
      //                   10%
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="flex border border-gray-200 rounded-lg">
      //         <div className="w-[21px] h-[55px] ml-2 mt-1 bg-[#706195] rounded-lg" />
      //         <div className="space-y-[-3px]">
      //           <div className="flex justify-start items-center ml-2 text-gray-600 font-poppins text-[18px]">
      //             Number of BU Booking
      //           </div>
      //           <div className="flex ml-2">
      //             <div className="grid grid-cols-5 gap-6">
      //               <div className="flex col-span-4 justify-start items-center font-poppins font-bold text-[26px] ">
      //                 14
      //               </div>
      //               <div className="flex justify-end items-center min-w-0">
      //                 <ImArrowUp color="#008A1E" size={15} />
      //                 <div className="text-[#008A1E] text-xl font-poppins">
      //                   10%
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <></>
    );
  };

  const LeftPanale = () => {
    return (
      <>
        <div className="flex gap-2">
          <div className="flex items-center p-4 bg-white border rounded-lg shadow-md min-w-[320px] max-w-[300px]">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mr-4">
              <img
                src={central_img}
                className="flex items-center justify-center w-[315px] h-[315px] object-contain"
              />
            </div>
            <div>
              <div className="text-3xl font-bold font-poppins">CDS</div>
              <div className="flex items-center">
                <h2 className="text-xs text-gray-500 mr-2 font-poppins">
                  Central Department Store
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white border rounded-lg shadow-md min-w-[320px] max-w-[300px]">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
              <div className="flex items-center w-[45px] h-[45px] bg-[#6359E9] rounded-lg  justify-center ">
                <FaArrowDown size={25} className=" text-white " />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500  font-poppins">
                MTD number of booking
              </div>
              <div className="flex items-center">
                <h2 className="text-3xl font-bold mr-2 font-poppins">123</h2>
                <div
                  className={`ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-red-100 text-[#EB001B]`}
                >
                  {`+${1.29}%`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white border rounded-lg shadow-md min-w-[320px] max-w-[300px]">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
              <div className="flex items-center w-[45px] h-[45px] bg-[#64CFF6] rounded-lg  justify-center ">
                <FaArrowUp size={25} className=" text-white " />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500  font-poppins">
                YTD number of booking
              </div>
              <div className="flex items-center">
                <h2 className="text-3xl font-bold mr-2 font-poppins">123</h2>
                <div
                  className={`ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-green-100 text-[#02B15A]`}
                >
                  {`+${1.29}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-6 w-full">
          <BarChart />
        </div>
        {/* <div className="grid grid-cols-8 space-x-1">
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
        </div> */}
      </>
    );
  };

  const MonthStore = () => {
    return (
      <>
        <div className="font-poppins font-bold text-lg mb-3">
          by Month Store
        </div>
        <GridTable />
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
        <div className="h-[445px] border border-gray-200">
          <div className="h-[80%] mt-5 ">
            <LineChart />
          </div>
        </div>
      </>
    );
  };

  const BarChart = () => {
    const [banner_by_month, setBannerByMonth] = useState([
      28, 45, 32, 40, 25, 32, 42, 22, 40, 25, 23, 40,
    ]);
    const [booking_by_month, setBookingByMonth] = useState([
      45, 18, 55, 52, 35, 45, 18, 55, 52, 35, 55, 52,
    ]);
    const [booking_by_store, setBookingByStore] = useState([
      21, 21, 15, 25, 28, 22, 22, 15, 25, 28, 15, 25,
    ]);

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
            label: "Booking by month",
            backgroundColor: "#64CFF6",
            borderColor: "#64CFF6",
            borderWidth: 1,
            data: booking_by_month,
            barThickness: 10,
          },
          {
            label: "Number of booking by month",
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
        <div className="flex mt-2 w-full p-4 border border-gray-300 rounded-lg">
          <div className="grid grid-cols-12 gap-1 w-full">
            <div className="col-span-2 p-2">
              <div className="font-poppins text-2xl font-bold">Analytics</div>
            </div>
            <div className="col-span-3  p-2">
              <div className="flex items-center space-x-2 mt-1">
                <div className="rounded-full bg-[#6359E9] w-2 h-2 flex items-center justify-center"></div>
                <div className="font-poppins font-bold text-xs flex items-center justify-center">
                  Number of booking by month
                </div>
              </div>
            </div>
            <div className="col-span-3  p-2">
              <div className="flex items-center space-x-2 mt-1">
                <div className="rounded-full bg-[#64CFF6] w-2 h-2 flex items-center justify-center"></div>
                <div className="font-poppins font-bold text-xs flex items-center justify-center">
                  % Booking by month
                </div>
              </div>
            </div>
            <div className="col-span-3  p-2">
              <div className="flex items-center space-x-2 mt-1">
                <div className="rounded-full bg-[#F6C864] w-2 h-2 flex items-center justify-center"></div>
                <div className="font-poppins font-bold text-xs flex items-center justify-center">
                  % Booking by Store
                </div>
              </div>
            </div>
            <div className="col-span-1  p-2">
              <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                <select
                  name="year"
                  id="year"
                  onClick={toggleYearSelect}
                  className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-xl p-2 pr-8 "
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>

                {/* Arrow container */}
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  {isBrandOpen ? (
                    <IoIosArrowUp size={15} color={"#6425FE"} />
                  ) : (
                    <IoIosArrowDown size={15} color={"#6425FE"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[445px]">
          <BarChart />
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
        <div className="h-[445px] border border-gray-200">
          <div className="h-[110%] mt-5 ">
            <BarHorizontal />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Dashboard"} />

        <div className="flex space-x-2 mt-10">
          <div className="font-poppins font-semibold text-3xl lg:text-2x p-2">
            Dashboard
          </div>
          <div className="relative  w-[120px] flex justify-center items-center">
            <select
              name="brand"
              id="brand"
              onClick={toggleBrandSelect}
              className="block w-full appearance-none border border-gray-300 text-md font-poppins rounded-xl p-2 pr-8 "
            >
              <option value="CDS">CDS</option>
            </select>

            {/* Arrow container */}
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              {isBrandOpen ? (
                <IoIosArrowUp size={20} color={"#6425FE"} />
              ) : (
                <IoIosArrowDown size={20} color={"#6425FE"} />
              )}
            </div>
          </div>
          <div className="relative  w-[120px] flex justify-center items-center">
            <select
              name="year"
              id="year"
              onClick={toggleYearSelectAnalytic}
              className="block w-full appearance-none border border-gray-300 text-md font-poppins rounded-xl p-2 pr-8 "
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>

            {/* Arrow container */}
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              {isBrandOpen ? (
                <IoIosArrowUp size={20} color={"#6425FE"} />
              ) : (
                <IoIosArrowDown size={20} color={"#6425FE"} />
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 mt-3">
          <div className="col-span-5 mt-2 space-y-2">
            <LeftPanale />
          </div>
          <div className="col-span-3">{/* <RightPanel /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
