import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../components";
import { TbDots } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import empty_img from "../assets/img/empty_img.png";
import useCheckPermission from "../libs/useCheckPermission";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";
import plus_brand from "../assets/img/plus_brand.png";

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
        title: "คุณต้องการลบ Merchandise ?",
        text: merchandise_name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { brand_code } = User.getBrandCode();
          const obj = {
            advertiserid: merchandise_id,
            brandcode: brand_code,
          };
          const { token } = User.getCookieData();
          const encrypted = await Encryption.encryption(
            obj,
            "delete_merchandise",
            false
          );
          const data = await User.deleteMerchandise(encrypted, token);
          if (data.code !== 404) {
            Swal.fire({
              icon: "success",
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
        <Header category="Page" title="Home" />
        <div className="text-[50px] font-bold text-center font-poppins mt-10">
          Select Your Merchandise
        </div>
        <div className="text-xl text-center text-slate-500 mb-10 font-poppins">
          Press the icon or message to edit it, or press the top right menu to
          delete it.
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-[620px] overflow-y-auto border border-gray-200 rounded-lg">
          <div
            onClick={() => handleNewMerchandise()}
            className="h-[400px] p-2 flex flex-col items-center"
          >
            <div className="relative mb-4">
              <img
                className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-cover border border-[#DFDFDF]"
                src={plus_brand}
              />
            </div>
            <button className="w-full">
              <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                Add New Merchandise
              </div>
              <div className="text-[14px] text-white font-poppins"></div>
            </button>
          </div>
          {merchandise.length > 0 &&
            merchandise.map((items, key) => (
              <div
                key={key}
                className="h-[400px] p-2 flex flex-col items-center"
              >
                <div
                  onClick={() => {
                    setEditMerchandise(items);
                    handleEditMerchandise(items);
                    toggleDropdown(items.AdvertiserID);
                  }}
                  className="relative mb-4"
                >
                  <img
                    className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-cover border border-[#DFDFDF]"
                    src={
                      items.AdvertiserLogo
                        ? items.AdvertiserLogo
                        : `https://ui-avatars.com/api/?name=${items.AdvertiserName}&background=000000&color=fff`
                    }
                    alt={items.AccountName}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(items.AdvertiserID);
                    }}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <TbDots
                      size={26}
                      className="text-[#dedede] hover:text-[#6425FE]"
                    />
                  </div>
                  {dropdownStates[items.AdvertiserID] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-md py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditMerchandise(items);
                          handleEditMerchandise(items);
                          toggleDropdown(items.AdvertiserID);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMerchandise(
                            items.AdvertiserID,
                            items.AdvertiserName
                          );
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-1"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setEditMerchandise(items);
                    handleEditMerchandise(items);
                    toggleDropdown(items.AdvertiserID);
                  }}
                  className="w-full"
                >
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
