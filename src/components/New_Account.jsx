import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { HiOutlinePencil } from "react-icons/hi2";
import Empty_Img from "../assets/img/empty_img.png";
import User from "../libs/admin";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const New_Account = ({ setShowModalAddNewAccount, edit_account }) => {
  const [account_name, setAccountName] = useState(null);
  const [account_img, setAccountImg] = useState(null);
  const [preview_img, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (edit_account.AccountID) {
      setAccountName(edit_account.AccountName);
      setAccountImg(
        edit_account.AccountLogo ||
          `https://ui-avatars.com/api/?name=${
            edit_account.AccountName
          }&background=${"000000"}&color=fff`
      );
      setPreviewImg(
        edit_account.AccountLogo ||
          `https://ui-avatars.com/api/?name=${
            edit_account.AccountName
          }&background=${"000000"}&color=fff`
      );
    }
  }, []);

  const handleImageChange = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAccountImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImg = async () => {
    if (account_name) {
      const img = `https://ui-avatars.com/api/?name=${account_name}&background=0496c7&color=fff&size=400`;
      try {
        const response = await fetch(img);
        const blob = await response.blob();
        const file = new File([blob], `${account_name}_${+new Date()}.jpg`, {
          type: "image/jpeg",
        });

        const formData = new FormData();
        formData.append("file", file);

        const img_preview = URL.createObjectURL(blob);
        setAccountImg(file);
        setPreviewImg(img_preview);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  const handleSaveNewAccount = async () => {
    try {
      const obj = {
        accountname: account_name,
        // logo: formData,
      };

      const { token } = User.getCookieData();
      const encrypted = await Encryption.encryption(
        obj,
        "create_account",
        false
      );

      try {
        const data = await User.createUserAccount(encrypted, token);
        if (data.code === 200) {
          const form = new FormData();
          form.append("target", "accountlogo");
          form.append("accountid", data.accountid);
          form.append("logo", account_img);

          const data_img = await User.saveImgUserAccount(form, token);

          if (data_img.code === 200) {
            Swal.fire({
              icon: "success",
              title: "สร้าง User Account สำเร็จ!",
              text: `สร้าง User Account สำเร็จ!`,
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
    } catch (error) {
      console.error("Error save account:", error);
    }
  };

  const handleEditAccount = async () => {
    try {
      const obj = {
        accountid: edit_account.AccountID,
        accountname: account_name,
      };

      const { token } = User.getCookieData();
      const encrypted = await Encryption.encryption(obj, "edit_account", false);

      if (edit_account.AccountName === account_name) {
        // เปลี่ยนรูปอย่างเดียว
        const form = new FormData();
        form.append("target", "accountlogo");
        form.append("accountid", edit_account.AccountID);
        form.append("logo", account_img);
        const data_img = await User.saveImgUserAccount(form, token);
        if (data_img.code === 200) {
          Swal.fire({
            icon: "success",
            title: "แก้ไข User Account สำเร็จ!",
            text: `แก้ไข User Account สำเร็จ!`,
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
        const data = await User.editUserAccount(encrypted, token);

        if (data.code === 200) {
          if (edit_account.AccountLogo !== account_img) {
            const form = new FormData();
            form.append("target", "accountlogo");
            form.append("accountid", edit_account.AccountID);
            form.append("logo", account_img);
            const data_img = await User.saveImgUserAccount(form, token);
            if (data_img.code === 200) {
              Swal.fire({
                icon: "success",
                title: "แก้ไข User Account สำเร็จ!",
                text: `แก้ไข User Account สำเร็จ!`,
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
              icon: "success",
              title: "แก้ไข User Account สำเร็จ!",
              text: `แก้ไข User Account สำเร็จ!`,
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
    } catch (error) {
      console.error("Error save account:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 h-[900px] lg:h-[950px] lg:w-[2000px] overflow-x-auto">
        {/* First div (circle) */}
        <div className="sticky top-0 right-0 z-30 flex justify-end">
          <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
            <button onClick={() => setShowModalAddNewAccount(false)}>
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>
        {/* Second div (gray background) */}
        <div className="bg-[#FFFFFF] w-4/5 lg:w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto relative">
          <div className="flex justify-center items-center mt-8">
            <div className="font-poppins text-5xl font-bold">
              {edit_account.AccountID ? "Edit Account" : "Create Account"}
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
              Let's Get To Know Your Acoount
            </div>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-8">
              <div className="col-span-8">
                <div className="text-2xl font-poppins font-bold text-[#2F3847]">
                  Account Information
                </div>
              </div>
            </div>
            <div className="grid grid-cols-8 mt-4 space-x-4">
              <div className="col-span-8 space-y-4">
                <div className="h-10 relative">
                  {edit_account.AccountID ? (
                    <input
                      className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                      type="text"
                      placeholder="Account Name"
                      value={account_name}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                      // autoComplete="account"
                    />
                  ) : (
                    <input
                      className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                      type="text"
                      placeholder="Account Name"
                      value={account_name}
                      onChange={(e) => setAccountName(e.target.value)}
                      onBlur={() => generateImg()}
                      required
                      // autoComplete="account"
                    />
                  )}

                  <HiOutlinePencil
                    size={26}
                    color={"#6425FE"}
                    className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center  mt-3  rounded-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    {preview_img ? (
                      <img
                        src={preview_img}
                        className="flex w-56 h-56 items-center justify-center rounded-lg"
                      />
                    ) : (
                      <div className=" flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                        <img
                          src={Empty_Img}
                          className="flex items-center justify-center"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {edit_account.AccountID ? (
                  <>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleImageChange()}
                        className="bg-[#6425FE] hover:bg-[#3b1694] text-white  font-poppins w-[200px] lg:w-[250px] lg:h-[45px] rounded-md mr-1"
                      >
                        Upload New Image
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className="col-span-5 border border-[#DBDBDB] rounded-lg">
                <div className="p-4">
                  <div className="font-poppins text-2xl text-[#2F3847] font-semibold">
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
                  <div className="h-10 relative mt-10">
                    <input
                      className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                      type="text"
                      placeholder="Full Name"
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      autoFocus
                      autoComplete="fullname"
                    />
                  </div>
                  <div className="grid grid-cols-4 space-x-2">
                    <div className="col-span-2 ">
                      <div className="h-10 relative mt-3">
                        <input
                          className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                          type="text"
                          placeholder="Department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                          autoFocus
                          autoComplete="department"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="h-10 relative mt-3">
                        <input
                          className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                          type="text"
                          placeholder="Position"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          required
                          autoFocus
                          autoComplete="position"
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoFocus
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="h-10 relative mt-3">
                        <input
                          className={`w-full h-full pl-2 pr-10 border-2 rounded-md outline-none font-poppins`}
                          type="text"
                          placeholder="Remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          required
                          autoFocus
                          autoComplete="remark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {edit_account.AccountID ? (
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={() => handleEditAccount()}
                className="bg-[#6425FE] hover:bg-[#3b1694] text-white  font-poppins w-[200px] lg:w-[250px] h-[45px] rounded-md mr-1"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10">
              <button
                onClick={() => handleSaveNewAccount()}
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

export default New_Account;
