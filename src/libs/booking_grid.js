import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";
import { bookingData } from "../data/mockup";
import { useNavigate } from "react-router-dom";

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

export const GridTable = () => {
  const navigate = useNavigate();

  const onClickEdit = (obj) => {
    navigate(`/booking/${obj.booking_name[0]}`, {
      state: { data: obj, isConfirmed: true },
    });
  };

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
                    {row.content_type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-[60px] h-[60px] rounded-md object-cover"
                      src={row.merchandise.AdvertiserLogo}
                      alt={row.merchandise.AdvertiserName}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    {row.screen.length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl flex justify-center items-center">
                    {row.booking_slot}
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickEdit(row)}>
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
