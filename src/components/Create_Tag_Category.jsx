import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import User from "../libs/admin";

const Create_Tag_Category = ({
  setModalCreateNewCategory,
  modalCreateNewCategory,
  select_cat,
}) => {
  useEffect(() => {
    if (select_cat !== "new") {
      setEditData();
      setIsNew(false);
    }
  }, [select_cat]);

  const [isNew, setIsNew] = useState(true);
  const [new_categoy_name, setNewCategoryName] = useState({});

  const setEditData = () => {
    setNewCategoryName({
      name: select_cat.TagCategoryName,
      id: select_cat.TagCategoryID,
    });
  };

  const handleNewCategoryTag = (e, fieldName) => {
    setNewCategoryName({
      ...new_categoy_name,
      [fieldName]: e.target.value,
    });
  };

  const handleCreateOrUpdateTagCategory = async () => {
    if (new_categoy_name.name) {
      const { token } = User.getCookieData();

      if (isNew) {
        const obj = {
          tagcategoryname: new_categoy_name.name,
          tagcategorydesc: new_categoy_name.description || null,
        };
        try {
          const data = await User.createTagCategory(obj, token);
          if (data.code !== 404) {
            Swal.fire({
              icon: "success",
              title: "Create Tag Category Success ...",
              text: "สร้าง Tag Category สำเร็จ!",
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        const obj = {
          tagcategoryid: new_categoy_name.id,
          tagcategoryname: new_categoy_name.name,
          tagcategorydesc: new_categoy_name.description || null,
        };
        try {
          const data = await User.updateTagCategory(obj, token);
          if (data.code !== 404) {
            Swal.fire({
              icon: "success",
              title: "Edit Tag Category Success ...",
              text: `แก้ไข Tag Category สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Tag Category !",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      {/* First div (circle) */}
      <div className="absolute right-12 top-14 lg:top-12 lg:right-[160px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button
            onClick={() => setModalCreateNewCategory(!modalCreateNewCategory)}
          >
            <AiOutlineClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
      {/* Second div (gray background) */}
      <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
        <div className="flex justify-center items-center mt-8">
          <div className="font-poppins text-5xl font-bold">
            {isNew ? "New Category" : "Edit Category"}
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="font-poppins text-xs lg:text-sm ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 flex items-center justify-start">
              <div className="font-poppins">Tag Category Name:</div>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                value={new_categoy_name.name}
                onChange={(e) => handleNewCategoryTag(e, "name")}
                className="w-full p-2  border rounded"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 flex items-center justify-start">
              <div className="font-poppins">Tag Category Description:</div>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                value={new_categoy_name.description}
                onChange={(e) => handleNewCategoryTag(e, "description")}
                className="w-full p-2  border rounded"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => handleCreateOrUpdateTagCategory()}
            className="bg-[#6425FE] hover:bg-[#3b1694] w-[20%] h-[40px] text-white font-poppins flex justify-center items-center rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create_Tag_Category;
