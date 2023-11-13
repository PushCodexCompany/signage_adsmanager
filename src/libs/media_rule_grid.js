import { useNavigate } from "react-router-dom";
import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin5Line, RiEditLine, RiShareBoxLine } from "react-icons/ri";

const dashboardData = [
  {
    id: 1,
    type: "Resolution",
    name: "1080x1920",
    screen: 7,
  },
  {
    id: 2,
    type: "Ads Limit",
    name: "Facade - 12Clients",
    screen: 4,
  },
];

export const GridTable = () => {
  const navigate = useNavigate();

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

  const onClickEdit = (id) => {
    navigate("/setting/media_rule/create", { state: { id: id } });
  };

  const onClickDelete = (id) => {
    alert(`delete : ${id}`);
  };

  const onClickView = (id) => {
    alert(`View : ${id}`);
  };

  return (
    <>
      <div className="w-auto h-[600px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Rule Type
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Rule Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Screen
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">{row.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md text-[#6425FE]">
                    {row.type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">{row.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md ">{row.screen}</div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickEdit(row.id)}>
                      <RiEditLine size={20} className="text-gray-400" />
                    </button>
                    <button onClick={() => onClickDelete(row.id)}>
                      <RiDeleteBin5Line size={20} className="text-gray-400" />
                    </button>
                    <button onClick={() => onClickView(row.id)}>
                      <RiShareBoxLine size={20} className="text-gray-400" />
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
