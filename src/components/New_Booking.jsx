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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const currentDate = new Date();

  // calendar
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));

  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

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

  const handleDateChange = (date) => {
    if (!startDate || (startDate && endDate)) {
      // If start date is not set or both start and end dates are set, set new start date
      setStartDate(date);
      setEndDate(null);
      setDateRange([date]);
      setSelectedDates([date]);
    } else {
      // If start date is already set, set end date
      setEndDate(date);
      const range = generateDateRange(startDate, date);
      setDateRange(range);
      setSelectedDates(range);
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

  const handleSaveMerchandise = async () => {
    const { brand_code } = User.getBrandCode();
    const obj = {
      advertisername: merchandise_name,
      contactname: contact_person_name,
      department: contact_person_dep,
      position: contact_person_pos,
      email: contact_person_email,
      brandcode: brand_code,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "create_merchandise",
      false
    );

    try {
      const data = await User.createMerchandise(encrypted, token);
      if (data.code !== 404) {
        const form = new FormData();
        form.append("target", "advertiserlogo");
        form.append("advertiserid", data.advertiserid);
        form.append("logo", merchandise_img);
        const data_img = await User.saveImgMerchandise(form, token);
        if (data_img.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "สร้าง Merchandise สำเร็จ!",
            text: `สร้าง Merchandise สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              navigate("/merchandise");
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
            text: "กรุณาเลือก Merchandise!",
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
      bookingname: booking_name,
      advertiserid: select_merchandise.AdvertiserID,
      slotperday: booking_slot,
      bookingperoids: booking_date,
    };

    try {
      const data_booking = await User.createBooking(obj_save_booking, token);
      if (data_booking.code !== 404) {
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
      label: "Select Merchandise",
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
            <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
              <div className="text-[50px] font-[700] text-center font-poppins">
                Booking For
              </div>
              <div className="text-center text-slate-500 mb-12 font-poppins">
                Name your booking, select merchandise, and content type to
                create a New booking. Personalize your campaign for maximum
                impact.
              </div>
              <div
                className={` ${
                  merchandise.length <= 1
                    ? "grid grid-cols-1 lg:grid-cols-1 "
                    : "grid grid-cols-2 lg:grid-cols-3"
                } gap-4 p-4 h-[380px] overflow-y-auto border border-gray-200 rounded-lg`}
              >
                <div
                  onClick={() => setShowCreateMerchandise(true)}
                  className="h-[400px] p-2 flex flex-col items-center"
                >
                  <div className="relative mb-4">
                    <img
                      className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-cover border border-[#DFDFDF]"
                      src={plus_brand}
                    />
                  </div>
                  <button className="w-full">
                    <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                      Add New Merchandise
                    </div>
                    <div className="text-[14px] text-white font-poppins"></div>
                  </button>
                </div>

                {merchandise.length > 0 &&
                  merchandise.map((items, key) => (
                    <div
                      key={key}
                      onClick={() => setSelectMerchandise(items)}
                      className="h-[400px] p-2 flex flex-col items-center"
                    >
                      <div className="relative mb-4">
                        <img
                          className={`block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer ${
                            select_merchandise?.AdvertiserID ===
                            items?.AdvertiserID
                              ? "border-4 border-[#6425FE] "
                              : "border border-[#dedede]"
                          } object-cover `}
                          src={
                            items.AdvertiserLogo
                              ? items.AdvertiserLogo
                              : `https://ui-avatars.com/api/?name=${
                                  items.AdvertiserName
                                }&background=${"000000"}&color=fff`
                          }
                          alt={items.AccountName}
                        />
                      </div>
                      <button className="w-full">
                        <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                          {items.AdvertiserName}
                        </div>
                        <div className="text-[14px] text-slate-500 font-poppins">
                          {items.ContactName}
                        </div>
                      </button>
                    </div>
                  ))}
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
            <div className="flex items-center justify-center mt-2 text-center">
              <div className="text-sm font-poppins text-[#2F3847]">
                Name your booking, select merchandise, and content type to
                create a new booking. Personalize your campaign for maximum
                impact.
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateChange(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
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
                    onChange={(date) => handleDateChange(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
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
                      className={`cursor-pointer border-1 border-gray-300 hover:border-[#6425FE] flex items-center rounded-md justify-center font-poppins md:h-5 md:w-16 lg:h-8 lg:w-32 hover:text-[#6425FE] ${
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
                      }`}
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
                    {`Your Booking Period :  ${format(
                      selected_dates[0],
                      "EEE dd MMM yyyy"
                    )} - ${format(
                      selected_dates[selected_dates.length - 1],
                      "EEE dd MMM yyyy"
                    )}`}
                  </div>
                ) : (
                  ""
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
            <div className="flex items-center justify-center mt-2 text-center">
              <div className="text-sm font-poppins text-[#2F3847]">
                Name your booking, select merchandise, and content type to
                create a new booking. Personalize your campaign for maximum
                impact.
              </div>
            </div>
            <div className="mt-6 h-[350px] overflow-y-auto">
              <div className="flex flex-row lg:flex-row">
                <div className="w-full lg:w-1/3 p-4">
                  <div>
                    <img
                      className={`block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl object-cover`}
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
                <div className="w-full lg:w-2/3 p-4 lg:pl-8 border border-gray-300">
                  <div>
                    <div className="font-poppins font-bold">Booking Name :</div>
                  </div>
                  <div className="mt-3">
                    <input
                      onChange={(e) => setBookingName(e.target.value)}
                      value={booking_name}
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300"
                      placeholder="Enter Booking Name"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="font-poppins font-bold">Slot Per Day</div>
                  </div>
                  <div className="mt-3">
                    <input
                      onChange={(e) => setBookingSlot(e.target.value)}
                      value={booking_slot}
                      type="number"
                      className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-gray-300"
                      placeholder="Enter Slot Per Day"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="font-poppins font-bold">
                      Booking Period :
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center items-center">
                    <div className="font-poppins text-[#7C7B7B]">
                      {`Your Booking Period :  ${format(
                        selected_dates[0],
                        "EEE dd MMM yyyy"
                      )} - ${format(
                        selected_dates[selected_dates.length - 1],
                        "EEE dd MMM yyyy"
                      )}`}
                    </div>
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
            <div className="flex items-center justify-center mt-2 text-center">
              <div className="text-sm font-poppins text-[#2F3847]">
                Name your booking, select merchandise, and content type to
                create a new booking. Personalize your campaign for maximum
                impact.
              </div>
            </div>
            <div className="mt-6 h-[350px] overflow-y-auto">
              <div className="flex flex-row lg:flex-row  justify-center items-center">
                <div className="w-full lg:w-1/3 p-4">
                  <div>
                    <img
                      className={`block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl object-cover`}
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
                      {booking_slot} Slot Per Day
                    </div>
                  </div>
                  <div className="mt-5 flex">
                    <div className="font-poppins font-bold text-2xl">
                      {`${format(
                        selected_dates[0],
                        "EEE dd MMM yyyy"
                      )} - ${format(
                        selected_dates[selected_dates.length - 1],
                        "EEE dd MMM yyyy"
                      )}`}
                    </div>
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
            <div className="mt-2 flex justify-center items-center">
              <div className="flex items-center justify-center cursor-pointer">
                <button className="font-poppins text-xs">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </button>
              </div>
            </div>
          </>
        );
        break;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setShowModalAddNewBooking(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}

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

      {showCreateMerchandise && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowCreateMerchandise(false)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="p-4 flex space-x-3">
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl font-bold ">
                  Create Merchandise
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-4">
                <div className="relative">
                  <div className="flex items-center">
                    <input
                      placeholder="Merchandise Name"
                      className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins"
                      value={merchandise_name}
                      onChange={(e) => setMerchandiseName(e.target.value)}
                    />
                    <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
                  </div>
                </div>
                {/* <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                      <select
                        name="file_size_type"
                        id="file_size_type"
                        className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        placeholder="Resolution"
                        onChange={(e) => setMerchandiseType(e.target.value)}
                      >
                        <option value="0">Category</option>
                        <option value="1">Department Store</option>
                        <option value="2">Mock 1 </option>
                        <option value="3">Mock 2</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                            stroke="#6425FE"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="grid grid-cols-4 space-x-2">
                      <div className="col-span-1 flex items-center justify-center">
                        <div className="font-poppins font-bold">Total Slot</div>
                      </div>
                      <div className="col-span-1">
                        <input
                          onChange={(e) => setMerchandiseSlot(e.target.value)}
                          value={merchandise_slot}
                          placeholder="0"
                          className="border disabled:bg-[#DBDBDB] border-gray-300 rounded-lg p-3 w-full font-bold font-poppins text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
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
                    Upload merchandise logo to enhance brand presence
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 lg:pl-8 border border-gray-300">
                <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
                  Contact Person
                </div>
                <div className="flex items-center">
                  <input
                    placeholder="Full Name"
                    value={contact_person_name}
                    onChange={(e) => setContactPersonName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
                  />
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <input
                      placeholder="Department"
                      value={contact_person_dep}
                      onChange={(e) => setContactPersonDep(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <input
                      placeholder="Position"
                      value={contact_person_pos}
                      onChange={(e) => setContactPersonPos(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-1/2 pr-2">
                    <input
                      placeholder="Email"
                      value={contact_person_email}
                      onChange={(e) => setContactPersonEmail(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <input
                      placeholder="Phone"
                      onChange={(e) => setContactPersonPhone(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                    />
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
