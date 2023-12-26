import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { MdOutlineModeEditOutline } from "react-icons/md";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";
import evisu_img from "../assets/img/merchandise/Evisu.png";
import kfc_img from "../assets/img/merchandise/kfc.png";
import Empty_Img from "../assets/img/empty_img.png";

const Edit_Merchandises = () => {
  const { id } = useParams();

  const fileInputRef = useRef(null);

  const [merchandise_data, setmerchandiseData] = useState([]);
  const [preview_img, setPreviewImg] = useState(null);

  useEffect(() => {
    if (id !== "new") {
      fetchMerchandise(id);
    }
  }, [id]);

  const fetchMerchandise = (merchandise_id) => {
    //fetch

    let mock_merchandise;

    if (merchandise_id === "1") {
      mock_merchandise = {
        name: "Super Sports",
        brand: "CDS",
        full_brand: "Central Department Store",
        img: supersport_img,
      };
    } else if (merchandise_id === "2") {
      mock_merchandise = {
        name: "Evisu",
        brand: "EVS",
        full_brand: "Evisu Store",
        img: evisu_img,
      };
    } else if (merchandise_id === "3") {
      mock_merchandise = {
        name: "KFC",
        brand: "KFC",
        full_brand: "Kentucky Fried Chicken",
        img: kfc_img,
      };
    }

    setmerchandiseData(mock_merchandise);
  };

  const handleButtonClick = () => {
    // Trigger the hidden input element
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Setting" />
      <div className="mt-10 mb-5 font-bold text-2xl font-poppins">
        <text>{id === "new" ? "Create Merchandise" : "Edit Merchandise"}</text>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <div className="relative">
            <div className="flex items-center">
              <input
                placeholder="Insert Merchandise Name"
                className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold font-poppins"
                defaultValue={merchandise_data.brand}
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
                >
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
                    placeholder="2"
                    value="2"
                    disabled
                    className="border disabled:bg-[#DBDBDB] border-gray-300 rounded-lg p-3 w-full font-bold font-poppins text-center"
                  />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="font-poppins">/</div>
                </div>
                <div className="col-span-1">
                  <input
                    placeholder="50"
                    value="50"
                    className="border rounded-lg p-3 border-gray-300 w-full font-bold font-poppins text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-20 flex items-center justify-center">
            {preview_img ? (
              <img src={preview_img} className="w-1/2 rounded-xl" />
            ) : (
              <div className="flex items-center justify-center border border-[#A9A9A9] mt-3 w-[250px] h-[250px] rounded-lg">
                <img
                  src={Empty_Img}
                  className="flex items-center justify-center"
                />
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => handleButtonClick()}
              className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg font-poppins"
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
            <text>Contact Person</text>
          </div>
          <div className="flex items-center">
            <input
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Department"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Position"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Phone"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div>
          <div className="mt-10 mb-5 font-bold font-poppins text-2xl">
            <text>Billing</text>
          </div>
          <div className="flex items-center">
            <input
              placeholder="Contract Name"
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Contact Number"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <input
              placeholder="Street Address"
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <input
              placeholder="Address Line 2"
              className="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500 font-poppins"
            />
          </div>
          <div className="flex items-center mt-3">
            <div className="w-1/2 pr-2">
              <input
                placeholder="Country"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
            <div className="w-1/2 pl-2">
              <input
                placeholder="Zip, Postal Code"
                className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 font-poppins"
              />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <div className="font-poppins">
              Please provide details as they will be used in generating
              quotations for your campaigns
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => alert("Save")}
              className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10 font-poppins"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Merchandises;
