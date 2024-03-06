import React, { useState } from "react";
import { Header } from "../components";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="border border-gray-200 rounded-lg h-[50px] flex items-center mt-3 shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-3/4 flex justify-center items-center">
                {/* User Manager */}
                <div>
                  <a
                    className={
                      "w-[full] lg:w-[200px] text-base font-bold  px-5 py-3 rounded block leading-normal " +
                      (openTab === 1
                        ? "text-black bg-white border border-gray-300 shadow-lg"
                        : "text-[#6425FE] bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    <div className="flex justify-center items-center">All</div>
                  </a>
                </div>

                {/* Content Type */}
                <a
                  className={
                    "w-[full] lg:w-[300px] text-base font-bold  px-5 py-3  rounded block leading-normal " +
                    (openTab === 2
                      ? "text-black bg-white border border-gray-300 shadow-lg"
                      : "text-[#6425FE] bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <div className="flex justify-center items-center">Read</div>
                </a>

                {/* Media Rule */}
                <a
                  className={
                    "w-[full] lg:w-[300px] text-base font-bold  px-5 py-3  rounded block leading-normal " +
                    (openTab === 3
                      ? "text-black bg-white border border-gray-300 shadow-lg"
                      : "text-[#6425FE] bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <div className="flex justify-center items-center">Unread</div>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              <div className="p-4 mt-10 shadow-md">
                <div className="flex flex-row ">
                  <div className="basis-[50px] font-poppins text-xl text-[#59606C]">
                    ID
                  </div>
                  <div className="basis-11/12  font-poppins text-xl text-[#59606C]">
                    Subject
                  </div>
                  <div className="basis-1/12  flex justify-end items-end font-poppins text-xl text-[#59606C]">
                    Action
                  </div>
                </div>
              </div>

              {/* Example 1 */}
              <div className="p-4 shadow-md">
                <div className="flex flex-row ">
                  <div className="basis-[50px] font-poppins text-md font-bold">
                    1
                  </div>
                  <div className="flex basis-11/12  ">
                    <span className="font-poppins text-md font-bold">
                      Booking Name 1 : Awaiting admin approval: A booking
                      request has been submitted. <br />{" "}
                      <span className="font-poppins text-xs font-bold text-[#59606C] ">
                        5 min ago
                      </span>
                    </span>
                  </div>
                  <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                    <div className="">
                      <button
                        className="w-full text-left p-2 focus:outline-none"
                        onClick={toggleCollapse}
                      >
                        {isCollapsed ? (
                          <IoIosArrowForward size={32} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={32} color="#6425FE" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`p-4 ${isCollapsed ? "hidden" : ""}`}>
                  <div className="flex  ml-7  space-x-2">
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      See Detail
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Approve
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              {/* Example 2 */}
              <div className="p-4 shadow-md">
                <div className="flex flex-row ">
                  <div className="basis-[50px] font-poppins text-md font-bold">
                    2
                  </div>
                  <div className="flex basis-11/12  ">
                    <span className="font-poppins text-md font-bold">
                      #BookingID014 : Awaiting admin approval: A booking request
                      has been submitted. <br />{" "}
                      <span className="font-poppins text-xs font-bold text-[#59606C] ">
                        12 min ago
                      </span>
                    </span>
                  </div>
                  <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                    <div className="">
                      <button
                        className="w-full text-left p-2 focus:outline-none"
                        onClick={toggleCollapse}
                      >
                        {isCollapsed ? (
                          <IoIosArrowForward size={32} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={32} color="#6425FE" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`p-4 ${isCollapsed ? "hidden" : ""}`}>
                  <div className="flex  ml-7  space-x-2">
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      See Detail
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Approve
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              {/* Example 3 */}
              <div className="p-4 shadow-md">
                <div className="flex flex-row ">
                  <div className="basis-[50px] font-poppins text-md font-bold">
                    3
                  </div>
                  <div className="flex basis-11/12  ">
                    <span className="font-poppins text-md font-bold">
                      #BookingID013 : Awaiting admin approval: A media upload
                      request has been submitted.
                      <br />{" "}
                      <span className="font-poppins text-xs font-bold text-[#59606C] ">
                        1 day ago
                      </span>
                    </span>
                  </div>
                  <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                    <div className="">
                      <button
                        className="w-full text-left p-2 focus:outline-none"
                        onClick={toggleCollapse}
                      >
                        {isCollapsed ? (
                          <IoIosArrowForward size={32} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={32} color="#6425FE" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`p-4 ${isCollapsed ? "hidden" : ""}`}>
                  <div className="flex  ml-7  space-x-2">
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      See Detail
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Approve
                    </button>
                    <button className="bg-[#6425FE] text-white font-bold w-[150px] h-[45px] rounded-sm">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              {/* Example 4 */}
              <div className="p-4 shadow-md">
                <div className="flex flex-row ">
                  <div className="basis-[50px] font-poppins text-md font-bold">
                    4
                  </div>
                  <div className="flex basis-11/12  ">
                    <span className="font-poppins text-md font-bold">
                      #BookingID07 : Awaiting admin approval: A media upload
                      request has been submitted.
                      <br />{" "}
                      <span className="font-poppins text-xs font-bold text-[#59606C] ">
                        1 day ago
                      </span>
                    </span>
                  </div>
                  <div className="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                    <div className="">
                      <button
                        className="w-full text-left p-2 focus:outline-none"
                        onClick={toggleCollapse}
                      >
                        {isCollapsed ? (
                          <IoIosArrowForward size={32} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={32} color="#6425FE" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`p-4 ${isCollapsed ? "hidden" : ""}`}>
                  <div className="flex  ml-7  space-x-2">
                    <span className="font-poppins text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              Read
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              Unread
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Inbox = () => {
  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div className="mt-10 mb-5 font-bold text-2xl">
        <text>Setting</text>
      </div>
      <Tabs />
    </div>
  );
};

export default Inbox;
