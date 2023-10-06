import central_logo from "../assets/img/central.png";
import robinson_logo from "../assets/img/robinson.png";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const GenerateMonth = (data) => {
  return (
    <div>
      <div className="flex space-x-1">
        <div className="text-sm font-bold font-poppins">{data.month.value}</div>
        <div className="flex items-end ">
          {data.month.is_up ? (
            <div className="flex text-[#008A1E] font-bold text-[10px]">
              <ImArrowUp size={10} className="relative" />
              <div className="relative">{data.month.percent}%</div>
            </div>
          ) : (
            <div className="flex text-red-500 font-bold text-[10px]">
              <ImArrowDown size={10} className="relative" />
              <div className="relative">{data.month.percent}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const dashboardData = [
  {
    id: 1,
    store: 1,
    jan: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 2,
    store: 2,
    jan: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 41,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 11,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 19,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 10,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 3,
    store: 2,
    jan: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 4,
    store: 1,
    jan: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 41,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 11,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 19,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 10,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 5,
    store: 1,
    jan: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
];

export const getImg = (id) => {
  let img;
  if (id === 1) {
    img = central_logo;
  } else if (id === 2) {
    img = robinson_logo;
  }

  return img;
};

export const GridTable = () => {
  return (
    <>
      <div className="w-auto h-[400px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Jan
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Feb
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Mar
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Apr
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                May
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Jun
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Aug
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Sep
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Oct
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Nov
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-sm font-poppins font-normal text-[#59606C] tracking-wider">
                Dec
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  {row.id}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                  <img
                    className="w-[40px] h-[40px] rounded-md"
                    src={getImg(row.store)}
                  />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.jan} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.feb} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.mar} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.apr} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.may} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.jun} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.aug} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.sep} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.oct} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.nov} />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b font-poppins border-gray-200">
                  <GenerateMonth month={row.dec} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
