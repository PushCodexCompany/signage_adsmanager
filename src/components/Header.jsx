import React from "react";
import Link from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Header = ({ title, subtitle }) => {
  const pathname = window.location.pathname.split("/").filter((x) => x);

  return (
    <>
      {/* <div className=" mb-10">
        <p className="text-[24px] text-gray-700 font-bold">{title}</p>
      </div> */}
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a
              href="/dashboard"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white font-poppins"
            >
              {title}
            </a>
          </li>

          {pathname.map((items, index) => {
            const to = `/${pathname.slice(0, index + 1).join(`/`)}`;
            const last = index === pathname.length - 1;
            return last ? (
              <li aria-current="page">
                <div class="flex items-center">
                  <IoIosArrowForward />
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 font-poppins">
                    {items.charAt(0).toUpperCase() + items.slice(1)}
                  </span>
                </div>
              </li>
            ) : (
              <li>
                <div class="flex items-center">
                  <IoIosArrowForward />
                  <a
                    href={to}
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white font-poppins"
                  >
                    {items.charAt(0).toUpperCase() + items.slice(1)}
                  </a>
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
