import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import User from "../libs/admin";
import { FiImage, FiVideo } from "react-icons/fi";
import { RiPlayCircleLine } from "react-icons/ri";

import Media_Player from "../components/Media_Allocation_Player";

const View_Allocation = ({
  openViewMediaAllocation,
  setOpenViewMediaAllocation,
  itemsPanel1,
  bookingId,
}) => {
  const [playlist_name, setPlaylistName] = useState(null);
  const [playlist_content, setPlaylistContent] = useState([]);
  const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
  const [mediaDisplay, setMediaDisplay] = useState([]);
  const [main_modal, setMainModal] = useState(false);

  useEffect(() => {
    getMediaPlaylist();
  }, []);

  const getMediaPlaylist = async () => {
    const { token } = User.getCookieData();
    const media = await User.getPlaylist(bookingId, token);
    setPlaylistName(media[0]?.PlaylistName);

    const obj = {
      mediaplaylistid: itemsPanel1.value.booking_content[0].mediaplaylistid,
      bookingid: bookingId,
    };
    const playlistcontent = await User.getMediaPlaylistContent(obj, token);
    setPlaylistContent(playlistcontent);
  };

  const onClickPlay = (source) => {
    const duration = source.ContentProperties
      ? JSON.parse(source.ContentProperties).duration
      : null;
    if (duration) {
      source.ContentTypeName = "Video";
    } else {
      source.ContentTypeName = "Image";
    }
    setMediaDisplay(source);
    setModalPlayerOpen(!modalPlayerOpen);
    setMainModal(!main_modal);
  };

  const handleCloseViewAllocation = () => {
    setOpenViewMediaAllocation(!openViewMediaAllocation);
  };

  return (
    <>
      {!main_modal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-14 lg:top-12 lg:right-[350px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => handleCloseViewAllocation()}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-3/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">
                Playlist : {playlist_name ? playlist_name : "No Playlist ..."}
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-col justify-start items-center space-y-1 h-[550px] overflow-y-auto">
                {playlist_content.length > 0 &&
                  playlist_content.map((items, index) => (
                    <div key={index} className="col-span-11">
                      <div className="flex items-center mr-1">
                        <div className="flex-1">
                          <div
                            className={`grid grid-cols-11 h-[80px] border border-gray-300 w-[265px] lg:w-[320px]`}
                            style={{ height: `80px` }}
                          >
                            <div className="col-span-2 flex justify-center items-center">
                              {items.ContentTypeName === "Video" ? (
                                <FiVideo size={30} className="text-[#6425FE]" />
                              ) : (
                                <FiImage size={30} className="text-[#6425FE]" />
                              )}
                            </div>
                            <div className="col-span-7 flex justify-start items-center">
                              <div>
                                <div className="flex justify-start items-center">
                                  <div className="font-poppins text-[15px]">
                                    {items.ContentName?.length > 30 ? (
                                      <span>
                                        {items.ContentName?.slice(0, 27) +
                                          "..."}
                                      </span>
                                    ) : (
                                      <div className="font-poppins font-bold">
                                        {items.ContentName
                                          ? items.ContentName
                                          : "....."}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-start items-center ">
                                  <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                    File Size :{" "}
                                    {items.ContentProperties
                                      ? parseFloat(
                                          JSON.parse(items.ContentProperties)
                                            .size
                                        ).toFixed(2)
                                      : "....."}{" "}
                                    MB
                                  </div>
                                </div>
                                <div className="flex justify-start items-center ">
                                  <div className="font-poppins text-[#8A8A8A] text-[12px]">
                                    Duration : {items.duration} sec
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2 flex justify-center items-center">
                              <RiPlayCircleLine
                                onClick={() => onClickPlay(items)}
                                size={26}
                                className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {modalPlayerOpen && (
        <Media_Player
          mediaDisplay={mediaDisplay}
          setModalPlayerOpen={setModalPlayerOpen}
          modalPlayerOpen={modalPlayerOpen}
          setMediaDisplay={setMediaDisplay}
          setMainModal={setMainModal}
          main_modal={main_modal}
        />
      )}
    </>
  );
};

export default View_Allocation;
