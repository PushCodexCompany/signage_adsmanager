import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEditLine, RiShareBoxLine } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import User from "../libs/admin";
import Swal from "sweetalert2";

export const GridTable = ({ media_rules }) => {
  console.log("media_rules", media_rules);
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

    navigate("/setting/media_rule/create", { state: { data: data } });
  };

  const onClickDelete = async (MediaRuleID) => {
    const { token } = User.getCookieData();
    const data = await User.deleteMediaRule(MediaRuleID, token);
    console.log("data", data);
    if (data.code !== 404) {
      Swal.fire({
        icon: "success",
        title: "Delete Media Rule Success ...",
        text: `ลบ Media Rule สำเร็จ!`,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.backdrop
        ) {
          navigate("/setting/media_rule");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: data.message,
      });
    }
  };

  // const onClickView = (data) => {
  //   alert(`View : ${data}`);
  // };

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
              {/* <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Screen
              </th> */}
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
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
                      className="bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1"
                      style={{ flexBasis: "calc(30% - 8px)" }}
                    >
                      <div className="font-poppins text-sm font-bold text-[#6425FE] ">
                        Resolution :
                        {row.Width && row.Height
                          ? `${parseFloat(row.Width).toString()}x${parseFloat(
                              row.Height
                            ).toString()}`
                          : "Not Set"}
                      </div>
                    </div>
                    <div
                      className="bg-[#D9D9D9] flex justify-center items-center mb-1 mr-1"
                      style={{ flexBasis: "calc(30% - 8px)" }}
                    >
                      <div className="font-poppins text-sm font-bold text-[#6425FE] ">
                        Ads Capacity : {row.AdsCapacity}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                  <div className="space-x-2">
                    <button onClick={() => onClickEdit(row)}>
                      <FiExternalLink
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                    </button>
                    <button onClick={() => onClickEdit(row)}>
                      <RiEditLine
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
                    </button>
                    <button onClick={() => onClickDelete(row.MediaRuleID)}>
                      <RiDeleteBin5Line
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694]"
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
