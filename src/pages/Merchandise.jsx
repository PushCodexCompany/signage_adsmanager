import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../components";
import useCheckPermission from "../libs/useCheckPermission";
import User from "../libs/admin";
import Permission from "../libs/permission";
import Swal from "sweetalert2";
import Filter from "../components/Filter";
import { GridTable } from "../libs/merchandise_grid";

const Merchandise = () => {
  useCheckPermission();
  const navigate = useNavigate();
  // const user = User.getCookieData();
  // const select_campaign = User.getCampaign();
  // const select_merchandise = User.getMerchandise();

  const [merchandise, setMerchandise] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [page_permission, setPagePermission] = useState([]);
  const [filter_screen, setFilterScreen] = useState([]);

  useEffect(() => {
    getMerchendise();
  }, [searchTerm]);

  useEffect(() => {
    getPermission();
  }, []);

  const getMerchendise = async () => {
    const { token } = User.getCookieData();

    if (searchTerm === null) {
      const data = await User.getMerchandiseList(token);
      setMerchandise(data);
    } else {
      const data = await User.getMerchandiseList(token, searchTerm);
      setMerchandise(data);
    }
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.adMerch.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
    setPagePermission(permissions?.adMerch);
  };

  const handleNewMerchandise = () => {
    navigate("/edit_merchandise/new");
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"customer"} />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">Customers</div>
          </div>
          {page_permission?.create ? (
            <div className="col-span-1 flex justify-end">
              <button
                onClick={() => handleNewMerchandise()}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md shadow-sm"
              >
                New Customer +
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
          page_name={"adMerch"}
        />
        <div className="mt-5">
          {merchandise?.length > 0 ? (
            <GridTable
              merchandise={merchandise}
              // all_pages={all_pages}
              // searchTerm={searchTerm}
              page_permission={page_permission}
              getMerchendise={getMerchendise}
            />
          ) : (
            <div className="flex items-center justify-center h-[550px] text-center ">
              <div className="font-poppins text-5xl text-[#dedede]">
                --- No data ---
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Merchandise;
