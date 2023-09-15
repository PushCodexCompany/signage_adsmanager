import React, { useState } from "react";
import { Header } from "../components";

import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";

import { mechendiseData, merchandiseGrid } from "../libs/campaign_grid";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const Bar = ({ type = "none" }) => {
  return (
    <>
      {type === "color" ? (
        <div class="h-14 w-full flex justify-center mt-8 ">
          <div
            class="flex-grow bg-[#6427FE] rounded-l-lg"
            style={{ width: "60%" }}
          >
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>STW Promotion</div>
              <div>60%</div>
            </div>
          </div>
          <div class="flex-grow bg-[#00CB45]" style={{ width: "10%" }}>
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>Credit Card</div>
              <div>10%</div>
            </div>
          </div>
          <div class="flex-grow bg-[#FE8D25]" style={{ width: "10%" }}>
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>Category</div>
              <div>10%</div>
            </div>
          </div>
          <div class="flex-grow bg-[#E02020]" style={{ width: "10%" }}>
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>Brands</div>
              <div>10%</div>
            </div>
          </div>
          <div
            class="flex-grow bg-[#B6B3B3] rounded-r-lg"
            style={{ width: "10%" }}
          >
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>Other</div>
              <div>10%</div>
            </div>
          </div>
        </div>
      ) : (
        <div class="h-14 w-full flex justify-center mt-8 ">
          <div class="flex-grow bg-[#444444] rounded-xl">
            <div class="flex flex-col justify-center items-center h-full text-white text-sm font-bold">
              <div>N/A</div>
              <div>100%</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LeftPanel = ({ is_disable }) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div class="w-[300px] lg:w-3/4 mt-10 ml-5 align-middle">
      {/* Header */}
      <div className="p-2 flex shadow-lg">
        {/* CheckBox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Dropdown */}
        <div className="ml-2">
          <button onClick={() => alert("collapse")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6425FE"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {/* Items Amount */}
        <div className="ml-2">
          <span class="ml-2 font-bold">5 Items</span>
        </div>
        {/* Action */}
        <div className="ml-auto mr-3 font-bold">
          <span>Action</span>
        </div>
      </div>

      {/* Data */}
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
              disabled={is_disable}
            />
            <span
              className={`h-5 w-5 border ${
                is_disable ? "border-gray-300" : "border-[#6425FE]"
              } rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}>
            STW Promotion
          </span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-3 flex space-x-2">
          <button onClick={() => alert("edit")} disabled={is_disable}>
            <MdOutlineModeEditOutline
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
          <button onClick={() => alert("delete")} disabled={is_disable}>
            <RiDeleteBin5Line
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
              disabled={is_disable}
            />
            <span
              className={`h-5 w-5 border ${
                is_disable ? "border-gray-300" : "border-[#6425FE]"
              } rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}>
            Credit Card
          </span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-3 flex space-x-2">
          <button onClick={() => alert("edit")} disabled={is_disable}>
            <MdOutlineModeEditOutline
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
          <button onClick={() => alert("delete")} disabled={is_disable}>
            <RiDeleteBin5Line
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
              disabled={is_disable}
            />
            <span
              className={`h-5 w-5 border ${
                is_disable ? "border-gray-300" : "border-[#6425FE]"
              } rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}>
            Category
          </span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-3 flex space-x-2">
          <button onClick={() => alert("edit")} disabled={is_disable}>
            <MdOutlineModeEditOutline
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
          <button onClick={() => alert("delete")} disabled={is_disable}>
            <RiDeleteBin5Line
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
              disabled={is_disable}
            />
            <span
              className={`h-5 w-5 border ${
                is_disable ? "border-gray-300" : "border-[#6425FE]"
              } rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}>
            Brands
          </span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-3 flex space-x-2">
          <button onClick={() => alert("edit")} disabled={is_disable}>
            <MdOutlineModeEditOutline
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
          <button onClick={() => alert("delete")} disabled={is_disable}>
            <RiDeleteBin5Line
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
              disabled={is_disable}
            />
            <span
              className={`h-5 w-5 border ${
                is_disable ? "border-gray-300" : "border-[#6425FE]"
              } rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}>
            Other
          </span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-3 flex space-x-2">
          <button onClick={() => alert("edit")} disabled={is_disable}>
            <MdOutlineModeEditOutline
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
          <button onClick={() => alert("delete")} disabled={is_disable}>
            <RiDeleteBin5Line
              size={20}
              className={`${is_disable ? "text-gray-300" : "text-[#6425FE]"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div class="w-[300px] lg:w-3/4 mt-10 ml-5 align-middle">
      <div className="p-2 flex shadow-lg">
        {/* CheckBox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Dropdown */}
        <div className="ml-2">
          <button onClick={() => alert("collapse")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#6425FE"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {/* Items Amount */}
        <div className="ml-2">
          <span class="ml-2 font-bold">5 Items</span>
        </div>

        {/* Percent and Action */}
        <div className="ml-auto mr-3 font-bold space-x-2 lg:space-x-24">
          <span class="ml-2 font-bold">Percent</span>
          <span>Action</span>
        </div>
      </div>
      {/* Data */}
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class="ml-2 font-bold">STW Promotion</span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-6 font-bold space-x-3 lg:space-x-32">
          <span>60%</span>
          <button onClick={() => alert("delete")}>
            <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class="ml-2 font-bold">Credit Card</span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-6 font-bold space-x-3 lg:space-x-32">
          <span>60%</span>
          <button onClick={() => alert("delete")}>
            <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class="ml-2 font-bold">Category</span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-6 font-bold space-x-3 lg:space-x-32">
          <span>60%</span>
          <button onClick={() => alert("delete")}>
            <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class="ml-2 font-bold">Brands</span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-6 font-bold space-x-3 lg:space-x-32">
          <span>60%</span>
          <button onClick={() => alert("delete")}>
            <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
          </button>
        </div>
      </div>
      <div className="p-2 flex mt-1 ">
        {/* Checkbox */}
        <div className="ml-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <span
              className={`h-5 w-5 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                isChecked ? "bg-white" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 text-white ${
                  isChecked ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 ease-in-out`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6425FE"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </label>
        </div>
        {/* Type */}
        <div className="ml-2">
          <span class="ml-2 font-bold">Other</span>
        </div>

        {/* Delete */}
        <div className="ml-auto mr-6 font-bold space-x-3 lg:space-x-32">
          <span>60%</span>
          <button onClick={() => alert("delete")}>
            <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div class="border border-gray-200 rounded-lg h-[50px] flex items-center mt-3 shadow-md">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/4 flex justify-center items-center">
                {/* User Manager */}
                <div>
                  <a
                    className={
                      "w-[full] lg:w-[200px] text-base font-bold  px-5 py-3 rounded block leading-normal " +
                      (openTab === 1
                        ? "text-black bg-white border border-gray-300 shadow-lg"
                        : "text-[#6425FE] bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    User Manager
                  </a>
                </div>

                {/* Content Type */}
                <a
                  className={
                    "w-[full] lg:w-[300px] text-base font-bold  px-5 py-3  rounded block leading-normal " +
                    (openTab === 2
                      ? "text-black bg-white border border-gray-300 shadow-lg"
                      : "text-[#6425FE] bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Content Type
                </a>

                {/* Media Rule */}
                <a
                  className={
                    "w-[full] lg:w-[300px] text-base font-bold  px-5 py-3  rounded block leading-normal " +
                    (openTab === 3
                      ? "text-black bg-white border border-gray-300 shadow-lg"
                      : "text-[#6425FE] bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Media Rule
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0  w-full mb-6 ">
            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
              {/* Select Menu */}
              <div class="rounded-lg h-[50px] flex items-center mt-3 shadow-md">
                <div class="flex flex-col lg:flex-row">
                  <div class="w-full lg:w-3/4 flex justify-center items-center">
                    <div class="relative w-full lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="sort"
                        id="sort"
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Sort">Sort</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="relative w-[300px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="status"
                        id="status"
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Status">Status</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="relative w-full lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="role"
                        id="role"
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="Role">Role</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div class=" h-[50px] flex items-center mt-3  lg:ml-10 ">
                <div class="flex flex-col lg:flex-row">
                  <div class="w-full lg:w-3/4 flex justify-center items-center">
                    {/* filter active */}
                    <button onClick={() => alert("deleted !")}>
                      <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-[#6425FE] font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Active</span>
                      </div>
                    </button>
                    <button onClick={() => alert("deleted !")}>
                      <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-[#6425FE] font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Admin</span>
                      </div>
                    </button>
                    {/* filter active */}

                    {/* Button Clear All */}
                    <button onClick={() => alert("deleted !")}>
                      <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center bg-[#6425FE] text-white justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                        <span className="text-sm">Clear All</span>
                      </div>
                    </button>
                    {/* Button Clear All */}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mt-5">
                <GridComponent
                  dataSource={mechendiseData}
                  height={600}
                  width={"auto"}
                  // allowSorting
                  // pageSettings={{ pageCount: 10 }}
                  // editSettings={editing}
                >
                  <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {merchandiseGrid.map((item, index) => (
                      <ColumnDirective key={index} {...item} />
                    ))}
                  </ColumnsDirective>
                  <Inject services={[Search, Page]} />
                </GridComponent>
              </div>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              {/* Content Type */}
              <Bar />
              <div class="flex flex-col lg:flex-row justify-center lg:text-left">
                {/* Left Panal */}
                <LeftPanel is_disable={false} />

                {/* Middle Button */}
                <a
                  onClick={() => alert("click")}
                  class="w-[60px] h-[60px] mt-10 lg:mt-52 mx-auto lg:ml-5 bg-[#6425FE] align-middle aspect-w-1 aspect-h-1"
                >
                  <div className="p-2 justify-center flex mt-1">
                    <svg
                      width="61"
                      height="33"
                      viewBox="0 0 33 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.36216 1.35394C3.15618 -0.451313 6.06512 -0.451313 7.85909 1.35394L30.312 23.9684C33.8972 27.5796 33.8958 33.4308 30.3092 37.0401L7.84256 59.6458C6.04859 61.4514 3.13965 61.4514 1.34558 59.6458C-0.448524 57.8407 -0.448524 54.9137 1.34558 53.1086L20.5745 33.7604C22.3689 31.9553 22.3684 29.0283 20.5745 27.2232L1.36216 7.89121C-0.431944 6.08601 -0.431944 3.15914 1.36216 1.35394Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>

                {/* Right Panel */}
                <RightPanel />
              </div>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
              {/* Media Rules */}
              <Bar type="color" />
              <div class="flex flex-col lg:flex-row justify-center lg:text-left">
                {/* Left Panal */}
                <LeftPanel is_disable={true} />

                {/* Middle Button */}
                <a
                  onClick={() => alert("click")}
                  class="w-[60px] h-[60px] mt-10 lg:mt-52 mx-auto lg:ml-5 bg-[#6425FE] align-middle aspect-w-1 aspect-h-1"
                >
                  <div className="p-2 justify-center flex mt-1">
                    <svg
                      width="61"
                      height="33"
                      viewBox="0 0 33 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.36216 1.35394C3.15618 -0.451313 6.06512 -0.451313 7.85909 1.35394L30.312 23.9684C33.8972 27.5796 33.8958 33.4308 30.3092 37.0401L7.84256 59.6458C6.04859 61.4514 3.13965 61.4514 1.34558 59.6458C-0.448524 57.8407 -0.448524 54.9137 1.34558 53.1086L20.5745 33.7604C22.3689 31.9553 22.3684 29.0283 20.5745 27.2232L1.36216 7.89121C-0.431944 6.08601 -0.431944 3.15914 1.36216 1.35394Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>

                {/* Right Panel */}
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Campaign = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Dashboard" />
      <div className="mt-10 mb-5 font-bold text-2xl">
        <text>Setting</text>
      </div>
      <Tabs />
    </div>
  );
};

export default Campaign;
