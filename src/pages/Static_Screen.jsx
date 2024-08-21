import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../components";
import Filter from "../components/Filter";
import User from "../libs/admin";
import { GridTable } from "../libs/static_screen_grid";

const Static_Screen = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [filter_screen, setFilterScreen] = useState([]);
  const [screens_data, setScreensData] = useState([]);
  const [screens_options_data, setScreensOptionsData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openPairScreenModal, setOpenPairScreenModal] = useState(false);
  const [openUnPairScreenModal, setOpenUnPairScreenModal] = useState(false);
  const [screen_select, setScreenSelect] = useState(null);

  const { token } = User.getCookieData();
  const navigate = useNavigate();

  useEffect(async () => {
    await fetchScreenData();
    fetchScreenOptionsData();
    // testFirebase();
  }, [searchTerm]);

  const fetchScreenData = async () => {
    if (searchTerm === null) {
      const data = await User.getScreenList(token, 1);
      setScreensData(data.screens);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      const data = await User.getScreenList(token, 1, searchTerm);
      setScreensData(data.screens);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const fetchScreenOptionsData = async () => {
    const screens_option = await User.getScreensOptions(token);
    setScreensOptionsData(screens_option.screenresolution);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"static_screen"} />
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Statics Screens
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => navigate("/static_screen/create/new")}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                New Screen +
              </button>
              {/* <button
                onClick={() => {
                  setScreenSelect(null);
                  setOpenSelectPairScreenModel(!openSelectPairScreenModel);
                  // setOpenPairScreenModal(!openPairScreenModal);
                }}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Pair Screen
              </button> */}
            </div>
          </div>
        </div>

        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        <div className="mt-5">
          {screens_data.length > 0 && screens_options_data.length > 0 ? (
            <GridTable
              // setSelectedScreenItems={setSelectedScreenItems}
              setSelectInfoScren={setSelectInfoScren}
              screens_data={screens_data}
              all_pages={all_pages}
              setScreensData={setScreensData}
              searchTerm={searchTerm}
              // screens_options_data={screens_options_data}
              setOpenPairScreenModal={setOpenPairScreenModal}
              setOpenUnPairScreenModal={setOpenUnPairScreenModal}
              openUnPairScreenModal={openUnPairScreenModal}
              setScreenSelect={setScreenSelect}
              // setCheckboxes={setCheckboxes}
              // checkboxes={checkboxes}
              // screen_checkbox_select={screen_checkbox_select}
              // setScreenCheckboxSelect={setScreenCheckboxSelect}
            />
          ) : (
            <div className="flex items-center justify-center h-[550px] text-center ">
              <div className="font-poppins text-5xl text-[#dedede]">
                --- No data ---
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Static_Screen;
