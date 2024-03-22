import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

import Screen_Info from "../components/Screen_Info";
import Pair_Screen from "../components/Pair_Screen";
import { Navbar } from "../components";

import Filter from "../components/Filter";
import { GridTable } from "../libs/screens_grid";
import { screens } from "../data/mockup";
import User from "../libs/admin";

const Event = () => {
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);
  const [openPairScreenModal, setOpenPairScreenModal] = useState(false);

  const [screens_data, setScreensData] = useState([]);
  const [screens_options_data, setScreensOptionsData] = useState([]);

  const navigate = useNavigate();

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchScreenData();
    fetchScreenOptionsData();
  }, []);

  const fetchScreenData = async () => {
    const screens = await User.getScreens(token);
    setScreensData(screens);
  };

  const fetchScreenOptionsData = async () => {
    const screens_option = await User.getScreensOptions(token);
    setScreensOptionsData(screens_option.screenresolution);
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">Screens</div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => navigate("/screen/create/new")}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                New Screen +
              </button>
              <button
                onClick={() => setOpenPairScreenModal(!openPairScreenModal)}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Pair Screen
              </button>
            </div>
          </div>
        </div>

        <Filter />
        <div className="mt-5">
          {screens_data.length > 0 && screens_options_data.length > 0 ? (
            <GridTable
              setSelectedScreenItems={setSelectedScreenItems}
              setSelectInfoScren={setSelectInfoScren}
              screens_data={screens_data}
              screens_options_data={screens_options_data}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {openInfoScreenModal && (
        <a
          onClick={() => setOpenInfoScreenModal(!openInfoScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openInfoScreenModal && (
        <Screen_Info
          setOpenInfoScreenModal={setOpenInfoScreenModal}
          selectInfoScreen={selectInfoScreen}
        />
      )}

      {openPairScreenModal && (
        <Pair_Screen
          setOpenPairScreenModal={setOpenPairScreenModal}
          screen={screens}
        />
      )}
    </>
  );
};

export default Event;
