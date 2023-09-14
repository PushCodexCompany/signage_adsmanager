import React, { useState, useEffect } from "react";
import User from "../libs/admin";

import { Header } from "../components";
import centralImg from "../assets/img/central.jpeg";
import superSportImg from "../assets/img/supersport.png";
import centralRetailImg from "../assets/img/centralretail.jpeg";
import cmgImg from "../assets/img/cmg.jpg";
import sevenImg from "../assets/img/seven.png";
import makroProImg from "../assets/img/makropro.jpeg";
import lotusImg from "../assets/img/lotus.png";
import centralPatImg from "../assets/img/centralpattana.jpg";

const mock_data = {
  1: {
    name: "Central",
    img: centralImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  2: {
    name: "Super Sports",
    img: superSportImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  3: {
    name: "Central Retail",
    img: centralRetailImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  4: {
    name: "CMG",
    img: cmgImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  5: {
    name: "7-11",
    img: sevenImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  6: {
    name: "Makro Pro",
    img: makroProImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  7: {
    name: "Lotus's",
    img: lotusImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  8: {
    name: "Central Pattana",
    img: centralPatImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
};

const Brands = () => {
  const user = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  useEffect(() => {
    if (select_campaign) {
      window.location.href = "/merchandise";
    }
    if (select_merchandise) {
      window.location.href = "/dashboard";
    }
  }, []);

  const selectCampaign = (brand_id) => {
    const status = User.saveSelectedBrand(brand_id);
    if (status) {
      window.location.href = "/merchandise";
    } else {
      console.log("error select brand");
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="text-6xl font-bold text-center font-poppins">
        Select Your Brand
      </div>
      <div className="text-xl text-center text-slate-500 mb-20 font-poppins">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>

      <div
        class={
          user.brand.length === 1
            ? "grid grid-cols-1 gap-4 sm:grid-cols-1"
            : user.brand.length === 2
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
            : user.brand.length === 3
            ? "grid grid-cols-1 gap-4 sm:grid-cols-3"
            : "grid grid-cols-1 gap-4 sm:grid-cols-4"
        }
      >
        {user.brand.map((items) => (
          <div>
            <button onClick={() => selectCampaign(items)}>
              <img
                className={`block ml-auto mr-auto mt-30px w-2/5 rounded-3xl `}
                src={mock_data[items].img}
              />
              <div className="font-bold text-[20px] m-auto w-[50%] text-center mt-[10px] font-poppins">
                {mock_data[items].name}
              </div>
              <div className="text-[14px] text-slate-500 m-auto w-[70%] font-poppins">
                {mock_data[items].des}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
