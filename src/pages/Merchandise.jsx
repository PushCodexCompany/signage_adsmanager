import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { TbDots } from "react-icons/tb";

import empty_img from "../assets/img/empty_img.png";

import useCheckPermission from "../libs/useCheckPermission";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

import add_new_img from "../assets/img/add_brand.png";

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

  const getMechendise = async () => {
    const { token } = User.getCookieData();
    try {
      const data = await User.getMerchandiseList(token);
      setMerchandise(data);
    } catch (error) {
      console.error("Error : ", error);
    }
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

  const handleDeleteMerchandise = async (merchandise_id, merchandise_name) => {
    try {
      Swal.fire({
        title: "Do You Want Delete This Merchandise ?",
        text: merchandise_name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6425FE",
        confirmButtonText: "OK",
        cancelButtonColor: "red",
        cancelButtonText: "Cancel",
        width: "600px",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const obj = {
            advertiserid: merchandise_id,
          };
          console.log("obj", obj);
          const { token } = User.getCookieData();
          const encrypted = await Encryption.encryption(
            obj,
            "delete_merchandise",
            false
          );
          console.log("encrypted", encrypted);
          const data = await User.deleteMerchandise(encrypted, token);
          console.log("data", data);
          if (data.code !== 404) {
            Swal.fire({
              title: "ลบ Merchandise สำเร็จ!",
              text: `ลบ Merchandise สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                window.location.reload();
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
    } catch (error) {
      console.error("Error save account:", error);
    }
  };

  const handleEditMerchandise = (merchandise) => {
    navigate(`/edit_merchandise/${merchandise.AdvertiserID}`, {
      state: { merchandise: merchandise },
    });
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
                    src={items.AdvertiserLogo || empty_img}
                    alt={items.AdvertiserName}
                  />
                  {/* Add icon inside img */}
                  <div
                    onClick={() => toggleDropdown(items.AdvertiserID)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <TbDots
                      size={26}
                      className="text-white hover:text-[#6425FE]"
                    />
                  </div>
                  {dropdownStates[items.AdvertiserID] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-md py-2 px-4">
                      <button
                        onClick={() => {
                          setEditMerchandise(items);
                          handleEditMerchandise(items);
                          toggleDropdown(items.AdvertiserID);
                          // setShowModalAddNewBrand(true);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteMerchandise(
                            items.AdvertiserID,
                            items.AdvertiserName
                          );
                          toggleDropdown(items.AdvertiserID);
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
                    {items.AdvertiserName}
                  </div>
                  <div className="text-[14px] text-slate-500 font-poppins">
                    {items.ContactName}
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
