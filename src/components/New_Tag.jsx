import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import User from "../libs/admin";
import Swal from "sweetalert2";

const New_Tag = ({
  setOpenModalNewTag,
  openModalNewTag,
  screenTag,
  setScreenTag,
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
    setTag(tag);
  };

  const handleSaveTag = () => {
    if (tag_select !== undefined && tag_select !== null && tag_select !== "0") {
      const tag_value = tag.find(
        (items) => items.TagID === parseInt(tag_select)
      );

      const isDuplicate = screenTag.some(
        (item) => item.TagID === tag_value.TagID
      );

      if (!isDuplicate) {
        // If TagID of b is not a duplicate, push b into a
        screenTag.push(tag_value);
        setScreenTag(screenTag);
        setOpenModalNewTag(!openModalNewTag);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: "มี Tag นี้อยู่แล้ว",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือก Tag",
      });
    }
  };

  return (
    <div className="fixed -top-7 left-0 right-0 bottom-0 flex h-[970px] items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[165px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button onClick={() => setOpenModalNewTag(!openModalNewTag)}>
            <AiOutlineClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
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
                <select
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
                </select>
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
