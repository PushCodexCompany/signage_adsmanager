import React, { useState, useEffect } from "react";
import User from "../libs/admin";

import centralImg from "../assets/img/central.png";
import robinsonImg from "../assets/img/robinson.png";
import superSportImg from "../assets/img/supersport.png";
import centralRetailImg from "../assets/img/centralretail.jpeg";
import cmgImg from "../assets/img/cmg.jpg";
import sevenImg from "../assets/img/seven.png";
import makroProImg from "../assets/img/makropro.jpeg";
import lotusImg from "../assets/img/lotus.png";
import centralPatImg from "../assets/img/centralpattana.jpg";
import add_new_img from "../assets/img/add_new_brand.png";
import cookie from "react-cookies";

const mock_data = {
  1: {
    name: "CDS",
    img: centralImg,
    des: "Central Department Store",
  },
  2: {
    name: "Super Sports",
    img: superSportImg,
    des: "Super Sports",
  },
  3: {
    name: "Central Retail",
    img: centralRetailImg,
    des: "Central Retail",
  },
  4: {
    name: "CMG",
    img: cmgImg,
    des: "CMG",
  },
  5: {
    name: "7-11",
    img: sevenImg,
    des: "7-11",
  },
  6: {
    name: "Makro Pro",
    img: makroProImg,
    des: "Makro Pro",
  },
  7: {
    name: "Lotus's",
    img: lotusImg,
    des: "Lotus's",
  },
  8: {
    name: "Central Pattana",
    img: centralPatImg,
    des: "Central Pattana",
  },
  9: {
    name: "Robinson",
    img: robinsonImg,
    des: "Robinson Department Store",
  },
};

const Brands = () => {
  const { user } = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_merchandise = User.getMerchandise();

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    cookie.remove("signage-brand");
    if (select_campaign) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    }
    user.brand = [1, 9];
    setBrand(user.brand);
    // if (select_merchandise) {
    //   window.location.href = "/dashboard";
    // }
  }, []);

  const selectCampaign = (brand_id) => {
    const status = User.saveSelectedBrand(brand_id);
    if (status) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    } else {
      console.log("error select brand");
    }
  };

  return (
    <>
      {/* <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
        <Navbar />
      </div> */}
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <div className="text-6xl font-[700] text-center font-poppins">
          Select Your Brand
        </div>
        <div className="text-xl text-center text-slate-500 mb-20 font-poppins font-[500]">
          Choose your brand from the list to access brand-specific content and
          bookings.
        </div>

        <div className="flex flex-wrap justify-center items-center lg:space-x-[-100px]">
          <div className="w-full sm:w-3/4 lg:w-1/4 h-[400px] p-2 flex justify-center items-center">
            <button onClick={() => alert("addnew")}>
              <img
                className="block ml-auto mr-auto mt-30px w-4/5 rounded-3xl"
                src={add_new_img}
                alt={"add new brand"}
              />
              <div className="font-bold text-[20px] m-auto w-[70%] text-center mt-[10px] font-poppins">
                Add new Brand
              </div>
            </button>
          </div>
          {brand.length > 0 &&
            brand.map((items, key) => (
              <div
                key={key}
                className="w-full sm:w-3/4 lg:w-1/4 h-[400px] p-2 flex justify-center items-center"
              >
                <button onClick={() => selectCampaign(items)}>
                  <img
                    className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl"
                    src={mock_data[items].img}
                    alt={mock_data[items].name}
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
    </>
  );
};

export default Brands;
