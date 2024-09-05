import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../components";

import Screen_Info from "../components/Screen_Info";
import Pair_Screen from "../components/Pair_Screen";

import Filter from "../components/Filter";
import { GridTable } from "../libs/screens_grid";
import User from "../libs/admin";

import firebase from "../utils/Firebase";
import Unpair_screen from "../components/Unpair_screen";
import Select_Pair_screen from "../components/Select_Pair_screen";
import IsPairScreen from "../components/IsPairScreen";
import firebase_func from "../libs/firebase_func";
import Permission from "../libs/permission";

const Event = () => {
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);
  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);
  const [openPairScreenModal, setOpenPairScreenModal] = useState(false);
  const [openUnPairScreenModal, setOpenUnPairScreenModal] = useState(false);
  const [openSelectPairScreenModel, setOpenSelectPairScreenModel] =
    useState(false);
  const [openIsPairModal, setOpenIsPairModal] = useState(false);

  const [screens_data, setScreensData] = useState([]);
  const [screens_status, setScreensStatus] = useState({});
  const [screens_options_data, setScreensOptionsData] = useState([]);
  const [screen_select, setScreenSelect] = useState(null);

  const [checkboxes, setCheckboxes] = useState({});
  const [screen_checkbox_select, setScreenCheckboxSelect] = useState([]);
  const [filter_screen, setFilterScreen] = useState([]);

  const [searchTerm, setSearchTerm] = useState(null);
  const [all_pages, setAllPages] = useState(null);

  const navigate = useNavigate();
  const is_screensstatus_init = useRef(false);

  const { token } = User.getCookieData();
  const [page_permission, setPagePermission] = useState([]);

  useEffect(async () => {
    await fetchScreenData();
    fetchScreenOptionsData();
    getPermission();
    // testFirebase();
  }, [searchTerm]);

  useEffect(async () => {
    if (screens_data.length && !is_screensstatus_init.current) {
      initScreensStatus();
      is_screensstatus_init.current = true;
    }
  }, [screens_data]);

  const initScreensStatus = () => {
    if (screens_data.length <= 0) {
      // console.log("screens_data " + JSON.stringify(screens_data));
      return;
    }

    const { AccountCode, BrandCode, BranchCode } = screens_data[0];
    // console.log("testing firebase " + `${AccountCode}/${BrandCode}/${BranchCode}`);
    // var db = firebase.database().ref().child(`auUpa8dN4g/4lJnf/9kFQV`);

    var db = firebase
      .database()
      .ref()
      .child(`${AccountCode}/${BrandCode}/${BranchCode}`);

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

      screens_status[snap.key] = { ...screens_status[snap.key], ...snap.val() };

      // console.log("screens_data " + JSON.stringify(screens_data));
      const newScreensData = [...screens_data].map((row, index) => {
        // console.log(
        //   "row.ScreenCode === snap.key " + (row.ScreenCode === snap.key)
        // );
        if (row.ScreenCode === snap.key) {
          if (
            !row.ScreenStatus ||
            (row.ScreenStatus &&
              JSON.stringify(row.ScreenStatus) !==
                JSON.stringify(screens_status[snap.key]))
          )
            row.ScreenStatus = screens_status[snap.key];
        }
        return row;
      });

      // if (JSON.stringify(newScreensData) !== JSON.stringify(screens_data))
      setScreensData(newScreensData);
      setScreensStatus({ ...screens_status });
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

      screens_status[snap.key] = { ...screens_status[snap.key], ...snap.val() };

      // console.log("screens_data " + JSON.stringify(screens_data));
      const newScreensData = [...screens_data].map((row, index) => {
        // console.log(
        //   "row.ScreenCode === snap.key " + (row.ScreenCode === snap.key)
        // );
        if (row.ScreenCode === snap.key) {
          if (
            !row.ScreenStatus ||
            (row.ScreenStatus &&
              JSON.stringify(row.ScreenStatus) !==
                JSON.stringify(screens_status[snap.key]))
          )
            row.ScreenStatus = screens_status[snap.key];
        }
        return row;
      });

      // if (JSON.stringify(newScreensData) !== JSON.stringify(screens_data))
      setScreensData(newScreensData);
      setScreensStatus({ ...screens_status });
    });
  };

  const fetchScreenData = async () => {
    if (searchTerm === null) {
      const data = await User.getScreenList(token, 1);
      data.screens.map(async (items) => {
        const screen_status = await firebase_func.getStatusScreen(items);
        items.screen_status = screen_status;
      });

      setScreensData(data.screens);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      const data = await User.getScreenList(token, 1, searchTerm);
      data.screens.map(async (items) => {
        const screen_status = await firebase_func.getStatusScreen(items);
        items.screen_status = screen_status;
      });
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

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions.screen);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Screens"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">Screens</div>
          </div>
          <div className="col-span-4">
            {page_permission?.create ? (
              <div className="flex justify-end space-x-1">
                <button
                  onClick={() => navigate("/screen/create/new")}
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
            ) : (
              <></>
            )}
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
              setOpenInfoScreenModal={setOpenInfoScreenModal}
              openInfoScreenModal={openInfoScreenModal}
              screens_data={screens_data}
              all_pages={all_pages}
              setScreensData={setScreensData}
              searchTerm={searchTerm}
              // screens_options_data={screens_options_data}
              setOpenPairScreenModal={setOpenPairScreenModal}
              setOpenUnPairScreenModal={setOpenUnPairScreenModal}
              openUnPairScreenModal={openUnPairScreenModal}
              setScreenSelect={setScreenSelect}
              page_permission={page_permission}
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

      {openInfoScreenModal && (
        <a
          onClick={() => setOpenInfoScreenModal(!openInfoScreenModal)}
          className="fixed top-0 w-full left-[0px] h-full opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openInfoScreenModal && (
        <Screen_Info
          setOpenInfoScreenModal={setOpenInfoScreenModal}
          selectInfoScreen={selectInfoScreen}
          from="list"
          page_permission={page_permission}
        />
      )}

      {openSelectPairScreenModel && (
        <a
          onClick={() =>
            setOpenSelectPairScreenModel(!openSelectPairScreenModel)
          }
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openSelectPairScreenModel && (
        <Select_Pair_screen
          setOpenSelectPairScreenModel={setOpenSelectPairScreenModel}
          openSelectPairScreenModel={openSelectPairScreenModel}
          screen_checkbox_select={screen_checkbox_select}
          setOpenPairScreenModal={setOpenPairScreenModal}
          openPairScreenModal={openPairScreenModal}
          setScreenSelect={setScreenSelect}
        />
      )}

      {openPairScreenModal && (
        <a
          onClick={() => setOpenPairScreenModal(!openPairScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openPairScreenModal && (
        <Pair_Screen
          openPairScreenModal={openPairScreenModal}
          setOpenPairScreenModal={setOpenPairScreenModal}
          screen_preselect={screen_select}
          openSelectPairScreenModel={openSelectPairScreenModel}
          setOpenSelectPairScreenModel={setOpenSelectPairScreenModel}
          screen_select={screen_select}
          setOpenIsPairModal={setOpenIsPairModal}
          openIsPairModal={openIsPairModal}
        />
      )}

      {openIsPairModal && (
        <a
          onClick={() => setOpenIsPairModal(!openIsPairModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openIsPairModal && (
        <IsPairScreen
          setOpenIsPairModal={setOpenIsPairModal}
          openIsPairModal={openIsPairModal}
          screen_select={screen_select}
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
