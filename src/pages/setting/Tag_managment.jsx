import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import useCheckPermission from "../../libs/useCheckPermission";
import User from "../../libs/admin";
import Permission from "../../libs/permission";
import Create_Tag_Category from "../../components/Create_Tag_Category";
import Swal from "sweetalert2";
import Edit_tag_category from "../../components/Edit_tag_category";

const Tag_managment = () => {
  useCheckPermission();

  const [page_permission, setPagePermission] = useState([]);
  const [select_cat, setSelectCat] = useState([]);
  const [category_data, setCategoryData] = useState([]);
  const [tag_data, setTagData] = useState([]);
  const [new_tag, setNewTag] = useState(null);
  const [modalCreateNewCategory, setModalCreateNewCategory] = useState(false);
  const [modalEditCategory, setModalEditCategory] = useState(false);
  const [modalEditTag, setModalEditTag] = useState(false);
  const [select_tag, setSelectTag] = useState([]);
  const navigate = useNavigate();
  const { token } = User.getCookieData();

  // Setup Data
  useEffect(async () => {
    getCategoryTag();
    setPermissionPage();
  }, []);

  const getCategoryTag = async () => {
    const tag_category = await User.getTagCatagory(token);
    if (tag_category.length > 0) {
      tag_category?.sort((a, b) =>
        a.TagCategoryName.localeCompare(b.TagCategoryName)
      );

      setCategoryData(tag_category);
      setSelectCat(tag_category[0]);
      getTagData(tag_category[0]);
    }
  };

  const getTagData = async (tag_category) => {
    const tag = await User.getTag(tag_category.TagCategoryID, token);
    console.log("tag", tag);
    if (tag.length > 0) {
      tag?.sort((a, b) =>
        a.TagName.localeCompare(b.TagName, undefined, { sensitivity: "base" })
      );
    }

    setTagData(tag);
  };

  const setPermissionPage = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.tagMgt.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
    setPagePermission(permissions.tagMgt);
  };

  //Category function

  const handleNewTagCategory = () => {
    setModalCreateNewCategory(!modalCreateNewCategory);
    setSelectCat("new");
  };

  const handleSelectTagCategory = async (items) => {
    setSelectCat(items);
    const tag = await User.getTag(items.TagCategoryID, token);
    if (tag.length > 0) {
      tag?.sort((a, b) =>
        a.TagName.localeCompare(b.TagName, undefined, { sensitivity: "base" })
      );
    }
    setTagData(tag);
  };

  const handleDeleteCategoryTag = async (items) => {
    Swal.fire({
      title: "คุณต้องการลบ Tag?",
      text: `คุณต้องการ Tag : ${items.TagCategoryName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await User.deleteTagCategory(items.TagCategoryID, token);
          if (data.code === 200) {
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
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Setting"} lv2={"tag_management"} />
        <div className="font-poppins font-semibold text-2xl mt-10">
          Tag Management
        </div>

        <div className="mt-7 grid grid-cols-7 gap-2">
          {/* Left Panel */}
          <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">Tag</div>
              {page_permission.create ? (
                <div
                  onClick={() => handleNewTagCategory()}
                  className="w-[150px] h-[40px] mt-3 bg-[#6425FE]  hover:bg-[#3b1694] text-white font-poppins flex justify-center items-center rounded-lg cursor-pointer shadow-sm"
                >
                  <button>New Tag +</button>
                </div>
              ) : (
                ""
              )}

              <div className="h-[700px] overflow-y-auto">
                {category_data.length > 0 &&
                  category_data.map((items, key) => (
                    <>
                      <div
                        key={key}
                        className={`grid grid-cols-7 gap-2 mt-5 
                  ${
                    items.TagCategoryID === select_cat.TagCategoryID
                      ? "text-white bg-[#6425FE] h-[55px] border rounded-lg shadow-sm"
                      : ""
                  } 
                  cursor-pointer`}
                        onClick={() => handleSelectTagCategory(items)}
                      >
                        <div className="col-span-5 ml-2">
                          <div className={`font-poppins text-2xl`}>
                            {items.TagCategoryName}
                          </div>
                          <div className="text-xs">
                            {items.TagDesc || "No Description"}
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex justify-center items-center mt-3 space-x-4">
                            {page_permission.update ? (
                              <button
                                onClick={() =>
                                  setModalEditCategory(!modalEditCategory)
                                }
                              >
                                <RiEditLine
                                  size={20}
                                  className={`${
                                    items.TagCategoryID ===
                                    select_cat.TagCategoryID
                                      ? "text-white hover:text-gray-500"
                                      : "text-[#6425FE] hover:text-[#3b1694]"
                                  }`}
                                />
                              </button>
                            ) : (
                              <></>
                            )}
                            {page_permission.delete ? (
                              <button>
                                <RiDeleteBin5Line
                                  onClick={() => handleDeleteCategoryTag(items)}
                                  size={20}
                                  className={`${
                                    items.TagCategoryID ===
                                    select_cat.TagCategoryID
                                      ? "text-white hover:text-gray-500"
                                      : "text-[#6425FE] hover:text-[#3b1694]"
                                  }`}
                                />
                              </button>
                            ) : (
                              <></>
                            )}
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
                Tag Options : {select_cat.TagCategoryName}
              </div>
              <div className="col-span-5 mt-10 h-[600px] overflow-y-auto">
                <div className="flex flex-wrap">
                  {tag_data.length > 0 ? (
                    tag_data.map((items, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1 shadow-sm"
                        style={{
                          flexBasis: `calc(30% - 5px)`, // Increased width and adjusted spacing
                        }}
                      >
                        <div className="flex-grow lg:text-sm md:text-xs font-poppins flex justify-center ">
                          {items.TagName}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center w-full h-[600px] ">
                      <span className="text-gray-300 text-4xl">No Tag(s)</span>
                    </div>
                  )}
                </div>
              </div>
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
          getCategoryTag={getCategoryTag}
        />
      )}

      {modalEditCategory && (
        <a
          onClick={() => setModalEditCategory(!modalEditCategory)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalEditCategory && (
        <Edit_tag_category
          setModalEditCategory={setModalEditCategory}
          modalEditCategory={modalEditCategory}
          select_cat={select_cat}
          getCategoryTag={getCategoryTag}
          getTagData={getTagData}
        />
      )}
    </>
  );
};

export default Tag_managment;
