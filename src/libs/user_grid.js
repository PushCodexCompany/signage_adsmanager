import { useState, useEffect } from "react";
import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import central_logo from "../assets/img/central.jpeg";
import robinson_logo from "../assets/img/robinson.png";

import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiCaretUpDown } from "react-icons/pi";
import User from "../libs/admin";

const getImg = (id) => {
  let img;
  if (id === 1) {
    img = topImg;
  } else if (id === 2) {
    img = matsumotoImg;
  } else if (id === 3) {
    img = supersportImg;
  } else if (id === 4) {
    img = powerbuyImg;
  }

  return img;
};

const getImgBrand = (id) => {
  let img;
  if (id === 1) {
    img = central_logo;
  } else if (id === 9) {
    img = robinson_logo;
  }

  return img;
};

const onClickAction = (id) => {
  alert(`click : ${id}`);
};

const dashboardData = [
  {
    id: 1,
    username_email: ["User0123", "useradmin@mail.com"],
    brand: [1],
    merchandise: [1, 2, 3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 2,
    username_email: ["Admin01", "teerachai_14@mail.com"],
    brand: [9],
    merchandise: [3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 3,
    username_email: ["CDS_Admin", "cdspro_a@mail.com"],
    brand: [1, 9],
    merchandise: [4],
    status: 1,
    role: 0,
  },
  {
    id: 4,
    username_email: ["CDS_Sale01", "cds_sale41@mail.com"],
    brand: [9],
    merchandise: [2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    brand: [1],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
];

export const GridTable = ({ user_lists }) => {
  const [modal_edit, setModalEdit] = useState(false);
  const [default_roles, setDefaultRoles] = useState([]);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  //edit
  const [edit_id, setEditId] = useState(null);
  const [edit_username, setEditUsername] = useState(null);
  const [edit_email, setEditEmail] = useState(null);
  const [edit_activate, setEditActivate] = useState(null);
  const [edit_rolename, setEditRolename] = useState(null);

  useEffect(() => {
    fetchRoleData();
  });

  const fetchRoleData = async () => {
    const { token } = User.getCookieData();
    const roles = await User.getUserRoles(token);
    setDefaultRoles(roles);
  };

  const onSelectEdit = (id) => {
    const { UserID, Username, Email, Activated, RoleName } = user_lists.find(
      (item) => item.UserID === id
    );
    setEditId(UserID);
    setEditUsername(Username);
    setEditEmail(Email);
    setEditActivate(Activated);
    setEditRolename(RoleName);
    setModalEdit(!modal_edit);
  };

  const toggleStatusSelect = () => {
    setIsStatusOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSaveEdit = (id) => {
    const obj = {
      UserID: id,
      Username: edit_username,
      Email: edit_email,
      Activated: edit_activate,
      RoleName: edit_rolename,
    };

    console.log("obj", obj);
  };

  return (
    <>
      <div className="w-auto h-[600px] overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Username
              </th>
              {/* <th className="lg:px-6 px-8 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Brand
              </th>
              <th className="lg:px-6 px-14 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Merchandise
              </th> */}
              <th className="lg:px-6 px-9 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Status
              </th>
              <th className="lg:px-6 px-12 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user_lists.length > 0 &&
              user_lists.map((row, key) => (
                <tr key={key}>
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins text-xl">{key + 1}</div>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins text-xl font-bold hover:text-[#6425FE] cursor-pointer">
                      <a onClick={() => onSelectEdit(row.UserID)}>
                        {row.Username}
                      </a>
                    </div>
                    <div className="font-poppins text-sm text-gray-500">
                      {row.Email ? row.Email : "-- No Email --"}
                    </div>
                  </td>
                  {/* <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex space-x-1 ">
                    {row.brand.map((items) => (
                      <img
                        className="w-[50px] h-[50px] rounded-md"
                        src={getImgBrand(items)}
                      />
                    ))}
                  </div>
                </td> */}
                  {/* <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                  <div className="flex space-x-1 ">
                    {row.merchandise.map((items) => (
                      <img
                        className="w-[50px] h-[50px] rounded-md"
                        src={getImg(items)}
                      />
                    ))}
                  </div>
                </td> */}
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins">
                      {row.Activated === 1 ? "Active" : "Deactive"}
                    </div>
                    {/* <div className="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      defaultValue={row.status}
                    >
                      <option value="1">Active</option>
                      <option value="0">Deactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <PiCaretUpDown size="18" color="#6425FE" />
                    </div>
                  </div> */}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <div className="font-poppins">
                      {row.RoleName ? row.RoleName : "-- No Role --"}
                    </div>
                    {/* <div className="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
                    <select
                      name="status"
                      id="status"
                      className="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                      defaultValue={row.role}
                    >
                      <option value="0">Admin</option>
                      <option value="1">User</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <PiCaretUpDown size="18" color="#6425FE" />
                    </div>
                  </div> */}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b  border-gray-200">
                    <button onClick={() => onClickAction(row.id)}>
                      <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modal_edit && (
        <a
          onClick={() => setModalEdit(!modal_edit)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {modal_edit && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
          {/* First div (circle) */}
          <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
            <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
              <button onClick={() => setModalEdit(!modal_edit)}>
                <AiOutlineClose size={25} color={"#6425FE"} />
              </button>
            </div>
          </div>

          {/* Second div (gray background) */}
          <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
            <div className="flex justify-center items-center mt-8">
              <div className="font-poppins text-5xl font-bold">Edit User</div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
                Edit User To Unleash The Power Of Digital Advertising
              </div>
            </div>
            <div className="mt-10 mb-4 flex justify-center items-center">
              <input
                className={` w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                onChange={(e) => setEditUsername(e.target.value)}
                type="text"
                placeholder="Your Username"
                defaultValue={edit_username}
                value={edit_username}
                required
                autoFocus
                autoComplete="username"
              />
            </div>
            <div className="mt-10 mb-4 flex justify-center items-center">
              <input
                className={` w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
                onChange={(e) => setEditEmail(e.target.value)}
                type="text"
                placeholder="Your Email"
                defaultValue={edit_email}
                value={edit_email}
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div className="mt-10 mb-4 flex justify-center items-center">
              <select
                name="role"
                id="role"
                onClick={toggleStatusSelect}
                onChange={(e) => setEditRolename(e.target.value)}
                value={edit_rolename}
                className={`w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
              >
                {default_roles.map((items) => (
                  <option value={items.RoleKey}>{items.RoleName}</option>
                ))}
              </select>
            </div>
            <div className="mt-10 mb-4 flex justify-center items-center">
              <select
                name="role"
                id="role"
                onClick={toggleStatusSelect}
                onChange={(e) => setEditActivate(parseInt(e.target.value))}
                value={edit_activate}
                className={`w-[60%] py-2 px-3 border-2 rounded-2xl outline-none font-poppins`}
              >
                <option value="1">Activated</option>
                <option value="0">Deactivated</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="submit"
                onClick={() => handleSaveEdit(edit_id)}
                className="w-full lg:w-[300px] bg-[#2f3847] py-2 rounded-sm text-white font-semibold mb-2 font-poppins"
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
