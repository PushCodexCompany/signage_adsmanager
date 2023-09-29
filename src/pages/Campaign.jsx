import React, { useState, useRef } from "react";
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
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosClose,
  IoIosCheckmark,
} from "react-icons/io";

import "./css/bar.css";

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
////////////////////////////////////////////////////////////////

const TagSection = ({
  name,
  color,
  width,
  isFirst,
  isLast,
  onSliderSelect,
}) => {
  // const tagClasses = `tag ${isFirst ? "rounded-l-full" : ""} ${
  //   isLast ? "rounded-r-full" : ""
  // }`;
  // const sliderButtonClasses = `slider-button`;
  return (
    // <div
    //   className={tagClasses}
    //   style={{
    //     ...styles.tag,
    //     background: color,
    //     width: width + "%",
    //   }}
    // >
    //   <div>
    //     <span className="text-white text-sm font-bold font-poppins">
    //       {name}
    //     </span>
    //   </div>
    //   <div>
    //     <span className="text-white text-sm font-bold font-poppins">
    //       {width + "%"}
    //     </span>
    //   </div>
    //   {!isLast ? (
    //     <div
    //       style={styles.sliderButton}
    //       className={sliderButtonClasses}
    //       onPointerDown={onSliderSelect}
    //     >
    //       <img
    //         src={"https://assets.codepen.io/576444/slider-arrows.svg"}
    //         className="h-30"
    //       />
    //     </div>
    //   ) : (
    //     ""
    //   )}
    // </div>
    <div
      className="tag"
      style={{
        ...styles.tag,
        background: color,
        width: width + "%",
      }}
    >
      <span style={styles.tagText}>{name}</span>
      <span style={{ ...styles.tagText, fontSize: 12 }}>{width + "%"}</span>

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

// const TagSlider = () => {
//   const defaultPercentages = [60, 10, 10, 10, 10];

//   const [widths, setWidths] = useState(defaultPercentages);
//   const [tags, setTags] = useState(_tags);
//   const TagSliderRef = useRef(null);

//   const updateWidths = (newWidths, startIndex) => {
//     // Ensure the sum of percentages is always 100%
//     const totalPercentage = newWidths.reduce((sum, width) => sum + width, 0);
//     if (totalPercentage === 100) {
//       setWidths(newWidths);
//     } else {
//       // If the sum is not 100%, adjust the last section accordingly
//       const adjustedWidths = [...newWidths];
//       const lastIndex = adjustedWidths.length - 1;
//       adjustedWidths[lastIndex] =
//         100 -
//         adjustedWidths
//           .slice(0, lastIndex)
//           .reduce((sum, width) => sum + width, 0);
//       setWidths(adjustedWidths);
//     }
//   };

//   return (
//     <>
//       <div
//         ref={TagSliderRef}
//         style={{
//           width: "100%",
//           display: "flex",
//         }}
//       >
//         {_tags.map((tag, index) => (
//           <TagSection
//             width={widths[index]}
//             key={index}
//             name={tag.name}
//             color={tag.color}
//             isFirst={index === 0}
//             isLast={index === _tags.length - 1}
//             onSliderSelect={(e) => {
//               e.preventDefault();
//               document.body.style.cursor = "ew-resize";
//               const startDragX = e.pageX;
//               const sliderWidth = TagSliderRef.current.offsetWidth;
//               const resize = (e) => {
//                 e.preventDefault();
//                 const endDragX = e.touches ? e.touches[0].pageX : e.pageX;
//                 const distanceMoved = endDragX - startDragX;
//                 const maxPercent = widths[index] + widths[index + 1];
//                 const percentageMoved = nearestN(
//                   1,
//                   getPercentage(sliderWidth, distanceMoved)
//                 );
//                 const _widths = widths.slice();
//                 const prevPercentage = _widths[index];
//                 const newPercentage = prevPercentage + percentageMoved;
//                 const currentSectionWidth = limitNumberWithinRange(
//                   newPercentage,
//                   0,
//                   maxPercent
//                 );
//                 _widths[index] = currentSectionWidth;
//                 const nextSectionIndex = index + 1;
//                 const nextSectionNewPercentage =
//                   _widths[nextSectionIndex] - percentageMoved;
//                 const nextSectionWidth = limitNumberWithinRange(
//                   nextSectionNewPercentage,
//                   0,
//                   maxPercent
//                 );
//                 _widths[nextSectionIndex] = nextSectionWidth;
//                 if (tags.length > 2) {
//                   if (_widths[index] === 0) {
//                     _widths[nextSectionIndex] = maxPercent;
//                     _widths.splice(index, 1);
//                     setTags(tags.filter((t, i) => i !== index));
//                     removeEventListener();
//                   }
//                   if (_widths[nextSectionIndex] === 0) {
//                     _widths[index] = maxPercent;
//                     _widths.splice(nextSectionIndex, 1);
//                     setTags(tags.filter((t, i) => i !== nextSectionIndex));
//                     removeEventListener();
//                   }
//                 }
//                 updateWidths(_widths);
//               };
//               window.addEventListener("pointermove", resize);
//               window.addEventListener("touchmove", resize);
//               const removeEventListener = () => {
//                 window.removeEventListener("pointermove", resize);
//                 window.removeEventListener("touchmove", resize);
//               };

//               const handleEventUp = (e) => {
//                 e.preventDefault();
//                 document.body.style.cursor = "initial";
//                 removeEventListener();
//               };
//               window.addEventListener("touchend", handleEventUp);
//               window.addEventListener("pointerup", handleEventUp);
//             }}
//           />
//         ))}
//       </div>
//       <button
//         onClick={() => {
//           setTags(_tags);
//           setWidths(new Array(_tags.length).fill(100 / _tags.length));
//         }}
//         style={{ marginTop: 10 }}
//       >
//         Refresh
//       </button>
//     </>
//   );
// };

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

////////////////////////////////////////////////////////////////

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
        <div className="ml-2 mt-1">
          <button onClick={() => alert("collapse")}>
            <IoIosArrowDown size="18" color="#6425FE" />
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
        <div className="ml-2 mt-1">
          <button onClick={() => alert("collapse")}>
            <IoIosArrowDown size="18" color="#6425FE" />
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

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const [filter, setFilter] = useState(["Admin"]);

  const toggleSortSelect = () => {
    setIsSortOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRoleSelect = () => {
    setIsRoleOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(selectedValue)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, selectedValue]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
  };

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
                        onClick={toggleSortSelect}
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="0">Sort</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                        <option value="...">...</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isSortOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div class="relative w-[300px] lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="status"
                        id="status"
                        onClick={toggleStatusSelect}
                        onChange={handleStatusChange}
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="0">Status</option>
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                        {isStatusOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
                      </div>
                    </div>
                    <div class="relative w-full lg:w-[300px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                      <select
                        name="role"
                        id="role"
                        onClick={toggleRoleSelect}
                        onChange={handleStatusChange}
                        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      >
                        <option value="0">Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isRoleOpen ? (
                          <IoIosArrowUp size={18} color="#6425FE" />
                        ) : (
                          <IoIosArrowDown size={18} color="#6425FE" />
                        )}
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

                    {filter &&
                      filter.map((items) => (
                        <button onClick={() => removeFilter(items)}>
                          <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                              <IoIosClose size="22" color="#6425FE" />
                            </div>
                            <span className="text-sm">{items}</span>
                          </div>
                        </button>
                      ))}

                    {/* filter active */}

                    {/* Button Clear All */}
                    {filter.length > 0 && (
                      <button onClick={() => clearFilter()}>
                        <div class="relative w-[100px] lg:w-[130px] h-[40px] flex items-center bg-[#6425FE] text-white justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                          <span className="text-sm">Clear All</span>
                        </div>
                      </button>
                    )}

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
              <div className="container mx-auto mt-10">
                {/* <Bar type="color" /> */}
                <TagSlider />
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
