import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEditLine, RiShareBoxLine } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import User from "../libs/admin";
import Swal from "sweetalert2";
import { IoIosClose } from "react-icons/io";

export const GridTable = ({ media_rules, getMediaRulesData }) => {
  const [modalViewScreen, setModalViewScreen] = useState(false);

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
        if (data.code !== 404) {
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

  return (
    <>
      <div className="w-auto h-[480px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
                Rule Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-[16px] font-poppins font-normal text-[#59606C] tracking-wider">
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
                      className="bg-[#D9D9D9] flex justify-center h-[25px] items-center mb-1 mr-1"
                      style={{ flexBasis: "calc(38% - 8px)" }}
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
                      className="bg-[#D9D9D9] flex justify-center h-[25px] items-center mb-1 mr-1"
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
                      onClick={() => setModalViewScreen(!modalViewScreen)}
                      className="font-poppins text-md text-[#59606C] hover:text-[#3b4047] cursor-pointer"
                    >
                      {row.TotalInUse}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickView(row)}>
                      <FiExternalLink
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                    </button>
                    <button
                      // disabled={row.TotalInUse > 0 ? true : false}
                      onClick={() => onClickEdit(row)}
                    >
                      <RiEditLine
                        size={20}
                        className={`${
                          row.TotalInUse > 0
                            ? "text-[#B9B7BD]"
                            : "text-[#6425FE] hover:text-[#3b1694]"
                        }`}
                      />
                    </button>
                    <button
                      disabled={row.TotalInUse > 0 ? true : false}
                      onClick={() =>
                        onClickDelete(row.MediaRuleName, row.MediaRuleID)
                      }
                    >
                      <RiDeleteBin5Line
                        size={20}
                        className={`${
                          row.TotalInUse > 0
                            ? "text-[#B9B7BD]"
                            : "text-[#6425FE] hover:text-[#3b1694]"
                        }`}
                      />
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
              <div className="mt-10 mx-40">Screen List ...</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
