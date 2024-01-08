import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin5Line, RiEditLine, RiShareBoxLine } from "react-icons/ri";

const getImg = (id) => {
  let img;
  if (id === 1) {
    img = topImg;
  } else if (id === 2) {
    img = matsumotoImg;
  } else if (id === 3) {
    img = supersportImg;
  } else if (id === 4) {
    img = powerbuyImg;
  }

  return img;
};

const get_content_type = (id) => {
  let type;
  if (id === 1) {
    type = "STW Promotion";
  } else if (id === 2) {
    type = "Brand";
  } else if (id === 3) {
    type = "Credit Card";
  } else if (id === 4) {
    type = "Category";
  }

  return type;
};

const getBooking = (id) => {
  let booking;

  if (id === 1) {
    booking = ["Pending Review", true];
  } else if (id === 2) {
    booking = ["Need Revise", false];
  } else if (id === 3) {
    booking = ["Rejected", false];
  } else if (id === 4) {
    booking = ["Approved", true];
  }

  return booking;
};

const getContentStatus = (id) => {
  let content;

  if (id === 1) {
    content = ["LOCKED", false];
  } else if (id === 2) {
    content = ["Need Revise", true];
  }

  return content;
};

const onClickEdit = (id) => {
  alert(`edit : ${id}`);
};

export const bookingData = [
  {
    id: 1,
    booking_name: ["Booking Name 1", "CDS-BT-230101-004"],
    content_type: 1,
    merchandise: 1,
    screen: 7,
    slot: 10,
    booking_status: 1,
    content: 1,
  },
  {
    id: 2,
    booking_name: ["Booking Name 2", "CDS-BT-230101-002"],
    content_type: 2,
    merchandise: 3,
    screen: 4,
    slot: 5,
    booking_status: 2,
    content: 1,
  },
  {
    id: 3,
    booking_name: ["Booking Name 3", "CDS-BT-230101-003"],
    content_type: 3,
    merchandise: 4,
    screen: 6,
    slot: 5,
    booking_status: 3,
    content: 1,
  },
  {
    id: 4,
    booking_name: ["Booking Name 4", "CDS-BT-230101-004"],
    content_type: 4,
    merchandise: 2,
    screen: 7,
    slot: 10,
    booking_status: 4,
    content: 2,
  },
  {
    id: 5,
    booking_name: ["Booking Name 5", "CDS-BT-230101-005"],
    content_type: 2,
    merchandise: 1,
    screen: 12,
    slot: 10,
    booking_status: 4,
    content: 2,
  },
];

export const GridTable = () => {
  return (
    <>
      <div className="w-auto h-[600px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Booking Name
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider ">
                Content Type
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Screens
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Slots
              </th>
              {/* <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Booking Status
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Content Status
              </th> */}
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">{row.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 ">
                  <div className="font-poppins text-xl  text-[#6425FE]">
                    {row.booking_name[0]}
                  </div>
                  <div className="font-poppins text-sm text-gray-500">
                    {row.booking_name[1]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md flex font-bold items-center justify-center">
                    {get_content_type(row.content_type)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-[60px] h-[60px] rounded-md"
                      src={getImg(row.merchandise)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    {row.screen}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    {row.slot}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    <span
                      className={`text-lg font-bold font-poppins ${
                        getBooking(row.booking_status)[1]
                          ? "text-[#0CA71B]"
                          : "text-[#FF0000]"
                      }`}
                    >
                      {getBooking(row.booking_status)[0]}
                    </span>
                  </div>
                </td> */}
                {/* <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    <span
                      className={`text-lg font-bold font-poppins ${
                        getContentStatus(row.content)[1]
                          ? "text-[#0CA71B]"
                          : "text-[#B9B7BD]"
                      }`}
                    >
                      {getContentStatus(row.content)[0]}
                    </span>
                  </div>
                </td> */}

                <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
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
    </>
  );
};
