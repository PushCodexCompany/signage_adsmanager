import React from "react";

const Side_search = () => {
  return (
    <>
      {/* {showRightPanel && (
        <a
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="fixed top-0 lg:right-52 w-screen h-screen opacity-50 bg-black z-50 backdrop-blur"
        />
      )} */}

      {/* {showRightPanel && (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-[#E8E8E8] z-50 rounded-md max-h- overflow-y-auto">
          <div className="flex justify-between items-center p-2 mt-3 border-b-2 border-gray-300">
            <div className="text-center text-sm flex-grow font-poppins">
              Filter and sort
            </div>
            <button onClick={() => setShowRightPanel(!showRightPanel)}>
              <IoIosClose size="42" color="#6425FE" />
            </button>
          </div>

          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">
                  Sort <br />
                  <div
                    className={`font-poppins text-xs  text-[#59606C] ${
                      !isCollapsed ? "hidden" : ""
                    }`}
                  >
                    Best match
                  </div>
                </div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Sector</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Region</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Store Cluster</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Branch</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Department</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Floor</div>
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
                  <div className="font-poppins text-sm ">G Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <div className="font-poppins text-sm mr-1">12</div>
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-4 w-4 cursor-pointer"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                      />
                      <div
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
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">1 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">5</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">2 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">4</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex flex-row ">
                <div class="flex basis-11/12  mt-3">
                  <div className="font-poppins text-sm ">3 Floor</div>
                </div>
                <div class="basis-2/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div className="font-poppins text-sm mr-1">10</div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-4 w-4 cursor-pointer"
                      checked={isChecked}
                      onChange={toggleCheckbox}
                    />
                    <div
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
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Location</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Orientation</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">Size</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
                </div>
                <div class="basis-1/12  flex justify-end items-end font-poppins text-md mr-3">
                  <div>
                    <input type="radio" id="2" name="sort" value="2" checked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-b-2 border-gray-300">
            <div class="flex flex-row ">
              <div class="flex basis-11/12  ">
                <div className="font-poppins text-md ">File Type</div>
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
                  <div className="font-poppins text-xs ">Best match</div>
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
                  <div className="font-poppins text-xs ">
                    Price: low to high
                  </div>
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
      )} */}
    </>
  );
};

export default Side_search;
