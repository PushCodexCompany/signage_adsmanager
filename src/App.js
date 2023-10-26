import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Login } from "./pages";
import Routing from "./route/routing";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

import User from "./libs/admin";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const user = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        {user ? (
          <>
            <div className="flex relative dark:bg-main-dark-bg">
              {/* ToolTip */}
              {/* <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <TooltipComponent content="Settings" position="Top">
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: "50%" }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div> */}

              {/* Sidebar */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  {/* {select_campaign && select_merchandise ? <Sidebar /> : <></>} */}
                  {select_campaign ? <Sidebar /> : <></>}
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  {/* {select_campaign && select_merchandise ? <Sidebar /> : <></>} */}
                  {select_campaign ? <Sidebar /> : <></>}
                </div>
              )}

              <div
                className={
                  activeMenu
                    ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen md: ${
                        // select_campaign && select_merchandise ? "ml-72" : ""
                        select_campaign ? "ml-72" : ""
                      } w-full`
                    : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
              >
                {/* Navbar */}
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
                <div>
                  {themeSettings && <ThemeSettings />}
                  <Routing />
                </div>
                {/* <Footer /> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <Login />
            <Routes>
              <Route
                exact
                path={`${process.env.MAIN_DIR}/login`}
                element={<Login />}
              />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
