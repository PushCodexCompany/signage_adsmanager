import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Login, Brands, User_Account } from "./pages";
import Routing from "./route/routing";
import cookie from "react-cookies";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

import User from "./libs/admin";

const RedirectToAdsManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null; // This component doesn't render anything
};

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

    const pathname = window.location.pathname;
    if (pathname === "/") {
      // clearCookiesOnUnload();
      window.location.href = "/adsmanager";
    }
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    // return () => {
    //   // Cleanup: Remove event listener
    //   window.removeEventListener("beforeunload", clearCookiesOnUnload);
    // };
  }, []);

  // const clearCookiesOnUnload = () => {
  //   cookie.remove("signage-brand", { path: false });
  //   cookie.remove("signage-account", { path: false });
  //   cookie.remove("signage-merchandise", { path: false });
  //   cookie.remove("signage-brand-code", { path: false });
  //   cookie.remove("signage-member", { path: false });
  // };

  const user = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter basename={`${process.env.REACT_APP_SUB_DIR}`}>
        {user ? (
          <>
            <div className="flex relative dark:bg-main-dark-bg">
              {/* Sidebar */}
              {activeMenu ? (
                <div
                  className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white "
                  style={{ zIndex: 10 }}
                >
                  {select_campaign ? <Sidebar /> : <></>}
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  {select_campaign ? <Sidebar /> : <></>}
                </div>
              )}

              <div
                className={
                  activeMenu
                    ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen md: ${
                        select_campaign ? "ml-72" : ""
                      } w-full`
                    : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
              >
                <div>
                  {themeSettings && <ThemeSettings />}
                  <Routing />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route exact path={`/`} element={<Login />} />
              <Route exact path={`/brand`} element={<Brands />} />
              <Route exact path={`/user_account`} element={<User_Account />} />
              <Route path="*" element={<RedirectToAdsManager />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
