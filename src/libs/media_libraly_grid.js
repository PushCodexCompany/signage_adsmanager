import React, { useState, useEffect } from "react";
import {
  RiDeleteBin5Line,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import Media_Player from "../components/Media_Libraly_Player";
import Swal from "sweetalert2";
import User from "../libs/admin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const GridTable = ({
  media_libraly_data,
  all_pages,
  searchTerm,
  page_permission,
}) => {
  const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
  const [mediaDisplay, setMediaDisplay] = useState([]);
  const { token } = User.getCookieData();

  const onClickPlay = (source) => {
    const duration = JSON.parse(source.ContentProperties).duration;

    if (duration) {
      source.ContentTypeName = "Video";
    } else {
      source.ContentTypeName = "Image";
    }
    setMediaDisplay(source);
    setModalPlayerOpen(!modalPlayerOpen);
  };

  const onClickDownload = (source) => {
    const url = source.ContentSource;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onClickDelete = async (source) => {
    Swal.fire({
      text: `คุณต้องการลบ Media : ${source.ContentName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const obj = {
            contentid: source.ContentID,
          };
          const data = await User.deleteMedia(obj, token);
          if (data.code !== 404) {
            Swal.fire({
              icon: "success",
              title: `Delete Media สำเร็จ!`,
              text: `Media : ${source.ContentName} ถูกลบสำเร็จ!`,
            }).then(async (result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                const data = await fetchDataForPage(currentPage);
                setData(data.media);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {}
      }
    });
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

  // table

  const [data, setData] = useState(media_libraly_data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const totalPages = all_pages ? all_pages : 0;

  useEffect(() => {
    setData(media_libraly_data);
  }, [media_libraly_data]);

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getMedias(token, page, searchTerm);
      return data;
    }
  };

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.media);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.media);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.media);
    }
  };

  const handlePageInputChange = (e) => {
    setPageInput(parseInt(e.target.value));
  };

  const handlePageInputBlur = async () => {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const data = await fetchDataForPage(page);
      setData(data.media);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const renderTableData = () => {
    return (
      <>
        {data?.map((row, index) => (
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
                {parseFloat(JSON.parse(row.ContentProperties).size).toFixed(2)}{" "}
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
                {page_permission?.view ? (
                  <button
                    className="relative group"
                    onClick={() => onClickPlay(row)}
                  >
                    <RiPlayCircleLine
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Preview Media
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {page_permission?.view ? (
                  <button
                    className="relative group"
                    onClick={() => onClickDownload(row)}
                  >
                    <RiDownloadCloud2Line
                      size={20}
                      className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                    />
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Download Media
                    </div>
                  </button>
                ) : (
                  <></>
                )}
                {page_permission?.delete ? (
                  <button
                    className="relative group"
                    onClick={() => onClickDelete(row)}
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
                    <div
                      style={{ pointerEvents: "none" }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Delete Media
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

  const renderPageNumbers = () => {
    let displayPages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        displayPages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        displayPages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        displayPages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        displayPages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return displayPages?.map((number, index) => (
      <button
        key={index}
        className={`px-3 py-1 mx-1 ${
          currentPage === number
            ? "text-[#6425FE] rounded-md border border-[#6425FE]"
            : "text-[#bfbfbf]"
        }  font-poppins font-bold`}
        onClick={() => number !== "..." && handleClick(number)}
        disabled={number === "..."}
      >
        {number}
      </button>
    ));
  };

  return (
    <>
      <div>
        <div className="w-auto h-[480px] overflow-auto">
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
                  Customer
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
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-6">
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
        </div>
      </div>

      {modalPlayerOpen && (
        <a
          onClick={() => {
            setModalPlayerOpen(!modalPlayerOpen);
          }}
          className="fixed top-0 w-full left-[0px] h-full opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalPlayerOpen && (
        <Media_Player
          mediaDisplay={mediaDisplay}
          setModalPlayerOpen={setModalPlayerOpen}
          modalPlayerOpen={modalPlayerOpen}
          setMediaDisplay={setMediaDisplay}
        />
      )}
    </>
  );
};
