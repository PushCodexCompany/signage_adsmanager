import React, { useState, useEffect } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Navbar from "../components/Navbar_modal";
import Filter from "../components/Filter_Add_Screen";
import { format } from "date-fns";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import User from "../libs/admin";
import firebase_func from "../libs/firebase_func";
import { GridTable } from "../libs/add_screen_booking_grids";
import Permission from "../libs/permission";

const Add_Screen_Booking = ({
  showAddScreen,
  setShowAddScreen,
  booking_date,
  openAddNewScreenModal,
  setOpenAddNewScreenModal,
  selectAll,
  toggleAllCheckboxes,
  checkboxes,
  toggleCheckboxAddScreen,
  handleAddScreen,
  booking_slot,
  bookingId,
  setShowDetailScreen,
  showDetailScreen,
  setDetailScreen,
}) => {
  const { token } = User.getCookieData();
  const [screen, setScreens] = useState([]);
  const [temp_screen, setTempScreen] = useState([]);
  const [screens_options_data, setScreenOptionsData] = useState([]);
  const [CityData, setCityData] = useState([]);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [all_pages, setAllPages] = useState(null);

  const [page_permission, setPagePermission] = useState([]);

  useEffect(() => {
    getScreenData();
    getScreenOption();
    getCity();
  }, [openAddNewScreenModal]);

  useEffect(() => {
    getScreenData();
  }, [searchTerm]);

  useEffect(() => {
    getPermission();
  }, []);

  const getScreenData = async (type) => {
    if (!type) {
      if (searchTerm === null) {
        try {
          let data;
          if (filter_screen && filter_screen?.length > 0) {
            // console.log("have filter no search term");
            const result = filter_screen.join(",");
            const obj = {
              tagids: result,
            };
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              obj,
              "",
              2
            );
          } else {
            // console.log("no filter no search term");
            data = await User.getScreensInAddScreen(
              token,
              bookingId,
              booking_slot,
              1,
              "",
              "",
              2
            );
          }
          const updatedData = await Promise.all(
            data?.screens.map(async (items) => {
              const screen_status = await firebase_func.getStatusScreen(items);
              items.screen_status = screen_status;
              return items;
            })
          );

          setScreens(updatedData);
          if (data.pagination.length > 0) {
            setAllPages(data.pagination[0].totalpage);
          }
        } catch (error) {
          console.error("Error fetching screen data:", error);
        }
      } else {
        let data;
        if (filter_screen && filter_screen?.length > 0) {
          // console.log("have filter have search term");
          const result = filter_screen.join(",");
          const obj = {
            tagids: result,
          };
          data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            obj,
            searchTerm,
            2
          );
        } else {
          // console.log("have search term no filter");
          data = await User.getScreensInAddScreen(
            token,
            bookingId,
            booking_slot,
            1,
            "",
            searchTerm,
            2
          );
        }

        const updatedData = await Promise.all(
          data?.screens.map(async (items) => {
            const screen_status = await firebase_func.getStatusScreen(items);
            items.screen_status = screen_status;
            return items;
          })
        );

        setScreens(updatedData);
        if (data.pagination.length > 0) {
          setAllPages(data.pagination[0].totalpage);
        }
      }
    } else {
      let data;

      if (searchTerm === null) {
        data = await User.getScreensInAddScreen(
          token,
          bookingId,
          booking_slot,
          1,
          "",
          "",
          2
        );
      } else {
        data = await User.getScreensInAddScreen(
          token,
          bookingId,
          booking_slot,
          1,
          "",
          searchTerm,
          2
        );
      }

      const updatedData = await Promise.all(
        data?.screens.map(async (items) => {
          const screen_status = await firebase_func.getStatusScreen(items);
          items.screen_status = screen_status;
          return items;
        })
      );

      setScreens(updatedData);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    setPagePermission(permissions?.digiScrnMgt);
  };

  const getScreenOption = async () => {
    const data = await User.getScreensOptions(token);
    setScreenOptionsData(data.screenresolution);
  };

  const getCity = async () => {
    const data = await User.getConfiguration(token);
    setCityData(data?.configuration?.cities);
  };

  const handleCloseAddScreen = () => {
    setShowAddScreen(!showAddScreen);
  };

  const handleClickViewDetail = (data) => {
    setDetailScreen(data);
    setShowDetailScreen(!showDetailScreen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => handleCloseAddScreen()}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <div className="font-poppins text-5xl text-[#2F3847] font-bold">
            Select Screen to Event Booking
          </div>
        </div>
        <div className="mt-1">
          <div className="grid grid-cols-4">
            <div className="flex justify-end items-center col-span-3">
              <div className="font-poppins text-xs lg:text-xl text-[#2F3847] mr-28">
                {`You Booking Period : ${format(
                  booking_date[0],
                  "EEE dd MMM yyyy"
                )} - ${format(
                  booking_date[booking_date.length - 1],
                  "EEE dd MMM yyyy"
                )}`}
              </div>
            </div>
            <div className="flex justify-end items-center col-span-1 ">
              {page_permission?.create ? (
                <button
                  onClick={() =>
                    setOpenAddNewScreenModal(!openAddNewScreenModal)
                  }
                  className="bg-[#6425FE] hover:bg-[#3b1694] w-[200px] h-[45px] rounded-lg text-white font-poppins mr-10"
                >
                  Create New Screen
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {/* <Filter
          page_name={"digiScrnMgt"}
          filter_screen={filter_screen}
          setFilterScreen={setFilterScreen}
          bookingId={bookingId}
          booking_slot={booking_slot}
          setScreens={setScreens}
          setAllPages={setAllPages}
          searchTerm={searchTerm}
          getScreenData={getScreenData}
        /> */}

        <div className="mt-5 p-6">
          <div className="font-poppins">
            *Search result displays only screens available in your booking
          </div>
        </div>

        <div className="p-4">
          {screen.length > 0 ? (
            <GridTable
              screens_data={screen}
              all_pages={all_pages}
              checkboxes={checkboxes}
              toggleCheckboxAddScreen={toggleCheckboxAddScreen}
              CityData={CityData}
              handleClickViewDetail={handleClickViewDetail}
              selectAll={selectAll}
              toggleAllCheckboxes={toggleAllCheckboxes}
              searchTerm={searchTerm}
              bookingId={bookingId}
              booking_slot={booking_slot}
              filter_screen={filter_screen}
            />
          ) : (
            <div className="flex items-center justify-center h-[550px] text-center ">
              <div className="font-poppins text-5xl text-[#dedede]">
                --- No data ---
              </div>
            </div>
          )}
        </div>

        <div className="mt-1 mb-3 flex items-center justify-center">
          <button
            onClick={() => handleAddScreen()}
            className="w-[20%] bg-[#6425FE] hover:bg-[#3b1694] text-white text-xl py-2 rounded-lg font-bold font-poppins "
          >
            Select Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add_Screen_Booking;
