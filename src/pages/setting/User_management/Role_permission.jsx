import React, { useState, useEffect } from "react";
import { Header } from "../../../components";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Navbar } from "../../../components";
import useCheckPermission from "../../../libs/useCheckPermission";
import Encryption from "../../../libs/encryption";
import User from "../../../libs/admin";
import Swal from "sweetalert2";
const mock_data = [
  {
    RoleID: 5,
    RoleName: "Admin",
    permissions: {
      brand: 2,
      branch: 2,
      screen: 2,
      playlist: 2,
      media: 2,
      user: 2,
      role: 2,
      booking: 2,
    },
    other_permission: {
      assign_booking: 0,
      assign_screen: 1,
      publish: 1,
    },
  },
  {
    RoleID: 6,
    RoleName: "Publisher",
    permissions: {
      brand: 30,
      branch: 30,
      screen: 30,
      playlist: 30,
      media: 30,
      user: 30,
      role: 30,
      booking: 30,
    },
    other_permission: {
      assign_booking: 1,
      assign_screen: 1,
      publish: 0,
    },
  },
];
const Role_permission = () => {
  useCheckPermission();
  const [default_permissions, setDefaultPermission] = useState([]);
  const [child_permissions, setChildPermission] = useState([]);
  const [select_role, setSelectRole] = useState(0);
  const [editRoleName, setEditRoleName] = useState(true);
  const [newRoleName, setNewRoleName] = useState("");
  const [oldRoleName, setOldRoleName] = useState("");
  const [selectOldRole, setSelectOldRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: null,
    description: null,
    permissions: {
      brand: { view: false, create: false, update: false, delete: false },
      branch: { view: false, create: false, update: false, delete: false },
      screen: { view: false, create: false, update: false, delete: false },
      playlist: { view: false, create: false, update: false, delete: false },
      media: { view: false, create: false, update: false, delete: false },
      user: { view: false, create: false, update: false, delete: false },
      role: { view: false, create: false, update: false, delete: false },
      booking: { view: false, create: false, update: false, delete: false },
    },
    other_permission: {
      assign_booking: 0,
      assign_screen: 0,
      publish: 0,
    },
  });

  const [page_permission, setPagePermission] = useState([]);
  const { token } = User.getCookieData();

  useEffect(async () => {
    const { user } = User.getCookieData();

    // Parent Permission
    const default_permission = convertPermissionValuesToBoolean([
      user,
    ]).permissions;

    // Child Permission
    const user_permission = await User.getUserRoles(token);
    const child_permission = user_permission.map((item) => {
      return {
        ...item,
        permissions: convertPermissionValuesToBoolean([item]).permissions,
        other_permission: item.other_permission
          ? convertPermissionValuesToBoolean([item]).other_permission
          : [],
      };
    });

    const old_role = user_permission.map((permission) => permission.RoleName);
    setOldRoleName(old_role);
    setSelectOldRole(old_role[0]);
    setDefaultPermission(default_permission);
    setChildPermission(child_permission);
    setPermissionPage();
  }, []);

  const setPermissionPage = async () => {
    const { user } = User.getCookieData();
    const { permissions } = convertPermissionValuesToBoolean([user]);
    setPagePermission(permissions.userrole);
  };

  const convertPermissionValuesToBoolean = (data) => {
    const convertedData = { permissions: {}, other_permission: {} };

    data.map((items) => {
      for (const resource in items.permissions) {
        const value = items.permissions[resource];

        const resourcePermissions = {
          view: (value & (2 ** 1)) !== 0, // Check if the "view" bit is set
          create: (value & (2 ** 2)) !== 0, // Check if the "create" bit is set
          update: (value & (2 ** 3)) !== 0, // Check if the "update" bit is set
          delete: (value & (2 ** 4)) !== 0, // Check if the "delete" bit is set
        };
        convertedData.permissions[resource] = resourcePermissions;
      }

      for (const permissions in items.other_permission) {
        const value = items.other_permission[permissions];
        convertedData.other_permission[permissions] =
          value === 1 || value === true;
      }
    });

    return convertedData;
  };

  const selectRole = (key) => {
    setSelectRole(key);
  };

  const actionToBitIndex = (action) => {
    switch (action) {
      case "view":
        return 1; // 2^1
      case "create":
        return 2; // 2^2
      case "update":
        return 3; // 2^3
      case "delete":
        return 4; // 2^4
      default:
        throw new Error(`Invalid action: ${action}`);
    }
  };

  const convertBooleanToPermissionSummary = (data) => {
    const summary = {};

    for (const resource in data.permissions) {
      let resourceValue = 0;
      for (const action in data.permissions[resource]) {
        resourceValue += data.permissions[resource][action]
          ? 2 ** actionToBitIndex(action)
          : 0;
      }
      summary[resource] = resourceValue;
    }

    const otherPermissionSummary = {};
    for (const permissions in data.other_permission) {
      otherPermissionSummary[permissions] = data.other_permission[permissions]
        ? 1
        : 0;
    }

    return {
      ...data,
      permissions: summary,
      other_permission: otherPermissionSummary,
    };
  };

  const handleRoleChange = (e, fieldName) => {
    setNewRole({
      ...newRole,
      [fieldName]: e.target.value,
    });
  };

  const createNewRole = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const removeZeroPermissions = (data) => {
    const updatedPermissions = {};
    for (const key in data.permissions) {
      if (data.permissions[key] !== 0) {
        updatedPermissions[key] = data.permissions[key];
      }
    }

    // Create a new object with updated permissions
    const updatedData = {
      ...data,
      permissions: updatedPermissions,
    };

    return updatedData;
  };

  const handleEditRoleName = () => {
    setEditRoleName(!editRoleName);
  };

  const handleOutFocusRoleName = (newName, key) => {
    setEditRoleName(false);
    if (newName) {
      setNewRoleName("");
      // Update the role value in the state
      const updatedPermissions = [...child_permissions];
      updatedPermissions[key].role = newName;
      setChildPermission(updatedPermissions);
    }
  };

  const handleSetNewRoleName = (value) => {
    setNewRoleName(value);
  };

  const tempOldData = (key) => {
    const oldRole = oldRoleName[key];
    setSelectOldRole(oldRole);
    selectRole(key);
  };

  //Create
  const handleSaveNewRole = async () => {
    const summary = convertBooleanToPermissionSummary(newRole);

    const isAnyValueGreaterThanZero = Object.values(summary.permissions).some(
      (value) => value > 0
    );
    let obj;

    if (isAnyValueGreaterThanZero) {
      obj = {
        rolename: newRole.name,
        permissions: summary.permissions,
        accountcode: "huUpa8dN4i",
      };
    } else {
      obj = {
        rolename: newRole.name,
        permissions: "",
        accountcode: "huUpa8dN4i",
      };
    }

    const value = removeZeroPermissions(obj);

    const encrypted = await Encryption.encryption(
      value,
      "add_permission_role",
      false
    );
    try {
      const data = await User.createUserRole(encrypted, token);
      if (data.code !== 404) {
        Swal.fire({
          icon: "success",
          title: "Create User Role Success ...",
          text: "สร้าง User Role สำเร็จ!",
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
  };

  //Update
  const handleSave = async (role) => {
    const summary = convertBooleanToPermissionSummary(role);

    const obj = {
      roleid: summary.RoleID,
      rolename: summary.role ? summary.role : summary.RoleName,
      permissions: summary.permissions,
      accountcode: "huUpa8dN4i",
    };

    const encrypted = await Encryption.encryption(obj, "edit_role", false);
    const data = await User.updateUserRole(encrypted, token);

    if (data.code !== 404) {
      Swal.fire({
        icon: "success",
        title: "Edit User Role Success ...",
        text: "แก้ไข User Role สำเร็จ!",
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
  };

  //Delete
  const handleDeleteRoleName = async (key) => {
    const obj = {
      roleid: child_permissions[key].RoleID,
      accountcode: "huUpa8dN4i",
    };

    const encrypted = await Encryption.encryption(obj, "delete_role", false);
    const data = await User.deleteUserRole(encrypted, token);

    if (data.code !== 404) {
      Swal.fire({
        icon: "success",
        title: "Delete User Role Success ...",
        text: "ลบ User Role สำเร็จ!",
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
  };

  const Tabs = ({ roleData, type, page_permission }) => {
    const [openTab, setOpenTab] = React.useState(1);

    const CheckboxGroup = ({ title, items, data }) => {
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
        items.reduce((acc, item) => {
          acc[item] = data_check[item];
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
                  className="grid grid-cols-4 space-x-3 lg:space-x-2"
                  key={index}
                >
                  <div className="col-span-1">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={checkboxes[item]}
                        onChange={() => toggleCheckbox(item)}
                      />
                      <span
                        className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
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
                    <div className="font-poppins">
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

    const OtherBoxGroup = ({ data }) => {
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
              {Object.keys(data).map((item, key) => (
                <div className="mb-5" key={key}>
                  <div className="grid grid-cols-7 gap-4">
                    <div className="col-span-1 flex items-center justify-center">
                      <label className="inline-flex items-center ">
                        <input
                          type="checkbox"
                          className="opacity-0 absolute h-5 w-5 cursor-pointer"
                          disabled={page_permission.update ? false : true}
                          checked={checkboxes[item]}
                          onChange={() => toggleCheckbox(item)}
                        />
                        <span
                          className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
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
                          items={Object.keys(default_permissions.brand).filter(
                            (key) => default_permissions.brand[key]
                          )}
                          data={roleData.permissions.brand}
                        />
                        <CheckboxGroup
                          title="branch"
                          items={Object.keys(default_permissions.branch).filter(
                            (key) => default_permissions.branch[key]
                          )}
                          data={roleData.permissions.branch}
                        />
                        <CheckboxGroup
                          title="screen"
                          items={Object.keys(default_permissions.screen).filter(
                            (key) => default_permissions.screen[key]
                          )}
                          data={roleData.permissions.screen}
                        />
                        <CheckboxGroup
                          title="playlist"
                          items={Object.keys(
                            default_permissions.playlist
                          ).filter((key) => default_permissions.playlist[key])}
                          data={roleData.permissions.playlist}
                        />
                        <CheckboxGroup
                          title="media"
                          items={Object.keys(default_permissions.media).filter(
                            (key) => default_permissions.media[key]
                          )}
                          data={roleData.permissions.media}
                        />
                        <CheckboxGroup
                          title="user"
                          items={Object.keys(default_permissions.user).filter(
                            (key) => default_permissions.user[key]
                          )}
                          data={roleData.permissions.user}
                        />
                        <CheckboxGroup
                          title="userrole"
                          items={Object.keys(
                            default_permissions.userrole
                          ).filter((key) => default_permissions.userrole[key])}
                          data={roleData.permissions.userrole}
                        />
                        <CheckboxGroup
                          title="booking"
                          items={Object.keys(
                            default_permissions.booking
                          ).filter((key) => default_permissions.booking[key])}
                          data={roleData.permissions.booking}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 1st */}
                      <div className=" grid grid-cols-6 gap-4 mb-11 mt-5">
                        {default_permissions.brand && (
                          <CheckboxGroup
                            title="brand"
                            items={Object.keys(
                              default_permissions.brand
                            ).filter((key) => default_permissions.brand[key])}
                            data={roleData.permissions.brand}
                          />
                        )}
                        {default_permissions.branch && (
                          <CheckboxGroup
                            title="branch"
                            items={Object.keys(
                              default_permissions.branch
                            ).filter((key) => default_permissions.branch[key])}
                            data={roleData.permissions.branch}
                          />
                        )}
                        {default_permissions.screen && (
                          <CheckboxGroup
                            title="screen"
                            items={Object.keys(
                              default_permissions.screen
                            ).filter((key) => default_permissions.screen[key])}
                            data={roleData.permissions.screen}
                          />
                        )}
                        {default_permissions.playlist && (
                          <CheckboxGroup
                            title="playlist"
                            items={Object.keys(
                              default_permissions.playlist
                            ).filter(
                              (key) => default_permissions.playlist[key]
                            )}
                            data={roleData.permissions.playlist}
                          />
                        )}
                        {default_permissions.media && (
                          <CheckboxGroup
                            title="media"
                            items={Object.keys(
                              default_permissions.media
                            ).filter((key) => default_permissions.media[key])}
                            data={roleData.permissions.media}
                          />
                        )}
                        {default_permissions.user && (
                          <CheckboxGroup
                            title="user"
                            items={Object.keys(default_permissions.user).filter(
                              (key) => default_permissions.user[key]
                            )}
                            data={roleData.permissions.user}
                          />
                        )}
                      </div>
                      {/* 1st */}
                      {/* 2nd  */}
                      <div className=" grid grid-cols-6 gap-4 mb-2">
                        {default_permissions.userrole && (
                          <CheckboxGroup
                            title="userrole"
                            items={Object.keys(
                              default_permissions.userrole
                            ).filter(
                              (key) => default_permissions.userrole[key]
                            )}
                            data={roleData.permissions.userrole}
                          />
                        )}
                        {default_permissions.booking && (
                          <CheckboxGroup
                            title="booking"
                            items={Object.keys(
                              default_permissions.booking
                            ).filter((key) => default_permissions.booking[key])}
                            data={roleData.permissions.booking}
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
                  <OtherBoxGroup data={roleData.other_permission} />
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
        <Header category="Page" title="Home" />
        <div className="font-poppins font-semibold text-2xl mt-10">
          <text>Role And Permission</text>
        </div>
        <div className="mt-7 grid grid-cols-7 gap-2">
          {/* Left Panel */}
          <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
            <div className="p-3">
              <div className="font-poppins font-bold text-2xl">User Role</div>
              {page_permission.create ? (
                <button
                  className="lg:w-[40%] w-[60%]  h-[40px] mt-3 bg-[#6425FE]  hover:bg-[#3b1694] text-white font-poppins rounded-lg"
                  onClick={() => createNewRole()}
                >
                  New Role +
                </button>
              ) : (
                ""
              )}
              {child_permissions.map((items, key) => (
                <>
                  <div
                    key={key}
                    className={`grid grid-cols-7 gap-2 mt-5 
                  ${key === select_role ? "text-[#6425FE]" : ""} 
                  cursor-pointer`}
                    onClick={() => tempOldData(key)}
                  >
                    <div className="col-span-5 ml-2">
                      <div className={`font-poppins text-2xl`}>
                        <input
                          type="text"
                          defaultValue={items.RoleName}
                          disabled={editRoleName}
                          onChange={(e) => handleSetNewRoleName(e.target.value)}
                          onBlur={() =>
                            handleOutFocusRoleName(newRoleName, key)
                          }
                          // className="w-60"
                        />
                      </div>
                      <div className="text-xs">
                        {`${items.RoleName} Description`}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex justify-center items-center mt-3 space-x-4">
                        {page_permission.update ? (
                          <button onClick={() => handleEditRoleName()}>
                            <RiEditLine size={20} className="text-[#6425FE]" />
                          </button>
                        ) : (
                          ""
                        )}

                        {page_permission.delete ? (
                          <button onClick={() => handleDeleteRoleName(key)}>
                            <RiDeleteBin5Line
                              size={20}
                              className="text-[#6425FE]"
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
              <Tabs
                roleData={child_permissions[select_role]}
                page_permission={page_permission}
              />
            )}
            <div className="p-4">
              <button
                className="w-40 h-11 bg-[#6425FE]  hover:bg-[#3b1694] text-white font-poppins"
                onClick={() => handleSave(child_permissions[select_role])}
              >
                Save
              </button>
            </div>
          </div>
          {/* Right Panel */}
        </div>
      </div>

      {showModal && (
        <a
          onClick={() => setShowModal(!showModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
          {/* First div (circle) */}
          <div className="absolute right-12 top-14 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => closeModal()}>
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>
          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">New Role</div>
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
                  <div className="font-poppins">Role Name:</div>
                </div>
                <div className="col-span-3 ">
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => handleRoleChange(e, "name")}
                    className="w-full p-2  border rounded"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-6">
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3 flex items-center justify-start">
                  <div className="font-poppins">Role Description:</div>
                </div>
                <div className="col-span-3 ">
                  <input
                    type="text"
                    value={newRole.description}
                    onChange={(e) => handleRoleChange(e, "description")}
                    className="w-full p-2  border rounded"
                  />
                </div>
              </div>
            </div>
            <div className="p-10 mt-2 ">
              <div className="bg-[#FAFAFA]">
                <Tabs
                  page_permission={{ update: true }}
                  roleData={newRole}
                  type={0}
                />
              </div>
            </div>
            {page_permission.update ? (
              <div className="flex justify-center items-center -mt-3">
                <button
                  onClick={() => handleSaveNewRole()}
                  className="bg-[#6425FE] text-white w-36 h-10 font-poppins rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Role_permission;
