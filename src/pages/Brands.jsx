import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { TbDots } from "react-icons/tb";

import centralImg from "../assets/img/central.png";
import robinsonImg from "../assets/img/robinson.png";
import superSportImg from "../assets/img/supersport.png";
import centralRetailImg from "../assets/img/centralretail.jpeg";
import cmgImg from "../assets/img/cmg.jpg";
import sevenImg from "../assets/img/seven.png";
import makroProImg from "../assets/img/makropro.jpeg";
import lotusImg from "../assets/img/lotus.png";
import centralPatImg from "../assets/img/centralpattana.jpg";
import add_new_img from "../assets/img/add_brand.png";
import cookie from "react-cookies";
import New_Brand from "../components/New_Brand";

import { Navbar } from "../components";

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
  const select_account = User.getAccount();

  const [showModalAddNewBrand, setShowModalAddNewBrand] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});

  const navigate = useNavigate();

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    if (!user) {
      window.location.href = "/adsmanager";
    }

    if (user.role === "Super Admin") {
      if (!select_account) {
        navigate("/user_account");
      }
    }

    cookie.remove("signage-brand");
    if (select_campaign) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    }

    fetchData();

    user.brand = [1, 9];
    setBrand(user.brand);
    // if (select_merchandise) {
    //   window.location.href = "/dashboard";
    // }
  }, []);

  const fetchData = async () => {
    const { token } = User.getCookieData();
    try {
      const data = await User.getBrand(token);
      // setBrand(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const selectCampaign = (brand_id) => {
    const status = User.saveSelectedBrand(brand_id);
    if (status) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    } else {
      console.log("error select brand");
    }
  };

  const toggleDropdown = (itemId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <div className="text-6xl font-[700] text-center font-poppins">
          Select Your Brand
        </div>
        <div className="text-xl text-center text-slate-500 mb-20 font-poppins font-[500]">
          Choose your brand from the list to access brand-specific content and
          bookings.
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-2">
          <div className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex justify-center items-center">
            <button
              onClick={() => setShowModalAddNewBrand(!showModalAddNewBrand)}
              className="flex flex-col items-center"
            >
              <img
                className="block ml-auto mr-auto mt-30px w-2/5 rounded-3xl"
                src={add_new_img}
                alt={"add new brand"}
              />
              <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                Add new Brand
              </div>
            </button>
          </div>

          {brand.length > 0 &&
            brand.map((items, key) => (
              <div
                key={key}
                className="sm:w-1/2 lg:w-[20%] h-[400px] p-2 flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <img
                    className="block mx-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer"
                    src={mock_data[items].img}
                    alt={mock_data[items].name}
                    onClick={() => selectCampaign(items)}
                  />
                  {/* Add icon inside img */}
                  <div
                    onClick={() => toggleDropdown(items)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <TbDots
                      size={26}
                      className="text-white hover:text-[#6425FE]"
                    />
                  </div>
                  {dropdownStates[items] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-md py-2 px-4">
                      <button
                        onClick={() => {
                          alert(`Edit ${mock_data[items].name}`);
                          toggleDropdown(items);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          alert(`Delete ${mock_data[items].name}`);
                          toggleDropdown(items);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => selectCampaign(items)}
                  className="w-full"
                >
                  <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                    {mock_data[items].name}
                  </div>
                  <div className="text-[14px] text-slate-500 font-poppins">
                    {mock_data[items].des}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>

      {showModalAddNewBrand && (
        <a
          onClick={() => setShowModalAddNewBrand(!showModalAddNewBrand)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModalAddNewBrand && (
        <New_Brand setShowModalAddNewBrand={setShowModalAddNewBrand} />
      )}
    </>
  );
};

export default Brands;
