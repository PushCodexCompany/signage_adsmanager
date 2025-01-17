import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import User from "../libs/admin";

const Create_Tag_Category = ({
  setModalCreateNewCategory,
  modalCreateNewCategory,
  getCategoryTag,
}) => {
  const [new_categoy_name, setNewCategoryName] = useState({});

  const handleNewCategoryTag = (e, fieldName) => {
    setNewCategoryName({
      ...new_categoy_name,
      [fieldName]: e.target.value,
    });
  };

  const handleCreateNewTag = async () => {
    if (new_categoy_name.name) {
      const { token } = User.getCookieData();
      // Create
      const obj = {
        tagcategoryname: new_categoy_name.name,
        tagcategorydesc: new_categoy_name.description || null,
      };
      try {
        const data = await User.createTagCategory(obj, token);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "Create Tag Category Success ...",
            text: "สร้าง Tag Category สำเร็จ!",
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getCategoryTag();
              setModalCreateNewCategory(!modalCreateNewCategory);
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
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Tag Category !",
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
            <button
              onClick={() => setModalCreateNewCategory(!modalCreateNewCategory)}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        {/* Content  */}
        <div className="flex justify-center items-center mt-8">
          <div className="font-poppins text-5xl font-bold">New Tag</div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 flex items-center justify-start">
              <div className="font-poppins">Tag Name:</div>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                value={new_categoy_name.name}
                onChange={(e) => handleNewCategoryTag(e, "name")}
                className="w-full p-2  border border-gray-300 rounded-lg shadow-sm "
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 flex items-center justify-start">
              <div className="font-poppins">Tag Description:</div>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                value={new_categoy_name.description}
                onChange={(e) => handleNewCategoryTag(e, "description")}
                className="w-full p-2  border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => handleCreateNewTag()}
            className="bg-[#6425FE] hover:bg-[#3b1694] w-[20%] h-[40px] text-white font-poppins flex justify-center items-center rounded-lg shadow-sm"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create_Tag_Category;
