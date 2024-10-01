import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const Create_Role_Permission = ({
  setModalCreateRole,
  modalCreateRole,
  getPermission,
}) => {
  const { permission } = User.getPermission();
  const { token } = User.getCookieData();

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
      userrole: { view: false, create: false, update: false, delete: false },
      booking: { view: false, create: false, update: false, delete: false },
    },
    other_permission: {
      assign_booking: 0,
      assign_screen: 0,
      publish: 0,
    },
  });

  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleRoleChange = (e, fieldName) => {
    setNewRole({
      ...newRole,
      [fieldName]: e.target.value,
    });
  };

  const handleSaveNewRole = async () => {
    Swal.fire({
      text: `คุณต้องการเพิ่ม Role : ${newRole.name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const summary = convertBooleanToPermissionSummary(newRole);
        const isAnyValueGreaterThanZero = Object.values(
          summary.permissions
        ).some((value) => value > 0);
        let obj;

        const { account } = User.getAccount();
        if (isAnyValueGreaterThanZero) {
          obj = {
            rolename: newRole.name,
            permissions: summary.permissions,
            accountcode: account.AccountCode,
          };
        } else {
          obj = {
            rolename: newRole.name,
            permissions: "",
            accountcode: account.AccountCode,
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
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "สร้าง User Role สำเร็จ ",
              text: `สร้าง User Role "${newRole.name}" สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                getPermission();
                setModalCreateRole(!modalCreateRole);
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

  const Tabs = ({ roleData }) => {
    const [openTab, setOpenTab] = React.useState(1);

    const handleSelectAllRole = () => {
      Object.keys(roleData.permissions).forEach((key) => {
        Object.keys(roleData.permissions[key]).forEach((action) => {
          roleData.permissions[key][action] = true;
        });
      });
      setNewRole(roleData);
      setIsSelectAll(!isSelectAll);
    };

    const handleDeSelectAllRole = () => {
      Object.keys(roleData.permissions).forEach((key) => {
        Object.keys(roleData.permissions[key]).forEach((action) => {
          roleData.permissions[key][action] = false;
        });
      });
      setNewRole(roleData);
      setIsSelectAll(!isSelectAll);
    };

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
                        disabled={
                          permission.userrole?.update === false ? true : false
                        }
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

    // const areAllFalse = (obj) => {
    //   return Object.values(obj).some((value) => value === true);
    // };

    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="rounded-lg h-[50px] flex items-center mt-3 justify-between">
              <div className="flex  flex-col lg:flex-row w-full">
                <div className="w-full lg:w-4/4 flex justify-start items-center">
                  <a
                    className={
                      "w-[full] lg:w-[300px] font-poppins text-base font-bold px-5 py-3 rounded block leading-normal " +
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
                      "w-[full] lg:w-[300px] font-poppins text-base font-bold px-5 py-3 rounded block leading-normal " +
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
              <div className="flex justify-end items-center ">
                {!isSelectAll ? (
                  <button
                    onClick={() => handleSelectAllRole()}
                    className="text-white font-poppins rounded-lg bg-[#6425FE] hover:bg-[#3b1694] w-[80px] h-[50px] shadow-lg"
                  >
                    Select All
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeSelectAllRole()}
                    className="text-white font-poppins rounded-lg bg-[#6425FE] hover:bg-[#3b1694] w-[80px] h-[50px] shadow-lg"
                  >
                    Deselect All
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col min-w-0  w-full mb-6 ">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className="p-4">
                  <>
                    <div className="grid grid-cols-8 gap-4 mt-5">
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
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className={`absolute -top-4 -right-4 m-4 z-30`}>
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setModalCreateRole(!modalCreateRole)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="font-poppins text-5xl font-bold">New Role</div>
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
                className="w-full p-2  border border-gray-300 rounded-lg shadow-lg"
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
                className="w-full p-2  border border-gray-300 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="p-10 mt-2 ">
          <div className="bg-[#FAFAFA]">
            <Tabs page_permission={{ update: true }} roleData={newRole} />
          </div>
        </div>
        {permission.userrole?.update ? (
          <div className="flex justify-center items-center -mt-3">
            <button
              onClick={() => handleSaveNewRole()}
              className="bg-[#6425FE] hover:bg-[#3b1694] text-white w-36 h-10 font-poppins rounded-lg shadow-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Create_Role_Permission;
