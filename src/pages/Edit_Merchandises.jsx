import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import Empty_Img from "../assets/img/empty_img.png";
import { Navbar } from "../components";

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
  const [billing_contact_name, setBillingContactName] = useState();
  const [billing_email, setBillingEmail] = useState();
  const [billing_contact_number, setBillingContactNumber] = useState();
  const [billing_address, setBillingAddress] = useState();
  const [billing_address2, setBillingAddress2] = useState();
  const [billing_country, setBillingCountry] = useState();
  const [billing_zip, setBillingZip] = useState();

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
    } = location.state.merchandise;

    setMerchandiseId(AdvertiserID);
    setMerchandiseName(AdvertiserName);
    setMerchandiseImage(AdvertiserLogo);
    setPreviewImg(AdvertiserLogo);
    setContactPersonName(ContactName);
    setContactPersonDep(Department);
    setContactPersonPos(Position);
    setContactPersonEmail(Email);
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
    const obj = {
      advertisername: merchandise_name,
      contactname: contact_person_name || null,
      department: contact_person_dep || null,
      position: contact_person_pos || null,
      email: contact_person_email || null,
      brandcode: brand_code,
    };
    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "create_merchandise",
      false
    );

    try {
      const data = await User.createMerchandise(encrypted, token);
      if (data.code !== 404) {
        const form = new FormData();
        form.append("target", "advertiserlogo");
        form.append("advertiserid", data.advertiserid);
        form.append("logo", merchandise_img);
        const data_img = await User.saveImgMerchandise(form, token);
        if (data_img.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "สร้าง Merchandise สำเร็จ!",
            text: `สร้าง Merchandise สำเร็จ!`,
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
    const obj = {
      advertiserid: merchandise_id,
      advertisername: merchandise_name,
      contactname: contact_person_name || null,
      department: contact_person_dep || null,
      position: contact_person_pos || null,
      email: contact_person_email || null,
      brandcode: brand_code,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(
      obj,
      "edit_merchandise",
      false
    );

    if (location.state.merchandise.AdvertiserName === merchandise_name) {
      if (location.state.merchandise.AdvertiserLogo !== merchandise_img) {
        // เปลี่ยนรูปอย่างเดียว
        const form = new FormData();
        form.append("target", "advertiserlogo");
        form.append("advertiserid", merchandise_id);
        form.append("logo", merchandise_img);
        const data_img = await User.saveImgMerchandise(form, token);
        if (data_img.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข Merchandise สำเร็จ!",
            text: `แก้ไข Merchandise สำเร็จ!`,
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
        console.log("data", data);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข Merchandise สำเร็จ!",
            text: `แก้ไข Merchandise สำเร็จ!`,
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
      if (data.code !== 404) {
        if (location.state.merchandise.AdvertiserLogo !== merchandise_img) {
          const form = new FormData();
          form.append("target", "advertiserlogo");
          form.append("advertiserid", merchandise_id);
          form.append("logo", merchandise_img);
          const data_img = await User.saveImgMerchandise(form, token);
          if (data_img.code !== 404) {
            Swal.fire({
              icon: "success",
              title: "แก้ไข Merchandise สำเร็จ!",
              text: `แก้ไข Merchandise สำเร็จ!`,
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
            title: "แก้ไข Merchandise สำเร็จ!",
            text: `แก้ไข Merchandise สำเร็จ!`,
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
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Setting" />
        <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
          {id === "new" ? "Create Merchandise" : "Edit Merchandise"}
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <div className="relative">
              <div className="flex items-center">
                <input
                  placeholder="Merchandise Name"
                  className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins"
                  value={merchandise_name}
                  onChange={(e) => setMerchandiseName(e.target.value)}
                />
                <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <div className="relative flex flex-col justify-center items-center h-full text-sm font-bold ml-1">
                  <select
                    name="file_size_type"
                    id="file_size_type"
                    className="block appearance-none w-full p-3 rounded-lg bg-[#f2f2f2] text-sm border text-center border-gray-300   pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200 font-poppins"
                    placeholder="Resolution"
                    onChange={(e) => setMerchandiseType(e.target.value)}
                  >
                    <option value="0">Category</option>
                    <option value="1">Department Store</option>
                    <option value="2">Mock 1 </option>
                    <option value="3">Mock 2</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 14.1875L6.6875 18.875L11.375 14.1875M2 6.6875L6.6875 2L11.375 6.6875"
                        stroke="#6425FE"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="grid grid-cols-4 space-x-2">
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="font-poppins font-bold">Total Slot</div>
                  </div>
                  <div className="col-span-1">
                    <input
                      onChange={(e) => setMerchandiseSlot(e.target.value)}
                      value={merchandise_slot}
                      placeholder="0"
                      className="border disabled:bg-[#DBDBDB] border-gray-300 rounded-lg p-3 w-full font-bold font-poppins text-center"
                    />
                  </div>
                  {/* <div className="col-span-1 flex items-center justify-center">
                  <div className="font-poppins">/</div>
                </div>
                <div className="col-span-1">
                  <input
                    placeholder="50"
                    value="50"
                    className="border rounded-lg p-3 border-gray-300 w-full font-bold font-poppins text-center"
                  />
                </div> */}
                </div>
              </div>
            </div>
            <div className="relative mt-20 flex items-center justify-center">
              {preview_img ? (
                <img
                  src={preview_img}
                  className="w-[250px] h-[250px] rounded-xl object-cover"
                />
              ) : (
                <div className="flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                  <img
                    src={Empty_Img}
                    className="flex items-center justify-center object-cover"
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
                Upload merchandise logo to enhance brand presence
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:pl-8 border border-gray-300">
            <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
              Contact Person
            </div>
            <div className="flex items-center">
              <input
                placeholder="Full Name"
                value={contact_person_name}
                onChange={(e) => setContactPersonName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <input
                  placeholder="Department"
                  value={contact_person_dep}
                  onChange={(e) => setContactPersonDep(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                />
              </div>
              <div className="w-1/2 pl-2">
                <input
                  placeholder="Position"
                  value={contact_person_pos}
                  onChange={(e) => setContactPersonPos(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-1/2 pr-2">
                <input
                  placeholder="Email"
                  value={contact_person_email}
                  onChange={(e) => setContactPersonEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                />
              </div>
              <div className="w-1/2 pl-2">
                <input
                  placeholder="Phone"
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
                />
              </div>
            </div>
            {/* <div className="mt-10 mb-5 font-bold font-poppins text-2xl">
            Billing
          </div>
          <div className="flex items-center">
            <input
              placeholder="Contact Name"
              onChange={(e) => setBillingContactName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Email"
                onChange={(e) => setBillingEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Contact Number"
                onChange={(e) => setBillingContactNumber(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <input
              placeholder="Street Address"
              onChange={(e) => setBillingAddress(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <input
              placeholder="Address Line 2"
              onChange={(e) => setBillingAddress2(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Country"
                onChange={(e) => setBillingCountry(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Zip, Postal Code"
                onChange={(e) => setBillingZip(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div> */}
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
                  className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins"
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
