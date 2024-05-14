import React, { useState, useEffect } from "react";
import { Header } from "../../components";

import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import User from "../../libs/admin";
import Permission from "../../libs/permission";
import Create_Tag_Category from "../../components/Create_Tag_Category";
import Swal from "sweetalert2";

const Tag_managment = () => {
  useCheckPermission();

  const [page_permission, setPagePermission] = useState([]);
  const [select_cat, setSelectCat] = useState([]);
  const [category_data, setCategoryData] = useState([]);
  const [tag_data, setTagData] = useState([]);
  const [new_tag, setNewTag] = useState(null);
  const [modalCreateNewCategory, setModalCreateNewCategory] = useState(false);
  const [modalEditTag, setModalEditTag] = useState(false);
  const [select_tag, setSelectTag] = useState([]);

  const { token } = User.getCookieData();

  // Setup Data
  useEffect(async () => {
    getCategoryTag();
    setPermissionPage();
  }, []);

  const getCategoryTag = async () => {
    const tag_category = await User.getTagCatagory(token);
    if (tag_category.length > 0) {
      tag_category.sort((a, b) =>
        a.TagCategoryName.localeCompare(b.TagCategoryName)
      );
      setCategoryData(tag_category);
      setSelectCat(tag_category[0]);
      getTagData(tag_category[0]);
    }
  };

  const getTagData = async (tag_category) => {
    const tag = await User.getTag(tag_category.TagCategoryID, token);

    setTagData(tag);
  };

  const setPermissionPage = async () => {
    const { user } = User.getCookieData();
    // const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    const mock_tag_permission = {
      create: true,
      delete: true,
      update: true,
      view: true,
    };
    setPagePermission(mock_tag_permission);
  };

  //Category function

  const handleNewTagCategory = () => {
    setModalCreateNewCategory(!modalCreateNewCategory);
    setSelectCat("new");
  };

  const handleSelectTagCategory = async (items) => {
    setSelectCat(items);
    const tag = await User.getTag(items.TagCategoryID, token);
    setTagData(tag);
  };

  const handleDeleteCategoryTag = async (items) => {
    try {
      const data = await User.deleteTagCategory(items.TagCategoryID, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "Delete Tag Category Success ...",
          text: `ลบ Tag Category ${items.TagCategoryName} สำเร็จ!`,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            getCategoryTag();
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
  };

  // Tag Function

  const addNewTag = async () => {
    if (new_tag) {
      const obj = {
        tagname: new_tag,
        tagcategoryid: select_cat.TagCategoryID,
      };
      try {
        const data = await User.createTag(obj, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "Add Tag Success ...",
            text: `เพิ่ม Tag สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getTagData(select_cat);
              setNewTag([]);
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
        console.log("error", error);
      }
    }
  };

  const removeTag = async (items) => {
    try {
      const data = await User.deleteTag(items.TagID, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "Delete Tag Success ...",
          text: `ลบ Tag สำเร็จ!`,
        }).then((result) => {
          if (
            result.isConfirmed ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            getTagData(select_cat);
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
      console.log("error", error);
    }
  };

  const handleEditTag = (items) => {
    setModalEditTag(!modalEditTag);
    setSelectTag(items);
  };

  const handleEditTagName = async () => {
    if (select_tag) {
      try {
        const data = await User.updateTag(select_tag, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "Edit Tag Success ...",
            text: `แก้ไข Tag สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              setSelectTag([]);
              getTagData(select_tag);
              setModalEditTag(!modalEditTag);
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
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="font-poppins font-semibold text-2xl mt-10">
          Tag Management
        </div>

        <div className="mt-7 grid grid-cols-7 gap-2">
          {/* Left Panel */}
          <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">Category</div>
              <div className="w-[150px] h-[40px] mt-3 bg-[#6425FE]  hover:bg-[#3b1694] text-white font-poppins flex justify-center items-center rounded-lg">
                {page_permission.create ? (
                  <button onClick={() => handleNewTagCategory()}>
                    New Category +
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="h-[700px] overflow-y-auto">
                {category_data.length > 0 &&
                  category_data.map((items, key) => (
                    <>
                      <div
                        key={key}
                        className={`grid grid-cols-7 gap-2 mt-5 
                  ${
                    items.TagCategoryID === select_cat.TagCategoryID
                      ? "text-[#6425FE]"
                      : ""
                  } 
                  cursor-pointer`}
                        onClick={() => handleSelectTagCategory(items)}
                      >
                        <div className="col-span-5 ml-2">
                          <div className={`font-poppins text-2xl`}>
                            {items.TagCategoryName}
                          </div>
                          <div className="text-xs">{items.TagDesc}</div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex justify-center items-center mt-3 space-x-4">
                            <button
                              onClick={() =>
                                setModalCreateNewCategory(
                                  !modalCreateNewCategory
                                )
                              }
                            >
                              <RiEditLine
                                size={20}
                                className="text-[#6425FE] hover:text-[#3b1694]"
                              />
                            </button>
                            <button>
                              <RiDeleteBin5Line
                                onClick={() => handleDeleteCategoryTag(items)}
                                size={20}
                                className="text-[#6425FE] hover:text-[#3b1694]"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
          {/* Left Panel */}
          {/* Right Panel */}
          <div className="col-span-5 bg-[#FAFAFA] w-full">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">
                Tag : {select_cat.TagCategoryName}
              </div>

              <div className="grid grid-cols-7 gap-2 mt-5">
                <div className="col-span-6  h-12">
                  <input
                    type="text"
                    className="w-[100%] h-[100%] border border-gray-300 rounded-md pl-4 placeholder-ml-2"
                    placeholder="Enter Tag"
                    value={new_tag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
                <div className="col-span-1 h-12">
                  <button
                    onClick={() => addNewTag()}
                    className="w-[100%] h-[100%] rounded-lg bg-[#6425FE]  hover:bg-[#3b1694] font-poppins text-white"
                  >
                    Add +
                  </button>
                </div>
              </div>
              <div className="col-span-5 mt-5 h-[600px] overflow-y-auto">
                <div className="flex flex-wrap">
                  {tag_data.length > 0
                    ? tag_data.map((items, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1"
                          style={{
                            flexBasis: `calc(30% - 5px)`, // Increased width and adjusted spacing
                          }}
                        >
                          <div className="flex justify-center items-center mr-1 ml-1">
                            <IoIosClose
                              onClick={() => removeTag(items)}
                              className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                            />
                          </div>
                          <div
                            onClick={() => handleEditTag(items)}
                            className="flex-grow lg:text-sm md:text-xs font-poppins flex justify-center cursor-pointer"
                          >
                            {items.TagName}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              {/* {tag_data.length > 0 ? (
                <div className="grid grid-cols-5 gap-2 mt-5">
                  {tag_data.map((items, index) => (
                    <div key={items.TagID}>
                      <div className="relative w-[150px] lg:w-[180px] h-[40px] flex items-center justify-center  ml-3 border border-gray-300 hover:border-[#6425FE] rounded-full">
                        <div className=" absolute inset-y-0 left-0 flex items-center pl-2 ">
                          <button onClick={() => removeTag(items)}>
                            <IoIosClose
                              size="22"
                              className="text-[#6425FE] hover:text-[#504f53] cursor-pointer"
                            />
                          </button>
                        </div>
                        <div
                          onClick={() => handleEditTag(items)}
                          className="text-sm md:text-xs text-bold font-poppins cursor-pointer "
                        >
                          {items.TagName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex justify-center items-center h-[650px]">
                    <span className="text-gray-300 text-4xl">No Tag(s)</span>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          {/* Right Panel */}
        </div>
      </div>

      {modalCreateNewCategory && (
        <a
          onClick={() => setModalCreateNewCategory(!modalCreateNewCategory)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalCreateNewCategory && (
        <Create_Tag_Category
          setModalCreateNewCategory={setModalCreateNewCategory}
          modalCreateNewCategory={modalCreateNewCategory}
          select_cat={select_cat}
        />
      )}

      {modalEditTag && (
        <a
          onClick={() => setModalEditTag(!modalEditTag)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalEditTag && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 md:top-[320px] md:right-[140px] lg:top-72 lg:right-[250px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setModalEditTag(!modalEditTag)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-[60%] lg:w-[70%] h-[40%] lg:h-[30%] rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Edit Tag</div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3 flex items-center justify-start">
                  <div className="font-poppins">Tag Name:</div>
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    value={select_tag.TagName}
                    onChange={(e) =>
                      setSelectTag({
                        ...select_tag,
                        TagName: e.target.value,
                      })
                    }
                    className="w-full p-2  border rounded"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={() => handleEditTagName()}
                className="bg-[#6425FE] hover:bg-[#3b1694] w-[20%] h-[40px] text-white font-poppins flex justify-center items-center rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tag_managment;
