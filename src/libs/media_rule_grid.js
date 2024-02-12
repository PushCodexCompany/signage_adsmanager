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
    name: "1080x1920",
    rule_properties: ["Resolution: 1080x1920", "Ads Capacity:5"],
    screen: 7,
  },
  {
    id: 2,
    name: "1920x1080",
    rule_properties: ["Resolution: 1920x1080", "Ads Capacity:10"],
    screen: 4,
  },
];

export const GridTable = () => {
  const navigate = useNavigate();

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
                Rule Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Rule Properties
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
                  <div className="font-poppins text-md text-[#59606C]">
                    {row.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex flex-wrap">
                    {row.rule_properties.map((items, index) => (
                      <div
                        key={index}
                        className="bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1"
                        style={{ flexBasis: "calc(30% - 8px)" }}
                      >
                        <div className="font-poppins text-sm text-[#6425FE] ">
                          {items}
                        </div>
                      </div>
                    ))}
                  </div>
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
