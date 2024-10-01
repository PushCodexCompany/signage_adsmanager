import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import empty_img from "../assets/img/empty_img.png";
import { FaPlus } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import User from "../libs/admin";
import { useNavigate } from "react-router-dom";
import Empty_Img from "../assets/img/empty_img.png";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import plus_brand from "../assets/img/plus_brand.png";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Filter from "../components/Filter";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  parse,
  startOfToday,
  differenceInMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isBefore,
  isToday,
  parseISO,
} from "date-fns";
import New_Booking_Steps_Modal from "./New_Booking_Steps_Modal";

const New_Booking = ({ setShowModalAddNewBooking }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("1");
  const [merchandise, setMerchandise] = useState([]);
  const [showCreateMerchandise, setShowCreateMerchandise] = useState(false);

  const [select_merchandise, setSelectMerchandise] = useState([]);
  const [selected_dates, setSelectedDates] = useState([]);
  const [booking_name, setBookingName] = useState();
  const [booking_slot, setBookingSlot] = useState();

  //Craete Merchandise
  const [preview_img, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);
  const [merchandise_name, setMerchandiseName] = useState();
  const [merchandise_slot, setMerchandiseSlot] = useState();
  const [merchandise_type, setMerchandiseType] = useState();
  const [merchandise_img, setMerchandiseImage] = useState();
  const [contact_person_name, setContactPersonName] = useState();
  const [contact_person_dep, setContactPersonDep] = useState();
  const [contact_person_pos, setContactPersonPos] = useState();
  const [contact_person_email, setContactPersonEmail] = useState();
  const [contact_person_phone, setContactPersonPhone] = useState();

  const [company_des, setCompanyDes] = useState();
  const [company_name, setCompanyName] = useState();
  const [company_tax_id, setCompanyTaxId] = useState();
  const [company_tax_address, setCompanyTaxAddress] = useState();
  const [company_phone, setCompanyPhone] = useState();

  const [startDate, setStartDate] = useState(null);
  const [startDateDump, setStartDateDump] = useState(null);
  const [startDateCheck, setStartDateCheck] = useState();
  const [endDate, setEndDate] = useState(null);
  const [endDateDump, setEndDateDump] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const currentDate = new Date();
  const [filter_screen, setFilterScreen] = useState([]);
  const [config, setConfig] = useState();

  // calendar
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const [width, setWidth] = useState(window.innerWidth);

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(async () => {
    const { token } = User.getCookieData();
    const {
      configuration: { brandconfig },
    } = await User.getConfiguration(token);

    const initialValues = brandconfig.reduce((acc, item) => {
      acc[item.ParameterKey] = item.ParameterValue;
      return acc;
    }, {});
    setConfig(initialValues.CONTENTPERSLOT_SEC);
  });

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  const handleDateClick = (clickedDate) => {
    // Check if the clicked date is before today
    if (isBefore(clickedDate, today)) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกวันปัจจุบันเป็นต้นไป",
      });
      return;
    }

    const isDateSelected = selected_dates.some((date) =>
      isSameDay(date, clickedDate)
    );

    // If the date is selected, remove it from the array; otherwise, add it
    setSelectedDates((prevSelectedDates) => {
      const updatedDates = isDateSelected
        ? prevSelectedDates.filter((date) => !isSameDay(date, clickedDate))
        : [...prevSelectedDates, clickedDate];
      const sortIndex = updatedDates.sort((a, b) => a - b);
      setStartDate(sortIndex[0]);
      setEndDate(sortIndex[sortIndex.length - 1]);

      // Sort the dates before updating the state
      return sortIndex;
    });
  };

  const handleStartDate = (date) => {
    if (!endDate) {
      // If there's no end date set, just set the start date and other related states
      setStartDate(date);
      setStartDateCheck(date);
      setDateRange([date]);
      setSelectedDates([date]);
    } else {
      if (date <= endDate) {
        // If the selected date is less than the end date, update the start date and recalculate the date range
        setStartDate(date);
        const range = generateDateRange(date, endDate);
        setDateRange(range);
        setSelectedDates(range);
      } else {
        // Show error if the start date is greater than or equal to the end date
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "วันเริ่มต้นไม่สามารถมากกว่าวันสิ้นสุดได้...",
        });
      }
    }
  };
  const handleEndDate = (date) => {
    if (!startDate) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกวันเริ่มต้นต้องการจอง...",
      });
    } else {
      setEndDate(date);
      const range = generateDateRange(startDate, date);
      setDateRange(range);
      setSelectedDates(range);
    }
  };

  const handleCalendarStartClose = () => {
    if (startDateDump) {
      if (
        format(startDateDump, "dd-MMM-yyyy") ===
        format(startDate, "dd-MMM-yyyy")
      ) {
        const range = generateDateRange(startDate, endDate);
        setDateRange(range);
        setSelectedDates(range);
        setStartDateDump(startDate);
      } else {
        setStartDateDump(startDate);
      }
    } else {
      setStartDateDump(startDate);
    }
  };

  const handleCalendarEndClose = () => {
    if (endDateDump) {
      if (
        format(endDateDump, "dd-MMM-yyyy") === format(endDate, "dd-MMM-yyyy")
      ) {
        const range = generateDateRange(startDate, endDate);
        setDateRange(range);
        setSelectedDates(range);
        setEndDateDump(endDate);
      } else {
        setEndDateDump(endDate);
      }
    } else {
      setEndDateDump(endDate);
    }
  };

  const generateDateRange = (start, end) => {
    const range = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  useEffect(() => {
    firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  }, [currMonth]);

  const monthsToDisplay = [-1, 0, 1];

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  useEffect(() => {
    getMechendise();
  }, []);

  const getMechendise = async () => {
    const { token } = User.getCookieData();
    try {
      const data = await User.getMerchandiseList(token);
      setMerchandise(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden input element
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setMerchandiseImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDates = (dates) => {
    const formatted = [];
    let rangeStart = null;

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

      if (!rangeStart) {
        rangeStart = currentDate;
      }

      if (!nextDate || (nextDate - currentDate) / (1000 * 60 * 60 * 24) > 1) {
        const rangeEnd = currentDate;
        const startStr = format(rangeStart, "dd MMM yyyy");
        const endStr = format(rangeEnd, "dd MMM yyyy");

        formatted.push(
          startStr + (rangeStart !== rangeEnd ? " - " + endStr : "")
        );
        rangeStart = null;
      }
    }

    return formatted.join(" , ");
  };

  const formatDatesNL = (dates) => {
    const formatted = [];
    let rangeStart = null;

    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

      if (!rangeStart) {
        rangeStart = currentDate;
      }

      if (!nextDate || (nextDate - currentDate) / (1000 * 60 * 60 * 24) > 1) {
        const rangeEnd = currentDate;
        const startStr = format(rangeStart, "dd MMM yyyy");
        const endStr = format(rangeEnd, "dd MMM yyyy");

        formatted.push(
          startStr + (rangeStart !== rangeEnd ? " - " + endStr : "")
        );
        rangeStart = null;
      }
    }

    return formatted.join("\n"); // Join with newline character
  };

  const handleSaveMerchandise = async () => {
    const { brand_code } = User.getBrandCode();

    if (!merchandise_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Customer",
      });
      return;
    }

    if (!contact_person_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Contact Person",
      });
      return;
    }

    if (!contact_person_email) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกอีเมลล์ Contact Person",
      });
      return;
    }

    if (!contact_person_phone) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกเบอร์โทรศัพท์ Contact Person",
      });
      return;
    }

    const obj = {
      advertisername: merchandise_name,
      contactname: contact_person_name,
      department: contact_person_dep,
      position: contact_person_pos,
      email: contact_person_email,
      contactnumber: contact_person_phone,
      brandcode: brand_code,
      companyname: company_name,
      taxid: company_tax_id,
      taxaddress: company_tax_address,
      companyphone: company_phone,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "create_merchandise",
      false
    );

    try {
      const data = await User.createMerchandise(encrypted, token);
      if (data.code === 200) {
        if (merchandise_img) {
          const form = new FormData();
          form.append("target", "advertiserlogo");
          form.append("advertiserid", data.advertiserid);
          form.append("logo", merchandise_img);
          const data_img = await User.saveImgMerchandise(form, token);
          if (data_img.code === 200) {
            Swal.fire({
              icon: "success",
              title: "สร้าง Customer สำเร็จ!",
              text: `สร้าง Customer สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                getMechendise();
                setShowCreateMerchandise(!showCreateMerchandise);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data_img.message,
            });
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "สร้าง Customer สำเร็จ!",
            text: `สร้าง Customer สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getMechendise();
              setShowCreateMerchandise(!showCreateMerchandise);
            }
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNextStep = (currentStep) => {
    const nextStepIndex = currentStep + 1;
    const step = `${nextStepIndex}`;

    switch (step) {
      case "2":
        if (select_merchandise.AdvertiserID) {
          setStep("2");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณาเลือก Customer!",
          });
        }
        break;
      case "3":
        if (selected_dates.length > 0) {
          setStep("3");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณาเลือกจำนวนวัน!",
          });
        }
        break;
      case "4":
        if (booking_name && booking_slot) {
          setStep("4");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "กรุณากรอกข้อมูลให้ครบ!",
          });
        }
        break;
      default:
      // code block
    }
  };

  const handleBackStep = (currentStep) => {
    const prevStepIndex = currentStep - 1;
    const step = `${prevStepIndex}`;
    setStep(step);
  };

  const capitalizeFirstLetter = (query) => {
    return query.charAt(0).toUpperCase() + query.substring(1);
  };

  const handleSaveBooking = async () => {
    const { token } = User.getCookieData();
    const booking_date = selected_dates.map((timestamp) =>
      format(timestamp, "yyyy-MM-dd")
    );

    const obj_save_booking = {
      bookingname: booking_name.trim(),
      advertiserid: select_merchandise.AdvertiserID,
      slotperday: booking_slot,
      bookingperoids: booking_date,
    };

    try {
      const data_booking = await User.createBooking(obj_save_booking, token);
      if (data_booking.code === 200) {
        Swal.fire({
          icon: "success",
          title: "สร้าง Booking สำเร็จ!",
          text: `สร้าง Booking สำเร็จ!`,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            const obj = {
              BookingID: data_booking.bookingid,
              AdvertiserLogo: select_merchandise.AdvertiserLogo,
              AdvertiserName: select_merchandise.AdvertiserName,
              BookingName: booking_name,
              SlotPerDay: booking_slot,
              booking_date,
            };

            const replacedString = obj.BookingName.replace(/\//g, "_");
            navigate(`/booking/${replacedString}`, {
              state: { data: obj, isEdited: false },
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: data_booking.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const STEP_OPTIONS = [
    {
      stepIndex: 1,
      label: "Select Customer",
    },
    {
      stepIndex: 2,
      label: "Booking Period",
    },
    {
      stepIndex: 3,
      label: "Enter Booking Name",
    },
    {
      stepIndex: 4,
      label: "Booking is Created",
    },
  ];

  const renderStepContent = (stepID) => {
    switch (`${stepID}`) {
      case "1":
        return (
          <>
            <div className="m-1 md:m-5 mt-24 p-2 md:p-5 rounded-3xl">
              <div className="text-[50px] font-[700] text-center font-poppins">
                Booking For
              </div>

              <div className="w-full">
                <Filter
                  setFilterScreen={setFilterScreen}
                  filter_screen={filter_screen}
                  width={"800"}
                />
              </div>

              <div className="grid grid-cols-5 gap-4 mt-3">
                <div className="col-span-4 flex items-center">
                  <div className="font-poppins font-semibold text-2xl">
                    Customers
                  </div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => setShowCreateMerchandise(true)}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
                  >
                    New Customer +
                  </button>
                </div>
              </div>

              {/* Responsive Table Wrapper */}
              <div className="w-full lg:h-[330px] h-[480px] overflow-x-auto mt-2">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                        Contact Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchandise.map((row, index) => (
                      <tr
                        className={`cursor-pointer ${
                          select_merchandise?.AdvertiserID === row?.AdvertiserID
                            ? "border-[3px] border-[#6425FE]"
                            : "border-gray-200"
                        }`}
                        style={{
                          borderTop:
                            select_merchandise?.AdvertiserID ===
                            row?.AdvertiserID
                              ? "3px solid #6425FE"
                              : "1px solid gray",
                          borderBottom:
                            select_merchandise?.AdvertiserID ===
                            row?.AdvertiserID
                              ? "3px solid #6425FE"
                              : "1px solid gray",
                        }}
                        onClick={() => setSelectMerchandise(row)}
                        key={row.AdvertiserID}
                      >
                        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="font-poppins text-md flex justify-center">
                            {row.AdvertiserID}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 ">
                          <div className="font-poppins text-xl  text-[#6425FE]">
                            {row.AdvertiserName}
                          </div>
                          <div className="font-poppins text-sm text-gray-500">
                            {row.AccountCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="flex items-center justify-center">
                            <img
                              className="w-[60px] h-[60px] rounded-md object-contain border border-gray-300"
                              src={
                                row.AdvertiserLogo
                                  ? row.AdvertiserLogo
                                  : `https://ui-avatars.com/api/?name=${
                                      row.AdvertiserName
                                    }&background=${"000000"}&color=fff`
                              }
                              alt={row.AdvertiserName}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                          <div className="font-poppins text-xl flex justify-center items-center">
                            {row.ContactName ? row.ContactName : "Not Set"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
        break;
      case "2":
        return (
          <>
            <div className="flex items-center justify-center mt-5">
              <div className="text-[50px] font-poppins font-bold text-[#2F3847]">
                Booking Period
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    onCalendarClose={handleCalendarStartClose}
                    dateFormat="dd/MM/yyyy"
                    minDate={currentDate}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className="font-poppins text-[#6425FE] placeholder:text-[#6425FE] text-bold text-xl  pl-2 w-auto h-8 text-right"
                  />
                </div>
                <div className="basis-1/4 ml-2 font-poppins text-2xl text-bold flex justify-center items-center text-[#6425FE] ">
                  -
                </div>
                <div className="basis-1/2">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => handleEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    onCalendarClose={handleCalendarEndClose}
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate || currentDate}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className="font-poppins text-[#6425FE] placeholder:text-[#6425FE] text-bold text-xl  pl-2 w-auto h-8 text-left"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 w-[70%] mx-auto ">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-evenly gap-6 sm:gap-12">
                  <FaAngleLeft
                    className="w-6 h-6 cursor-pointer"
                    onClick={getPrevMonth}
                  />
                  {monthsToDisplay.map((index) => {
                    const monthToShow = add(firstDayOfMonth, { months: index });
                    const isCurrentMonth =
                      differenceInMonths(monthToShow, firstDayOfMonth) === 0;
                    const textStyle = isCurrentMonth
                      ? "text-[#000000]"
                      : "text-[#AAAAAA]";

                    return (
                      <p
                        key={index}
                        className={`font-poppins lg:text-2xl md:text-xl ${textStyle}`}
                      >
                        {format(monthToShow, "MMM yy")}
                      </p>
                    );
                  })}
                  <FaAngleRight
                    className="w-6 h-6 cursor-pointer"
                    onClick={getNextMonth}
                  />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-4 md:gap-3 place-items-center mt-4">
                {days.map((day, idx) => (
                  <div key={idx} className="font-poppins lg:text-sm md:text-xs">
                    {capitalizeFirstLetter(day)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-4 sm:gap-3 mt-6 place-items-center">
                {daysInMonth.map((day, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    className={colStartClasses[getDay(day)]}
                  >
                    <p
                      className={`cursor-pointer border-1 border-gray-300 hover:border-[#6425FE] flex items-center rounded-md justify-center font-poppins md:h-5 md:w-16 lg:h-8 lg:w-28 hover:text-[#6425FE] ${
                        isSameMonth(day, today)
                          ? "text-gray-900"
                          : "text-gray-400"
                      }  ${
                        selected_dates.length > 0
                          ? ""
                          : isToday(day) && "bg-red-500 text-white"
                      } ${
                        selected_dates.some((date) => isSameDay(date, day))
                          ? "bg-[#6425FE] border-3 border-[#6425FE] text-white"
                          : ""
                      } shadow-lg`}
                    >
                      <div className="font-poppins lg:text-lg md:text-xs">
                        {format(day, "d")}
                      </div>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center items-center">
                {selected_dates.length > 0 ? (
                  <div className="font-poppins text-[#7C7B7B]">
                    {`Your Booking Period: ${formatDates(selected_dates)}`}
                  </div>
                ) : (
                  //    <div className="font-poppins text-[#7C7B7B]">
                  //    {`Your Booking Period :  ${format(
                  //      selected_dates[0],
                  //      "EEE dd MMM yyyy"
                  //    )} - ${format(
                  //      selected_dates[selected_dates.length - 1],
                  //      "EEE dd MMM yyyy"
                  //    )}`}
                  //  </div>
                  <></>
                )}
              </div>
            </div>
          </>
        );
        break;
      case "3":
        return (
          <>
            <div className="flex items-center justify-center mt-5">
              <div className="text-[50px] font-poppins font-bold text-[#2F3847]">
                Enter Booking Detail
              </div>
            </div>
            <div className="mt-6 h-[480px] overflow-y-auto">
              <div className="flex flex-row lg:flex-row">
                <div className="w-full lg:w-1/3 p-4">
                  <div>
                    <img
                      className={`block mx-auto mt-30px w-[250px] h-[250px]  object-cover border border-gray-300 rounded-lg shadow-xl`}
                      src={select_merchandise.AdvertiserLogo}
                      alt={select_merchandise.AdvertiserName}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-xl font-bold text-[#2F3847]">
                        {select_merchandise.AdvertiserName}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-sm text-[#6F6F6F]">
                        {select_merchandise.AccountCode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-3/5 p-4 lg:pl-8 border border-gray-300 rounded-lg shadow-xl mt-2">
                  <div>
                    <div className="font-poppins font-bold">Booking Name :</div>
                  </div>
                  <div className="mt-3">
                    <input
                      onChange={(e) => setBookingName(e.target.value)}
                      value={booking_name}
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300 shadow-lg"
                      placeholder="Enter Booking Name"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="font-poppins font-bold">Number of Slot</div>
                  </div>
                  <div className="mt-3">
                    <input
                      onChange={(e) => setBookingSlot(e.target.value)}
                      value={booking_slot}
                      type="number"
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300 shadow-lg"
                      placeholder="Enter Number of Slot"
                    />
                  </div>
                  <div className="mt-1">
                    <div className="font-poppins text-xs">
                      {`** 1 Slot มีความยาว ${config} วินาที หากคลิปที่จะลงมีความยาว ${
                        config * 2
                      }
                      วินาที จะต้องจอง 2 Slot **`}
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="font-poppins font-bold">
                      Booking Period :
                    </div>
                  </div>
                  <div className="mt-3 flex justify-start items-center">
                    {selected_dates.length > 0 ? (
                      <div className="font-poppins text-[#7C7B7B]">
                        <div>Your Booking Period:</div>
                        {formatDatesNL(selected_dates)
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      case "4":
        return (
          <>
            <div className="flex items-center justify-center mt-5">
              <div className="text-[56px] font-poppins font-bold text-[#2F3847]">
                Booking is Created
              </div>
            </div>
            <div className="mt-6 h-[400px] overflow-y-auto">
              <div className="flex flex-row lg:flex-row  justify-center items-center">
                <div className="w-full lg:w-1/3 p-4">
                  <div>
                    <img
                      className={`block mx-auto mt-30px w-[250px] h-[250px]  object-cover border border-gray-300 rounded-lg shadow-xl`}
                      src={select_merchandise.AdvertiserLogo}
                      alt={select_merchandise.AdvertiserName}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-xl font-bold text-[#2F3847]">
                        {select_merchandise.AdvertiserName}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="font-poppins text-sm text-[#6F6F6F]">
                        {select_merchandise.AccountCode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 p-4 border border-gray-300">
                  <div>
                    <div className="font-poppins font-bold text-4xl underline">
                      Booking Name
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="font-poppins font-bold text-2xl">
                      {booking_name}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="font-poppins font-bold text-2xl">
                      {booking_slot} Slot
                    </div>
                  </div>
                  <div className="mt-5 flex">
                    {selected_dates.length > 0 ? (
                      <div className="font-poppins font-bold text-2xl">
                        {formatDatesNL(selected_dates)
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* <div className="font-poppins font-bold text-2xl">
                      {`${format(
                        selected_dates[0],
                        "EEE dd MMM yyyy"
                      )} - ${format(
                        selected_dates[selected_dates.length - 1],
                        "EEE dd MMM yyyy"
                      )}`}
                    </div> */}
                  </div>
                  <div className="mt-5">
                    <div className="font-poppins font-bold text-4xl">
                      is Created
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex justify-center items-center space-x-6">
              <div
                onClick={() => handleSaveBooking()}
                className="border-2 border-[#6425FE] bg-[#6425FE] hover:bg-[#3b1694] rounded-lg w-48 h-10 flex items-center justify-center cursor-pointer"
              >
                <button className="text-white font-poppins">OK</button>
              </div>
            </div>
          </>
        );
        break;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className={`absolute -top-4 -right-4 m-4 z-30`}>
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowModalAddNewBooking(false)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Content  */}
          <New_Booking_Steps_Modal
            options={STEP_OPTIONS}
            currentStep={parseInt(step)}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            setStep={setStep}
          >
            {renderStepContent(step)}
          </New_Booking_Steps_Modal>
        </div>
      </div>

      {showCreateMerchandise && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-30`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setShowCreateMerchandise(false)}>
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content  */}
            <div className="p-4 flex space-x-3">
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl font-bold ">
                  Create Customer
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4">
                <div className="relative">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      merchandise_name
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Customer Name
                  </label>
                  <div className="flex items-center">
                    <input
                      className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg"
                      value={merchandise_name}
                      onChange={(e) => setMerchandiseName(e.target.value)}
                    />
                    <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
                  </div>
                </div>

                <div className="relative mt-20 flex items-center justify-center">
                  {preview_img ? (
                    <img src={preview_img} className="w-1/2 rounded-xl" />
                  ) : (
                    <div className="flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                      <img
                        src={Empty_Img}
                        className="flex items-center justify-center"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={() => handleButtonClick()}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold w-[300px] h-[45px] rounded-lg font-poppins"
                  >
                    Upload New Image
                  </button>
                  <input
                    type="file"
                    accept=".png, .jpg"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div className="font-poppins">
                    Upload Customer logo to enhance BU presence333
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 lg:pr-8 mr-5 border border-gray-300">
                <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
                  Contact Person
                </div>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <label
                      className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                        contact_person_name
                          ? "-top-2.5 text-xs bg-white"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      value={contact_person_name}
                      onChange={(e) => setContactPersonName(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          contact_person_dep
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Department
                      </label>
                      <input
                        value={contact_person_dep}
                        onChange={(e) => setContactPersonDep(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full  font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          contact_person_pos
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Position
                      </label>
                      <input
                        value={contact_person_pos}
                        onChange={(e) => setContactPersonPos(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full  font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          contact_person_email
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        value={contact_person_email}
                        onChange={(e) => setContactPersonEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full  font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          contact_person_phone
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Phone
                      </label>
                      <input
                        value={contact_person_phone}
                        type="number"
                        onChange={(e) => setContactPersonPhone(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full  font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
                  Company Info for Quotation
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          company_name
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Company Name
                      </label>
                      <input
                        value={company_name}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          company_phone
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Company Phone
                      </label>
                      <input
                        value={company_phone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full  font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          company_tax_id
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Tax ID
                      </label>
                      <input
                        value={company_tax_id}
                        onChange={(e) => setCompanyTaxId(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="relative ">
                      <label
                        className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                          company_tax_address
                            ? "-top-2.5 text-xs bg-white"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Tax Address
                      </label>
                      <input
                        value={company_tax_address}
                        onChange={(e) => setCompanyTaxAddress(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-lg font-poppins"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-3">
                  <div className="font-poppins">
                    Please provide details as they will be used in generating
                    quotations for your campaigns
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={() => handleSaveMerchandise()}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default New_Booking;
