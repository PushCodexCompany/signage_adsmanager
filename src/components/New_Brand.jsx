import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { HiOutlinePencil } from "react-icons/hi2";
import Empty_Img from "../assets/img/empty_img.png";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const New_Brand = ({ setShowModalAddNewBrand, edit_brand }) => {
  const [brand_name, setBrandName] = useState(null);
  const [brand_description, setBrandDescription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brand_img, setBrandImg] = useState(null);
  const fileInputRef = useRef(null);

  const [contact_person_name, setContactPersonName] = useState(null);
  const [department_contact, setDepartmentContact] = useState(null);
  const [position_contact, setPositionContact] = useState(null);
  const [email_contact, setEmailContact] = useState(null);
  const [remark_contact, setRemarkContact] = useState(null);

  // const [fullname, setFullName] = useState(null);
  // const [department, setDepartment] = useState(null);
  // const [position, setPosition] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [remark, setRemark] = useState(null);

  useEffect(() => {
    setBrandName(edit_brand.BrandName);
    setBrandDescription(edit_brand.BrandDesc);
    setSelectedImage(edit_brand.BrandLogo);
    setBrandImg(edit_brand.BrandLogo);
    setContactPersonName(edit_brand.ContactName);
    setDepartmentContact(edit_brand.Department);
    setPositionContact(edit_brand.Position);
    setEmailContact(edit_brand.Email);
    setRemarkContact(edit_brand.Remark);
  }, [edit_brand]);

  const handleImageChange = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setBrandImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewBrand = async () => {
    const obj = {
      brandname: brand_name,
      branddesc: brand_description,
      contactname: contact_person_name,
      department: department_contact,
      position: position_contact,
      email: email_contact,
      remark: remark_contact,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(obj, "create_brand", false);
    try {
      const data = await User.createBrand(encrypted, token);
      if (data.code !== 404) {
        const form = new FormData();
        form.append("target", "brandlogo");
        form.append("brandid", data.brandid);
        form.append("logo", brand_img);
        const data_img = await User.saveImgBrand(form, token);
        if (data_img.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "สร้าง Brand สำเร็จ!",
            text: `สร้าง Brand สำเร็จ!`,
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

  const handleEditBrand = async () => {
    const obj = {
      brandid: edit_brand.BrandID,
      brandname: brand_name,
      branddesc: brand_description,
      contactname: contact_person_name,
      department: department_contact,
      position: position_contact,
      email: email_contact,
      remark: remark_contact,
    };

    const { token } = User.getCookieData();
    const encrypted = await Encryption.encryption(obj, "edit_brand", false);

    if (edit_brand.BrandName === brand_name) {
      if (edit_brand.BrandLogo !== brand_img) {
        // เปลี่ยนรูปอย่างเดียว
        const form = new FormData();
        form.append("target", "brandlogo");
        form.append("brandid", edit_brand.BrandID);
        form.append("logo", brand_img);

        const data_img = await User.saveImgBrand(form, token);
        if (data_img.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข Brand สำเร็จ!",
            text: `แก้ไข Brand สำเร็จ!`,
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
            title: "คุณไม่ได้เลือกรูปที่ต้องการเปลี่ยน!",
            text: data_img.message,
          });
        }
      } else {
        const data = await User.editBrand(encrypted, token);
        if (data.code !== 404) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข Brand สำเร็จ!",
            text: `แก้ไข Brand สำเร็จ!`,
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
    } else {
      const data = await User.editBrand(encrypted, token);
      if (data.code !== 404) {
        if (edit_brand.BrandLogo !== brand_img) {
          const form = new FormData();
          form.append("target", "brandlogo");
          form.append("brandid", edit_brand.BrandID);
          form.append("logo", brand_img);
          const data_img = await User.saveImgBrand(form, token);
          if (data_img.code !== 404) {
            Swal.fire({
              icon: "success",
              title: "แก้ไข Brand สำเร็จ!",
              text: `แก้ไข Brand สำเร็จ!`,
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
              title: "เกิดข้อผิดพลาดในการเปลี่ยนรูป!",
              text: data_img.message,
            });
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "แก้ไข Brand สำเร็จ!",
            text: `แก้ไข Brand สำเร็จ!`,
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              window.location.reload();
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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="absolute right-12 top-12 lg:top-12 lg:right-[160px] m-4 z-30">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setShowModalAddNewBrand(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="flex justify-center items-center mt-8">
            <div className="font-poppins text-5xl font-bold">
              {edit_brand.BrandID ? "Edit Brand" : "Create Brand"}
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
              Let's Get To Know Your Brand
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-8">
              <div className="col-span-8">
                <div className="text-2xl font-poppins font-bold text-[#2F3847]">
                  Brand Information
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row h-[500px] overflow-y-auto">
              <div className="w-full lg:w-1/2 p-4">
                {/* brand name */}
                <div className="h-10 relative">
                  <input
                    className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                    type="text"
                    placeholder="Brand Name"
                    value={brand_name}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                    autoFocus
                    autoComplete="brand"
                  />
                  <HiOutlinePencil
                    size={26}
                    color={"#6425FE"}
                    className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                  />
                </div>
                {/* brand name */}

                {/* brand description */}
                <div className="h-10 relative mt-2">
                  <input
                    className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                    type="text"
                    placeholder="Brand Description"
                    value={brand_description}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    required
                    autoFocus
                    autoComplete="brand"
                  />
                  <HiOutlinePencil
                    size={26}
                    color={"#6425FE"}
                    className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                    d
                  />
                </div>
                {/* brand description */}

                {/* brand logo */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center  mt-3  rounded-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        className="flex items-center justify-center object-cover w-[250px] h-[250px]"
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
                </div>
                <div className="flex justify-center items-center mt-2">
                  <button
                    onClick={() => handleImageChange()}
                    className="bg-[#6425FE] hover:bg-[#3b1694] text-white  font-poppins w-[200px] lg:w-[250px] h-[45px] rounded-md mr-1"
                  >
                    Upload New Image
                  </button>
                </div>
                {/* brand logo */}
              </div>
              <div className="w-full lg:w-1/2 p-4 lg:pl-8 border border-gray-300">
                <div className="mt-3 mb-5 font-bold text-2xl font-poppins">
                  Contact Person
                </div>
                <div className="h-10 relative mt-3">
                  <input
                    className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                    type="text"
                    placeholder="Contact Person Name"
                    value={contact_person_name}
                    onChange={(e) => setContactPersonName(e.target.value)}
                    required
                    autoFocus
                    autoComplete="brand"
                  />
                  <HiOutlinePencil
                    size={26}
                    color={"#6425FE"}
                    className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                    d
                  />
                </div>
                <div className="grid grid-cols-4 space-x-2">
                  <div className="col-span-2 ">
                    <div className="h-10 relative mt-3">
                      <input
                        className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                        type="text"
                        placeholder="Department"
                        value={department_contact}
                        onChange={(e) => setDepartmentContact(e.target.value)}
                        required
                        autoFocus
                        autoComplete="department"
                      />
                      <HiOutlinePencil
                        size={26}
                        color={"#6425FE"}
                        className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                        d
                      />
                    </div>
                  </div>
                  <div className="col-span-2 ">
                    <div className="h-10 relative mt-3">
                      <input
                        className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                        type="text"
                        placeholder="Position"
                        value={position_contact}
                        onChange={(e) => setPositionContact(e.target.value)}
                        required
                        autoFocus
                        autoComplete="position"
                      />
                      <HiOutlinePencil
                        size={26}
                        color={"#6425FE"}
                        className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                        d
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 space-x-2">
                  <div className="col-span-2 ">
                    <div className="h-10 relative mt-3">
                      <input
                        className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                        type="text"
                        placeholder="Email"
                        value={email_contact}
                        onChange={(e) => setEmailContact(e.target.value)}
                        required
                        autoFocus
                        autoComplete="email"
                      />
                      <HiOutlinePencil
                        size={26}
                        color={"#6425FE"}
                        className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                        d
                      />
                    </div>
                  </div>
                  <div className="col-span-2 ">
                    <div className="h-10 relative mt-3">
                      <input
                        className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                        type="text"
                        placeholder="Remark"
                        value={remark_contact}
                        onChange={(e) => setRemarkContact(e.target.value)}
                        required
                        autoFocus
                        autoComplete="remark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          {edit_brand.BrandID ? (
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => handleEditBrand()}
                className="bg-[#6425FE] text-white  font-poppins w-[200px] lg:w-[250px] h-[45px] rounded-md mr-1"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => handleSaveNewBrand()}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white  font-poppins w-[200px] lg:w-[250px] h-[45px] rounded-md mr-1"
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default New_Brand;
