import React, { useState } from "react";
import {
  RiDeleteBin5Line,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import Media_Player from "../components/Media_Libraly_Player";
import Swal from "sweetalert2";
import User from "../libs/admin";

export const GridTable = ({ media_libraly_data, setMediaLibralyData }) => {
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
    link.download = source.ContentName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMediaLibralyData = async () => {
    const data = await User.get_medias(token);
    setMediaLibralyData(data);
  };

  const onClickDelete = async (source) => {
    Swal.fire({
      text: `คุณต้องการลบ Media : ${source.ContentName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
      cancelButtonText: "ยกเลิก",
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
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                getMediaLibralyData();
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
                    <button onClick={() => onClickPlay(row)}>
                      <RiPlayCircleLine
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                    <button onClick={() => onClickDownload(row)}>
                      <RiDownloadCloud2Line
                        size={20}
                        className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                      />
                    </button>
                    <button
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
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalPlayerOpen && (
        <a
          onClick={() => {
            setModalPlayerOpen(!modalPlayerOpen);
          }}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
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
