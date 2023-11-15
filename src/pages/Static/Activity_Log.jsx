import React, { useState } from "react";
import { Header } from "../../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import {
  PiSlidersHorizontalFill,
  PiGridFourFill,
  PiListDashesFill,
} from "react-icons/pi";
import { GridTable } from "../../libs/activities_log_grid";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";

const Activity_Log = () => {
  useCheckPermission();
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [view, setView] = useState(true);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const [isChecked, setIsChecked] = useState(false);

  const [filter, setFilter] = useState([
    "North",
    "Flagship",
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

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const handleView = () => {
    setView(!view);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const GridImgComponent = () => {
    return (
      <>
        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          <div>grid</div>
        </div>
      </>
    );
  };

  const ListComponent = () => {
    return (
      <>
        <div className="w-auto  h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div class="grid grid-cols-5 gap-4 mt-10">
          <div class="col-span-4">
            <div className="font-poppins font-semibold text-2xl">
              <text>Activities log</text>
            </div>
          </div>
          <div class="col-span-1">
            <button
              onClick={() => alert("export")}
              className="bg-[#6425FE] text-white text-sm font-poppins w-full lg:w-[200px] lg:h-[45px] rounded-md"
            >
              Export
            </button>
          </div>
        </div>

        <div className="relative flex flex-col max-w-0  w-full mb-6">
          {/* Select Menu */}
          <div class="rounded-lg h-[50px] flex items-center shadow-md">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/4 flex justify-center items-center">
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="sector"
                    id="sector"
                    onClick={toggleSectorSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Sector">Sector</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isSectorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="region"
                    id="region"
                    onClick={toggleRegionSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Region">Region</option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                    {isRegionOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="store_cluster"
                    id="store_cluster"
                    onClick={toggleClustorSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Store Cluster">Store Cluster</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isClustorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="branch"
                    id="branch"
                    onClick={toggleBranchSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Branch">Branch</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isBranchOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="department"
                    id="department"
                    onClick={toggleDepartmentSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Department">Department</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Toy">Toy</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isDepartmentOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[300px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <button
                    onClick={() => showAllFilter()}
                    name="role"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    All filter
                  </button>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <PiSlidersHorizontalFill size={18} color="#6425FE" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Select Menu */}
        </div>

        {/* Filter */}
        <div className="flex">
          <div class="basis-11/12">
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
                          <div className="font-poppins text-sm font-bold">
                            {items}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            {filter.length > 0 && (
              <button onClick={() => clearFilter()}>
                <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE] border-gray-300 rounded-full">
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

          <div class="basis-1/12">
            <div className="flex flex-row">
              {view ? (
                <div className="flex basis-1/2 justify-end align-middle">
                  <button onClick={() => handleView()}>
                    <PiListDashesFill size={42} color="#6425FE" />
                  </button>
                </div>
              ) : (
                <div className="flex basis-1/2 justify-end align-middle">
                  <button onClick={() => handleView()}>
                    <PiGridFourFill size={42} color="#6425FE" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="m-1 md:m-5 p-2 md:p-5 bg-white rounded-3xl">
        {view ? <ListComponent /> : <GridImgComponent />}
      </div>

      {showRightPanel && (
        <a
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="fixed top-0 lg:right-52 w-screen h-screen opacity-50 bg-black z-50 backdrop-blur"
        />
      )}

      {showRightPanel && (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-[#E8E8E8] z-50 rounded-md max-h- overflow-y-auto">
          <div className="flex justify-between items-center p-2 mt-3 border-b-2 border-gray-300">
            <span className="text-center text-sm flex-grow font-poppins">
              Filter and sort
            </span>
            <button onClick={() => setShowRightPanel(!showRightPanel)}>
              <IoIosClose size="42" color="#6425FE" />
            </button>
          </div>

          {/* Sort */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">
                  Sort <br />
                  <span
                    className={`font-poppins text-xs  text-[#59606C] ${
                      !isCollapsed ? "hidden" : ""
                    }`}
                  >
                    Best match
                  </span>
                </span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sector */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Sector</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Region */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Region</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Store Cluster */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Store Cluster</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Branch */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Branch</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Department */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Department</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floor */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Floor</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-sm ">G Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <span className="font-poppins text-sm mr-1">12</span>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-4 w-4 cursor-pointer"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                      />
                      <span
                        className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          isChecked ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-3 w-3 text-white ${
                            isChecked ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">1 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">5</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">2 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">4</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-sm ">3 Floor</span>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <span className="font-poppins text-sm mr-1">10</span>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <span
                      className={`h-4 w-4 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                        isChecked ? "bg-white" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 text-white ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300 ease-in-out`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#6425FE"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Location</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Orientation */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Orientation</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Size */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">Size</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* File Type */}
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <span className="font-poppins text-md ">File Type</span>
              </div>
              <div class="basis-1/12  flex justify-end items-center font-poppins text-md text-[#59606C]">
                <div>
                  <button
                    className="w-full text-left p-2 focus:outline-none"
                    onClick={toggleCollapse}
                  >
                    {isCollapsed ? (
                      <IoIosArrowDown size={28} color="#6425FE" />
                    ) : (
                      <IoIosArrowUp size={28} color="#6425FE" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-6">
                  <span className="font-poppins text-xs ">Best match</span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="1" name="sort" value="1" checked />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isCollapsed ? "hidden" : ""}`}>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <span className="font-poppins text-xs ">
                    Price: low to high
                  </span>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity_Log;
