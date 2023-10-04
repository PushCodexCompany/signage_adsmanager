import React, { useEffect } from "react";

import { Header } from "../components";

import centralImg from "../assets/img/central.png";
import superSportImg from "../assets/img/supersport.png";
import centralRetailImg from "../assets/img/centralretail.jpeg";
import cmgImg from "../assets/img/cmg.jpg";
import sevenImg from "../assets/img/seven.png";
import makroProImg from "../assets/img/makropro.jpeg";
import lotusImg from "../assets/img/lotus.png";
import centralPatImg from "../assets/img/centralpattana.jpg";
import User from "../libs/admin";

const mock_data = [
  {
    name: "Central",
    img: centralImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "Super Sports",
    img: superSportImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "Central Retail",
    img: centralRetailImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "CMG",
    img: cmgImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "7-11",
    img: sevenImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "Makro Pro",
    img: makroProImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "Lotus's",
    img: lotusImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
  {
    name: "Central Pattana",
    img: centralPatImg,
    des: "Discover Saint Laurent Official Online Store. Explore the latest Collection of luxury",
  },
];

const Main_Dashboard = () => {
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  useEffect(() => {
    if (!select_campaign) {
      window.location.href = "/brand";
    }
  }, []);

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header title="Home" subtitle="Welcome to Dashboard" />

      <div className="text-4xl font-bold text-center">
        Select Your Merchandise
      </div>
      <div className="text-xl text-center text-slate-500 mb-20">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {mock_data.map((items) => (
          <div>
            <img
              className="block ml-auto mr-auto mt-30px w-3/5 rounded-3xl "
              src={items.img}
            />
            <div className="font-bold text-[20px] m-auto w-[50%] text-center mt-[10px]">
              {items.name}
            </div>
            <div className="text-[14px] text-slate-500 m-auto w-[70%]">
              {items.des}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Main_Dashboard;
