import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import User from "../libs/admin";
import cookie from "react-cookies";
const SIGNAGE_BRAND_COOKIE = "signage-brand";

const Header = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const pathname = window.location.pathname
    .split("/")
    .slice(2)
    .filter((x) => x);

  useEffect(() => {
    findBrand();
  }, []);

  const findBrand = () => {
    const { brand_id } = User.getCampaign();

    if (brand_id === 1) {
      setBrand("CDS");
    } else if (brand_id === 2) {
      setBrand("Super Sports");
    } else if (brand_id === 3) {
      setBrand("Central Retail");
    } else if (brand_id === 4) {
      setBrand("CMG");
    } else if (brand_id === 5) {
      setBrand("7-11");
    } else if (brand_id === 6) {
      setBrand("Makro Pro");
    } else if (brand_id === 7) {
      setBrand("Lotus's");
    } else if (brand_id === 8) {
      setBrand("Central Pattana");
    } else if (brand_id === 9) {
      setBrand("Robinson");
    }
  };

  const selectBrand = () => {
    cookie.remove(SIGNAGE_BRAND_COOKIE, { path: "/" });
    window.location.href = "/adsmanager/brand";
  };

  return (
    <>
      {/* <div className=" mb-10">
        <p className="text-[24px] text-gray-700 font-bold">{title}</p>
      </div> */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button
              onClick={() => selectBrand()}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white font-poppins"
            >
              {brand}
            </button>
          </li>

          {pathname.map((items, index) => {
            const to = `/${pathname.slice(0, index + 1).join(`/`)}`;
            const last = index === pathname.length - 1;
            return last ? (
              <li aria-current="page">
                <div className="flex items-center">
                  <IoIosArrowForward />
                  <div className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 font-poppins">
                    {(items.charAt(0).toUpperCase() + items.slice(1)).replace(
                      /_/g,
                      " "
                    )}
                  </div>
                </div>
              </li>
            ) : (
              <li>
                <div className="flex items-center">
                  <IoIosArrowForward />
                  <div
                    onClick={() => navigate(to)}
                    // href={to}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins"
                  >
                    {(items.charAt(0).toUpperCase() + items.slice(1)).replace(
                      /_/g,
                      " "
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Header;
