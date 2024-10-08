import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../components";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import Empty_Img from "../assets/img/empty_img.png";

import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const Edit_Merchandises = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [merchandise_data, setmerchandiseData] = useState([]);
  const [preview_img, setPreviewImg] = useState(null);

  // data
  const [merchandise_id, setMerchandiseId] = useState();
  const [merchandise_name, setMerchandiseName] = useState();
  const [merchandise_slot, setMerchandiseSlot] = useState();
  const [merchandise_type, setMerchandiseType] = useState();
  const [merchandise_img, setMerchandiseImage] = useState();
  const [contact_person_name, setContactPersonName] = useState();
  const [contact_person_dep, setContactPersonDep] = useState();
  const [contact_person_pos, setContactPersonPos] = useState();
  const [contact_person_email, setContactPersonEmail] = useState();
  const [contact_person_phone, setContactPersonPhone] = useState();

  const [company_name, setCompanyName] = useState();
  const [company_tax_id, setCompanyTaxId] = useState();
  const [company_tax_address, setCompanyTaxAddress] = useState();
  const [company_phone, setCompanyPhone] = useState();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      fetchMerchandise();
    }
  }, [id]);

  const fetchMerchandise = () => {
    //set edit
    const {
      AdvertiserID,
      AdvertiserLogo,
      AdvertiserName,
      ContactName,
      Department,
      Email,
      Position,
      ContactNumber,
      CompanyName,
      CompanyPhone,
      TaxID,
      TaxAddress,
    } = location.state.merchandise;

    setMerchandiseId(AdvertiserID);
    setMerchandiseName(AdvertiserName);
    setMerchandiseImage(AdvertiserLogo);
    setPreviewImg(AdvertiserLogo);
    setContactPersonName(ContactName);
    setContactPersonDep(Department);
    setContactPersonPos(Position);
    setContactPersonEmail(Email);
    setContactPersonPhone(ContactNumber);

    setCompanyName(CompanyName);
    setCompanyPhone(CompanyPhone);
    setCompanyTaxId(TaxID);
    setCompanyTaxAddress(TaxAddress);
  };

  const handleButtonClick = () => {
    // Trigger the hidden input element
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setMerchandiseImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const { brand_code } = User.getBrandCode();

    if (!merchandise_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Customer",
      });
      return;
    }

    if (!contact_person_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Contact Person",
      });
      return;
    }

    if (!contact_person_email) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกอีเมลล์ Contact Person",
      });
      return;
    }

    if (!contact_person_phone) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกเบอร์โทรศัพท์ Contact Person",
      });
      return;
    }

    const obj = {
      advertisername: merchandise_name,
      contactname: contact_person_name || null,
      department: contact_person_dep || null,
      position: contact_person_pos || null,
      email: contact_person_email || null,
      contactnumber: contact_person_phone || null,
      brandcode: brand_code,
      companyname: company_name || null,
      taxid: company_tax_id || null,
      taxaddress: company_tax_address || null,
      companyphone: company_phone || null,
    };
    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "create_merchandise",
      false
    );
    try {
      const data = await User.createMerchandise(encrypted, token);
      if (data.code === 200) {
        if (merchandise_img) {
          const form = new FormData();
          form.append("target", "advertiserlogo");
          form.append("advertiserid", data.advertiserid);
          form.append("logo", merchandise_img);

          const data_img = await User.saveImgMerchandise(form, token);
          if (data_img.code === 200) {
            Swal.fire({
              icon: "success",
              title: "สร้าง Customer สำเร็จ!",
              text: `สร้าง Customer สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                navigate("/merchandise");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data_img.message,
            });
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "สร้าง Customer สำเร็จ!",
            text: `สร้าง Customer สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              navigate("/merchandise");
            }
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด!",
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    const { brand_code } = User.getBrandCode();

    if (!merchandise_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Customer",
      });
      return;
    }

    if (!contact_person_name) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกชื่อ Contact Person",
      });
      return;
    }

    if (!contact_person_email) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกอีเมลล์ Contact Person",
      });
      return;
    }

    if (!contact_person_phone) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณากรอกเบอร์โทรศัพท์ Contact Person",
      });
      return;
    }

    const obj = {
      advertiserid: merchandise_id,
      advertisername: merchandise_name,
      contactname: contact_person_name || null,
      department: contact_person_dep || null,
      position: contact_person_pos || null,
      email: contact_person_email || null,
      contactnumber: contact_person_phone || null,
      brandcode: brand_code,
      companyname: company_name || null,
      taxid: company_tax_id || null,
      taxaddress: company_tax_address || null,
      companyphone: company_phone || null,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "edit_merchandise",
      false
    );

    Swal.fire({
      text: `คุณยืนยันการแก้ไข Customer : ${merchandise_name} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219ad1",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (location.state.merchandise.AdvertiserName === merchandise_name) {
          if (location.state.merchandise.AdvertiserLogo !== merchandise_img) {
            // เปลี่ยนรูปอย่างเดียว
            const form = new FormData();
            form.append("target", "advertiserlogo");
            form.append("advertiserid", merchandise_id);
            form.append("logo", merchandise_img);
            const data_img = await User.saveImgMerchandise(form, token);
            if (data_img.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไข Customer สำเร็จ!",
                text: `แก้ไข Customer สำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  navigate("/merchandise");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "คุณไม่ได้เลือกรูปที่ต้องการเปลี่ยน!",
                text: data_img.message,
              });
            }
          } else {
            const data = await User.editMerchandise(encrypted, token);
            if (data.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไข Customer สำเร็จ!",
                text: `แก้ไข Customer สำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  navigate("/merchandise");
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
        } else {
          const data = await User.editMerchandise(encrypted, token);
          if (data.code === 200) {
            if (location.state.merchandise.AdvertiserLogo !== merchandise_img) {
              const form = new FormData();
              form.append("target", "advertiserlogo");
              form.append("advertiserid", merchandise_id);
              form.append("logo", merchandise_img);
              const data_img = await User.saveImgMerchandise(form, token);
              if (data_img.code === 200) {
                Swal.fire({
                  icon: "success",
                  title: "แก้ไข Customer สำเร็จ!",
                  text: `แก้ไข Customer สำเร็จ!`,
                }).then((result) => {
                  if (
                    result.isConfirmed ||
                    result.dismiss === Swal.DismissReason.backdrop
                  ) {
                    navigate("/merchandise");
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาดในการเปลี่ยนรูป!",
                  text: data_img.message,
                });
              }
            } else {
              Swal.fire({
                icon: "success",
                title: "แก้ไข Customer สำเร็จ!",
                text: `แก้ไข Customer สำเร็จ!`,
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.backdrop
                ) {
                  navigate("/merchandise");
                }
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
          }
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header
          lv1={"customer"}
          lv1Url={"/merchandise"}
          lv2={"Create/Edit Customer"}
        />
        <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
          {id === "new" ? "Create Customer" : "Edit Customer"}
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <div className="relative">
              <label
                className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                  merchandise_name
                    ? "-top-2.5 text-xs bg-white"
                    : "top-3 text-gray-400"
                }`}
              >
                <div>
                  Customer Name <span className="text-red-500">*</span>
                </div>
              </label>
              <div className="flex items-center">
                <input
                  className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm"
                  value={merchandise_name}
                  onChange={(e) => {
                    if (
                      location.state?.merchandise?.AdvertiserName !==
                      e.target.value
                    ) {
                      setIsEdit(true);
                    } else {
                      setIsEdit(false);
                    }
                    setMerchandiseName(e.target.value);
                  }}
                />
                <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
              </div>
            </div>

            <div className="relative mt-20 flex items-center justify-center">
              {preview_img ? (
                <img
                  src={preview_img}
                  className="w-[250px] h-[250px] border border-gray-300 rounded-xl object-contain"
                />
              ) : (
                <div className="flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                  <img
                    src={Empty_Img}
                    className="flex items-center justify-center object-contain"
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={() => handleButtonClick()}
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white font-bold w-[300px] h-[45px] rounded-lg font-poppins"
              >
                Upload New Image
              </button>
              <input
                type="file"
                accept=".png, .jpg"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="font-poppins">
                Upload Customer logo to enhance brand presence222
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:pl-8 border border-gray-300">
            <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
              Contact Person
            </div>
            <div className="flex items-center">
              <div className="relative w-full">
                <label
                  className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                    contact_person_name
                      ? "-top-2.5 text-xs bg-white"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <div>
                    Full Name <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  value={contact_person_name}
                  onChange={(e) => {
                    if (
                      location.state?.merchandise?.ContactName !==
                      e.target.value
                    ) {
                      setIsEdit(true);
                    } else {
                      setIsEdit(false);
                    }
                    setContactPersonName(e.target.value);
                  }}
                  className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      contact_person_dep
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Department
                  </label>
                  <input
                    value={contact_person_dep}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.Department !==
                        e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setContactPersonDep(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      contact_person_pos
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Position
                  </label>
                  <input
                    value={contact_person_pos}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.Position !== e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setContactPersonPos(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      contact_person_email
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    <div>
                      Email <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    value={contact_person_email}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.Email !== e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setContactPersonEmail(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      contact_person_phone
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    <div>
                      Phone <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    value={contact_person_phone}
                    type="number"
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.ContactNumber !==
                        e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setContactPersonPhone(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
              Company Info for Quotation
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      company_name
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Company Name
                  </label>
                  <input
                    value={company_name}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.CompanyName !==
                        e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setCompanyName(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      company_phone
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Company Phone
                  </label>
                  <input
                    value={company_phone}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.CompanyPhone !==
                        e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setCompanyPhone(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      company_tax_id
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Tax ID
                  </label>
                  <input
                    value={company_tax_id}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.TaxID !== e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setCompanyTaxId(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="relative ">
                  <label
                    className={`absolute left-3 px-1 transition-all duration-200 font-poppins z-10 pointer-events-none ${
                      company_tax_address
                        ? "-top-2.5 text-xs bg-white"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Tax Address
                  </label>
                  <input
                    value={company_tax_address}
                    onChange={(e) => {
                      if (
                        location.state?.merchandise?.TaxAddress !==
                        e.target.value
                      ) {
                        setIsEdit(true);
                      } else {
                        setIsEdit(false);
                      }
                      setCompanyTaxAddress(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg p-3 w-full font-bold placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 shadow-sm font-poppins"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center mt-3">
              <div className="font-poppins">
                Please provide details as they will be used in generating
                quotations for your campaigns
              </div>
            </div>
            {merchandise_id ? (
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => handleEdit()}
                  className={`${
                    isEdit
                      ? "bg-[#6425FE] hover:bg-[#6325fe86]"
                      : "bg-gray-500 hover:bg-gray-800"
                  } text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins`}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => handleSave()}
                  className="bg-[#6425FE]  hover:bg-[#3b1694] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Merchandises;
