import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const Edit_Role_permission = ({
  setModalEditRole,
  modalEditRole,
  selectRoleEdit,
  getPermission,
  page_permission,
}) => {
  const { token } = User.getCookieData();
  const [role_id, setRoleId] = useState(null);
  const [role_name, setRoleName] = useState(null);
  const [role_desc, setRoleDesc] = useState(null);
  const [permission, setPermission] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    setEditRoleData();
  }, [selectRoleEdit]);

  const setEditRoleData = () => {
    const { RoleID, RoleName, RoleDesc, other_permission, permissions } =
      selectRoleEdit;
    const permission = {
      permissions: permissions,
      other_permission: other_permission,
    };

    setRoleId(RoleID);
    setRoleName(RoleName);
    setRoleDesc(RoleDesc);
    setPermission(permission);
  };

  const Tabs = ({ roleData }) => {
    const [openTab, setOpenTab] = React.useState(1);

    const handleSelectAllRole = () => {
      Object.keys(roleData.permissions).forEach((key) => {
        Object.keys(roleData.permissions[key]).forEach((action) => {
          roleData.permissions[key][action] = true;
        });
      });
      setPermission(roleData);
      setIsSelectAll(!isSelectAll);
    };

    const handleDeSelectAllRole = () => {
      Object.keys(roleData.permissions).forEach((key) => {
        Object.keys(roleData.permissions[key]).forEach((action) => {
          roleData.permissions[key][action] = false;
        });
      });
      setPermission(roleData);
      setIsSelectAll(!isSelectAll);
    };

    const CheckboxGroup = ({
      title,
      name,
      fullname,
      items,
      data,
      conf,
      isLog,
    }) => {
      const header = ["create", "delete", "update", "view"];

      const [filteredItems, setFilteredItems] = useState(items);

      useEffect(() => {
        if (conf) {
          const result = items.filter(
            (item) => item === "view" || item === "update"
          );
          setFilteredItems(result);
        } else if (isLog) {
          const result = items.filter((item) => item === "view");
          setFilteredItems(result);
        } else {
          setFilteredItems(items);
        }
      }, [items, conf]);

      let data_check = data || {
        create: false,
        delete: false,
        update: false,
        view: false,
      };

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
              <div className="flex justify-start items-center group relative">
                <div className="font-poppins text-md  font-bold ">
                  {fullname ? (
                    <>
                      {name}
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-[200px] w-auto p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        {fullname[0].toUpperCase() + fullname.slice(1)}
                      </span>
                    </>
                  ) : (
                    <>{name[0].toUpperCase() + name.slice(1)}</>
                  )}
                </div>
              </div>

              {filteredItems.map((item, index) => (
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
                        disabled={false}
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
                    className="text-white font-poppins rounded-lg bg-[#6425FE] hover:bg-[#3b1694] w-[80px] h-[50px] shadow-sm"
                  >
                    Select All
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeSelectAllRole()}
                    className="text-white font-poppins rounded-lg bg-[#6425FE] hover:bg-[#3b1694] w-[80px] h-[50px] shadow-sm"
                  >
                    Deselect All
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col min-w-0 w-full mb-6 ">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <div className="p-4">
                  <>
                    <div className=" grid grid-cols-4 gap-4 mb-11 mt-5">
                      {roleData?.permissions?.userMgt && (
                        <CheckboxGroup
                          title="userMgt"
                          name="User Management"
                          items={Object.keys(roleData?.permissions?.userMgt)}
                          data={roleData?.permissions?.userMgt}
                        />
                      )}
                      {roleData?.permissions?.roleMgt && (
                        <CheckboxGroup
                          title="roleMgt"
                          name="User Role"
                          items={Object.keys(roleData?.permissions?.roleMgt)}
                          data={roleData?.permissions?.roleMgt}
                        />
                      )}
                      {roleData?.permissions?.brandMgt && (
                        <CheckboxGroup
                          title="brandMgt"
                          name="BU"
                          items={Object.keys(roleData?.permissions?.brandMgt)}
                          data={roleData?.permissions?.brandMgt}
                        />
                      )}
                      {roleData?.permissions?.digiScrnMgt && (
                        <CheckboxGroup
                          title="digiScrnMgt"
                          name="Digital Screen"
                          items={Object.keys(
                            roleData?.permissions?.digiScrnMgt
                          )}
                          data={roleData?.permissions?.digiScrnMgt}
                        />
                      )}
                      {roleData?.permissions?.conf && (
                        <CheckboxGroup
                          title="conf"
                          name="Configuration"
                          items={Object.keys(roleData?.permissions?.conf)}
                          data={roleData?.permissions?.conf}
                          conf={true}
                        />
                      )}
                      {roleData?.permissions?.tagMgt && (
                        <CheckboxGroup
                          title="tagMgt"
                          name="Tag Management"
                          items={Object.keys(roleData?.permissions?.tagMgt)}
                          data={roleData?.permissions?.tagMgt}
                        />
                      )}
                      {roleData?.permissions?.mdRule && (
                        <CheckboxGroup
                          title="mdRule"
                          name="Media Rule"
                          items={Object.keys(roleData?.permissions?.mdRule)}
                          data={roleData?.permissions?.mdRule}
                        />
                      )}
                      {roleData?.permissions?.adMerch && (
                        <CheckboxGroup
                          title="adMerch"
                          name="Customer"
                          items={Object.keys(roleData?.permissions?.adMerch)}
                          data={roleData?.permissions?.adMerch}
                        />
                      )}
                      {roleData?.permissions?.mdLib && (
                        <CheckboxGroup
                          title="mdLib"
                          name="Media library"
                          items={Object.keys(roleData?.permissions?.mdLib)}
                          data={roleData?.permissions?.mdLib}
                        />
                      )}
                      {roleData?.permissions?.actLog && (
                        <CheckboxGroup
                          title="actLog"
                          name="Activities Log"
                          items={Object.keys(roleData?.permissions?.actLog)}
                          data={roleData?.permissions?.actLog}
                          isLog={true}
                        />
                      )}
                      {roleData?.permissions?.mdLog && (
                        <CheckboxGroup
                          title="mdLog"
                          name="Media Log"
                          items={Object.keys(roleData?.permissions?.mdLog)}
                          data={roleData?.permissions?.mdLog}
                          isLog={true}
                        />
                      )}
                      {roleData?.permissions?.scrLog && (
                        <CheckboxGroup
                          title="scrLog"
                          name="Screen Log"
                          items={Object.keys(roleData?.permissions?.scrLog)}
                          data={roleData?.permissions?.scrLog}
                          isLog={true}
                        />
                      )}
                      {roleData?.permissions?.digiBookingMgt && (
                        <CheckboxGroup
                          title="digiBookingMgt"
                          name="DBM"
                          fullname="Digital Booking Management"
                          items={Object.keys(
                            roleData?.permissions?.digiBookingMgt
                          )}
                          data={roleData?.permissions?.digiBookingMgt}
                        />
                      )}
                      {roleData?.permissions?.digiBookContMgt && (
                        <CheckboxGroup
                          title="digiBookContMgt"
                          name="DBCM"
                          fullname="Digital Booking Content Management"
                          items={Object.keys(
                            roleData?.permissions?.digiBookContMgt
                          )}
                          data={roleData?.permissions?.digiBookContMgt}
                        />
                      )}
                      {roleData?.permissions?.digiPlaylistMgt && (
                        <CheckboxGroup
                          title="digiPlaylistMgt"
                          name="DPM"
                          fullname="Digital Playlist Management"
                          items={Object.keys(
                            roleData?.permissions?.digiPlaylistMgt
                          )}
                          data={roleData?.permissions?.digiPlaylistMgt}
                        />
                      )}
                      {roleData?.permissions?.dBoard && (
                        <CheckboxGroup
                          title="dBoard"
                          name="Dashboard"
                          items={Object.keys(roleData?.permissions?.dBoard)}
                          data={roleData?.permissions?.dBoard}
                          isLog={true}
                        />
                      )}
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

  const handleEditData = async () => {
    Swal.fire({
      text: `คุณต้องการแก้ไข Role : ${role_name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const summary = convertBooleanToPermissionSummary(permission);
        const { account } = User.getAccount();
        const obj = {
          roleid: role_id,
          rolename: role_name,
          roledesc: role_desc,
          permissions: summary.permissions,
          accountcode: account.AccountCode,
        };
        console.log("obj", obj);
        const encrypted = await Encryption.encryption(obj, "edit_role", false);
        const data = await User.updateUserRole(encrypted, token);
        console.log("data", data);
        if (data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข User Role สำเร็จ",
            text: `แก้ไข User Role "${role_name}" สำเร็จ`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              getPermission();
              setModalEditRole(!modalEditRole);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: data.message,
          });
        }
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className={`absolute -top-4 -right-4 m-4 z-30`}>
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                getPermission();
                setModalEditRole(!modalEditRole);
              }}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="font-poppins text-5xl font-bold">Edit Role</div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 flex items-center justify-start">
              <div className="font-poppins">Role Name:</div>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                value={role_name}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full p-2  border border-gray-300 rounded-lg shadow-sm"
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
                value={role_desc}
                onChange={(e) => setRoleDesc(e.target.value)}
                className="w-full p-2  border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="p-5 mt-2 ">
          <div className="bg-[#FAFAFA]">
            <Tabs roleData={permission} />
          </div>
        </div>

        {page_permission.update ? (
          <div className="flex justify-center items-center -mt-3">
            <button
              onClick={() => handleEditData()}
              className="bg-[#6425FE] hover:bg-[#3b1694] text-white w-36 h-10 font-poppins rounded-lg shadow-sm"
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

export default Edit_Role_permission;
