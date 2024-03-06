import React, { useState } from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_libraly_grid";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";

const Media_Libraly = () => {
  useCheckPermission();
  const [showModal, setShowModal] = useState(false);

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

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

  const [filter, setFilter] = useState([
    "Flagship",
    "5 Floor",
    "Beauty",
    "Portrait",
  ]);

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

  const toggleSectorSelect = () => {
    setIsSectorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRegionSelect = () => {
    setIsRegionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleClustorSelect = () => {
    setIsClustorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchSelect = () => {
    setIsBranchOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentSelect = () => {
    setIsDepartmentOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(selectedValue)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, selectedValue]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">
              <text>Media Libraly</text>
            </div>
          </div>
          <div>
            <button
              onClick={() => createNewMedia()}
              className="bg-[#6425FE]  hover:bg-[#3b1694] text-white  font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
            >
              New Media
            </button>
          </div>
        </div>

        <div className="relative flex flex-col min-w-0  w-full mb-6 ">
          {/* Select Menu */}
          <div className="rounded-lg h-[50px] flex items-center shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-3/4 flex justify-center items-center">
                <div className="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="sector"
                    id="sector"
                    onClick={toggleSectorSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Sector">Sector</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isSectorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div className="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="region"
                    id="region"
                    onClick={toggleRegionSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Region">Region</option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                    {isRegionOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div className="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="store_cluster"
                    id="store_cluster"
                    onClick={toggleClustorSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Store Cluster">Store Cluster</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isClustorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div className="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="branch"
                    id="branch"
                    onClick={toggleBranchSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Branch">Branch</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isBranchOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div className="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="department"
                    id="department"
                    onClick={toggleDepartmentSelect}
                    onChange={handleStatusChange}
                    className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Department">Department</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Toy">Toy</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isDepartmentOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter  */}
          <div className="flex flex-row mt-4">
            <div className="basis-11/12">
              {filter &&
                filter.map((items) => (
                  <button onClick={() => removeFilter(items)}>
                    <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-300 rounded-full">
                      <div className="grid grid-cols-4">
                        <div className="col-span-1 mt-[6px]">
                          <div className="flex justify-end items-center">
                            <IoIosClose size="27" color="#6425FE" />
                          </div>
                        </div>
                        <div className="col-span-3 mt-[8px]">
                          <div className="flex justify-center items-center">
                            <div className="font-poppins text-sm">{items}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              {filter.length > 0 && (
                <button onClick={() => clearFilter()}>
                  <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE]  hover:bg-[#3b1694] border-gray-300 rounded-full">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 mt-[6px]">
                        <div className="flex justify-end items-center">
                          <IoIosClose size="27" color="#6425FE" />
                        </div>
                      </div>
                      <div className="col-span-11 mt-[8px]">
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-sm text-white">
                            Clear All
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
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
                <AiOutlineClose size={25} color={"#6425FE"} />
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
