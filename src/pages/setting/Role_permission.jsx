import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

const mock_data = [
  {
    id: 1,
    name: "Super Admin",
    description: "Super Admin Description Text",
    page_permission: {
      brands: 2,
      branch: 2,
      screen: 2,
      playlist: 2,
      media: 2,
      user: 2,
      role: 2,
      booking: 2,
    },
    other_permission: {
      assign_booking: 1,
      assign_screen: 1,
      publish: 1,
    },
  },
  {
    id: 2,
    name: "Admin",
    description: "Admin Description Text",
    page_permission: {
      brands: 30,
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
      publish: 1,
    },
  },
];
const Role_permission = () => {
  const [permission, setPermission] = useState([]);
  const [select_role, setSelectRole] = useState(0);
  useEffect(() => {
    const updatedData = mock_data.map((item) => {
      return {
        ...item,
        page_permission: convertPermissionValuesToBoolean([item])
          .page_permission,
      };
    });

    setPermission(updatedData);
  }, []);

  const convertPermissionValuesToBoolean = (data) => {
    const convertedData = { page_permission: {} };

    data.map((items) => {
      for (const resource in items.page_permission) {
        const value = items.page_permission[resource];
        const resourcePermissions = {
          view: (value & (2 ** 1)) !== 0, // Check if the "view" bit is set
          create: (value & (2 ** 2)) !== 0, // Check if the "create" bit is set
          update: (value & (2 ** 3)) !== 0, // Check if the "update" bit is set
          delete: (value & (2 ** 4)) !== 0, // Check if the "delete" bit is set
        };
        convertedData.page_permission[resource] = resourcePermissions;
      }
    });

    return convertedData;
  };

  const selectRole = (items) => {
    setSelectRole(items);
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

    for (const resource in data.page_permission) {
      let resourceValue = 0;
      for (const action in data.page_permission[resource]) {
        resourceValue += data.page_permission[resource][action]
          ? 2 ** actionToBitIndex(action)
          : 0;
      }
      summary[resource] = resourceValue;
    }

    return { ...data, page_permission: summary };
  };

  const handleSave = (role) => {
    const summary = convertBooleanToPermissionSummary(role);
    console.log(summary);
  };

  const Tabs = ({ roleData }) => {
    const [openTab, setOpenTab] = React.useState(1);

    const CheckboxGroup = ({ title, items, data }) => {
      const [checkboxes, setCheckboxes] = useState(
        items.reduce((acc, item) => {
          acc[item] = data[item];
          return acc;
        }, {})
      );

      const toggleCheckbox = (itemName) => {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [itemName]: !prevCheckboxes[itemName],
        }));

        roleData.page_permission[title][itemName] =
          !roleData.page_permission[title][itemName];
      };

      return (
        <div className="col-span-1">
          <div className="grid grid-rows-5 gap-4">
            <div className="font-poppins font-bold">
              {title[0].toUpperCase() + title.slice(1)}
            </div>
            {items.map((item, index) => (
              <div className="grid grid-cols-4" key={index}>
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
                  <div className="font-poppins">{item}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="border border-gray-200 rounded-lg h-[50px] flex items-center mt-3 ">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 flex justify-center items-center">
                  <a
                    className={
                      "w-[full] lg:w-[300px] font-poppins text-base font-bold  px-5 py-3  rounded block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-[#6425FE] border border-gray-300 "
                        : "text-[#6425FE] bg-white")
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
                        : "text-[#6425FE] bg-white")
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
                  {/* 1st */}
                  <div className=" grid grid-cols-6 gap-4 mb-11">
                    <CheckboxGroup
                      title="brands"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.brands}
                    />
                    <CheckboxGroup
                      title="branch"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.branch}
                    />
                    <CheckboxGroup
                      title="screen"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.screen}
                    />
                    <CheckboxGroup
                      title="playlist"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.playlist}
                    />
                    <CheckboxGroup
                      title="media"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.media}
                    />
                    <CheckboxGroup
                      title="user"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.user}
                    />
                  </div>
                  {/* 1st */}
                  {/* 2nd  */}
                  <div className=" grid grid-cols-6 gap-4 mb-2">
                    <CheckboxGroup
                      title="role"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.role}
                    />
                    <CheckboxGroup
                      title="booking"
                      items={["view", "create", "update", "delete"]}
                      data={roleData.page_permission.booking}
                    />
                  </div>
                  {/* 2nd  */}
                </div>
                <div className="p-4">
                  <button
                    className="w-40 h-11 bg-[#6425FE] text-white font-poppins"
                    onClick={() => handleSave(permission[select_role])}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                2
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div className="font-poppins font-semibold text-2xl mt-10">
        <text>Role And Permission</text>
      </div>
      <div className="mt-7 grid grid-cols-7 gap-2">
        {/* Left Panel */}
        <div className="bg-[#E8E8E8] col-span-2 h-[800px]">
          <div className="p-3">
            <div className="font-poppins font-bold text-2xl">Role</div>
            <div className="w-[40%] h-[40px] mt-3 bg-[#6425FE] text-white font-poppins flex justify-center items-center rounded-lg">
              <button>New Role +</button>
            </div>

            {permission.map((items, key) => (
              <>
                <div
                  key={key}
                  className={`grid grid-cols-7 gap-2 mt-5 
                  ${key === select_role ? "bg-[#FAFAFA]" : ""} 
                  cursor-pointer`}
                  onClick={() => selectRole(key)}
                >
                  <div className="col-span-5 ml-2">
                    <div className="font-poppins text-2xl ">{items.name}</div>
                    <div className="text-xs">{items.description}</div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex justify-center items-center mt-3 space-x-4">
                      <button onClick={() => selectRole(key)}>
                        <RiEditLine size={20} className="text-[#6425FE]" />
                      </button>
                      <button>
                        <RiDeleteBin5Line
                          size={20}
                          className="text-[#6425FE]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        {/* Left Panel */}
        <div className="col-span-5 bg-[#FAFAFA] w-full">
          {permission.length > 0 && <Tabs roleData={permission[select_role]} />}
        </div>
      </div>
    </div>
  );
};

export default Role_permission;
