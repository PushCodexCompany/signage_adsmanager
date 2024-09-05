import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../../components";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import useCheckPermission from "../../../libs/useCheckPermission";
import Encryption from "../../../libs/encryption";
import User from "../../../libs/admin";
import Permission from "../../../libs/permission";
import Swal from "sweetalert2";
import Create_Role_Permission from "../../../components/Create_Role_Permission";
import Edit_Role_permission from "../../../components/Edit_Role_permission";

const Role_permission = () => {
  useCheckPermission();
  const [child_permissions, setChildPermission] = useState([]);
  const [select_role, setSelectRole] = useState(0);
  const [modalCreateRole, setModalCreateRole] = useState(false);
  const [modalEditRole, setModalEditRole] = useState(false);

  const [selectRoleEdit, setSelectRoleEdit] = useState([]);

  const { token } = User.getCookieData();
  const { permission } = User.getPermission();

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const user_permission = await User.getUserRoles(token);
    const child_permission = user_permission?.map((item) => {
      const convertedPermissions =
        Permission.convertPermissionValuesToBooleanForPermissionPage(item);

      return {
        ...item,
        permissions: convertedPermissions.permissions,
        other_permission: item.other_permission
          ? convertedPermissions.other_permission
          : [],
      };
    });

    // const child_permission = user_permission?.map((item) => {
    //   return {
    //     ...item,
    //     permissions: Permission.convertPermissionValuesToBoolean([item])
    //       .permissions,
    //     other_permission: item.other_permission
    //       ? Permission.convertPermissionValuesToBoolean([item]).other_permission
    //       : [],
    //   };
    // });
    setChildPermission(child_permission);
  };

  const selectRole = (key) => {
    setSelectRole(key);
  };

  const createNewRole = () => {
    setModalCreateRole(!modalCreateRole);
  };

  const handleEditRoleName = (items) => {
    setSelectRoleEdit(items);
    setModalEditRole(!modalEditRole);
  };

  const selectRolePermission = (key) => {
    selectRole(key);
  };

  //Delete
  const handleDeleteRoleName = async (key) => {
    Swal.fire({
      text: `คุณต้องการลบ ${child_permissions[key].RoleName} ออกจาก User Role`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { account } = User.getAccount();
        const obj = {
          roleid: child_permissions[key].RoleID,
          accountcode: account.AccountCode,
        };

        const encrypted = await Encryption.encryption(
          obj,
          "delete_role",
          false
        );
        const data = await User.deleteUserRole(encrypted, token);

        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "ลบ User Role สำเร็จ",
            text: `ลบ User Role ${child_permissions[key].RoleName} สำเร็จ`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getPermission();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "ลบ User Role ไม่สำเร็จ",
            text: data.message,
          });
        }
      }
    });
  };

  const Tabs = ({ roleData, type }) => {
    const [openTab, setOpenTab] = React.useState(1);

    const CheckboxGroup = ({ title, items, data }) => {
      const header = ["create", "delete", "update", "view"];

      let data_check;
      if (data) {
        data_check = data;
      } else {
        data_check = {
          create: false,
          delete: false,
          update: false,
          view: false,
        };
      }

      const [checkboxes, setCheckboxes] = useState(
        header.reduce((acc, item) => {
          acc[item] = data_check[item] !== undefined ? data_check[item] : false;
          return acc;
        }, {})
      );

      const toggleCheckbox = (itemName) => {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [itemName]: !prevCheckboxes[itemName],
        }));

        if (roleData.permissions[title]) {
          roleData.permissions[title][itemName] =
            !roleData.permissions[title][itemName];
        } else {
          const temp = {
            [title]: {
              [itemName]: true,
            },
          };

          const mergedPermissions = {
            ...roleData.permissions,
            ...temp,
          };

          roleData.permissions = mergedPermissions;
        }
      };

      return (
        <>
          <div className="col-span-1">
            <div className="grid grid-rows-5 gap-4">
              <div className="font-poppins font-bold">
                {title[0].toUpperCase() + title.slice(1)}
              </div>

              {items.map((item, index) => (
                <div
                  className="grid grid-cols-4 space-x-4 lg:space-x-2"
                  key={index}
                >
                  <div className="col-span-1">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={checkboxes[item]}
                        onChange={() => toggleCheckbox(item)}
                        disabled={true}
                      />
                      <span
                        className={`h-5 w-5 border-2 border-[#6425FE] hover:border-[#3b1694] rounded-sm cursor-pointer flex items-center justify-center ${
                          checkboxes[item] ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 text-white ${
                            checkboxes[item] ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div className="col-span-3">
                    <div className="font-poppins md:text-xs md:mt-[2px] lg:mt-0 lg:text-base">
                      {item[0].toUpperCase() + item.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    };

    const OtherBoxGroup = ({ data = {} }) => {
      // Provide a default empty object for data
      const [checkboxes, setCheckboxes] = useState(
        Object.keys(data).reduce((acc, item) => {
          acc[item] = data[item]; // Initialize checkboxes based on the provided data
          return acc;
        }, {})
      );

      const toggleCheckbox = (itemName) => {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [itemName]: !prevCheckboxes[itemName],
        }));

        roleData.other_permission[itemName] =
          !roleData.other_permission[itemName];
      };

      return (
        <>
          <div className="grid grid-cols-7 mt-5">
            <div className="col-span-3">
              {/* ------------------ */}
              {Object.keys(data).map((item, index) => (
                <div className="mb-5" key={index}>
                  <div className="grid grid-cols-7 gap-4">
                    <div className="col-span-1 flex items-center justify-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="opacity-0 absolute h-5 w-5 cursor-pointer"
                          disabled={permission.userrole?.update === false}
                          checked={checkboxes[item]}
                          onChange={() => toggleCheckbox(item)}
                        />
                        <span
                          className={`h-5 w-5 border-2 border-[#6425FE] hover:border-[#3b1694] rounded-sm cursor-pointer flex items-center justify-center ${
                            checkboxes[item] ? "bg-white" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 text-white ${
                              checkboxes[item] ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-300 ease-in-out`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#6425FE"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="col-span-6">
                      <div className="font-poppins font-bold">
                        {item
                          .replace(/_/g, " ")
                          .replace(
                            /\w+/g,
                            (w) => w[0].toUpperCase() + w.slice(1)
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* ------------------ */}
            </div>
          </div>
        </>
      );
    };

    const areAllFalse = (obj) => {
      return Object.values(obj).some((value) => value === true);
    };

    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="rounded-lg h-[50px] flex items-center mt-3 ">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 flex justify-center items-center">
                  <a
                    className={
                      "w-[full] lg:w-[300px] font-poppins text-base font-bold  px-5 py-3  rounded block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-[#6425FE] border border-gray-300 "
                        : "text-[#6425FE] bg-white border border-gray-300")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Page Permission
                  </a>
                  <a
                    className={
                      "w-[full] lg:w-[300px] font-poppins text-base font-bold  px-5 py-3  rounded block leading-normal " +
                      (openTab === 2
                        ? "text-white bg-[#6425FE] border border-gray-300 "
                        : "text-[#6425FE] bg-white border border-gray-300")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Other Permission
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-0  w-full mb-6 ">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className="p-4">
                  {/* type 0 = new role  */}
                  {type === 0 ? (
                    <>
                      <div className=" grid grid-cols-8 gap-4 mt-5">
                        <CheckboxGroup
                          title="brand"
                          items={Object.keys(roleData.permissions?.brand)}
                          data={roleData.permissions?.brand}
                        />

                        <CheckboxGroup
                          title="branch"
                          items={Object.keys(roleData.permissions?.branch)}
                          data={roleData.permissions?.branch}
                        />

                        <CheckboxGroup
                          title="screen"
                          items={Object.keys(roleData.permissions?.screen)}
                          data={roleData.permissions?.screen}
                        />

                        <CheckboxGroup
                          title="playlist"
                          items={Object.keys(roleData.permissions?.playlist)}
                          data={roleData.permissions?.playlist}
                        />

                        <CheckboxGroup
                          title="media"
                          items={Object.keys(roleData.permissions?.media)}
                          data={roleData.permissions?.media}
                        />

                        <CheckboxGroup
                          title="user"
                          items={Object.keys(roleData.permissions?.user)}
                          data={roleData.permissions?.user}
                        />
                        <CheckboxGroup
                          title="userrole"
                          items={Object.keys(roleData.permissions?.userrole)}
                          data={roleData.permissions?.userrole}
                        />

                        <CheckboxGroup
                          title="booking"
                          items={Object.keys(roleData.permissions?.booking)}
                          data={roleData.permissions?.booking}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 1st */}
                      <div className=" grid grid-cols-6 gap-4 mb-11 mt-5">
                        {roleData?.permissions?.brand && (
                          // areAllFalse(roleData.permissions?.brand) &&
                          <CheckboxGroup
                            title="brand"
                            items={Object.keys(roleData?.permissions?.brand)}
                            data={roleData?.permissions?.brand}
                          />
                        )}

                        {roleData?.permissions?.branch && (
                          // areAllFalse(roleData.permissions?.branch) &&
                          <CheckboxGroup
                            title="branch"
                            items={Object.keys(roleData?.permissions?.branch)}
                            data={roleData?.permissions?.branch}
                          />
                        )}

                        {roleData?.permissions?.screen && (
                          // areAllFalse(roleData.permissions?.screen) &&
                          <CheckboxGroup
                            title="screen"
                            items={Object.keys(roleData?.permissions?.screen)}
                            data={roleData?.permissions?.screen}
                          />
                        )}
                        {roleData?.permissions?.playlist && (
                          // areAllFalse(roleData.permissions?.playlist) &&
                          <CheckboxGroup
                            title="playlist"
                            items={Object.keys(roleData?.permissions?.playlist)}
                            data={roleData?.permissions?.playlist}
                          />
                        )}
                        {roleData?.permissions?.media && (
                          // areAllFalse(roleData.permissions?.media) &&
                          <CheckboxGroup
                            title="media"
                            items={Object.keys(roleData?.permissions?.media)}
                            data={roleData?.permissions?.media}
                          />
                        )}
                        {roleData?.permissions?.user && (
                          // areAllFalse(roleData.permissions?.user) &&
                          <CheckboxGroup
                            title="user"
                            items={Object.keys(roleData?.permissions?.user)}
                            data={roleData?.permissions?.user}
                          />
                        )}
                      </div>
                      {/* 1st */}
                      {/* 2nd  */}
                      <div className=" grid grid-cols-6 gap-4 mb-2">
                        {roleData?.permissions?.userrole && (
                          // areAllFalse(roleData.permissions?.userrole) &&
                          <CheckboxGroup
                            title="userrole"
                            items={Object.keys(roleData?.permissions?.userrole)}
                            data={roleData?.permissions?.userrole}
                          />
                        )}
                        {roleData?.permissions?.booking && (
                          // areAllFalse(roleData.permissions?.booking) &&
                          <CheckboxGroup
                            title="booking"
                            items={Object.keys(roleData?.permissions?.booking)}
                            data={roleData?.permissions?.booking}
                          />
                        )}
                      </div>
                      {/* 2nd  */}
                    </>
                  )}
                </div>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <div className="p-4">
                  <OtherBoxGroup data={roleData?.other_permission} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header
          lv1={"Setting"}
          lv2={"User Management"}
          lv3={"role_permission"}
        />
        <div className="font-poppins font-semibold text-2xl mt-10">
          Role And Permission
        </div>
        <div className="mt-7 grid grid-cols-7 gap-2">
          {/* Left Panel */}
          <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">User Role</div>
              {permission.userrole?.create ? (
                <button
                  className="lg:w-[40%] w-[60%]  h-[40px] mt-3 bg-[#6425FE]  hover:bg-[#3b1694] text-white font-poppins rounded-lg"
                  onClick={() => createNewRole()}
                >
                  New Role +
                </button>
              ) : (
                ""
              )}
              {child_permissions.length > 0 &&
                child_permissions.map((items, index) => (
                  <>
                    <div
                      key={index}
                      className={`grid grid-cols-7 gap-2 mt-5 
                  ${
                    index === select_role
                      ? "text-white bg-[#6425FE] h-[55px] border rounded-lg"
                      : ""
                  } 
                  cursor-pointer`}
                      onClick={() => selectRolePermission(index)}
                    >
                      <div className="col-span-5 ml-2">
                        <div className={`font-poppins text-2xl`}>
                          <div>{items.RoleName}</div>
                        </div>
                        <div className="text-xs">
                          {`${items.RoleName} Description`}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex justify-center items-center mt-3 space-x-4">
                          {permission.userrole?.update ? (
                            <button onClick={() => handleEditRoleName(items)}>
                              <RiEditLine
                                size={20}
                                className={`${
                                  index === select_role
                                    ? "text-white hover:text-gray-500"
                                    : "text-[#6425FE] hover:text-[#3b1694]"
                                }`}
                              />
                            </button>
                          ) : (
                            ""
                          )}

                          {permission.userrole?.delete ? (
                            <button onClick={() => handleDeleteRoleName(index)}>
                              <RiDeleteBin5Line
                                size={20}
                                className={`${
                                  index === select_role
                                    ? "text-white hover:text-gray-500"
                                    : "text-[#6425FE] hover:text-[#3b1694]"
                                }`}
                              />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          {/* Left Panel */}

          {/* Right Panel */}
          <div className="col-span-5 bg-[#FAFAFA] w-full">
            {child_permissions.length > 0 && (
              <Tabs roleData={child_permissions[select_role]} />
            )}
          </div>
          {/* Right Panel */}
        </div>
      </div>

      {modalCreateRole && (
        <a
          onClick={() => setModalCreateRole(!modalCreateRole)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalCreateRole && (
        <Create_Role_Permission
          setModalCreateRole={setModalCreateRole}
          modalCreateRole={modalCreateRole}
          getPermission={getPermission}
        />
      )}

      {modalEditRole && (
        <a
          onClick={() => setModalEditRole(!modalEditRole)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modalEditRole && (
        <Edit_Role_permission
          setModalEditRole={setModalEditRole}
          modalEditRole={modalEditRole}
          getPermission={getPermission}
          selectRoleEdit={selectRoleEdit}
        />
      )}
    </>
  );
};

export default Role_permission;
