import React, { useState } from "react";
import { Header } from "../components";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import {
  PiSlidersHorizontalFill,
  PiGridFourFill,
  PiListDashesFill,
} from "react-icons/pi";

import event1 from "../assets/img/event/event1.png";
import event2 from "../assets/img/event/event2.png";
import event3 from "../assets/img/event/event3.png";
import event4 from "../assets/img/event/event4.png";
import event5 from "../assets/img/event/event5.png";
import event6 from "../assets/img/event/event6.png";
import event7 from "../assets/img/event/event7.png";
import event8 from "../assets/img/event/event8.png";
import event9 from "../assets/img/event/event9.png";
import event10 from "../assets/img/event/event10.png";
import event11 from "../assets/img/event/event11.png";
import event12 from "../assets/img/event/event12.png";
import event13 from "../assets/img/event/event13.png";
import event14 from "../assets/img/event/event14.png";
import event15 from "../assets/img/event/event15.png";
import event16 from "../assets/img/event/event16.png";

import { eventData, eventGrid } from "../libs/campaign_grid";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

const mockup = [
  {
    img: event1,
    name: "Event 1",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event2,
    name: "Event 2",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event3,
    name: "Event 3",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event4,
    name: "Event 4",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event5,
    name: "Event 5",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event6,
    name: "Event 6",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event7,
    name: "Event 7",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event8,
    name: "Event 8",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event9,
    name: "Event 9",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event10,
    name: "Event 10",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event11,
    name: "Event 11",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event12,
    name: "Event 12",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event13,
    name: "Event 13",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event14,
    name: "Event 14",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event15,
    name: "Event 15",
    des: "The event typically includes runway shows, exhibitions",
  },
  {
    img: event16,
    name: "Event 16",
    des: "The event typically includes runway shows, exhibitions",
  },
];

const Event = () => {
  const [view, setView] = useState(true);

  const handleView = () => {
    setView(!view);
  };

  const GridImgComponent = () => {
    return (
      <div className="w-auto  h-[800px] mt-10  border border-[#DBDBDB] rounded-lg">
        <div className="h-[800px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 p-10 space-x-0">
            {mockup.map((items, index) => (
              <div
                key={index}
                className={`border border-[#B6B3B3] md:h-[400px] lg:w-[210px] lg:h-[380px] ${
                  index >= 6 ? "lg:mt-4" : "mt-4"
                } ${index >= 3 ? "md : mt-3 " : "mt-3"} grid grid-rows-8`}
              >
                <div className="flex justify-center items-center ">
                  <img src={items.img} className="w-[150px] h-[150px]" />
                </div>
                <div className="  ml-1 row-span-2 ">
                  <div className="ml-1 text-lg font-bold font-poppins">
                    {items.name}
                  </div>
                  <div className="ml-1 mt-3 text-sm font-poppins">
                    {items.des}
                  </div>
                </div>
                <div className="space-y-2 flex flex-col items-center justify-center ">
                  <button
                    onClick={() => alert(`edit : ${items.name}`)}
                    className="w-[80%] bg-[#6425FE] text-white py-2 rounded-lg font-bold font-poppins "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert(`delete : ${items.name}`)}
                    className="w-[80%] bg-white text-[#6425FE] border border-[#6425FE] py-2 rounded-lg font-bold font-poppins"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ListComponent = () => {
    return (
      <div className="mt-5">
        <GridComponent dataSource={eventData} height={600} width={"auto"}>
          <ColumnsDirective>
            {eventGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </div>
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Dashboard" />
      <div className="flex justify-between mt-10 mb-5 font-bold text-2xl font-poppins">
        <div className="flex items-center">
          <div className="font-poppins">Event</div>
        </div>
        <button className="bg-[#6425FE] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md">
          Create New Event +
        </button>
      </div>

      <div className="relative flex flex-col min-w-0  w-full mb-6 ">
        {/* Select Menu */}
        <div class="rounded-lg h-[50px] flex items-center shadow-md">
          <div class="flex flex-col lg:flex-row">
            <div class="w-full lg:w-3/4 flex justify-center items-center">
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <select
                  name="sector"
                  id="sector"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  <option value="Sector">Sector</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoIosArrowDown size={18} color="#6425FE" />
                </div>
              </div>
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <select
                  name="region"
                  id="region"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  <option value="Region">Region</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                  <IoIosArrowDown size={18} color="#6425FE" />
                </div>
              </div>
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <select
                  name="store_cluster"
                  id="store_cluster"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  <option value="Store Cluster">Store Cluster</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoIosArrowDown size={18} color="#6425FE" />
                </div>
              </div>
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <select
                  name="branch"
                  id="branch"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  <option value="Branch">Branch</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoIosArrowDown size={18} color="#6425FE" />
                </div>
              </div>
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <select
                  name="department"
                  id="department"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  <option value="Department">Department</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoIosArrowDown size={18} color="#6425FE" />
                </div>
              </div>
              <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                <button
                  name="role"
                  class="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                >
                  All filter
                </button>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <PiSlidersHorizontalFill size={18} color="#6425FE" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter  */}
        <div class="flex flex-row mt-4">
          <div class="basis-11/12">
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] mt-1  flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <IoIosClose size="22" color="#6425FE" />
                </div>
                <span className="text-sm font-poppins">North</span>
              </div>
            </button>
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] mt-1  flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <IoIosClose size="22" color="#6425FE" />
                </div>
                <span className="text-sm font-poppins">Flagship</span>
              </div>
            </button>
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] mt-1  flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <IoIosClose size="22" color="#6425FE" />
                </div>
                <span className="text-sm font-poppins">Beauty</span>
              </div>
            </button>
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px] mt-1  flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <IoIosClose size="22" color="#6425FE" />
                </div>
                <span className="text-sm font-poppins">Portrait</span>
              </div>
            </button>
            <button onClick={() => alert("deleted !")}>
              <div class="relative w-[100px] lg:w-[130px] h-[40px]  mt-1 flex items-center bg-[#6425FE] text-white justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                <span className="text-sm font-poppins">Clear All</span>
              </div>
            </button>
          </div>
          <div class="basis-1/12">
            <div className="flex flex-row">
              {view ? (
                <div className="flex basis-1/2 justify-end align-middle">
                  <button onClick={() => handleView()}>
                    <PiListDashesFill size={42} color="#6425FE" />
                  </button>
                </div>
              ) : (
                <div className="flex basis-1/2 justify-end align-middle">
                  <button onClick={() => handleView()}>
                    <PiGridFourFill size={42} color="#6425FE" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {view ? <GridImgComponent /> : <ListComponent />}
      </div>
    </div>
  );
};

export default Event;
