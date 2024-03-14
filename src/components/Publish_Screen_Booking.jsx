import React from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Filter from "../components/Filter";

const Publish_Screen_Booking = ({
  setShowPublishScreen,
  showPublishScreen,
  selectPublihsScreen,
  screens,
  toggleAllCheckboxesPublishScreen,
  selectAllPubishScreen,
  toggleCheckboxPublishScreen,
  checkboxPublishScreen,
}) => {
  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );

  const search = () => {
    alert("search");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-10 top-14 lg:top-7 lg:right-[160px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button onClick={() => setShowPublishScreen(!showPublishScreen)}>
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>

      {/* Second div (gray background) */}
      <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md relative">
        <div className="flex justify-center items-center mt-5">
          <div className="font-poppins text-5xl text-[#2F3847] font-bold">
            Publish to Screens
          </div>
        </div>
        <div className="mt-1">
          <div className="flex justify-center items-center col-span-3">
            <div className="font-poppins text-xs lg:text-sm text-[#7C7B7B]">
              {selectPublihsScreen.length} out of {screens.length} Screens
              Selected
            </div>
          </div>
        </div>
        {/* Search Box */}
        <div className="p-1 mt-1">
          <div className="basis-8/12 lg:basis-11/12 rounded-lg border border-gray-200">
            <div className="flex">
              <NavButton
                customFunc={search}
                title="Search"
                color="grey"
                icon={<IoIosSearch />}
              />
              <input
                className=" w-full h-[46px] rounded relative border-gray-500  transition font-poppins"
                type="text"
                name="name"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        {/* Search Box */}

        <Filter />

        <div className="mt-5 p-6">
          <div className="font-poppins">
            *Search result displays only screens available in your booking
          </div>
        </div>
        <div className="p-4">
          <div className="w-auto h-[350px] overflow-y-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={selectAllPubishScreen}
                        onChange={toggleAllCheckboxesPublishScreen}
                      />
                      <span
                        className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          selectAllPubishScreen ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 text-white ${
                            selectAllPubishScreen ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </th>
                  <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Screen Name
                  </th>
                  <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Media Rule
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Tag
                  </th>
                </tr>
              </thead>
              <tbody>
                {screens.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 cursor-pointer"
                          checked={checkboxPublishScreen[row.id] || false}
                          onChange={() => toggleCheckboxPublishScreen(row.id)}
                        />
                        {/* <span className="h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center bg-white">
                              {checkboxPublishScreen[row.id] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="#6425FE"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span> */}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="font-poppins text-xl font-bold">
                          {row.name}
                        </div>
                        <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="font-poppins text-sm text-[#59606C] font-bold">
                        {row.location}
                      </div>
                      <div className="font-poppins text-sm font-bold">
                        {row.province}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="font-poppins font-bold">
                        {row.media_rule}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex flex-wrap">
                        {row.tag.map((items, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1 px-2 py-1"
                            style={{ flexBasis: "calc(20% - 8px)" }}
                          >
                            <div className="font-poppins text-xs font-bold">
                              {items}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 mb-2 flex items-center justify-center">
          <button
            onClick={() => alert("Publish")}
            className="w-[30%] bg-[#6425FE] text-white text-lg py-2 rounded-lg font-bold font-poppins "
          >
            Publish to Selected Screens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish_Screen_Booking;
