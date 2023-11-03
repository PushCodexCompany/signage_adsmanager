import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import central_logo from "../assets/img/central.jpeg";
import robinson_logo from "../assets/img/robinson.png";

import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiCaretUpDown } from "react-icons/pi";

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

const getImgBrand = (id) => {
  let img;
  if (id === 1) {
    img = central_logo;
  } else if (id === 9) {
    img = robinson_logo;
  }

  return img;
};

const onClickAction = (id) => {
  alert(`click : ${id}`);
};

const dashboardData = [
  {
    id: 1,
    username_email: ["User0123", "useradmin@mail.com"],
    brand: [1],
    merchandise: [1, 2, 3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 2,
    username_email: ["Admin01", "teerachai_14@mail.com"],
    brand: [9],
    merchandise: [3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 3,
    username_email: ["CDS_Admin", "cdspro_a@mail.com"],
    brand: [1, 9],
    merchandise: [4],
    status: 1,
    role: 0,
  },
  {
    id: 4,
    username_email: ["CDS_Sale01", "cds_sale41@mail.com"],
    brand: [9],
    merchandise: [2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    brand: [1],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
];

export const GridTable = () => {
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
                Username
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl">{row.id}</div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-xl font-bold ">
                    {row.username_email[0]}
                  </div>
                  <div className="font-poppins text-sm text-gray-500">
                    {row.username_email[1]}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex space-x-1 ">
                    {row.brand.map((items) => (
                      <img
                        className="w-[50px] h-[50px] rounded-md"
                        src={getImgBrand(items)}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex space-x-1 ">
                    {row.merchandise.map((items) => (
                      <img
                        className="w-[50px] h-[50px] rounded-md"
                        src={getImg(items)}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      defaultValue={row.status}
                    >
                      <option value="1">Active</option>
                      <option value="0">Deactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <PiCaretUpDown size="18" color="#6425FE" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      defaultValue={row.role}
                    >
                      <option value="0">Admin</option>
                      <option value="1">User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <PiCaretUpDown size="18" color="#6425FE" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <button onClick={() => onClickAction(row.id)}>
                    <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
