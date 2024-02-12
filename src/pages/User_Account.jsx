import React, { useState, useEffect } from "react";
import User from "../libs/admin";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { FaPlus } from "react-icons/fa";
import { Navbar } from "../components";
import New_Account from "../components/New_Account";
import { TbDots } from "react-icons/tb";
import Encryption from "../libs/encryption";
import Swal from "sweetalert2";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const mock_data = {
  1: {
    name: "TEST",
    lastname: "ONE",
    img: `https://ui-avatars.com/api/?name=${"Test"}+${"One"}&background=${getRandomColor()}&color=fff`,
    des: "A1 Description",
  },
  2: {
    name: "TEST",
    lastname: "TWO",
    img: `https://ui-avatars.com/api/?name=${"Test"}+${"Two"}&background=${getRandomColor()}&color=fff`,
    des: "A2 Description",
  },
  3: {
    name: "TEST",
    lastname: "THREE",
    img: `https://ui-avatars.com/api/?name=${"Test"}+${"Three"}&background=${getRandomColor()}&color=fff`,
    des: "A3 Description",
  },
};

const User_Account = () => {
  const { user } = User.getCookieData();
  const navigate = useNavigate();
  const select_campaign = User.getCampaign();
  const select_account = User.getAccount();

  const [account, setAccount] = useState([]);
  const [showModalAddNewAccount, setShowModalAddNewAccount] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});

  const [edit_account, setEditAccount] = useState([]);

  useEffect(() => {
    const user = User.getCookieData();

    if (!user) {
      cookie.remove("signage-brand");
      cookie.remove("signage-account");
      window.location.href = "/adsmanager";
    }

    if (select_account) {
      navigate("/brand");
    }

    if (select_campaign) {
      navigate("/dashboard");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    const { token } = User.getCookieData();

    try {
      const data = await User.getUserAccount(token);
      setAccount(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const selectAccount = (account_id) => {
    const status = User.saveSelectedAccount(account_id);
    if (status) {
      navigate("/brand");
    } else {
      console.log("error select account");
    }
  };

  const toggleDropdown = (accountId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [accountId]: !prevStates[accountId],
    }));
  };

  const handleNewAccount = () => {
    setEditAccount([]);
    setShowModalAddNewAccount(!showModalAddNewAccount);
  };

  const handleDeleteAccount = async (acc_id) => {
    try {
      Swal.fire({
        title: "คุณแน่ใจแล้วหรือไม่?",
        text: "คุณต้องการลบข้อมูล User Account!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const obj = {
            accountid: acc_id,
          };
          const { token } = User.getCookieData();
          const encrypted = await Encryption.encryption(
            obj,
            "delete_account",
            false
          );
          const data = await User.deleteUserAccount(encrypted, token);
          if (data.code !== 404) {
            Swal.fire({
              title: "ลบ User Account สำเร็จ!",
              text: `ลบ User Account สำเร็จ!`,
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
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <div className="text-6xl font-[700] text-center font-poppins">
          Select Your Account
        </div>
        <div className="text-xl text-center text-slate-500 mb-20 font-poppins font-[500]">
          Choose your account from the list to access account
        </div>

        <div className="flex flex-wrap justify-center items-center lg:space-x-[-100px]">
          <div className="sm:w-1/2 lg:w-[27%] h-[400px] p-2 flex flex-col items-center">
            <button onClick={() => handleNewAccount()}>
              <div className="h-60 flex items-center justify-center">
                <FaPlus size={100} color="#6425FE" />
              </div>
              <div className="font-bold text-[20px] m-auto w-[70%] text-center mt-[10px] font-poppins hover:text-[#6425FE]">
                Add New Account
              </div>
            </button>
          </div>
          {account.length > 0 &&
            account.map((items, key) => (
              <div
                key={items.AccountID}
                className="sm:w-1/2 lg:w-[33%] h-[400px] p-2 flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <img
                    className="block ml-auto mr-auto mt-30px w-[250px] h-[250px] rounded-3xl cursor-pointer"
                    src={
                      items.AccountLogo
                        ? items.AccountLogo
                        : `https://ui-avatars.com/api/?name=${
                            items.AccountName
                          }&background=${"000000"}&color=fff`
                    }
                    alt={items.AccountName}
                    onClick={() => selectAccount(items)}
                  />
                  <div
                    onClick={() => toggleDropdown(items.AccountID)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    {/* Assuming TbDots is an SVG component */}
                    <TbDots
                      size={26}
                      className="text-white hover:text-[#6425FE]"
                    />
                  </div>
                  {dropdownStates[items.AccountID] && (
                    <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-md py-2 px-4">
                      <button
                        onClick={() => {
                          toggleDropdown(items.AccountID);
                          setEditAccount(items);
                          setShowModalAddNewAccount(true);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteAccount(items.AccountID);
                          toggleDropdown(items.AccountID);
                        }}
                        className="block w-full text-left font-poppins hover:text-[#6425FE] py-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => selectAccount(items)}
                  className=" w-full"
                >
                  <div className="font-bold text-[20px] mt-[10px] font-poppins hover:text-[#6425FE]">
                    {items.AccountName}
                  </div>
                  <div className="text-[14px] text-slate-500 font-poppins">
                    {items.AccountCode}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>

      {showModalAddNewAccount && (
        <a
          onClick={() => setShowModalAddNewAccount(!showModalAddNewAccount)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {showModalAddNewAccount && (
        <New_Account
          setShowModalAddNewAccount={setShowModalAddNewAccount}
          edit_account={edit_account}
        />
      )}
    </>
  );
};

export default User_Account;
