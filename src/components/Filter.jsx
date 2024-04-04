import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import User from "../libs/admin";

const Filter = ({ filter_screen, setFilterScreen }) => {
  const { token } = User.getCookieData();
  const [filter, setFilter] = useState([]);
  const [all_filter_data, SetAllFilterData] = useState([]);

  useEffect(() => {
    getFilter();
  }, []);

  const getFilter = async () => {
    const data = await User.getCategorytags(token);
    SetAllFilterData(data);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    const [tagID, tagName] = selectedValue.split("-");
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(tagName)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagName]; // Add the selected value to the filter state
        }
      });
      setFilterScreen((prevFilter) => {
        if (prevFilter.includes(tagID)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, tagID]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event, index) => {
    const selectedValue = `${filter_screen[index]}-${event}`;
    const [tagID, tagName] = selectedValue.split("-");

    const updatedFilterOutSide = filter_screen.filter(
      (value) => value !== tagID
    );
    const updatedFilterInside = filter.filter((value) => value !== tagName);

    setFilter(updatedFilterInside);
    setFilterScreen(updatedFilterOutSide);
  };

  const clearFilter = () => {
    setFilter([]);
    setFilterScreen([]);
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
                  {all_filter_data.length > 0 &&
                    all_filter_data.map((items, index) => (
                      <div
                        key={index}
                        className="relative w-[95px] lg:w-[200px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 "
                      >
                        <select
                          name={items.TagCategoryName}
                          id={items.TagCategoryName}
                          onChange={handleStatusChange}
                          className="block appearance-none w-full bg-[#f2f2f2] text-xs lg:text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                        >
                          <option value="" disabled selected hidden>
                            {items.TagCategoryName}
                          </option>
                          {items.tags.map((items) => (
                            <option value={`${items.TagID}-${items.TagName}`}>
                              {items.TagName}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <IoIosArrowDown size={18} color="#6425FE" />
                        </div>
                      </div>
                    ))}
                  {/* <div className="relative w-[100px] lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 ">
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
                  </div> */}
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
          filter.map((items, index) => (
            <button onClick={() => removeFilter(items, index)}>
              <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-2 rounded-full">
                <div className="grid grid-cols-4">
                  <div className="col-span-1 mt-[6px]">
                    <div className="flex justify-end items-center">
                      <IoIosClose
                        size="27"
                        className="text-[#6425FE] hover:text-[#3b1694]"
                      />
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
