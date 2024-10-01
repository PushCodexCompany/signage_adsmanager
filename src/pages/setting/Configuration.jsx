import React, { useState, useEffect } from "react";
import { Header, Navbar } from "../../components";
import User from "../../libs/admin";
import Swal from "sweetalert2";

const Configuration = () => {
  const { token } = User.getCookieData();

  const [config_data, setConfigData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [inputValues, setInputValues] = useState(
    config_data.reduce((acc, item) => {
      acc[item.ParameterKey] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    getConfigurationData();
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
      <Navbar />
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
                      className="font-poppins h-[35px] text-center border border-[#dedede] rounded-md shadow-lg"
                      value={inputValues[items.ParameterKey]}
                      onChange={(e) =>
                        handleInputChange(
                          items.ParameterKey,
                          e.target.value,
                          index
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

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
        </div>
      </div>
    </>
  );
};

export default Configuration;
