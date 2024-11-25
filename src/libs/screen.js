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

import { RiEditLine } from "react-icons/ri";

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

const eventData = [
  {
    id: 1,
    event_name: "Event 1",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 2,
    event_name: "Event 2",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 3,
    event_name: "Event 3",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 4,
    event_name: "Event 4",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 5,
    event_name: "Event 5",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 6,
    event_name: "Event 6",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 7,
    event_name: "Event 7",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 8,
    event_name: "Event 8",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 9,
    event_name: "Event 9",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 10,
    event_name: "Event 10",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 11,
    event_name: "Event 11",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 12,
    event_name: "Event 12",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 13,
    event_name: "Event 13",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 14,
    event_name: "Event 14",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 15,
    event_name: "Event 15",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 16,
    event_name: "Event 16",
    des: "The event typically includes runway shows, exhibitions ",
  },
];

const onClickEdit = (id) => {
  alert(`edit : ${id}`);
};

export const GridTable = () => {
  return (
    <>
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
                  className="w-[80%] bg-[#6425FE]  hover:bg-[#3b1694] text-white py-2 rounded-lg font-bold font-poppins "
                >
                  Edit
                </button>
                <button
                  onClick={() => alert(`delete : ${items.name}`)}
                  className="w-[80%] bg-white text-[#6425FE] border border-[#6425FE]  py-2 rounded-lg font-bold font-poppins"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const ListTable = () => {
  return (
    <div className="w-auto h-[600px] overflow-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
              Event Name
            </th>
            <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
              Description
            </th>
            <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200">
                <div className="font-poppins text-md">{row.event_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b  border-gray-200 ">
                <div className="font-poppins text-md">{row.des}</div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap border-b  border-gray-200">
                <div className="space-x-2">
                  <button onClick={() => onClickEdit(row.id)}>
                    <RiEditLine size={20} className="text-[#6425FE]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
