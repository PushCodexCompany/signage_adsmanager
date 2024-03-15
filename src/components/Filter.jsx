import React, { useState } from "react";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";

const Filter = () => {
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAngleOpen, setIsAngleOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isFileTypeOpen, setIsFileTypeOpen] = useState(false);

  const [filter, setFilter] = useState([
    "Flagship",
    "5 Floor",
    "Beauty",
    "Portrait",
  ]);

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
  const toggleFloorSelect = () => {
    setIsFloorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleLocatioSelect = () => {
    setIsLocationOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleAngleSelect = () => {
    setIsAngleOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleSizeSelect = () => {
    setIsSizeOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleFileTypeSelect = () => {
    setIsFileTypeOpen((prevIsOpen) => !prevIsOpen);
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
      {/* Select Menu */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div className="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
              <div className="flex flex-col lg:flex-row">
                <div className="w-5/6 flex justify-between items-center ">
                  <div className="relative w-[100px] lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
                    <select
                      name="sector"
                      id="sector"
                      onClick={toggleSectorSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Sector
                      </option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="Northeastern">Northeastern</option>
                      <option value="Central">Central</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isSectorOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="region"
                      id="region"
                      onClick={toggleRegionSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Region
                      </option>
                      <option value="Bangkok">Bangkok</option>
                      <option value="Provincial">Provincial</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      {isRegionOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="store_cluster"
                      id="store_cluster"
                      onClick={toggleClustorSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Store Cluster
                      </option>
                      <option value="Flagship">Flagship</option>
                      <option value="Core+L">Core+L</option>
                      <option value="Core+M">Core+M</option>
                      <option value="Core-">Core-</option>
                      <option value="Affordable">Affordable</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isClustorOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="branch"
                      id="branch"
                      onClick={toggleBranchSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Branch
                      </option>
                      <option value="CW">Central World</option>
                      <option value="CWS">Central Wesgate</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isBranchOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="department"
                      id="department"
                      onClick={toggleDepartmentSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Department
                      </option>
                      <option value="Beauty">Beauty</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="YoungFashion">Young Fashion</option>
                      <option value="Jeans">Jeans</option>
                      <option value="WatchJew">Watch & Jew</option>
                      <option value="Linegeries">Linegeries</option>
                      <option value="MomKids">Mom & Kids</option>
                      <option value="HomeSmallApp">Home & Small App</option>
                      <option value="Luxe">Luxe</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isDepartmentOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="floor"
                      id="floor"
                      onClick={toggleFloorSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Floor
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isFloorOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="locations"
                      id="locations"
                      onClick={toggleLocatioSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Locations
                      </option>
                      <option value="frontDoor">
                        In front of the Main Door
                      </option>
                      <option value="escalatorHall">Escalator hall</option>
                      <option value="elavator">Elavator</option>
                      <option value="frontBuilding">
                        In front of the Building
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isLocationOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="angle"
                      id="angle"
                      onClick={toggleAngleSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Angle
                      </option>
                      <option value="vertical">Vertical</option>

                      <option value="horizontal">horizontal</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isAngleOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="size"
                      id="size"
                      onClick={toggleSizeSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        Size
                      </option>
                      <option value="1920x1080">1920x1080</option>

                      <option value="1080x1920">1080x1920</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isSizeOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                  <div className="relative w-[100px] lg:w-[150px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="file_type"
                      id="file_type"
                      onClick={toggleFileTypeSelect}
                      onChange={handleStatusChange}
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    >
                      <option value="" disabled selected hidden>
                        File Type
                      </option>
                      <option value="vdo">VDO</option>

                      <option value="image">Image</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isFileTypeOpen ? (
                        <IoIosArrowUp size={18} color="#6425FE" />
                      ) : (
                        <IoIosArrowDown size={18} color="#6425FE" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Select Menu */}

      {/* Filter */}
      <div className="flex">
        {filter &&
          filter.map((items) => (
            <button onClick={() => removeFilter(items)}>
              <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-2 rounded-full">
                <div className="grid grid-cols-4">
                  <div className="col-span-1 mt-[6px]">
                    <div className="flex justify-end items-center">
                      <IoIosClose size="27" className="text-[#6425FE] hover:text-[#3b1694]" />
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
            <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] hover:bg-[#3b1694] border-gray-2 rounded-full">
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
      {/* Filter */}
    </>
  );
};

export default Filter;
