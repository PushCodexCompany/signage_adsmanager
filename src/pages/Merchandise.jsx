import React, { useState, useEffect } from "react";

import top_img from "../assets/img/merchandise/tops.png";
import matsumoto_img from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import powerbuy_img from "../assets/img/merchandise/Power_Buy.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import fila_img from "../assets/img/merchandise/Fila.png";
import alice_img from "../assets/img/merchandise/Alice.png";
import kfc_img from "../assets/img/merchandise/kfc.png";

import User from "../libs/admin";

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
  const user = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  const [merchandise, setMerchandise] = useState([]);

  useEffect(() => {
    if (!select_campaign) {
      window.location.href = "/brand";
    }
    if (select_merchandise) {
      window.location.href = "/dashboard";
    }

    getMechendise();
  }, []);

  const getMechendise = () => {
    setMerchandise(brand_merchandise[select_campaign.brand_id]);
  };

  const selectMerchandise = (merchendise) => {
    alert(`Select : ${merchendise.name}`);
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <div className="text-6xl font-bold text-center font-poppins">
        Select Your Merchandise
      </div>
      <div className="text-xl text-center text-slate-500 mb-20 font-poppins">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>

      <div
        class={
          merchandise.length === 1
            ? "grid grid-cols-1 gap-4 sm:grid-cols-1"
            : merchandise.length === 2
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
            : merchandise.length === 3
            ? "grid grid-cols-1 gap-4 sm:grid-cols-3"
            : "grid grid-cols-1 gap-4 sm:grid-cols-4"
        }
      >
        {merchandise.map((items) => (
          <div>
            <button onClick={() => selectMerchandise(items)}>
              <img
                className={`block ml-auto mr-auto mt-30px w-3/5 rounded-3xl `}
                src={items.img}
              />
              <div className="font-bold text-[20px] m-auto w-[50%] text-center mt-[10px] font-poppins">
                {items.name}
              </div>
              <div className="text-[14px] text-slate-500 m-auto w-[70%] font-poppins">
                {items.des}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
