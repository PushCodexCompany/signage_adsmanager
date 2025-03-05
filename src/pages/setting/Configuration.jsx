import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import User from "../../libs/admin";
import Swal from "sweetalert2";
import Permission from "../../libs/permission";

const Configuration = () => {
  const { token } = User.getCookieData();
  const navigate = useNavigate();
  const [config_data, setConfigData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  const [inputValues, setInputValues] = useState(
    config_data.reduce((acc, item) => {
      acc[item.ParameterKey] = "";
      return acc;
    }, {})
  );

  const [page_permission, setPagePermission] = useState([]);

  useEffect(() => {
    getConfigurationData();
    setPermission();
  }, []);

  const getConfigurationData = async () => {
    const {
      configuration: { brandconfig },
    } = await User.getConfiguration(token);
    setConfigData(brandconfig);
    const initialValues = brandconfig.reduce((acc, item) => {
      acc[item.ParameterKey] = item.ParameterValue;
      return acc;
    }, {});
    setInputValues(initialValues);
  };

  const setPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertNewPermissionValuesToBoolean([
      user,
    ]);
    if (!permissions.conf.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/");
      return;
    }
    setPagePermission(permissions?.conf);
  };

  const handleInputChange = (key, value, index) => {
    if (key === Object.keys(inputValues)[index]) {
      if (value !== config_data[index]?.ParameterValue) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }

    setInputValues({
      ...inputValues,
      [key]: value,
    });
  };

  const isNumber = (value) => {
    return /^\d+$/.test(value); // Matches whole numbers (integers only)
  };

  const handleSaveConfiguration = async () => {
    Swal.fire({
      text: `คุณยืนยันการแก้ไข Configuration `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!inputValues.CONTENTPERSLOT_SEC) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: " ค่า Configuration ไม่สามารถเป็นค่าว่างได้ ...",
          });
          return;
        }

        if (!isNumber(inputValues.CONTENTPERSLOT_SEC)) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: " ค่า Configuration ต้องเป็นตัวเลขเท่านั้น ...",
          });
          return;
        }

        if (!inputValues.NOTIDELAY_SEC) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: " ค่า Configuration ไม่สามารถเป็นค่าว่างได้ ...",
          });
          return;
        }

        if (!isNumber(inputValues.NOTIDELAY_SEC)) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด!",
            text: " ค่า Configuration ต้องเป็นตัวเลขเท่านั้น ...",
          });
          return;
        }

        const obj = {
          configs: inputValues,
        };
        const newObj = {
          configs: Object.keys(obj.configs).map((key) => ({
            ParameterKey: key,
            ParameterValue: obj.configs[key],
          })),
        };

        try {
          const data = await User.updateConfiguration(newObj, token);
          if (data.code === 200) {
            Swal.fire({
              icon: "success",
              title: "Update Configuration Success ...",
              text: "แก้ไข Configuration สำเร็จ!",
            }).then(async (result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"Setting"} lv2={"configuration"} />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">
              Configuration
            </div>
          </div>
        </div>
        <div className="mt-10">
          {config_data.length > 0 &&
            config_data.map((items, index) => (
              <div className={`grid grid-cols-12 ${index > 0 ? "mt-5" : ""}`}>
                <div className="col-span-3">
                  <div className="flex justify-start items-center text-center font-poppins font-bold h-[35px]">
                    {items.ParameterName}{" "}
                    {`(${items.ParameterKey.split("_")[1].toLowerCase()})`} :
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex text-center justify-center">
                    <input
                      className="font-poppins h-[35px] text-center border border-[#dedede] rounded-md shadow-sm"
                      value={inputValues[items.ParameterKey]}
                      onChange={(e) =>
                        handleInputChange(
                          items.ParameterKey,
                          e.target.value,
                          index
                        )
                      }
                      disabled={page_permission?.update ? false : true}
                    />
                  </div>
                </div>
              </div>
            ))}
          {page_permission?.update ? (
            <div className="grid grid-cols-12 mt-20">
              <div className="col-span-5">
                <div className="flex text-center justify-center">
                  <button
                    onClick={() => handleSaveConfiguration()}
                    className={`w-[315px] h-[48px]  ${
                      isEdit
                        ? "bg-[#6425FE] hover:bg-[#6325fe86]"
                        : "bg-gray-500 hover:bg-gray-800"
                    } text-white font-bold font-poppins rounded-lg`}
                  >
                    Save
                  </button>
                </div>
                <div className="flex text-center justify-center mt-3">
                  <div className="font-poppins text-xs">
                    Add screen details for precise ad targeting. Enter size,
                    resolution, and operating hours to optimize your advertising
                    strategy.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Configuration;
