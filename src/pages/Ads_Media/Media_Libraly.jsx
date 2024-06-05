import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_libraly_grid";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";
import User from "../../libs/admin";

const Media_Libraly = () => {
  useCheckPermission();
  const { token } = User.getCookieData();
  const [showModal, setShowModal] = useState(false);
  const [media_libraly_data, setMediaLibralyData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  const [uploads, setUploads] = useState({
    upload1: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
    upload2: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
    upload3: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
  });

  useEffect(() => {
    getMediaLibralyData();
  }, [searchTerm]);

  const getMediaLibralyData = async () => {
    if (searchTerm === null) {
      const data = await User.get_medias(token, 1);
      setMediaLibralyData(data.media);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      const data = await User.get_medias(token, 1, searchTerm);
      setMediaLibralyData(data.media);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const createNewMedia = () => {
    setShowModal(!showModal);
  };

  const uploadFile = (uploadKey) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".mp4, .m3u8, .jpg, .png";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploads((prevUploads) => ({
            ...prevUploads,
            [uploadKey]: {
              content: e.target.result,
              name: file.name,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  };

  const closeModal = () => {
    setShowModal(!showModal);
    setUploads({
      upload1: {
        content: null,
        name: null,
      },
      upload2: {
        content: null,
        name: null,
      },
      upload3: {
        content: null,
        name: null,
      },
    });
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />

        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Media Libraly
            </div>
          </div>
          <div className="col-span-4">
            {/* <div className="flex justify-end space-x-1">
              <button
                onClick={() => createNewMedia()}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white  font-poppins w-full lg:w-[300px] h-[45px] rounded-md"
              >
                New Media
              </button>
            </div> */}
          </div>
        </div>
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        {media_libraly_data.length > 0 ? (
          <div className="mt-5">
            <GridTable
              media_libraly_data={media_libraly_data}
              all_pages={all_pages}
              setMediaLibralyData={setMediaLibralyData}
              searchTerm={searchTerm}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[550px] text-center ">
            <div className="font-poppins text-5xl text-[#dedede]">
              --- No data ---
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <a
          onClick={() => setShowModal(!showModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-14 lg:top-12 lg:right-[350px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => closeModal()}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-3/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">New Media</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Your ad will be displayed on 3 screens with 3 different screen
                media rule sets
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-2 mt-2 p-5">
              {Array.from({ length: 3 }, (_, index) => {
                const uploadKey = `upload${index + 1}`;
                return (
                  <div
                    key={uploadKey}
                    className="col-span-1 border-dashed border-gray-300 border-1"
                  >
                    <div className="p-4">
                      <div className="font-poppins font-bold text-xl">
                        Screen 1
                      </div>
                      <div className="font-poppins text-sm text-[#8A8A8A]">
                        Central Chidlom F3
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-[#00CB45] border-3 border-black rounded-full w-2 h-2 flex justify-center items-center" />
                        <div className="font-poppins text-xs">Online</div>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        <div className="font-poppins text-3xl font-bold">
                          Rule Set 1
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-7">
                        {!uploads[uploadKey].content ? (
                          <div>
                            <button onClick={() => uploadFile(uploadKey)}>
                              <AiOutlineCloudUpload
                                size={100}
                                color={"#D9D9D9"}
                              />
                            </button>
                            {uploads[uploadKey].content && (
                              <div>
                                <p>File Uploaded:</p>
                                <img
                                  src={uploads[uploadKey]}
                                  alt="Uploaded File"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <BsCheckCircle size={100} color={"#00CB45"} />
                        )}
                      </div>
                      <div className="flex items-center justify-center mt-14">
                        <div className="font-poppins text-xl font-bold">
                          {uploads[uploadKey].name}
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-5">
                        <div className="font-poppins text-xl font-bold">
                          Requirements *
                        </div>
                      </div>
                      <div className="flex items-center justify-center ">
                        <div className="font-poppins text-xl font-bold">
                          Resolution : 1920 x 1080
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-16">
                        <div className="font-poppins text-xl font-bold">
                          {`Size : <100Mb`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center mt-1">
              <button
                onClick={() => console.log(uploads)}
                className="bg-[#6425FE] w-72 h-10 text-white font-poppins"
              >
                Submit
              </button>
            </div>
            <div className="flex justify-center items-center mt-3 mb-3">
              <div className="text-sm font-poppins">
                Ensure compliance with predefined media rules for each screen.
                Your ads must adhere to specific guidelines for seamless display
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Media_Libraly;
