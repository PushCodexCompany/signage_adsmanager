import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import User from "../libs/admin";
import Swal from "sweetalert2";
import Select from "react-select";

const New_Tag = ({
  setOpenModalNewTag,
  openModalNewTag,
  screenTag,
  setScreenTag,
  setIsEdit,
  dump_tag,
}) => {
  const { token } = User.getCookieData();
  const [tag_cat, setTagCat] = useState([]);
  const [tag, setTag] = useState([]);

  // value zone
  const [category_select, setCategorySelect] = useState(null);
  const [tag_select, setTagSelect] = useState(null);

  useEffect(() => {
    // get Tag Category
    getTagCatagory();
  }, []);

  useEffect(() => {
    // get Tag in Category when Category is Change
    if (category_select) {
      getTag(category_select);
    }
  }, [category_select]);

  const getTagCatagory = async () => {
    const tag_category = await User.getTagCatagory(token);
    setTagCat(tag_category);
  };

  const handleSetCategory = (value) => {
    setCategorySelect(value);
    setTagSelect("0");
  };

  const getTag = async (id) => {
    const tag = await User.getTag(id, token);
    const options = tag.map((item) => ({
      value: item.TagID,
      label: item.TagName,
      TagCategoryID: item.TagCategoryID,
    }));
    setTag(options);
  };

  const handleChange = (selectedOption) => {
    setTagSelect(selectedOption);
  };

  const arraysEqualInAnyOrder = (arr1, arr2) => {
    // First, check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Loop through each object in arr1
    for (let i = 0; i < arr1.length; i++) {
      const found = arr2.some(
        (item) =>
          item.TagID === arr1[i].TagID && item.TagName === arr1[i].TagName
      );

      // If no match found for arr1[i], return false
      if (!found) {
        return false;
      }
    }

    // If all objects match, return true
    return true;
  };

  const handleSaveTag = () => {
    if (tag_select !== undefined && tag_select !== null && tag_select !== "0") {
      // const tag_value = tag.find((items) => items.value === tag_select.value);
      const tag_value = tag_select.map((selectedItem) => {
        return tag.find((item) => item.value === selectedItem.value);
      });

      const new_tag = [...screenTag];

      tag_value.forEach((tag) => {
        const isDuplicate = screenTag.some((item) => item.TagID === tag.value);

        if (!isDuplicate) {
          const transformedTags = {
            TagID: tag.value,
            TagName: tag.label,
            TagCategoryID: tag.TagCategoryID,
          };

          new_tag.push(transformedTags);
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: "มี Tag นี้อยู่แล้ว",
          });
        }
      });
      const result = arraysEqualInAnyOrder(new_tag, dump_tag);

      if (!result) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }

      setScreenTag(new_tag);

      // Close the modal after processing all tags
      setOpenModalNewTag(!openModalNewTag);
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือก Tag",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setOpenModalNewTag(!openModalNewTag)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        {/* Content  */}
        <div className="flex justify-center items-center mt-5">
          <div className="font-poppins text-5xl text-[#2F3847] font-bold">
            Tag
          </div>
        </div>
        <div className="mt-20 mx-40">
          <div className="grid grid-cols-12 space-x-2 mb-4">
            <div className="col-span-4">
              <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                Tag Categoy :
              </div>
            </div>
            <div className="col-span-8">
              <select
                name="tag_category"
                id="tag_category"
                onChange={(e) => {
                  handleSetCategory(e.target.value);
                }}
                value={category_select}
                className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
              >
                <option value={null} disabled selected hidden>
                  Please Select Tag Category
                </option>
                {tag_cat.length > 0 &&
                  tag_cat.map((items) => (
                    <option value={items.TagCategoryID}>
                      {items.TagCategoryName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {tag.length > 0 ? (
          <div className="mt-2 mx-40">
            <div className="grid grid-cols-12 space-x-2 mb-4">
              <div className="col-span-4">
                <div className="font-poppins text-[#8A8A8A] text-right mt-2">
                  Tag :
                </div>
              </div>
              <div className="col-span-8">
                <Select
                  name="tag"
                  id="tag"
                  value={tag_select}
                  onChange={handleChange}
                  options={tag}
                  placeholder="Please Select Tag"
                  className="lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins"
                  isMulti
                />
                {/* <select
              name="tag"
              id="tag"
              onChange={(e) => {
                setTagSelect(e.target.value);
              }}
              value={tag_select}
              className={`lg:w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
            >
              <option value={"0"} disabled selected hidden>
                Please Select Tag
              </option>
              {tag.length > 0
                ? tag.map((items) => (
                    <option value={items.TagID}>{items.TagName}</option>
                  ))
                : null}
            </select> */}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="mt-40">
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSaveTag()}
              className="w-52 h-10 bg-[#6425FE] hover:bg-[#3b1694] rounded-lg text-white font-poppins"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_Tag;
