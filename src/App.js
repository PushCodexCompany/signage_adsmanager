import React, { useEffect, useState } from "react";
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

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

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
    <div className="dark:bg-main-dark-bg">
      <BrowserRouter>
        {user ? (
          <div className="flex relative">
            {/* Sidebar */}
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-auto">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg z-auto">
                <Sidebar />
              </div>
            )}

            <div
              className={`${
                activeMenu
                  ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                  : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
              }`}
            >
              {/* Navbar */}
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}
                <Routing />
              </div>
              {/* Submenu */}
              {isSubmenuOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-lg">
                    Submenu Content
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Login />
            <Route exact path="/login" element={<Login />} />
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
