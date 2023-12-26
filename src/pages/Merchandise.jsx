import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { TbDots } from "react-icons/tb";

import top_img from "../assets/img/merchandise/tops.png";
import matsumoto_img from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import powerbuy_img from "../assets/img/merchandise/Power_Buy.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import fila_img from "../assets/img/merchandise/Fila.png";
import alice_img from "../assets/img/merchandise/Alice.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import useCheckPermission from "../libs/useCheckPermission";
import User from "../libs/admin";

import add_new_img from "../assets/img/add_brand.png";

const brand_merchandise = {
  1: [
    {
      id: 1,
      name: "Tops",
      img: top_img,
      des: "Tops Supermarkety",
    },
    {
      id: 2,
      name: "Matsumoto KiYoshi",
      img: matsumoto_img,
      des: "Matsumoto KiYoshi",
    },
    {
      id: 3,
      name: "Super Sports",
      img: supersport_img,
      des: "Super Sports",
    },
    {
      id: 4,
      name: "Power Buy",
      img: powerbuy_img,
      des: "Power Buy",
    },
    {
      id: 5,
      name: "Evisu",
      img: evisu_img,
      des: "Evisu",
    },
    {
      id: 6,
      name: "Fila",
      img: fila_img,
      des: "Fila",
    },
    {
      id: 7,
      name: "Alice And Olivia",
      img: alice_img,
      des: "Alice And Olivia",
    },
    {
      id: 8,
      name: "KFC",
      img: kfc_img,
      des: "KFC",
    },
  ],
};
const Merchandise = () => {
  useCheckPermission();
  const navigate = useNavigate();
  const user = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  const [edit_merchandise, setEditMerchandise] = useState([]);
  const [showModalAddNewMerchandise, setShowModalAddNewMerchandise] =
    useState(false);

  const [merchandise, setMerchandise] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});

  useEffect(() => {
    getMechendise();
  }, []);

  const getMechendise = () => {
    setMerchandise(brand_merchandise[select_campaign.brand_id]);
  };

  const selectMerchandise = (merchendise) => {
    alert(`Select : ${merchendise.name}`);
  };

  const handleNewMerchandise = () => {
    navigate("/edit_merchandise/new");
  };

  const toggleDropdown = (id) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <div className="text-6xl font-bold text-center font-poppins">
          Select Your Merchandise
        </div>
        <div className="text-xl text-center text-slate-500 mb-20 font-poppins">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-2">
          <div className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex justify-center items-center">
            <button
              onClick={() => handleNewMerchandise()}
              className="flex flex-col items-center"
            >
              <div className="h-60 flex items-center justify-center">
                <img
                  className="block ml-auto mr-auto mt-30px w-1/5 rounded-3xl "
                  src={add_new_img}
                  alt={"add new merchandise"}
                />
              </div>
              <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                Add New Merchandise
              </div>
            </button>
          </div>

          {merchandise.length > 0 &&
            merchandise.map((items, key) => (
              <div
                key={key}
                className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <img
                    className="block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer"
                    src={items.img}
                    alt={items.name}
                  />
                  {/* Add icon inside img */}
                  <div
                    onClick={() => toggleDropdown(items.id)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <TbDots
                      size={26}
                      className="text-white hover:text-[#6425FE]"
                    />
                  </div>
                  {dropdownStates[items.id] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-md py-2 px-4">
                      <button
                        onClick={() => {
                          alert(`Edit ${items.name}`);
                          toggleDropdown(items.id);
                          // setEditBrand(items);
                          // setShowModalAddNewBrand(true);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          alert(`Delete ${items.name}`);
                          toggleDropdown(items.id);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <button className="w-full">
                  <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                    {items.name}
                  </div>
                  <div className="text-[14px] text-slate-500 font-poppins">
                    {items.des}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Merchandise;
