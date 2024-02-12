import {
  RiDeleteBin5Line,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";

const calculateSize = (fileSizeInKB) => {
  const units = ["bytes", "KB", "MB", "GB"];
  let l = 0,
    n = parseInt(fileSizeInKB, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

const generateStatus = (id) => {
  const getStatus = (id) => {
    let status;

    if (id === 0) {
      status = ["Inactive", false];
    } else if (id === 1) {
      status = ["Active", true];
    }

    return status;
  };

  return (
    <div>
      <div
        className={`text-lg  font-poppins ${
          getStatus(id)[1] ? "text-[#0CA71B]" : "text-[#FF0000]"
        }`}
      >
        {getStatus(id)[0]}
      </div>
    </div>
  );
};

const onClickPlay = (id) => {
  alert(`Play : ${id}`);
};

const onClickDownload = (id) => {
  alert(`Download : ${id}`);
};

const onClickDelete = (id) => {
  alert(`Delete : ${id}`);
};

const dashboardData = [
  {
    id: 1,
    file_name: "Summer Sale 2023 Ads.mp4",
    merchandise: "Super Sports",
    size: "130000000",
    status: 1,
  },
  {
    id: 2,
    file_name: "Midnight Sale 2023.png",
    merchandise: "TOPS",
    size: "476000",
    status: 0,
  },
  {
    id: 3,
    file_name: "Promotion Event Ads.mp4",
    merchandise: "TOPS",
    size: "55000000",
    status: 1,
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
                File Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                File Size
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Status
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
                  <div className="font-poppins text-md font-bold">{row.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.file_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.merchandise}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {calculateSize(row.size)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {generateStatus(row.status)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickPlay(row.id)}>
                      <RiPlayCircleLine size={24} color={"#6324FF"} />
                    </button>
                    <button onClick={() => onClickDownload(row.id)}>
                      <RiDownloadCloud2Line size={24} color={"#6324FF"} />
                    </button>
                    <button onClick={() => onClickDelete(row.id)}>
                      <RiDeleteBin5Line size={24} color={"#6324FF"} />
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
