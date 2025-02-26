import React, { useState, useRef } from "react";
import { Header, Navbar } from "../../components";

import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosClose,
  IoIosCheckmark,
} from "react-icons/io";
import useCheckPermission from "../../libs/useCheckPermission";

const _tags = [
  {
    name: "STW Promotion",
    color: "#6427fe",
  },
  {
    name: "Credit Card",
    color: "#00cb45",
  },
  {
    name: "Category",
    color: "#fe8d25",
  },
  {
    name: "Brands",
    color: "#e02020",
  },
  {
    name: "Other",
    color: "#b6b3b3",
  },
];

const styles = {
  tag: {
    padding: 4,
    height: "60px",
    textAlign: "center",
    position: "relative",
    borderRightWidth: ".1em",
    borderRightStyle: "solid",
    borderRightColor: "white",
    boxSizing: "border-box",
    borderLeftWidth: ".1em",
    borderLeftStyle: "solid",
    borderLeftColor: "white",
  },
  tagText: {
    color: "white",
    fontWeight: 700,
    userSelect: "none",
    display: "block",
    overflow: "hidden",
    fontFamily: "serif",
  },
  sliderButton: {
    width: "2em",
    height: "2em",
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "2em",
    right: "calc(-1.1em)",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    margin: "auto",
    zIndex: 10,
    cursor: "ew-resize",
    userSelect: "none",
  },
};

const Content_type = () => {
  useCheckPermission();

  const [searchTerm, setSearchTerm] = useState(null);

  const TagSection = ({ name, color, width, onSliderSelect }) => {
    return (
      <div
        className="tag"
        style={{
          ...styles.tag,
          background: color,
          width: width + "%",
        }}
      >
        <span className="text-white font-[700] select-none block overflow-hidden">
          <div className="font-poppins">{name} </div>
        </span>
        <span className="text-white text-sm font-[700] select-none block overflow-hidden">
          <div className="font-poppins">{width + "%"} </div>
        </span>

        <div
          style={styles.sliderButton}
          onPointerDown={onSliderSelect}
          className="slider-button"
        >
          <img
            src={"https://assets.codepen.io/576444/slider-arrows.svg"}
            height={"30%"}
          />
        </div>
      </div>
    );
  };

  const getPercentage = (containerWidth, distanceMoved) => {
    return (distanceMoved / containerWidth) * 100;
  };

  const limitNumberWithinRange = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const nearestN = (N, number) => Math.ceil(number / N) * N;

  const TagSlider = () => {
    const defaultPercentages = [60, 10, 10, 10, 10];
    const [widths, setWidths] = useState(defaultPercentages);
    const [tags, setTags] = useState(_tags);
    const TagSliderRef = useRef();

    return (
      <div>
        <div
          ref={TagSliderRef}
          style={{
            width: "100%",
            display: "flex",
            backgroundColor: "transparent",
          }}
        >
          {tags.map((tag, index) => (
            <TagSection
              width={widths[index]}
              key={index}
              noSliderButton={index === tags.length - 1}
              name={tag.name}
              onSliderSelect={(e) => {
                e.preventDefault();
                document.body.style.cursor = "ew-resize";

                const startDragX = e.pageX;
                const sliderWidth = TagSliderRef.current.offsetWidth;

                const resize = (e) => {
                  e.preventDefault();
                  const endDragX = e.touches ? e.touches[0].pageX : e.pageX;
                  const distanceMoved = endDragX - startDragX;
                  const maxPercent = widths[index] + widths[index + 1];

                  const percentageMoved = nearestN(
                    1,
                    getPercentage(sliderWidth, distanceMoved)
                  );
                  // const percentageMoved = getPercentage(sliderWidth, distanceMoved);

                  const _widths = widths.slice();

                  const prevPercentage = _widths[index];

                  const newPercentage = prevPercentage + percentageMoved;
                  const currentSectionWidth = limitNumberWithinRange(
                    newPercentage,
                    0,
                    maxPercent
                  );
                  _widths[index] = currentSectionWidth;

                  const nextSectionIndex = index + 1;

                  const nextSectionNewPercentage =
                    _widths[nextSectionIndex] - percentageMoved;
                  const nextSectionWidth = limitNumberWithinRange(
                    nextSectionNewPercentage,
                    0,
                    maxPercent
                  );
                  _widths[nextSectionIndex] = nextSectionWidth;

                  if (tags.length > 2) {
                    if (_widths[index] === 0) {
                      _widths[nextSectionIndex] = maxPercent;
                      _widths.splice(index, 1);
                      setTags(tags.filter((t, i) => i !== index));
                      removeEventListener();
                    }
                    if (_widths[nextSectionIndex] === 0) {
                      _widths[index] = maxPercent;
                      _widths.splice(nextSectionIndex, 1);
                      setTags(tags.filter((t, i) => i !== nextSectionIndex));
                      removeEventListener();
                    }
                  }

                  setWidths(_widths);
                };

                window.addEventListener("pointermove", resize);
                window.addEventListener("touchmove", resize);

                const removeEventListener = () => {
                  window.removeEventListener("pointermove", resize);
                  window.removeEventListener("touchmove", resize);
                };

                const handleEventUp = (e) => {
                  e.preventDefault();
                  document.body.style.cursor = "initial";
                  removeEventListener();
                };

                window.addEventListener("touchend", handleEventUp);
                window.addEventListener("pointerup", handleEventUp);
              }}
              color={tag.color}
            />
          ))}
        </div>
        <button
          onClick={() => {
            const defaultPercentages = [60, 10, 10, 10, 10];
            setTags(_tags);
            setWidths(defaultPercentages);
          }}
          className="mt-10 bg-blue-300 w-[100px] h-[50px] flex justify-center items-center rounded-xl font-poppins text-white"
        >
          Refresh
        </button>
      </div>
    );
  };

  const LeftPanel = ({ is_disable }) => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
    return (
      <div className="w-[300px] lg:w-3/4 mt-10 ml-5 align-middle">
        {/* Header */}
        <div className="p-2 flex shadow-sm">
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
          <div className="ml-2 mt-1">
            <button onClick={() => alert("collapse")}>
              <IoIosArrowDown size="18" color="#6425FE" />
            </button>
          </div>
          {/* Items Amount */}
          <div className="ml-2">
            <span className="ml-2 font-bold">5 Items</span>
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
            <span
              className={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}
            >
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
            <span
              className={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}
            >
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
            <span
              className={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}
            >
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
            <span
              className={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}
            >
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
            <span
              className={`ml-2 font-bold ${is_disable ? "text-gray-300" : ""}`}
            >
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
      <div className="w-[300px] lg:w-3/4 mt-10 ml-5 align-middle">
        <div className="p-2 flex shadow-sm">
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
          <div className="ml-2 mt-1">
            <button onClick={() => alert("collapse")}>
              <IoIosArrowDown size="18" color="#6425FE" />
            </button>
          </div>
          {/* Items Amount */}
          <div className="ml-2">
            <span className="ml-2 font-bold">5 Items</span>
          </div>

          {/* Percent and Action */}
          <div className="ml-auto mr-3 font-bold space-x-2 lg:space-x-24">
            <span className="ml-2 font-bold">Percent</span>
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
            <span className="ml-2 font-bold">STW Promotion</span>
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
            <span className="ml-2 font-bold">Credit Card</span>
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
            <span className="ml-2 font-bold">Category</span>
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
            <span className="ml-2 font-bold">Brands</span>
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
            <span className="ml-2 font-bold">Other</span>
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

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="font-poppins font-semibold text-2xl mt-10">
          Content Type
        </div>
        {/* Media Rules */}
        <div className="container mx-auto mt-10">
          {/* <Bar type="color" /> */}
          <TagSlider />
          <div className="flex flex-col lg:flex-row justify-center lg:text-left">
            {/* Left Panal */}
            <LeftPanel is_disable={true} />

            {/* Middle Button */}
            <a
              onClick={() => alert("click")}
              className="w-[60px] h-[60px] mt-10 lg:mt-52 mx-auto lg:ml-5 bg-[#6425FE] align-middle aspect-w-1 aspect-h-1"
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
    </>
  );
};

export default Content_type;
