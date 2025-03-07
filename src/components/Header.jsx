import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import User, { SIGNAGE_BRAND_COOKIE } from "../libs/admin";
import cookie from "react-cookies";

const Header = ({ lv1, lv1Url, lv2, lv2Url, lv3, lv3Url }) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const pathname = window.location.pathname
    .split("/")
    .slice(2)
    .filter((x) => x);

  useEffect(() => {
    findBrand();
  }, []);

  const findBrand = async () => {
    const { token } = User.getCookieData();
    const { brand_id } = User.getCampaign();
    const data = await User.getBrand(token);

    const brand = data.find((items) => items.BrandCode === brand_id);
    setBrand(brand?.BrandName ?? null);
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
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#6425FE] dark:text-gray-400 dark:hover:text-white font-poppins"
            >
              {brand}
            </button>
          </li>
          {lv1 ? (
            <li aria-current="page">
              <div className="flex items-center">
                <IoIosArrowForward />
                <div
                  onClick={() => {
                    if (lv1Url) {
                      navigate(lv1Url);
                    }
                  }}
                  className={`ml-1 text-sm font-medium text-gray-700 ${
                    lv1Url ? "hover:text-[#6425FE] hover:cursor-pointer" : ""
                  }  md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins `}
                >
                  {(lv1.charAt(0).toUpperCase() + lv1.slice(1))
                    .replace(/_/g, " ")
                    .replace(/%20/g, " ")}
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}
          {lv2 ? (
            <li aria-current="page">
              <div className="flex items-center">
                <IoIosArrowForward />
                <div
                  onClick={() => {
                    if (lv2Url) {
                      navigate(lv2Url);
                    }
                  }}
                  className={`ml-1 text-sm font-medium text-gray-700 ${
                    lv2Url ? "hover:text-[#6425FE] hover:cursor-pointer" : ""
                  }  md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins `}
                >
                  {(lv2.charAt(0).toUpperCase() + lv2.slice(1))
                    .replace(/_/g, " ")
                    .replace(/%20/g, " ")}
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}

          {lv3 ? (
            <li aria-current="page">
              <div className="flex items-center">
                <IoIosArrowForward />
                <div
                  onClick={() => {
                    if (lv3Url) {
                      navigate(lv3Url);
                    }
                  }}
                  className={`ml-1 text-sm font-medium text-gray-700 ${
                    lv3Url ? "hover:text-[#6425FE] hover:cursor-pointer" : ""
                  }  md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins `}
                >
                  {(lv3.charAt(0).toUpperCase() + lv3.slice(1))
                    .replace(/_/g, " ")
                    .replace(/%20/g, " ")}
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}

          {/* {pathname.map((items, index) => {
            const to = `/${pathname.slice(0, index + 1).join(`/`)}`;
            const last = index === pathname.length - 1;
            return last ? (
              <li key={index} aria-current="page">
                <div className="flex items-center">
                  <IoIosArrowForward />
                  <div className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 font-poppins">
                    {(items.charAt(0).toUpperCase() + items.slice(1))
                      .replace(/_/g, " ")
                      .replace(/%20/g, " ")}
                  </div>
                </div>
              </li>
            ) : (
              <li key={index}>
                <div className="flex items-center">
                  <IoIosArrowForward />
                  <div
                    onClick={() => navigate(to)}
                    // href={to}

                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins hover:cursor-pointer"
                  >
                    {(items.charAt(0).toUpperCase() + items.slice(1))
                      .replace(/_/g, " ")
                      .replace(/%20/g, " ")}
                  </div>
                </div>
              </li>
            );
          })} */}
        </ol>
      </nav>
    </>
  );
};

export default Header;
