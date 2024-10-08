import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import User from "../libs/admin";
import Permission from "../libs/permission";
import { IoIosClose } from "react-icons/io";

const Edit_tag_category = ({
  setModalEditCategory,
  modalEditCategory,
  select_cat,
  getTagData,
}) => {
  const { token } = User.getCookieData();

  useEffect(() => {
    setEditData();
    getTagCategory(select_cat.TagCategoryID);
    setPermissionPage();
  }, [select_cat]);

  const [new_categoy_name, setNewCategoryName] = useState({});
  const [tag_data, setTagData] = useState([]);
  const [new_tag, setNewTag] = useState(null);
  const [page_permission, setPagePermission] = useState([]);

  const [modalEditTag, setModalEditTag] = useState(false);

  const [select_tag, setSelectTag] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const setEditData = () => {
    setNewCategoryName({
      name: select_cat.TagCategoryName,
      id: select_cat.TagCategoryID,
      description: select_cat.TagDesc,
    });
  };

  const getTagCategory = async (TagCategoryID) => {
    const tag = await User.getTag(TagCategoryID, token);
    tag?.sort((a, b) =>
      a.TagName.localeCompare(b.TagName, undefined, { sensitivity: "base" })
    );
    setTagData(tag);
  };

  const setPermissionPage = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions.user);
  };

  const handleNewCategoryTag = (e, fieldName) => {
    if (fieldName === "name") {
      if (e.target.value !== select_cat.TagCategoryName) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    } else {
      if (e.target.value !== select_cat.TagDesc) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }

    setNewCategoryName({
      ...new_categoy_name,
      [fieldName]: e.target.value,
    });
  };

  const handleCreateOrUpdateTagCategory = async () => {
    if (isEdit) {
      Swal.fire({
        text: `ยืนยันการแก้ไข Tag  `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#219ad1",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (new_categoy_name.name) {
            const { token } = User.getCookieData();

            // Update
            const obj = {
              tagcategoryid: new_categoy_name.id,
              tagcategoryname: new_categoy_name.name,
              tagcategorydesc: new_categoy_name.description || null,
            };
            try {
              const data = await User.updateTagCategory(obj, token);
              if (data.code === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Edit Tag Category Success ...",
                  text: `แก้ไข Tag Category สำเร็จ!`,
                }).then((result) => {
                  if (
                    result.isConfirmed ||
                    result.dismiss === Swal.DismissReason.backdrop
                  ) {
                    getTagCategory();
                    setModalEditCategory(!modalEditCategory);
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
        }
      });
    }
  };

  const addNewTag = async () => {
    if (new_tag) {
      const obj = {
        tagname: new_tag,
        tagcategoryid: select_cat.TagCategoryID,
      };
      try {
        const data = await User.createTag(obj, token);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "Add Tag Success ...",
            text: `เพิ่ม Tag สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getTagCategory(select_cat.TagCategoryID);
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
    Swal.fire({
      title: "คุณต้องการลบ Tag Option?",
      text: `คุณต้องการลบ Tag Option : ${items.TagName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await User.deleteTag(items.TagID, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "ลบ Tag Option Success ...",
              text: `ลบ Tag Option ${items.TagName} สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                getTagData(select_cat);
                getTagCategory(select_cat.TagCategoryID);
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
    });
  };

  const handleEditTag = (items) => {
    setModalEditTag(!modalEditTag);
    setSelectTag(items);
  };

  const handleEditTagName = async () => {
    if (select_tag) {
      try {
        const data = await User.updateTag(select_tag, token);
        if (data.code === 200) {
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
              getTagCategory(select_tag.TagCategoryID);
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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
        {/* Main centered content container */}
        <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
          {/* Close button - adjust positioning */}
          <div className={`absolute -top-4 -right-4 m-4 z-30`}>
            <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setModalEditCategory(!modalEditCategory)}>
                <IoIosClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Content  */}
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
                  value={new_categoy_name.name}
                  onChange={(e) => handleNewCategoryTag(e, "name")}
                  className="w-full p-2  border border-gray-300 rounded-lg shadow-sm"
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
          <div className="p-4">
            <div className="font-poppins text-xl">Tag Options</div>
            <div className="grid grid-cols-7 gap-2 mt-5">
              <div className="col-span-6  h-12">
                <input
                  type="text"
                  className="w-[100%] h-[100%] border border-gray-300 rounded-md pl-4 placeholder-ml-2 shadow-sm"
                  placeholder="กรอกชื่อ Tag Option"
                  value={new_tag}
                  onChange={(e) => setNewTag(e.target.value)}
                  disabled={
                    page_permission.create || page_permission.update
                      ? false
                      : true
                  }
                />
              </div>
              {page_permission.create || page_permission.update ? (
                <div className="col-span-1 h-12">
                  <button
                    onClick={() => addNewTag()}
                    className="w-[100%] h-[100%] rounded-lg bg-[#6425FE]  hover:bg-[#3b1694] font-poppins text-white shadow-sm "
                  >
                    Add Tag Option
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-wrap h-[300px] overflow-y-auto mt-3">
              {tag_data.length > 0 ? (
                tag_data.map((items, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 h-[35px] rounded-lg flex justify-center items-center mb-1 mr-1  shadow-sm"
                    style={{
                      flexBasis: `calc(25% - 5px)`, // Increased width and adjusted spacing
                    }}
                  >
                    {page_permission.delete ? (
                      <div className="flex justify-center items-center mr-1 ml-1">
                        <IoIosClose
                          onClick={() => removeTag(items)}
                          className="text-[#6425FE] hover:text-[#3b1694] cursor-pointer"
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {page_permission.update ? (
                      <div
                        onClick={() => handleEditTag(items)}
                        className="flex-grow lg:text-sm md:text-xs font-poppins flex justify-center cursor-pointer"
                      >
                        {items.TagName}
                      </div>
                    ) : (
                      <div className="flex-grow lg:text-sm md:text-xs font-poppins flex justify-center ">
                        {items.TagName}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-[300px]">
                  <span className="text-gray-300 text-4xl">No Tag(s)</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={() => handleCreateOrUpdateTagCategory()}
              className={`w-[315px] h-[48px]  ${
                isEdit
                  ? "bg-[#6425FE] hover:bg-[#6325fe86]"
                  : "bg-gray-500 hover:bg-gray-800"
              } text-white font-bold font-poppins rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {modalEditTag && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
          <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
            <div className={`absolute -top-4 -right-4 m-4 z-30`}>
              <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
                <button onClick={() => setModalEditTag(!modalEditTag)}>
                  <IoIosClose size={25} color={"#6425FE"} />
                </button>
              </div>
            </div>

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

export default Edit_tag_category;
