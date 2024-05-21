import {
  RiDeleteBin5Line,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";

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

export const GridTable = ({ media_libraly_data }) => {
  return (
    <>
      <div className="w-auto h-[580px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                File Size
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {media_libraly_data.map((row) => (
              <tr key={row.ContentID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.ContentID}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.ContentName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {row.MerchandiseName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {parseFloat(JSON.parse(row.ContentProperties).size).toFixed(
                      2
                    )}{" "}
                    MB
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md font-bold">
                    {generateStatus(row.ActiveStats)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickPlay(row.id)}>
                      <RiPlayCircleLine
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                    <button onClick={() => onClickDownload(row.id)}>
                      <RiDownloadCloud2Line
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                    <button
                      onClick={() => onClickDelete(row.ContentID)}
                      disabled={row.ActiveStats === 0 ? false : true}
                    >
                      <RiDeleteBin5Line
                        size={20}
                        className={`${
                          row.ActiveStats === 0
                            ? "text-[#6425FE] hover:text-[#3b1694] "
                            : "text-[#dbdbdb] hover:text-[#dbdbdb]"
                        } cursor-pointer`}
                      />
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
