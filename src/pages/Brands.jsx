import React, { useState, useEffect } from "react";
import User, {
  SIGNAGE_BRAND_CODE_COOKIE,
  SIGNAGE_BRAND_COOKIE,
} from "../libs/admin";
import { useNavigate } from "react-router-dom";
import { TbDots } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import cookie from "react-cookies";
import New_Brand from "../components/New_Brand";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";
import plus_brand from "../assets/img/plus_brand.png";

import Navbar from "../components/Navbar_brand";
import Permission from "../libs/permission";

const Brands = () => {
  const { user } = User.getCookieData();
  const select_campaign = User.getCampaign();
  const select_account = User.getAccount();

  const [showModalAddNewBrand, setShowModalAddNewBrand] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [edit_brand, setEditBrand] = useState([]);

  const navigate = useNavigate();

  const [brand, setBrand] = useState([]);
  const [full_brand, setFullBrand] = useState([]);

  const [page_permission, setPagePermission] = useState([]);

  useEffect(() => {
    if (!user) {
      window.location.href = "/adsmanager";
    }

    if (user.role === "Super Admin") {
      if (!select_account) {
        navigate("/user_account");
      }
    }

    cookie.remove(SIGNAGE_BRAND_COOKIE, { path: "/" });
    cookie.remove(SIGNAGE_BRAND_CODE_COOKIE, { path: "/" });

    if (select_campaign) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    }

    fetchData();
  }, []);

  useEffect(() => {
    setPermission();
  }, []);

  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.brandMgt.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/");
      return;
    }
    setPagePermission(permissions?.brandMgt);
  };

  const fetchData = async () => {
    const { token } = User.getCookieData();
    try {
      const data = await User.getBrand(token);
      setBrand(data);
      setFullBrand(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const selectCampaign = (items) => {
    const status = User.saveSelectedBrand(items.BrandCode);
    const acc = {
      AccountCode: items.AccountCode,
    };
    User.saveSelectedAccount(acc);
    User.saveBrandCode(items.BrandCode);
    if (status) {
      window.location.href = `${process.env.REACT_APP_SUB_DIR}/dashboard`;
    } else {
      console.log("error select brand");
    }
  };

  const toggleDropdown = (brandId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [brandId]: !prevStates[brandId],
    }));
  };

  const handleNewBrand = () => {
    setEditBrand([]);
    setShowModalAddNewBrand(!showModalAddNewBrand);
  };

  const handleDeleteBrand = async (brand_id) => {
    try {
      Swal.fire({
        title: "คุณแน่ใจแล้วหรือไม่?",
        text: "คุณต้องการลบข้อมูล BU!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const obj = {
            brandid: brand_id,
          };
          const { token } = User.getCookieData();
          const encrypted = await Encryption.encryption(
            obj,
            "delete_brand",
            false
          );
          const data = await User.deleteBrand(encrypted, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "ลบ BU สำเร็จ!",
              text: `ลบ BU สำเร็จ!`,
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

  return (
    <>
      <Navbar full_brand={full_brand} setBrand={setBrand} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <div className="text-[50px] font-[700] text-center font-poppins">
          Select Your BU
        </div>
        <div className="text-xl text-center text-slate-500 mb-12 font-poppins font-[500]">
          Choose your brand from the list to access brand-specific content and
          bookings.
        </div>

        <div
          className={` ${
            brand.length <= 0
              ? "grid grid-cols-1 lg:grid-cols-1 "
              : "grid grid-cols-2 lg:grid-cols-3"
          } gap-4 p-4 h-[620px] overflow-y-auto border border-gray-200 rounded-lg`}
        >
          {page_permission?.create ? (
            <div
              onClick={() => handleNewBrand()}
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
                  Add new BU
                </div>
                <div className="text-[14px] text-white font-poppins"></div>
              </button>
            </div>
          ) : (
            <></>
          )}

          {brand.length > 0 &&
            brand.map((items, key) => (
              <div
                key={key}
                className="h-[400px] p-2 flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <img
                    className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer object-contain border border-[#DFDFDF] shadow-sm"
                    src={
                      items.BrandLogo
                        ? items.BrandLogo
                        : `https://ui-avatars.com/api/?name=${
                            items.BrandName
                          }&background=${"000000"}&color=fff`
                    }
                    alt={items.AccountName}
                    onClick={() => selectCampaign(items)}
                  />
                  {!page_permission?.update && !page_permission?.delete ? (
                    <></>
                  ) : (
                    <div
                      onClick={() => toggleDropdown(items.BrandID)}
                      className="absolute top-2 right-2 cursor-pointer"
                    >
                      <TbDots
                        size={26}
                        className="text-[#dedede] hover:text-[#6425FE]"
                      />
                    </div>
                  )}

                  {dropdownStates[items.BrandID] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-sm py-2 px-4">
                      {page_permission?.update ? (
                        <button
                          onClick={() => {
                            toggleDropdown(items.BrandID);
                            setEditBrand(items);
                            setShowModalAddNewBrand(true);
                          }}
                          className="block w-full text-left font-poppins hover:text-[#6425FE] py-1"
                        >
                          Edit
                        </button>
                      ) : (
                        <></>
                      )}
                      {page_permission?.delete ? (
                        <button
                          onClick={() => {
                            handleDeleteBrand(items.BrandID);
                            toggleDropdown(items.BrandID);
                          }}
                          className="block w-full text-left font-poppins hover:text-[#6425FE] py-1"
                        >
                          Delete
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => selectCampaign(items)}
                  className="w-full"
                >
                  <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                    {items.BrandName}
                  </div>
                  {/* <div className="text-[14px] text-slate-500 font-poppins">
                    Brand Code :{items.BrandCode}
                  </div> */}
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
        <New_Brand
          setShowModalAddNewBrand={setShowModalAddNewBrand}
          edit_brand={edit_brand}
        />
      )}
    </>
  );
};

export default Brands;
