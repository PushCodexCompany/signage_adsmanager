import React, { useEffect, useState, useRef } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

import { GridTable } from "../libs/dashboard_grid";
import "./css/dashboard.css";

import User from "../libs/admin";
import useCheckPermission from "../libs/useCheckPermission";
import Permission from "../libs/permission";
import Swal from "sweetalert2";
import "../../src/components/css/scrollbar_dashboard.css";

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
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isYearAnalyticOpen, setIsYearAnalyticOpen] = useState(false);
  const [isUniqueCustomerOpen, setIsUniqueCustomerOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isUp, setIsUp] = useState(true);
  const navigate = useNavigate();

  const [total_booking_mtd, setTotalBookingMtd] = useState([]);
  const [total_booking_ytd, setTotalBookingYtd] = useState([]);
  const [customer_by_mtd, setCustomerByMtd] = useState([]);
  const [booking_by_mtd, setBookingByMtd] = useState([]);
  const [total_screen_booking_by_store, setTotalScreenBookingByStore] =
    useState([]);

  const [number_booking_by_day, setNumberBookingByDay] = useState([]);
  const [percent_booking_by_month, setPercentBookingByMonth] = useState([]);
  const [percent_booking_by_store, setPercentBookingByStore] = useState([]);

  const [page_permission, setPagePermission] = useState();

  useEffect(() => {
    setPermission();
    getDBoardData();
  }, []);

  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);

    setPagePermission(permissions?.dBoard);
  };

  const getDBoardData = async () => {
    const { token } = User.getCookieData();
    try {
      const { dashboard } = await User.getDBoard(token);
      setTotalBookingMtd(dashboard?.totalbooking_mtd);
      setTotalBookingYtd(dashboard?.totalbooking_ytd);
      setCustomerByMtd(dashboard?.customerbymonth);
      setBookingByMtd(dashboard?.bookingbymonth);
      setTotalScreenBookingByStore(dashboard?.totalscreenbookingbystore);
      setNumberBookingByDay(dashboard?.numberofbookingsbyday);
      setPercentBookingByMonth(dashboard?.percentbookingbymonth);
      setPercentBookingByStore(dashboard?.percentbookingbystore);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const toggleYearSelect = () => {
    setIsYearOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleStoreSelect = () => {
    setIsStoreOpen((prevIsOpen) => !prevIsOpen);
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
        <GridTable
          total_screen_booking_by_store={total_screen_booking_by_store}
        />
      </>
    );
  };

  const UniqueCustomerBooking = () => {
    const LineChart = () => {
      // const dataValues = [20, 30, 33, 41, 48, 40, 49, 50, 58, 59, 70, 75];
      const dataValues = customer_by_mtd;
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
              //   return index % 2 === 0 ? "bottom" : "top"; // Alternating between 'bottom' and 'top'
              return index % 2 === 0 ? "top" : "top"; // Alternating between 'bottom' and 'top'
            },
            // },
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
      const dataValues = booking_by_mtd;
      // const dataValues = [
      //   20, 30, 33, 41, 48, 40, 49, 50, 58, 59, 70, 75, 2, 1, 2, 3, 43, 2, 3, 4,
      //   32, 2, 1, 2, 3, 2, 3, 2, 3,
      // ]; // Data points
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
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        datasets: [
          {
            label: "MTD",
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
              // return index % 2 === 0 ? "bottom" : "top"; // Alternating between 'bottom' and 'top'
              return index % 2 === 0 ? "top" : "top"; // Alternating between 'bottom' and 'top'
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
              callback: (value, index) => index + 1,
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
            <div className="col-span-8 p-2">
              <div className="font-poppins text-2xl font-bold">
                Number of booking by month YTD
              </div>
            </div>
            <div className="col-span-2 p-2 mt-2">
              <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                <select
                  name="month"
                  id="month"
                  onChange={toggleUniqueCustomerSelect}
                  className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-xl p-2 pr-8 "
                >
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
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
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      { label: "Number of booking by day", color: "#6359E9" },
      { label: "% Booking by month", color: "#64CFF6" },
      { label: "% Booking by Store", color: "#F6C864" },
    ];

    const DataBarChart = ({ dataType, dataSet }) => {
      if (dataType === "numberOfBookingByDay") {
        const data = {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          datasets: [
            {
              label: "Booking by month",
              borderWidth: 1,
              data: dataSet,
              backgroundColor: function (context) {
                const chart = context.chart;
                const ctx = chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

                // Define the custom gradient colors in order
                const colors = ["#64CFF6", "#6359E9", "#F6C864"];

                // Distribute the colors evenly across the gradient
                colors.forEach((color, index) => {
                  gradient.addColorStop(index / (colors.length - 1), color);
                });

                return gradient;
              },
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
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const dataIndex = tooltipItem.dataIndex; // Get the index of the hovered bar
                  const dataPoint = dataSet[dataIndex]; // Access the corresponding dataset item

                  return `Amount of Booking : ${dataPoint} Booking`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Start the Y-axis from zero
              display: true,
              min: 0, // Set the minimum value for the Y-axis
              max: 100, // Set the maximum value for the Y-axis
              ticks: {
                font: {
                  family: "Poppins", // Change the font for the y-axis label
                },
                stepSize: 10,
                callback: function (value) {
                  return value; // Append " units" to each tick value
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

        return (
          <div
            style={{
              width: "100%",
              overflowX: "auto", // Enable horizontal scrolling
            }}
            className="scrollable-chart-container"
          >
            <div
              style={{
                minWidth: `${data.labels.length * 100}px`, // Set the minimum width dynamically
                height: "400px", // Set desired height for the chart
              }}
            >
              <Bar data={data} options={options} />
            </div>
          </div>
        );
      } else if (dataType === "percentageByMonth") {
        const result = dataSet.map((item) => item.BookingPercentage.toString());
        const data = {
          labels: dataSet.map(
            (item) =>
              `${new Date(2024, item.Month - 1).toLocaleString("en-US", {
                month: "short",
              })}/${item.TotalCapacity}`
          ),
          datasets: [
            {
              label: "% Booking by month",
              borderWidth: 1,
              data: result,
              backgroundColor: function (context) {
                const chart = context.chart;
                const ctx = chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);

                // Define the custom gradient colors in order
                const colors = ["#64CFF6", "#6359E9", "#F6C864"];

                // Distribute the colors evenly across the gradient
                colors.forEach((color, index) => {
                  gradient.addColorStop(index / (colors.length - 1), color);
                });

                return gradient;
              },
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
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const dataIndex = tooltipItem.dataIndex; // Get the index of the hovered bar
                  const dataPoint = dataSet[dataIndex]; // Access the corresponding dataset item

                  // Extract BookingPercentage and TotalCapacity
                  const bookingPercentage = dataPoint.BookingPercentage;
                  const totalCapacity = dataPoint.TotalCapacity;
                  const TotalBooked = dataPoint.TotalBooked;
                  return `${bookingPercentage}% (${TotalBooked}/${totalCapacity}) `;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Start the Y-axis from zero
              display: true,
              min: 0, // Set the minimum value for the Y-axis
              max: 100, // Set the maximum value for the Y-axis
              ticks: {
                font: {
                  family: "Poppins", // Change the font for the y-axis label
                },
                stepSize: 10,
                callback: function (value) {
                  return value + "%"; // Append " units" to each tick value
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

        return (
          <div
            style={{
              width: "100%",
              overflowX: "auto", // Enable horizontal scrolling
            }}
            className="scrollable-chart-container"
          >
            <div
              style={{
                minWidth: `${data.labels.length * 100}px`, // Set the minimum width dynamically
                height: "400px", // Set desired height for the chart
              }}
            >
              <Bar data={data} options={options} />
            </div>
          </div>
        );
      } else if (dataType === "percentageByStore") {
        console.log(dataSet);
        const result = dataSet.map((item) => item.PercentageBooked.toString());
        const data = {
          labels: dataSet.map((item) => `${item.StoreName}`),
          datasets: [
            {
              label: "% Booking by Store",
              borderWidth: 1,
              data: result,
              backgroundColor: function (context) {
                const chart = context.chart;
                const ctx = chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
                // Define the custom gradient colors in order
                const colors = ["#64CFF6", "#6359E9", "#F6C864"];
                // Distribute the colors evenly across the gradient
                colors.forEach((color, index) => {
                  gradient.addColorStop(index / (colors.length - 1), color);
                });
                return gradient;
              },
              barThickness: 10,
              borderRadius: 10,
            },
          ],
        };
        const options = {
          indexAxis: "y", // Swap X and Y axes for horizontal bars
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              position: "top",
            },
            title: {
              display: false,
              text: "Chart.js Bar Chart",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const dataIndex = tooltipItem.dataIndex; // Get the index of the hovered bar
                  const dataPoint = dataSet[dataIndex]; // Access the corresponding dataset item
                  // Extract BookingPercentage and TotalCapacity
                  const bookingPercentage = dataPoint.PercentageBooked;
                  const totalCapacity = dataPoint.TotalCapacity;
                  const totalBooking = dataPoint.TotalBookings;
                  return `${bookingPercentage}% (${totalBooking}/${totalCapacity})`;
                },
              },
            },
          },
          scales: {
            x: {
              // Percentage axis
              beginAtZero: true,
              display: true,
              min: 0,
              max: 100,
              ticks: {
                font: {
                  family: "Poppins", // Change the font for the x-axis label
                },
                stepSize: 10,
                callback: function (value) {
                  return value + "%"; // Append "%" to each tick value
                },
              },
            },
            y: {
              // Store names
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: "Poppins", // Change the font for the y-axis label
                },
              },
            },
          },
          elements: {
            bar: {
              barPercentage: 0.8, // Adjust bar thickness as a percentage of available space
              categoryPercentage: 0.7, // Add space between bars
            },
          },
        };
        return (
          <div
            style={{
              width: "100%",
              overflowY: "auto", // Enable vertical scrolling for the chart
              maxHeight: "400px", // Limit the height for the scrollable chart
            }}
            className="scrollable-chart-container"
          >
            <div
              style={{
                minHeight: `${data.labels.length * 20}px`, // Dynamic height based on the number of labels
                height: "auto", // Adjust height to fit content
              }}
            >
              <Bar data={data} options={options} />
            </div>
          </div>
        );
      }
    };

    return (
      <>
        <div>
          {/* Header Section */}
          <div className="flex mt-2 w-full p-4 rounded-lg">
            <div className="grid grid-cols-12 gap-1 w-full">
              {/* Title */}
              <div className="col-span-2 p-2">
                <div className="font-poppins text-2xl font-bold">Analytics</div>
              </div>

              {/* Tabs */}
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`col-span-3 p-2 cursor-pointer ${
                    activeTab === index ? "bg-gray-200 rounded-lg" : ""
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-center space-x-2 mt-1">
                    {/* <div
                      className="rounded-full w-2 h-2 flex items-center justify-center"
                      style={{ backgroundColor: tab.color }}
                    ></div> */}
                    <div
                      className={`font-poppins font-bold text-xs flex items-center justify-center ${
                        activeTab === index ? "text-black" : "text-[#6359E9]"
                      }`}
                    >
                      {tab.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* Year Selector */}
              <div className="col-span-1 p-2">
                <div className="relative w-[70px] h-[20px] flex justify-center items-center">
                  <select
                    name="year"
                    id="year"
                    onChange={toggleYearSelect}
                    className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-xl p-2 pr-8"
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>

                  {/* Arrow container */}
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <IoIosArrowDown size={15} color={"#6425FE"} />
                  </div>
                </div>
              </div>

              {/* <div className="col-span-3 p-2">
                <div className="relative w-full h-[20px] flex justify-center items-center">
                  <select
                    name="store"
                    id="store"
                    onChange={toggleStoreSelect}
                    className="block w-full appearance-none border border-gray-300 text-xs font-poppins rounded-lg p-2 pr-8"
                  >
                    <option value="2023">B2S</option>
                    <option value="2022">Super Sport</option>
                  </select>

                 <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <IoIosArrowDown size={15} color={"#6425FE"} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Chart Section */}
          <div className="h-[445px]">
            {activeTab === 0 && (
              <DataBarChart
                dataType="numberOfBookingByDay"
                dataSet={number_booking_by_day}
              />
            )}
            {activeTab === 1 && (
              <DataBarChart
                dataType="percentageByMonth"
                dataSet={percent_booking_by_month}
              />
            )}
            {activeTab === 2 && (
              <DataBarChart
                dataType="percentageByStore"
                dataSet={percent_booking_by_store}
              />
            )}
          </div>
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
                <h2 className="text-xl font-bold mr-2 font-poppins">
                  {total_booking_mtd}
                </h2>
                {/* <div className="ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-red-100 text-[#EB001B]">
                  {`+1.29%`}
                </div> */}
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
                <h2 className="text-xl font-bold mr-2 font-poppins">
                  {total_booking_ytd}
                </h2>
                {/* <div className="ml-auto text-xs font-poppins px-2 py-1 rounded-md bg-green-100 text-[#02B15A]">
                  {`+1.29%`}
                </div> */}
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

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Dashboard"} />

        {page_permission?.view ? (
          <>
            {" "}
            <div className="flex space-x-2 mt-10">
              <div className="font-poppins font-semibold text-3xl lg:text-2x p-2">
                Dashboard
              </div>
              {/* <div className="relative  w-[120px] flex justify-center items-center">
                <select
                  name="brand"
                  id="brand"
                  onChange={toggleBrandSelect}
                  className="block w-full appearance-none border border-gray-300 text-md font-poppins rounded-xl p-2 pr-8 "
                >
                  <option value="CDS">CDS</option>
                </select>

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

                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  {isBrandOpen ? (
                    <IoIosArrowUp size={20} color={"#6425FE"} />
                  ) : (
                    <IoIosArrowDown size={20} color={"#6425FE"} />
                  )}
                </div>
              </div> */}
            </div>
            <div className="grid grid-cols-9 mt-3 space-x-2">
              <div className="col-span-5 mt-2 space-y-2">
                <LeftPanale />
              </div>
              <div className="col-span-4">
                <RightPanel />
              </div>
            </div>
          </>
        ) : (
          <div className="font-poppins text-3xl text-gray-300 mt-14 italic">
            Welcome to Ads Manager
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
