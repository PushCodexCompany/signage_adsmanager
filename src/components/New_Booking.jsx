import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import empty_img from "../assets/img/empty_img.png";
import add_new_img from "../assets/img/add_brand.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import User from "../libs/admin";
import { useNavigate } from "react-router-dom";
import Empty_Img from "../assets/img/empty_img.png";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

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
} from "date-fns";

const New_Booking = ({ setShowModalAddNewBooking }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("1");
  const [merchandise, setMerchandise] = useState([]);
  const [showCreateMerchandise, setShowCreateMerchandise] = useState(false);
  const [select_merchandise, setSelectMerchandise] = useState([]);

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

  useEffect(() => {
    firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  }, [currMonth]);

  const monthsToDisplay = [-1, 0, 1];
  const currentIndex = monthsToDisplay.indexOf(0);

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

  const handleSave = async () => {
    const obj = {
      advertisername: merchandise_name,
      contactname: contact_person_name,
      department: contact_person_dep,
      position: contact_person_pos,
      email: contact_person_email,
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

  const handleNextStep = () => {
    if (select_merchandise.AdvertiserID) {
      setStep("2");
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือก Merchandise!",
      });
    }
  };

  const capitalizeFirstLetter = (query) => {
    return query.charAt(0).toUpperCase() + query.substring(1);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setShowModalAddNewBooking(false)}>
              <AiOutlineClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        {step === "1" ? (
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="p-4 flex space-x-3 border-b-1 border-gray-300">
              <div className="flex items-center justify-center w-10 h-10 bg-[#6425FE] rounded-full">
                <p className="text-white  font-poppins text-lg">1</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl ">Select Merchandise</div>
              </div>
              <div className="flex items-center justify-center pl-5">
                <div className="font-poppins text-2xl ">{`>`}</div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div className="text-[56px] font-poppins font-bold text-[#2F3847]">
                Booking For
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="text-sm font-poppins  text-[#2F3847]">
                Name your booking, select merchandise, and content type to
                create a New booking. Personalize your campaign for maximum
                impact.
              </div>
            </div>
            <div className="h-[450px] mt-8 overflow-y-auto">
              <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-2 mt-7">
                <div className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex justify-center items-center">
                  <button
                    onClick={() => setShowCreateMerchandise(true)}
                    className="flex flex-col items-center"
                  >
                    <div className="h-60 flex items-center justify-center">
                      <img
                        className="block ml-auto mr-auto mt-30px w-1/5 rounded-3xl "
                        src={add_new_img}
                        alt={"add new merchandise"}
                      />
                    </div>
                    <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                      Add New Merchandise
                    </div>
                  </button>
                </div>

                {merchandise.length > 0 &&
                  merchandise.map((items, key) => (
                    <div
                      key={key}
                      className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex flex-col items-center"
                      onClick={() => setSelectMerchandise(items)}
                    >
                      <div className="relative mb-4">
                        <img
                          className={`block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer ${
                            select_merchandise?.AdvertiserID ===
                            items?.AdvertiserID
                              ? "border-4 border-[#6425FE] "
                              : ""
                          } `}
                          src={items.AdvertiserLogo || empty_img}
                          alt={items.AdvertiserName}
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
            <div>
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={() => handleNextStep()}
                  className="bg-[#6425FE] text-white  font-poppins w-[200px] lg:w-[250px] lg:h-[45px] rounded-md mr-1"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : step === "2" ? (
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="p-4 flex space-x-3 border-b-1 border-gray-300">
              <div className="flex items-center justify-center w-10 h-10 bg-[#6425FE] rounded-full">
                <p className="text-white  font-poppins text-lg">1</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl ">Select Merchandise</div>
              </div>
              <div className="flex items-center justify-center pl-5">
                <div className="font-poppins text-2xl ">{`>`}</div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-[#6425FE] rounded-full">
                <p className="text-white  font-poppins text-lg">2</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl ">Booking Period</div>
              </div>
              <div className="flex items-center justify-center pl-5">
                <div className="font-poppins text-2xl ">{`>`}</div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div className="text-[56px] font-poppins font-bold text-[#2F3847]">
                Booking Period
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="text-sm font-poppins  text-[#2F3847]">
                Name your booking, select merchandise, and content type to
                create a new booking. Personalize your campaign for maximum
                impact.
              </div>
            </div>
            <div className="mt-6 w-[70%] mx-auto ">
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
                        className={`font-poppins text-2xl ${textStyle}`}
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
              <div className="grid grid-cols-7 gap-4 sm:gap-3 place-items-center mt-4">
                {days.map((day, idx) => (
                  <div key={idx} className="font-poppins text-sm">
                    {capitalizeFirstLetter(day)}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-4 sm:gap-3 mt-6 place-items-center">
                {daysInMonth.map((day, idx) => (
                  <div key={idx} className={colStartClasses[getDay(day)]}>
                    <p
                      className={`cursor-pointer border-1 border-gray-300 hover:border-[#6425FE] flex items-center justify-center font-poppins h-8 w-32 hover:text-[#6425FE] ${
                        isSameMonth(day, today)
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {format(day, "d")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {showCreateMerchandise && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setShowCreateMerchandise(false)}>
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="p-4 flex space-x-3">
              <div className="flex items-center justify-center">
                <div className="font-poppins text-2xl ">Create Merchandise</div>
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
                <div className="flex items-center mt-3">
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
                    className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg font-poppins"
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
                  <text>Contact Person</text>
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
                    onClick={() => handleSave()}
                    className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins"
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
