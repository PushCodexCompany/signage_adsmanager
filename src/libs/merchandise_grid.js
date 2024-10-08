import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import User from "../libs/admin";
import Swal from "sweetalert2";
import Encryption from "../libs/encryption";

export const GridTable = ({ merchandise, page_permission, getMerchendise }) => {
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const [data, setData] = useState(merchandise);

  const [screen_data, setScreenData] = useState([]);
  const [edit_merchandise, setEditMerchandise] = useState([]);

  useEffect(() => {
    setData(merchandise);
  }, [merchandise]);

  const handleDeleteMerchandise = async (merchandise_id, merchandise_name) => {
    try {
      Swal.fire({
        title: "คุณต้องการลบ Customer ?",
        text: `คุณต้องการลบ Customer : ${merchandise_name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { brand_code } = User.getBrandCode();
          const obj = {
            advertiserid: merchandise_id,
            brandcode: brand_code,
          };
          const { token } = User.getCookieData();
          const encrypted = await Encryption.encryption(
            obj,
            "delete_merchandise",
            false
          );
          const data = await User.deleteMerchandise(encrypted, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "ลบ Customer สำเร็จ!",
              text: `ลบ Customer สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                getMerchendise();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        }
      });
    } catch (error) {
      console.error("Error save account:", error);
    }
  };

  const handleEditMerchandise = (merchandise) => {
    navigate(`/edit_merchandise/${merchandise.AdvertiserID}`, {
      state: { merchandise: merchandise },
    });
  };

  const renderTableData = () => {
    return (
      <>
        {data.map((row, index) => (
          <tr key={row.AdvertiserID}>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="font-poppins text-md flex justify-center">
                {row.AdvertiserID}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 ">
              <div
                // onClick={() => handleSelectBooking(row)}
                className="font-poppins text-xl  text-[#6425FE]"
              >
                {row.AdvertiserName}
              </div>
              <div className="font-poppins text-sm text-gray-500">
                {row.AccountCode}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="flex items-center justify-center">
                <img
                  className="w-[60px] h-[60px] border border-gray-300 shadow-sm rounded-md object-contain"
                  src={
                    row.AdvertiserLogo
                      ? row.AdvertiserLogo
                      : `https://ui-avatars.com/api/?name=${
                          row.AdvertiserName
                        }&background=${"000000"}&color=fff`
                  }
                  alt={row.AdvertiserName}
                />
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
              <div className="font-poppins text-xl flex justify-center items-center">
                {row.ContactName ? row.ContactName : "Not Set"}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200 text-center">
              <div className="space-x-2">
                {page_permission?.update ? (
                  <button
                    className="relative group"
                    onClick={() => {
                      setEditMerchandise(row);
                      handleEditMerchandise(row);
                    }}
                  >
                    <RiEditLine
                      size={20}
                      className={`${"text-[#6425FE] hover:text-[#3b1694]"} cursor-pointer`}
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Edit Customer
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {page_permission?.delete ? (
                  <button
                    className="relative group"
                    onClick={() => {
                      handleDeleteMerchandise(
                        row.AdvertiserID,
                        row.AdvertiserName
                      );
                    }}
                  >
                    <RiDeleteBin5Line
                      size={20}
                      className={`${"text-[#6425FE] hover:text-[#3b1694]"} cursor-pointer`}
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Delete Customer
                    </div>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  //   const renderPageNumbers = () => {
  //     let displayPages = [];

  //     if (totalPages <= 4) {
  //       for (let i = 1; i <= totalPages; i++) {
  //         displayPages.push(i);
  //       }
  //     } else {
  //       if (currentPage <= 4) {
  //         displayPages = [1, 2, 3, 4, "...", totalPages];
  //       } else if (currentPage >= totalPages - 3) {
  //         displayPages = [
  //           1,
  //           "...",
  //           totalPages - 3,
  //           totalPages - 2,
  //           totalPages - 1,
  //           totalPages,
  //         ];
  //       } else {
  //         displayPages = [
  //           1,
  //           "...",
  //           currentPage - 1,
  //           currentPage,
  //           currentPage + 1,
  //           "...",
  //           totalPages,
  //         ];
  //       }
  //     }

  //     return displayPages.map((number, index) => (
  //       <button
  //         key={index}
  //         className={`px-3 py-1 mx-1 ${
  //           currentPage === number
  //             ? "text-[#6425FE] rounded-md border border-[#6425FE]"
  //             : "text-[#bfbfbf]"
  //         }  font-poppins font-bold`}
  //         onClick={() => number !== "..." && handleClick(number)}
  //         disabled={number === "..."}
  //       >
  //         {number}
  //       </button>
  //     ));
  //   };

  return (
    <>
      <div>
        <div className="w-auto h-[480px] overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Contact Name
                </th>
                {/* <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Booking Status
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Content Status
              </th> */}
                <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
        {/* <div className="flex justify-center items-center mt-6">
          <IoIosArrowBack
            onClick={handlePrevPage}
            size={26}
            className={`${
              currentPage === 1
                ? "text-[#bfbfbf]"
                : "cursor-pointer hover:text-[#bfbfbf]"
            }`}
          />
          {renderPageNumbers()}
          <IoIosArrowForward
            onClick={handleNextPage}
            size={26}
            className={`${
              currentPage === totalPages
                ? "text-[#bfbfbf]"
                : "cursor-pointer hover:text-[#bfbfbf]"
            }`}
          />
          <div className="font-poppins font-bold ml-2">Go to</div>
          <input
            type="number"
            min={1}
            value={pageInput}
            onKeyPress={handlePageInputKeyPress}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            className="w-[50px] h-[35px] ml-1 mr-1 border border-gray-300 rounded-sm pl-1 font-poppins"
          />
          <div className="font-poppins font-bold">Page</div>
        </div> */}
      </div>
    </>
  );
};
