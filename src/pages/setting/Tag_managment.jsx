import React, { useState } from "react";
import { Header } from "../../components";

import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";

const category = [
  {
    id: 1,
    name: "Technology",
    description: "Technology Description Text",
    tag: ["CTW"],
  },
  {
    id: 2,
    name: "Fashion",
    description: "Fashion Description Text",
    tag: ["CTW", "Digital Screen", "North", "Flagship", "Beauty", "Portrait"],
  },
  {
    id: 3,
    name: "Restaurant",
    description: "Restaurant Description Text",
    tag: ["CTW", "Digital Screen"],
  },
  {
    id: 4,
    name: "Service",
    description: "Service Description Text",
    tag: ["Flagship", "Beauty", "Portrait"],
  },
  {
    id: 5,
    name: "Shopping",
    description: "Shopping Description Text",
    tag: ["Beauty", "Portrait"],
  },
  {
    id: 6,
    name: "Financial",
    description: "Financial Description Text",
    tag: ["Portrait"],
  },
];

const Tag_managment = () => {
  useCheckPermission();
  const [checkboxes, setCheckboxes] = useState(
    Array(category.length).fill(false)
  );
  const [select_cat, setSelectCat] = useState(category[0]);
  const [new_tag, setNewTag] = useState();

  const toggleCheckbox = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const addTag = () => {
    if (new_tag && new_tag.trim() !== "") {
      const updatedTag = [...select_cat.tag, new_tag];
      const updatedSelectCat = { ...select_cat, tag: updatedTag };
      setSelectCat(updatedSelectCat);
      setNewTag(""); // Clear the input field after adding the tag
    }
  };

  const removeTag = (event) => {
    const selectedValue = event;

    const updatedTag = select_cat.tag.filter(
      (value) => value !== selectedValue
    );
    const updatedSelectCat = {
      ...select_cat,
      tag: updatedTag,
    };
    setSelectCat(updatedSelectCat);
  };

  const selectCategory = (items) => {
    setSelectCat(items);
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="font-poppins font-semibold text-2xl mt-10">
          <text>Tag Management</text>
        </div>

        <div className="mt-7 grid grid-cols-7 gap-2">
          {/* Left Panel */}
          <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">Category</div>
              <div className="w-[40%] h-[40px] mt-3 bg-[#6425FE] text-white font-poppins flex justify-center items-center rounded-lg">
                <button>New Category +</button>
              </div>

              {category.map((items, key) => (
                <>
                  <div key={key} className="grid grid-cols-7 gap-2 mt-5">
                    {/* <div className="col-span-1">
                    <label className="inline-flex mt-3 ml-1 items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-6 w-6 cursor-pointer"
                        checked={checkboxes[key]}
                        onChange={() => toggleCheckbox(key)}
                      />
                      <span
                        className={`h-6 w-6 border border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          checkboxes[key] ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-3 w-3 text-white ${
                            checkboxes[key] ? "opacity-100" : "opacity-0"
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
                  </div> */}
                    <div className="col-span-5 ml-2">
                      <div className="font-poppins text-2xl">{items.name}</div>
                      <div className="text-xs">{items.description}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex justify-center items-center mt-3 space-x-4">
                        <button onClick={() => selectCategory(items)}>
                          <RiEditLine size={20} className="text-[#6425FE]" />
                        </button>
                        <button>
                          <RiDeleteBin5Line
                            size={20}
                            className="text-[#6425FE]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* Left Panel */}

          <div className="col-span-5 bg-[#FAFAFA] w-full">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">
                Tag : {select_cat.name}
              </div>

              <div className="grid grid-cols-7 gap-2 mt-5">
                <div className="col-span-6  h-12">
                  <input
                    type="text"
                    className="w-[100%] h-[100%] border border-gray-300 rounded-md pl-4 placeholder-ml-2"
                    placeholder="Enter Tag"
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
                <div className="col-span-1 h-12">
                  <button
                    onClick={() => addTag()}
                    className="w-[100%] h-[100%] rounded-lg bg-[#6425FE] font-poppins text-white"
                  >
                    Add +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-1 mt-5 space-y-1">
                {select_cat.tag &&
                  select_cat.tag.map((items, index) => (
                    <div key={items}>
                      <button onClick={() => removeTag(items)}>
                        <div className="relative w-[100px] lg:w-[160px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3 border border-gray-300 rounded-full">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 ">
                            <IoIosClose size="22" color="#6425FE" />
                          </div>
                          <div className="text-sm font-poppins">{items}</div>
                        </div>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tag_managment;
