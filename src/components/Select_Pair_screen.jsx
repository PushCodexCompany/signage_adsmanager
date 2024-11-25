import React, { useState, useEffect } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Filter from "../components/Filter";
import User from "../libs/admin";

const Select_Pair_screen = ({
  setOpenSelectPairScreenModel,
  openSelectPairScreenModel,
  screen_checkbox_select,
  setOpenPairScreenModal,
  openPairScreenModal,
  setScreenSelect,
}) => {
  const { token } = User.getCookieData();
  const [filter_screen, setFilterScreen] = useState([]);
  const [CityData, setCityData] = useState([]);

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    const data = await User.getConfiguration(token);
    setCityData(data?.configuration?.cities);
  };

  const handleCloseModal = () => {
    setOpenSelectPairScreenModel(!openSelectPairScreenModel);
  };

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

  const handleSelectPairScreen = (row) => {
    setScreenSelect(row);
    setOpenPairScreenModal(!openPairScreenModal);
    setOpenSelectPairScreenModel(!openSelectPairScreenModel);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
        {/* First div (circle) */}
        <div className="absolute right-10 top-[150px] lg:top-[34px] lg:right-[155px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => handleCloseModal()}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-auto rounded-md max-h-screen  relative">
          <div className="p-5">
            <div className="flex justify-center items-center mt-5">
              <div className="font-poppins text-5xl text-[#2F3847] font-bold">
                Select Pairing Screen
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="font-poppins text-[#2F3847] text-[18px] ">
                Please select or apply filters to the screens you wish to pair.
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
            <Filter
              filter_screen={filter_screen}
              setFilterScreen={setFilterScreen}
            />

            <div className=" p-6">
              <div className="font-poppins">
                *Search result displays only screens available in your booking
              </div>
            </div>

            <div className="p-4">
              <div className="w-auto h-[350px] overflow-y-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-2 py-5 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                        No
                      </th>
                      <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                        Screen Name
                      </th>
                      <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Location
                      </th>
                      <th className="px-2 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Media Rule
                      </th>
                      <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Slot Per Day
                      </th>
                      <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Loop Duration
                      </th>
                      <th className="px-3 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Tag
                      </th>
                      <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {screen_checkbox_select.length > 0 ? (
                      screen_checkbox_select.map((row, key) => (
                        <tr key={row.id}>
                          <td className="px-2 py-5 whitespace-nowrap border-b  border-gray-200">
                            <div className="flex items-center justify-center">
                              <div className="font-poppins text-xl font-bold">
                                {key + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                            <div className="flex items-center">
                              <div className="font-poppins text-xl font-bold">
                                {row.ScreenName}
                              </div>
                              {row.ScreenStatus ? (
                                <div className="bg-[#00C32B] w-1 h-1 rounded-full ml-2"></div>
                              ) : (
                                <div className="bg-black w-1 h-1 rounded-full ml-2"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                            <div className="font-poppins text-sm text-[#59606C] font-bold">
                              {row.ScreenLocation || "No Data"}
                            </div>
                            <div className="font-poppins text-sm font-bold">
                              {CityData.find(
                                (items) => items.CityID === row.ScreenCity
                              )?.NameEN || "No Data"}
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap border-b  border-gray-200">
                            <div className="font-poppins font-bold text-center">
                              {row?.ScreenRule[0]?.Width &&
                              row?.ScreenRule[0]?.Height
                                ? parseInt(row.ScreenRule[0].Width, 10) +
                                  "x" +
                                  parseInt(row.ScreenRule[0].Height, 10)
                                : "Not Set"}
                            </div>
                          </td>
                          <td className="px-1 py-4 whitespace-nowrap border-b text-center  border-gray-200">
                            <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                              {row.ScreenRule[0]?.AdsCapacity || "No Data"}
                            </div>
                          </td>
                          <td className="px-1 py-4 whitespace-nowrap border-b text-center  border-gray-200">
                            <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                              {row.loopDuration
                                ? `${row.loopDuration} Second`
                                : "No Data"}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap border-b border-gray-200">
                            <div className="flex flex-wrap ">
                              {row.ScreenTag.length > 0 ? (
                                row.ScreenTag.map((items, index) => (
                                  <div
                                    key={index}
                                    className="border border-gray-300 rounded-xl flex justify-center items-center mb-1 mr-1"
                                  >
                                    <div className="p-2">
                                      <div className="font-poppins text-xs font-bold">
                                        {items.TagName}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div
                                  className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                                  style={{ flexBasis: "calc(100% - 8px)" }}
                                >
                                  <div className="font-poppins text-xs font-bold">
                                    No Tag
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap border-b  border-gray-200">
                            <div className="space-x-2">
                              <button
                                className="w-36 h-6 bg-[#6425FE] text-white text-sm font-poppins rounded-md"
                                onClick={() => handleSelectPairScreen(row)}
                              >
                                Pair
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="p-4">
                          <div className="flex justify-center items-center">
                            <span className="text-gray-300 text-4xl">
                              No Screen(s) Select
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-1 mb-3 flex items-center justify-center">
              <button
                onClick={() => handleCloseModal()}
                className="w-[20%] bg-[#6425FE] hover:bg-[#3b1694] text-white text-xl py-2 rounded-lg font-bold font-poppins "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select_Pair_screen;
