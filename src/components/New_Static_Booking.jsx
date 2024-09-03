import React, { useState, useEffect, useRef } from "react";
import {
  IoIosClose,
  IoIosCloseCircle,
  IoIosAdd,
  IoIosSearch,
} from "react-icons/io";
import Swal from "sweetalert2";
import { MdOutlineModeEditOutline } from "react-icons/md";
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
import User from "../libs/admin";
import Empty_Img from "../assets/img/empty_img.png";
import Encryption from "../libs/encryption";
import { useNavigate } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Filter from "../components/Filter";

const New_Static_Booking = ({
  setShowModalAddNewBooking,
  setShowDetailScreen,
  showDetailScreen,
  setDetailScreen,
}) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState("1");
  const [merchandise, setMerchandise] = useState([]);
  const [showCreateMerchandise, setShowCreateMerchandise] = useState(false);
  const [select_merchandise, setSelectMerchandise] = useState([]);
  const [selected_dates, setSelectedDates] = useState([]);
  const [booking_name, setBookingName] = useState();
  const [upload, setUpload] = useState({});
  const [forms, setFormData] = useState({});
  const [selectedScreen, setSelectedScreen] = useState();
  const today = startOfToday();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const currentDate = new Date();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  const [width, setWidth] = useState(window.innerWidth);
  const [filter_screen, setFilterScreen] = useState([]);

  // New Merch
  const [preview_img, setPreviewImg] = useState(null);
  const [merchandise_name, setMerchandiseName] = useState();
  const [merchandise_slot, setMerchandiseSlot] = useState();
  const [merchandise_type, setMerchandiseType] = useState();
  const [merchandise_img, setMerchandiseImage] = useState();
  const [contact_person_name, setContactPersonName] = useState();
  const [contact_person_dep, setContactPersonDep] = useState();
  const [contact_person_pos, setContactPersonPos] = useState();
  const [contact_person_email, setContactPersonEmail] = useState();
  const [contact_person_phone, setContactPersonPhone] = useState();
  const [screenAdsAllocation, setScreenAdsAllocation] = useState([]);

  const [modalSelectScreen, setModalSelectScreen] = useState(false);
  const [oldModal, setOldModal] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [screen_filter, setScreenFilter] = useState([]);
  const [screenSelectFromEdit, setScreenSelectFromEdit] = useState(null);

  const [allScreenData, setAllScreenData] = useState([]);
  const [isApplyToScreen, setIsApplyToScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getScreenData();
  }, []);

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
        if (booking_name && screenAdsAllocation.length > 0) {
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

  const getScreenData = async () => {
    const data = await User.getScreens(token);
    setAllScreenData(data);
  };

  const handleDeleteFile = () => {
    setUpload({});
  };

  const uploadFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".mp4, .jpg, .png";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let fileType;
          let fileProperties = {};
          if (file.type.includes("video")) {
            fileType = file.type;
            const video = document.createElement("video");
            video.addEventListener("loadedmetadata", () => {
              // Accessing video properties after it's loaded

              const duration = video.duration;
              const width = video.videoWidth;
              const height = video.videoHeight;

              // for convert filesize
              const fileSize = file.size / (1024 * 1024);

              fileProperties = {
                duration: duration.toString(),
                width: width.toString(),
                height: height.toString(),
                size: fileSize.toString(),
              };

              //   if (
              //     media_rules_select.width === width &&
              //     media_rules_select.height === height
              //   ) {
              const form = new FormData();
              form.append("file[]", file);
              form.append("contenttype", fileType);
              form.append("contentproperties", JSON.stringify(fileProperties));

              setUpload(file);
              setFormData(form);
              //   } else {
              //     Swal.fire({
              //       icon: "error",
              //       title: "เกิดข้อผิดพลาด!",
              //       text: "ขนาดของ Video ไม่ตรงกับ Media Rule",
              //     });
              //   }
            });
            video.src = e.target.result;
          } else if (file.type.includes("image")) {
            fileType = file.type;
            if (fileType === "image/jpeg") {
              fileType = file.type.replace("jpeg", "jpg");
            }
            const img = new Image();
            img.onload = () => {
              // Accessing image properties after it's loaded
              const width = img.width; // Width of the image in pixels
              const height = img.height; // Height of the image in pixels

              // for convert filesize
              const fileSize = file.size / (1024 * 1024);

              // Store the file information along with width and height
              fileProperties = {
                width: width.toString(),
                height: height.toString(),
                size: fileSize.toString(),
              };
              //   if (
              //     media_rules_select.width === width &&
              //     media_rules_select.height === height
              //   ) {
              const form = new FormData();
              form.append("file[]", file);
              form.append("contenttype", fileType);
              form.append("contentproperties", JSON.stringify(fileProperties));

              setUpload(file);
              setFormData(form);
              //   } else {
              //     Swal.fire({
              //       icon: "error",
              //       title: "เกิดข้อผิดพลาด!",
              //       text: "ขนาดของ Image ไม่ตรงกับ Media Rule",
              //     });
              //   }
            };
            img.src = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  };

  const handleDeleteScreenAdsAllocation = (index, id) => {
    const newData = [...screenAdsAllocation];
    newData.splice(index, 1);
    setScreenAdsAllocation(newData);
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [id]: !prevCheckboxes[id],
      };
      return updatedCheckboxes;
    });
  };

  const handleToggleOpenSelectScreen = () => {
    setOldModal(!oldModal);
    setModalSelectScreen(!modalSelectScreen);
  };

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
                Name your booking, select Customer, and content type to create a
                New booking. Personalize your campaign for maximum impact.
              </div>
              <div
                className={` ${
                  merchandise.length <= 1
                    ? "grid grid-cols-1 lg:grid-cols-1 "
                    : "grid grid-cols-2 lg:grid-cols-3"
                } gap-4 p-4 h-[380px] overflow-y-auto border border-gray-200 rounded-lg`}
              >
                <div
                  onClick={() => {
                    setShowCreateMerchandise(true);
                    setOldModal(false);
                  }}
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
                      Add New Customer
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
                Name your booking, select Customer, and content type to create a
                new booking. Personalize your campaign for maximum impact.
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
                Name your booking, select Customer, and content type to create a
                new booking. Personalize your campaign for maximum impact.
              </div>
            </div>
            <div className="mt-6 h-[450px] overflow-y-auto">
              <div className="flex flex-col lg:flex-row">
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
                    <div className="font-poppins font-bold">
                      Selected Screen
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-[80%] rounded-lg col-span-4 border border-[#D9D9D9]">
                      <div className="p-2">
                        <div className="grid grid-cols-5">
                          <div className="col-span-4">
                            <div className="flex flex-wrap">
                              {screenAdsAllocation.length > 0 &&
                                screenAdsAllocation.map((screen, index) => (
                                  <div
                                    key={index}
                                    className="border border-gray-300 rounded-sm bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1 px-2 py-1"
                                    style={{ flexBasis: "calc(50% - 8px)" }}
                                  >
                                    <div className="font-poppins text-xs font-bold">
                                      {screen.ScreenName}
                                    </div>

                                    <IoIosClose
                                      size={20}
                                      className="cursor-pointer text-[#6425FE]"
                                      onClick={() =>
                                        handleDeleteScreenAdsAllocation(
                                          index,
                                          screen.ScreenID
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-span-1 flex justify-end items-center">
                            {screenAdsAllocation.length > 1 && (
                              <IoIosCloseCircle
                                onClick={() => {
                                  const filteredScreen = allScreenData.filter(
                                    (screen) =>
                                      screen.ScreenID === screenSelectFromEdit
                                  );
                                  const output = {
                                    [screenSelectFromEdit]: true,
                                  };
                                  setCheckboxes(output);
                                  setScreenAdsAllocation(filteredScreen);
                                }}
                                size={24}
                                className="mt-1 text-[#6425FE] hover:text-[#3b1694]"
                              />
                            )}
                            <div className="relative ml-2">
                              <IoIosAdd
                                size={24}
                                className="mt-1 text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                                onClick={handleToggleOpenSelectScreen}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  <div className="mt-10">
                    <div className="font-poppins font-bold">Media Upload :</div>
                  </div>
                  <div className="mt-3">
                    <div className="flex space-x-2">
                      <div
                        onClick={() => uploadFile()}
                        className="font-poppins w-[80%] h-11 text-left rounded-lg pl-2 border border-dotted border-gray-300 flex justify-center items-center cursor-pointer"
                      >
                        <div
                          className={`font-poppins font-bold ${
                            upload.name ? "text-black" : "text-[#7C7B7B]"
                          } `}
                        >
                          {upload.name ? `${upload.name}` : "Choose File"}
                        </div>
                      </div>
                      {upload?.name ? (
                        <div
                          onClick={() => handleDeleteFile()}
                          className="flex justify-center items-center cursor-pointer"
                        >
                          <IoIosClose size={30} color={"#6425FE"} />
                        </div>
                      ) : (
                        <></>
                      )}
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
                Name your booking, select Customer, and content type to create a
                new booking. Personalize your campaign for maximum impact.
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
                    {/* <div className="font-poppins font-bold text-4xl">
                      Booking Name
                    </div> */}
                    <div className="font-poppins font-bold text-4xl">
                      {booking_name}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="font-poppins font-bold text-2xl">
                      [CDS-BT-230101-004]?
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="font-poppins font-bold text-2xl">
                      Total Static Screen : {screenAdsAllocation.length}
                    </div>
                  </div>
                  <div className="mt-5">
                    {/* <div className="font-poppins font-bold text-2xl">
                      {booking_slot} Slot Per Day
                    </div> */}
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

  // const handleDateChange = (date) => {
  //   if (!startDate || (startDate && endDate)) {
  //     // If start date is not set or both start and end dates are set, set new start date
  //     setStartDate(date);
  //     setEndDate(null);
  //     setDateRange([date]);
  //     setSelectedDates([date]);
  //   } else {
  //     // If start date is already set, set end date
  //     setEndDate(date);
  //     const range = generateDateRange(startDate, date);
  //     setDateRange(range);
  //     setSelectedDates(range);
  //   }
  // };

  const handleClickViewDetail = (data) => {
    setDetailScreen(data);
    setShowDetailScreen(!showDetailScreen);
  };

  const handleStartDate = (date) => {
    if (!endDate) {
      // If there's no end date set, just set the start date and other related states
      setStartDate(date);
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

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
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

  useEffect(() => {
    firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  }, [currMonth]);

  const monthsToDisplay = [-1, 0, 1];
  const capitalizeFirstLetter = (query) => {
    return query.charAt(0).toUpperCase() + query.substring(1);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

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

  const generateDateRange = (start, end) => {
    const range = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  const handleSaveBooking = async () => {
    setShowModalAddNewBooking(false);
    // const { token } = User.getCookieData();
    // const booking_date = selected_dates.map((timestamp) =>
    //   format(timestamp, "yyyy-MM-dd")
    // );
    // const obj_save_booking = {
    //   bookingname: booking_name,
    //   advertiserid: select_merchandise.AdvertiserID,
    //   slotperday: booking_slot,
    //   bookingperoids: booking_date,
    // };
    // try {
    //   const data_booking = await User.createBooking(obj_save_booking, token);
    //   if (data_booking.code !== 404) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "สร้าง Booking สำเร็จ!",
    //       text: `สร้าง Booking สำเร็จ!`,
    //     }).then((result) => {
    //       if (
    //         result.isConfirmed ||
    //         result.dismiss === Swal.DismissReason.backdrop
    //       ) {
    //         const obj = {
    //           BookingID: data_booking.bookingid,
    //           AdvertiserLogo: select_merchandise.AdvertiserLogo,
    //           AdvertiserName: select_merchandise.AdvertiserName,
    //           BookingName: booking_name,
    //           SlotPerDay: booking_slot,
    //           booking_date,
    //         };
    //         const replacedString = obj.BookingName.replace(/\//g, "_");
    //         navigate(`/booking/${replacedString}`, {
    //           state: { data: obj, isEdited: false },
    //         });
    //       }
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "เกิดข้อผิดพลาด!",
    //       text: data_booking.message,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
            title: "สร้าง Customer สำเร็จ!",
            text: `สร้าง Customer สำเร็จ!`,
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

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    allScreenData.forEach((row) => {
      newCheckboxes[row.ScreenID] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    const checkedRowIds = newSelectAll
      ? allScreenData.map((row) => row.ScreenID)
      : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const search = () => {
    alert("search");
  };

  const toggleCheckboxAddScreen = (rowId) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectedScreenItems(intArray);

      return updatedCheckboxes;
    });
  };

  const handleAddScreenAllocation = () => {
    const screensToReturn = allScreenData.filter((screen) =>
      selectedScreenItems.includes(screen.ScreenID)
    );
    setScreenAdsAllocation(screensToReturn);
    setOldModal(!oldModal);
    setModalSelectScreen(!modalSelectScreen);
  };

  return (
    <>
      {oldModal && (
        <div className="fixed top-1 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-full overflow-x-auto">
          {/* First div (circle) */}
          <div
            className={`absolute  ${
              width >= 1026
                ? "top-12 right-[160px]"
                : width < 1024
                ? "right-12 top-12"
                : "right-[65px] top-12"
            }  m-4 z-30`}
          >
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
      )}

      {showCreateMerchandise && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setShowCreateMerchandise(false);
                  setOldModal(!oldModal);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
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
                  <div className="flex items-center">
                    <input
                      placeholder="Customer Name"
                      className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins"
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
                    Upload Customer logo to enhance brand presence
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

      {modalSelectScreen && (
        <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[120px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button
                onClick={() => {
                  setModalSelectScreen(!modalSelectScreen);
                  setOldModal(!oldModal);
                }}
              >
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-5/6 lg:w-5/6 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl font-bold">
                Select Screens
              </div>
            </div>
            <div className="mt-1">
              <div className="grid grid-cols-4">
                <div className="flex justify-end items-center col-span-3">
                  <div className="font-poppins text-xs lg:text-xl text-[#2F3847] mr-28">
                    {`You Booking Period : ${format(
                      selected_dates[0],
                      "EEE dd MMM yyyy"
                    )} - ${format(
                      selected_dates[selected_dates.length - 1],
                      "EEE dd MMM yyyy"
                    )}`}
                  </div>
                </div>
                <div className="flex justify-end items-center col-span-1 ">
                  <button
                    // onClick={() =>
                    //   setOpenAddNewScreenModal(!openAddNewScreenModal)
                    // }
                    className="bg-[#6425FE] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
                  >
                    New Screen
                  </button>
                </div>
              </div>
            </div>

            <div className="p-1 mt-1">
              <div className="basis-8/12 lg:basis-11/12 rounded-lg border border-gray-200">
                <div className="flex">
                  <NavButton
                    customFunc={search}
                    title="Search"
                    color="grey"
                    icon={<IoIosSearch />}
                  />
                  <input
                    className=" w-full h-[46px] rounded relative border-gray-500  transition font-poppins"
                    type="text"
                    name="name"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>

            <Filter
              setFilterScreen={setFilterScreen}
              filter_screen={filter_screen}
            />

            <div className="mt-5 p-6">
              <div className="font-poppins">
                *Search result displays only screens available in your booking
              </div>
            </div>

            <div className="p-4">
              <div className="w-auto h-[350px] overflow-y-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        <label className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="opacity-0 absolute h-5 w-5 cursor-pointer"
                            checked={selectAll}
                            onChange={toggleAllCheckboxes}
                          />
                          <span
                            className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                              selectAll ? "bg-white" : ""
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 text-white ${
                                selectAll ? "opacity-100" : "opacity-0"
                              } transition-opacity duration-300 ease-in-out`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#6425FE"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        </label>
                      </th>
                      <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Screen Name
                      </th>
                      <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Media Rule
                      </th>
                      <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Tag
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allScreenData.length > 0 ? (
                      allScreenData.map((row, key) => (
                        <tr key={row.ScreenID}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className=" h-5 w-5 cursor-pointer"
                                checked={checkboxes[row.ScreenID] || false}
                                onChange={() =>
                                  toggleCheckboxAddScreen(row.ScreenID)
                                }
                                disabled={
                                  row.ScreenID === screenSelectFromEdit
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                            <div className="flex items-center">
                              <div className="font-poppins text-xl font-bold">
                                {row.ScreenName}
                              </div>
                              {row.screen_status === 0 ? (
                                <div className="bg-red-500 w-1 h-1 rounded-full ml-2"></div>
                              ) : (
                                <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-no-wrap border-b  border-gray-200">
                            <div className="font-poppins text-sm text-[#59606C] font-bold">
                              {row.ScreenLocation || "No Data"}
                            </div>
                            <div className="font-poppins text-sm font-bold">
                              {row.province || "No Data"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                            <div className="font-poppins font-bold">
                              {/* {findScreenResolutionID(row.ScreenResolutionID)} */}
                              {row?.ScreenRule[0]?.Width &&
                              row?.ScreenRule[0]?.Height
                                ? parseInt(row.ScreenRule[0].Width, 10) +
                                  "x" +
                                  parseInt(row.ScreenRule[0].Height, 10)
                                : "Not Set"}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex flex-wrap">
                              {row.ScreenTag.length > 0 ? (
                                row.ScreenTag.map((items, index) => (
                                  <div
                                    key={index}
                                    className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                                    style={{
                                      flexBasis: `calc(${
                                        100 / row.ScreenTag.length
                                      }% - 8px)`,
                                    }}
                                  >
                                    <div className="font-poppins text-xs font-bold">
                                      {items.TagName}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div
                                  className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                                  style={{ flexBasis: "calc(100% - 8px)" }}
                                >
                                  <div className="font-poppins text-xs font-bold">
                                    No Tag
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                            <div className="space-x-2">
                              <button
                                className="w-36 h-6 bg-[#6425FE] text-white text-sm font-poppins rounded-md"
                                onClick={() => handleClickViewDetail(row)}
                              >
                                View Detail
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4">
                          <div className="flex justify-center items-center">
                            <span className="text-gray-300 text-4xl">
                              No Screen(s) Match with Media Rules
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-1 mb-3 flex items-center justify-center">
              <button
                onClick={() => handleAddScreenAllocation()}
                className="w-[20%] bg-[#6425FE] text-white text-xl py-2 rounded-lg font-bold font-poppins "
              >
                Add Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default New_Static_Booking;
