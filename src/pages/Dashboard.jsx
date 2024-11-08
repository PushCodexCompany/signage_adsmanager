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
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  const [isUniqueCustomerOpen, setIsUniqueCustomerOpen] = useState(false);
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

  const toggleUniqueCustomerSelect = () => {
    setIsUniqueCustomerOpen((prevIsOpen) => !prevIsOpen);
  };

  const MonthStore = () => {
    return (
      <>
        <div className="font-poppins font-bold text-lg mb-3 p-2">
          Number of booking Store
        </div>
        <GridTable />
      </>
    );
  };

  const UniqueCustomerBooking = () => {
    const LineChart = () => {
      const dataValues = [20, 30, 33, 41, 48, 40, 49, 50, 58, 59, 70, 75]; // Data points
      // Function to calculate percentage change
      const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return 0; // Avoid division by zero
        return ((current - previous) / previous) * 100;
      };

      // Calculate percentage changes for each data point (except the first)
      const percentageChanges = dataValues.map((value, index) => {
        if (index === 0) return null; // No percentage change for the first data point
        const previousValue = dataValues[index - 1];
        return calculatePercentageChange(value, previousValue).toFixed(2); // Round to 2 decimal places
      });

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
            data: dataValues,
            borderColor: function (context) {
              const chart = context.chart;
              const ctx = chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

              // Define the custom gradient colors in order
              const colors = [
                "#8A2BE2",
                "#FFA500",
                "#FFFF00",
                "#008000",
                "#00FFFF",
                "#0000FF",
              ]; // Purple, Orange, Yellow, Green, Cyan, Blue

              // Distribute the colors evenly across the gradient
              colors.forEach((color, index) => {
                gradient.addColorStop(index / (colors.length - 1), color);
              });

              return gradient;
            },
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
          tooltip: {
            enabled: true, // Disable tooltip if you want to show text manually
          },
          datalabels: {
            display: true,
            font: {
              family: "Poppins",
              size: 16, // Font size for data labels
            },
            color: "#000000",
            formatter: (value, context) => {
              const index = context.dataIndex;
              if (index === 0) {
                return value.toFixed(0); // No percentage change for the first data point
              }
              const percentageChange = percentageChanges[index]; // Get the percentage change for the current point
              const direction = percentageChange >= 0 ? "↑" : "↓"; // Determine the direction
              const color = percentageChange >= 0 ? "green" : "red";
              return `${value.toFixed(0)}`;
            },
            anchor: "center", // Ensure labels are centered horizontally
            align: (context) => {
              const index = context.dataIndex;
              return index % 2 === 0 ? "bottom" : "top"; // Alternating between 'bottom' and 'top'
            },
            offset: (context) => {
              const index = context.dataIndex;
              return index % 2 === 0 ? 10 : 10; // Offset position (down = +10px, up = -10px)
            },
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
              display: true, // Hide X-axis grid lines
            },
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
        },
        elements: {
          point: {
            // Customize the point (dot) style
            pointStyle: "circle", // Use a circle shape
            radius: 8, // Adjust the size of the dot
            backgroundColor: "white", // Set the inner color to white (hollow)
            borderColor: "#5125BC", // Border color
            borderWidth: 4, // Thickness of the border (makes it look like a donut)
          },
        },
      };

      return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
    };
    return (
      <>
        <div className="flex mt-2 w-full p-4  rounded-lg">
          <div className="grid grid-cols-12 gap-1 w-full">
            <div className="col-span-10 p-2">
              <div className="font-poppins text-2xl font-bold">
                No. of unique customer booking by month
              </div>
            </div>
            <div className="col-span-2 p-2 mt-2">
              <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                <select
                  name="year"
                  id="year"
                  onChange={toggleUniqueCustomerSelect}
                  className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-xl p-2 pr-8 "
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>

                {/* Arrow container */}
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  {isUniqueCustomerOpen ? (
                    <IoIosArrowUp size={15} color={"#6425FE"} />
                  ) : (
                    <IoIosArrowDown size={15} color={"#6425FE"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[445px] border border-gray-200">
          <div className="h-[80%] mt-5 ">
            <LineChart />
          </div>
        </div>
      </>
    );
  };

  const NumberOfBooking = () => {
    const LineChart = () => {
      const dataValues = [20, 30, 33, 41, 48, 40, 49, 50, 58, 59, 70, 75]; // Data points
      // Function to calculate percentage change
      const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return 0; // Avoid division by zero
        return ((current - previous) / previous) * 100;
      };

      // Calculate percentage changes for each data point (except the first)
      const percentageChanges = dataValues.map((value, index) => {
        if (index === 0) return null; // No percentage change for the first data point
        const previousValue = dataValues[index - 1];
        return calculatePercentageChange(value, previousValue).toFixed(2); // Round to 2 decimal places
      });

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
            data: dataValues,
            borderColor: function (context) {
              const chart = context.chart;
              const ctx = chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

              // Define the custom gradient colors in order
              const colors = [
                "#8A2BE2",
                "#FFA500",
                "#FFFF00",
                "#008000",
                "#00FFFF",
                "#0000FF",
              ]; // Purple, Orange, Yellow, Green, Cyan, Blue

              // Distribute the colors evenly across the gradient
              colors.forEach((color, index) => {
                gradient.addColorStop(index / (colors.length - 1), color);
              });

              return gradient;
            },
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
          tooltip: {
            enabled: true, // Disable tooltip if you want to show text manually
          },
          datalabels: {
            display: true,
            font: {
              family: "Poppins",
              size: 16, // Font size for data labels
            },
            color: "#000000",
            formatter: (value, context) => {
              const index = context.dataIndex;
              if (index === 0) {
                return value.toFixed(0); // No percentage change for the first data point
              }
              const percentageChange = percentageChanges[index]; // Get the percentage change for the current point
              const direction = percentageChange >= 0 ? "↑" : "↓"; // Determine the direction
              const color = percentageChange >= 0 ? "green" : "red";
              return `${value.toFixed(0)}`;
            },
            anchor: "center", // Ensure labels are centered horizontally
            align: (context) => {
              const index = context.dataIndex;
              return index % 2 === 0 ? "bottom" : "top"; // Alternating between 'bottom' and 'top'
            },
            offset: (context) => {
              const index = context.dataIndex;
              return index % 2 === 0 ? 10 : 10; // Offset position (down = +10px, up = -10px)
            },
          },
          // datalabels: {
          //   display: true,
          //   font: {
          //     family: "Poppins",
          //     weight: "bold",
          //     size: 14, // Font size for data labels
          //   },
          //   color: (context) => {
          //     const index = context.dataIndex;
          //     const percentageChange = percentageChanges[index]; // Get the percentage change for the current point
          //     return percentageChange >= 0 ? "green" : "red"; // Green for up, Red for down
          //   },
          //   formatter: (value, context) => {
          //     const index = context.dataIndex;
          //     if (index === 0) {
          //       return value.toFixed(0); // No percentage change for the first data point
          //     }
          //     const percentageChange = percentageChanges[index]; // Get the percentage change for the current point
          //     const direction = percentageChange >= 0 ? "↑" : "↓"; // Determine the direction
          //     return `${value.toFixed(0)} ${direction} ${Math.abs(
          //       percentageChange
          //     )}%`;
          //   },
          //   anchor: "center", // Ensure labels are centered horizontally
          //   align: (context) => {
          //     const index = context.dataIndex;
          //     return index % 2 === 0 ? "bottom" : "top"; // Alternating between 'bottom' and 'top'
          //   },
          //   offset: (context) => {
          //     const index = context.dataIndex;
          //     return index % 2 === 0 ? 14 : 14; // Offset position (down = +10px, up = -10px)
          //   },
          // },
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
              display: true, // Hide X-axis grid lines
            },
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
            },
          },
        },
        elements: {
          point: {
            // Customize the point (dot) style
            pointStyle: "circle", // Use a circle shape
            radius: 8, // Adjust the size of the dot
            backgroundColor: "white", // Set the inner color to white (hollow)
            borderColor: "#5125BC", // Border color
            borderWidth: 4, // Thickness of the border (makes it look like a donut)
          },
        },
      };

      return <Line data={data} options={options} plugins={[ChartDataLabels]} />;
    };
    return (
      <>
        <div className="flex mt-2 w-full p-4  rounded-lg">
          <div className="grid grid-cols-12 gap-1 w-full">
            <div className="col-span-10 p-2">
              <div className="font-poppins text-2xl font-bold">
                Number of booking by month YTD
              </div>
            </div>
            <div className="col-span-2 p-2 mt-2">
              <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                <select
                  name="year"
                  id="year"
                  onChange={toggleUniqueCustomerSelect}
                  className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-xl p-2 pr-8 "
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>

                {/* Arrow container */}
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  {isUniqueCustomerOpen ? (
                    <IoIosArrowUp size={15} color={"#6425FE"} />
                  ) : (
                    <IoIosArrowDown size={15} color={"#6425FE"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[445px] border border-gray-200 overflow-y-auto">
          <div className="h-[80%] mt-5 ">
            <LineChart />
          </div>
        </div>
      </>
    );
  };

  const BarChart = () => {
    const [number_of_booking, setBannerByMonth] = useState([
      28, 32, 22, 28, 32, 29, 29, 29, 32, 22, 25, 28,
    ]);
    const [booking_by_month, setBookingByMonth] = useState([
      36, 25, 30, 38, 42, 22, 22, 22, 41, 29, 35, 21,
    ]);
    const [booking_by_store, setBookingByStore] = useState([
      21, 28, 25, 32, 25, 35, 28, 25, 21, 23, 22, 22,
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
            data: number_of_booking,
            barThickness: 10,
            borderRadius: 10,
          },
          {
            label: "Number of booking by month",
            backgroundColor: "#6359E9",
            borderColor: "#6359E9",
            borderWidth: 1,
            data: booking_by_month,
            barThickness: 10,
            borderRadius: 10,
          },
          {
            label: "Booking by Store",
            backgroundColor: "#F6C864",
            borderColor: "#F6C864",
            borderWidth: 1,
            data: booking_by_store,
            barThickness: 10,
            borderRadius: 10,
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
            max: 50, // Set the maximum value for the Y-axis
            ticks: {
              font: {
                family: "Poppins", // Change the font for the y-axis label
              },
              stepSize: 10,
              callback: function (value) {
                return value + "k"; // Append " units" to each tick value
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

      return <Bar data={data} options={options} />;
    };
    return (
      <>
        <div className="flex mt-2 w-full p-4  rounded-lg">
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
            <div className="col-span-1 p-2">
              <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                <select
                  name="year"
                  id="year"
                  onChange={toggleYearSelect}
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

  const RightPanel = () => {
    return (
      <>
        <div className="gap-6 w-full border border-gray-300 rounded-lg mt-2 p-2">
          <UniqueCustomerBooking />
        </div>
        <div className="gap-6 w-full border border-gray-300 rounded-lg mt-2 p-2">
          <NumberOfBooking />
        </div>
      </>
    );
  };

  const LeftPanale = () => {
    return (
      <>
        <div className="flex flex-wrap justify-center items-center gap-4 p-4">
          {/* First Card */}
          <div className="flex items-center p-3 bg-white border rounded-lg shadow-md min-w-[250px] max-w-[250px]">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-3">
              <img
                src={central_img}
                alt="Central Department Store"
                className="w-[40px] h-[40px] object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-bold font-poppins">CDS</div>
              <div className="text-xs text-gray-500 font-poppins">
                Central Department Store
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="flex items-center p-3 bg-white border rounded-lg shadow-md min-w-[250px] max-w-[250px]">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
              <div className="flex items-center justify-center w-[35px] h-[35px] bg-[#6359E9] rounded-lg">
                <FaArrowDown size={18} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-poppins">
                MTD number of booking
              </div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold mr-2 font-poppins">123</h2>
                <div className="ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-red-100 text-[#EB001B]">
                  {`+1.29%`}
                </div>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="flex items-center p-3 bg-white border rounded-lg shadow-md min-w-[250px] max-w-[250px]">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
              <div className="flex items-center justify-center w-[35px] h-[35px] bg-[#64CFF6] rounded-lg">
                <FaArrowUp size={18} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-poppins">
                YTD number of booking
              </div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold mr-2 font-poppins">123</h2>
                <div className="ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-green-100 text-[#02B15A]">
                  {`+1.29%`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-6 w-full border border-gray-300 rounded-lg">
          <BarChart />
        </div>
        <div className="gap-6 w-full border border-gray-300 rounded-lg">
          <MonthStore />
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
              onChange={toggleBrandSelect}
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
              onChange={toggleYearSelectAnalytic}
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
        <div className="grid grid-cols-9 mt-3 space-x-2">
          <div className="col-span-5 mt-2 space-y-2">
            <LeftPanale />
          </div>
          <div className="col-span-4">
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
