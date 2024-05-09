import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

import Screen_Info from "../components/Screen_Info";
import Pair_Screen from "../components/Pair_Screen";
import { Navbar } from "../components";

import Filter from "../components/Filter";
import { GridTable } from "../libs/screens_grid";
import User from "../libs/admin";

import firebase from "../utils/Firebase";
import Unpair_screen from "../components/Unpair_screen";

const Event = () => {
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);
  const [openPairScreenModal, setOpenPairScreenModal] = useState(false);
  const [openUnPairScreenModal, setOpenUnPairScreenModal] = useState(false);

  const [screens_data, setScreensData] = useState([]);
  const [screens_options_data, setScreensOptionsData] = useState([]);
  const [screen_select, setScreenSelect] = useState([]);

  const navigate = useNavigate();

  const { token } = User.getCookieData();

  useEffect(() => {
    fetchScreenData();
    fetchScreenOptionsData();
    // testFirebase();
  }, []);

  const testFirebase = () => {
    console.log("testing firebase");
    var db = firebase.database().ref().child(`auUpa8dN4g/4lJnf/9kFQV`);
    // db = firebase.database().ref().child(`${AccountCode}/${BrandCode}/${BranchCode}`);

    db.on("child_changed", (snap) => {
      // if (snap.key === "is_online") {

      //     this.setState({ isOnline: snap.val() })
      //     // console.log("child changed1 " + snap.key + " val : " + snap.val());
      //     // io.sockets.in(roomId).emit("receive-command", snap.key, snap.val());
      // }

      console.log(
        "child_changed " + snap.key + " : " + JSON.stringify(snap.val())
      );
      // screensStatus[snap.key] = { ...screensStatus[snap.key], ...snap.val() }
      // setScreensStatus({ ...screensStatus })
    });
  };

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
              setOpenUnPairScreenModal={setOpenUnPairScreenModal}
              openUnPairScreenModal={openUnPairScreenModal}
              setScreenSelect={setScreenSelect}
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
          screens_data={screens_data}
        />
      )}

      {openUnPairScreenModal && (
        <a
          onClick={() => setOpenUnPairScreenModal(!openUnPairScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openUnPairScreenModal && (
        <Unpair_screen
          setOpenUnPairScreenModal={setOpenUnPairScreenModal}
          openUnPairScreenModal={openUnPairScreenModal}
          screen_select={screen_select}
        />
      )}
    </>
  );
};

export default Event;
