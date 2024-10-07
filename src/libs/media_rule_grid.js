import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import User from "../libs/admin";
import Swal from "sweetalert2";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const GridTable = ({ media_rules, getMediaRulesData }) => {
  const { token } = User.getCookieData();
  const [modalViewScreen, setModalViewScreen] = useState(false);

  // Screen
  const [rule_select, setRuleSelect] = useState(null);
  const [all_pages, setAllPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [screen_data, setData] = useState([]);
  const totalPages = all_pages ? all_pages : 0;
  const [pageInput, setPageInput] = useState("");

  const navigate = useNavigate();

  const onClickEdit = (data) => {
    if (data.Height === "") {
      data.Height = 0;
    } else {
      data.Height = parseFloat(data.Height);
    }

    if (data.Width === "") {
      data.Width = 0;
    } else {
      data.Width = parseFloat(data.Width);
    }

    navigate("/setting/media_rule/create", {
      state: { data: data, isView: false },
    });
  };

  const onClickDelete = async (MediaRuleName, MediaRuleID) => {
    Swal.fire({
      title: "คุณต้องการลบ Media Rule?",
      text: `คุณต้องการลบ Media Rule : ${MediaRuleName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { token } = User.getCookieData();
        const data = await User.deleteMediaRule(MediaRuleID, token);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "ลบ Media Rule สำเร็จ",
            text: `ลบ Media Rule ${MediaRuleName} แล้ว`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getMediaRulesData();
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
  };

  const onClickView = (data) => {
    navigate("/setting/media_rule/create", {
      state: { data: data, isView: true },
    });
  };

  const handleMediaRuleViewScreen = async (mediarule_id) => {
    setRuleSelect(mediarule_id);
    setModalViewScreen(!modalViewScreen);
  };

  // Screen View

  useEffect(async () => {
    const data = await User.getScreenListFromMediaRule(token, 1, rule_select);
    if (data.code === 200) {
      setData(data.screens);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  }, [rule_select]);

  const fetchDataForPage = async (page) => {
    if (page) {
      const data = await User.getScreenListFromMediaRule(
        token,
        page,
        rule_select
      );
      return data;
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.screens);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const data = await fetchDataForPage(newPage);
      setData(data.screens);
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
      setData(data.screens);
    }
    setPageInput("");
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
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

    return displayPages.map((number, index) => (
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

  const handleClick = async (page) => {
    setCurrentPage(page);
    setPageInput("");
    const data = await fetchDataForPage(page);
    setData(data.screens);
  };

  const renderTableData = () => {
    return (
      <>
        {screen_data.map((row, key) => {
          const status_screen = row?.screen_status ? row?.screen_status : false;

          return (
            <tr key={row.ScreenID}>
              <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="font-poppins text-md font-bold ">
                    {row.ScreenID}
                  </div>
                </div>
              </td>
              <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="flex">
                  <div className="font-poppins text-md font-bold truncate max-w-[100px]">
                    <div className="flex">
                      {row.ScreenName}
                      {status_screen === 1 ? (
                        <div className="bg-[#00C32B] w-[5px] h-[5px]  rounded-xl"></div>
                      ) : (
                        <div className="bg-red-500 w-[5px] h-[5px]  rounded-xl"></div>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-1 py-2 whitespace-nowrap border-b border-gray-200">
                <div className="flex justify-start items-center group relative">
                  <div className="font-poppins text-md text-[#59606C] font-medium truncate max-w-[300px]">
                    {row.ScreenLocation.length > 39 ? (
                      <>
                        {row.ScreenLocation.slice(0, 36) + "..."}
                        <span
                          style={{ pointerEvents: "none" }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          {row.ScreenLocation}
                        </span>
                      </>
                    ) : (
                      <>{row.ScreenLocation}</>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                <div className="flex justify-center items-center font-poppins font-bold">
                  {/* {findScreenResolutionID(row.ScreenResolutionID)} */}
                  {row?.ScreenRule[0]?.Width && row?.ScreenRule[0]?.Height
                    ? `W ${parseInt(row.ScreenRule[0].Width, 10)}` +
                      " x " +
                      `H ${parseInt(row.ScreenRule[0].Height, 10)}`
                    : "Not Set"}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                <div className="font-poppins font-bold border border-[#DBDBDB] shadow-lg rounded-lg">
                  {row.ScreenRule[0]?.AdsCapacity || "No Data"}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                <div className="font-poppins font-bold border border-[#DBDBDB] shadow-lg rounded-lg">
                  {row.loopDuration ? `${row.loopDuration} Second` : "No Data"}
                </div>
              </td>
              <td className="px-1 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex flex-wrap">
                  {row.ScreenTag.length > 0 ? (
                    row.ScreenTag.map((items, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 shadow-lg rounded-lg flex justify-center items-center mb-1 mr-1"
                        style={{ padding: "2px 4px" }}
                      >
                        <div className="p-1">
                          <div
                            className="font-poppins text-xs font-bold"
                            style={{ fontSize: "11px" }}
                          >
                            {items.TagName}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                      style={{
                        flexBasis: "calc(100% - 8px)",
                        padding: "2px 4px",
                      }}
                    >
                      <div
                        className="font-poppins text-xs font-bold"
                        style={{ fontSize: "10px" }}
                      >
                        No Tag
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="w-auto h-[480px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[100px]">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[400px]">
                Rule Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[500px]">
                Rule Properties
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Screens
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {media_rules.map((row) => (
              <tr key={row.MediaRuleID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-md">{row.MediaRuleID}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="font-poppins text-lg text-[#59606C]">
                    {row.MediaRuleName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex flex-wrap">
                    <div
                      className="bg-[#D9D9D9] flex justify-center h-[25px] items-center mb-1 mr-1 shadow-lg"
                      style={{ flexBasis: "calc(45% - 8px)" }}
                    >
                      <div className="font-poppins text-sm font-bold text-[#6425FE] ">
                        Resolution :
                        {row.Width && row.Height
                          ? `W ${parseFloat(
                              row.Width
                            ).toString()} x H ${parseFloat(
                              row.Height
                            ).toString()}`
                          : "Not Set"}
                      </div>
                    </div>
                    <div
                      className="bg-[#D9D9D9] flex justify-center h-[25px] items-center mb-1 mr-1 shadow-lg"
                      style={{ flexBasis: "calc(35% - 8px)" }}
                    >
                      <div className="font-poppins text-sm font-bold text-[#6425FE] ">
                        Ads Capacity : {row.AdsCapacity}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex items-center justify-center">
                    <div
                      onClick={() => handleMediaRuleViewScreen(row.MediaRuleID)}
                      className="font-poppins font-bold text-md  underline text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                    >
                      {row.TotalInUse}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button
                      className="relative group"
                      onClick={() => onClickView(row)}
                    >
                      <FiExternalLink
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                      <div
                        style={{ pointerEvents: "none" }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Media Rule
                      </div>
                    </button>
                    <button
                      disabled={row.TotalInUse > 0 ? true : false}
                      onClick={() => onClickEdit(row)}
                      className="relative group"
                    >
                      <RiEditLine
                        size={20}
                        className={`${
                          row.TotalInUse > 0
                            ? "text-[#B9B7BD] hover:text-[#6e6d70]"
                            : "text-[#6425FE] hover:text-[#3b1694]"
                        }`}
                      />
                      <div
                        style={{ pointerEvents: "none" }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Edit Media Rule
                      </div>
                    </button>
                    <button
                      disabled={row.TotalInUse > 0 ? true : false}
                      onClick={() =>
                        onClickDelete(row.MediaRuleName, row.MediaRuleID)
                      }
                      className="relative group"
                    >
                      <RiDeleteBin5Line
                        size={20}
                        className={`${
                          row.TotalInUse > 0
                            ? "text-[#B9B7BD] hover:text-[#6e6d70]"
                            : "text-[#6425FE] hover:text-[#3b1694]"
                        }`}
                      />
                      <div
                        style={{ pointerEvents: "none" }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[150px] w-auto p-2 font-poppins bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Delete Media Rule
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalViewScreen && (
        <a
          onClick={() => setModalViewScreen(!modalViewScreen)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalViewScreen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          {/* Main centered content container */}
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            {/* Close button - adjust positioning */}
            <div className={`absolute -top-4 -right-4 m-4 z-40`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button
                  onClick={() => {
                    setModalViewScreen(!modalViewScreen);
                  }}
                >
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

            {/* Content Container */}

            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Screen List</div>
            </div>
            <div className="h-[550px] overflow-y-auto">
              <div className="mt-10 mx-10">
                {screen_data?.length > 0 ? (
                  <div className="w-auto h-[480px] overflow-auto ">
                    <table className="min-w-full border border-gray-300">
                      <thead>
                        <tr>
                          <th className="px-1 py-5 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-medium text-[#59606C] tracking-wider w-[50px]">
                            ID
                          </th>
                          <th className="px-1 py-2 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-medium text-[#59606C] tracking-wider w-[130px]">
                            Screen Name
                          </th>
                          <th className="px-1 py-2 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[300px]">
                            Location
                          </th>
                          <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[150px]">
                            Media Rule
                          </th>
                          <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[130px]">
                            Slot Per Day
                          </th>
                          <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[130px]">
                            Loop Duration
                          </th>
                          <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider w-[400px]">
                            Tag
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableData()}</tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[550px] text-center ">
                    <div className="font-poppins text-5xl text-[#dedede]">
                      --- No data ---
                    </div>
                  </div>
                )}
              </div>
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
        </div>
      )}
    </>
  );
};
