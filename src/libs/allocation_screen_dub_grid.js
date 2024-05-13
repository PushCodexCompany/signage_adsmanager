import React from "react";

export const GridTable = ({ screenUsePlaylist }) => {
  return (
    <>
      <div className="w-auto h-[580px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-2 py-5 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                No
              </th>
              <th className="px-7 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                Screen Name
              </th>
              <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {screenUsePlaylist.length > 0 &&
              screenUsePlaylist.map((row, key) => (
                <tr key={row.ScreenID}>
                  <td className="px-2 py-5 whitespace-no-wrap border-b  border-gray-200">
                    <div className="flex items-center justify-center">
                      <div className="font-poppins text-xl font-bold">
                        {key + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-7 py-4 whitespace-no-wrap border-b  border-gray-200">
                    <div className="flex">
                      <div className="font-poppins text-xl font-bold cursor-pointer">
                        {row.ScreenName}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins text-sm font-bold ">
                      <div className="text-[#59606C]">
                        {" "}
                        {row.ScreenLocation || "No Data"}
                      </div>
                      <div className="text-black">
                        {" "}
                        {row.ScreenCity || "No Data"}
                      </div>
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
