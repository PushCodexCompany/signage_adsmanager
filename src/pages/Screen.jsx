import React, { useState, useEffect, useRef } from "react";
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
  const [screens_status, setScreensStatus] = useState({})
  const [screens_options_data, setScreensOptionsData] = useState([]);
  const [screen_select, setScreenSelect] = useState(null);

  const navigate = useNavigate();
  const is_screensstatus_init = useRef(false);

  const { token } = User.getCookieData();

  useEffect(async () => {
    await fetchScreenData();
    fetchScreenOptionsData();
    // testFirebase();
  }, []);

  useEffect(async () => {
    await fetchScreenData();
    fetchScreenOptionsData();
    // testFirebase();
  }, []);

  useEffect(async () => {
    if (screens_data.length && !is_screensstatus_init.current) {
      initScreensStatus();
      is_screensstatus_init.current = true;
    }
  }, [screens_data]);

  const initScreensStatus = () => {

    if (screens_data.length <= 0) {

      console.log("screens_data " + JSON.stringify(screens_data))
      return;
    }

    const { AccountCode, BrandCode, BranchCode } = screens_data[0]
    // console.log("testing firebase " + `${AccountCode}/${BrandCode}/${BranchCode}`);
    // var db = firebase.database().ref().child(`auUpa8dN4g/4lJnf/9kFQV`);

    var db = firebase.database().ref().child(`${AccountCode}/${BrandCode}/${BranchCode}`);

    db.on("child_changed", (snap) => {
      // if (snap.key === "is_online") {

      //     this.setState({ isOnline: snap.val() })
      //     // console.log("child changed1 " + snap.key + " val : " + snap.val());
      //     // io.sockets.in(roomId).emit("receive-command", snap.key, snap.val());
      // }

      // console.log(
      //   "child_changed " + snap.key + " : " + JSON.stringify(snap.val())
      // );
      // screensStatus[snap.key] = { ...screensStatus[snap.key], ...snap.val() }
      // setScreensStatus({ ...screensStatus })

      screens_status[snap.key] = { ...screens_status[snap.key], ...snap.val() }


      console.log("screens_data " + JSON.stringify(screens_data))
      const newScreensData = [...screens_data].map((row, index) => {

        console.log("row.ScreenCode === snap.key " + (row.ScreenCode === snap.key))
        if (row.ScreenCode === snap.key) {
          if (!row.ScreenStatus || (row.ScreenStatus && JSON.stringify(row.ScreenStatus) !== JSON.stringify(screens_status[snap.key])))
            row.ScreenStatus = screens_status[snap.key];
        }
        return row;
      });

      // if (JSON.stringify(newScreensData) !== JSON.stringify(screens_data))
      setScreensData(newScreensData)

      setScreensStatus({ ...screens_status })
    });
    db.on("child_added", (snap) => {

      // if (snap.key === "is_online") {

      //     this.setState({ isOnline: snap.val() })
      //     // console.log("child changed1 " + snap.key + " val : " + snap.val());
      //     // io.sockets.in(roomId).emit("receive-command", snap.key, snap.val());
      // }

      // console.log(
      //   "child_changed " + snap.key + " : " + JSON.stringify(snap.val())
      // );
      // screensStatus[snap.key] = { ...screensStatus[snap.key], ...snap.val() }
      // setScreensStatus({ ...screensStatus })

      screens_status[snap.key] = { ...screens_status[snap.key], ...snap.val() }


      console.log("screens_data " + JSON.stringify(screens_data))
      const newScreensData = [...screens_data].map((row, index) => {

        console.log("row.ScreenCode === snap.key " + (row.ScreenCode === snap.key))
        if (row.ScreenCode === snap.key) {
          if (!row.ScreenStatus || (row.ScreenStatus && JSON.stringify(row.ScreenStatus) !== JSON.stringify(screens_status[snap.key])))
            row.ScreenStatus = screens_status[snap.key];
        }
        return row;
      });

      // if (JSON.stringify(newScreensData) !== JSON.stringify(screens_data))
      setScreensData(newScreensData)

      setScreensStatus({ ...screens_status })
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
                onClick={() => {
                  setScreenSelect(null)
                  setOpenPairScreenModal(!openPairScreenModal)
                }}
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
              setOpenPairScreenModal={setOpenPairScreenModal}
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
          screen_preselect={screen_select}
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
