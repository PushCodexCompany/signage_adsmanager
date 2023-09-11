import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { MdOutlineModeEditOutline } from "react-icons/md";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";

const Edit_Merchandises = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [merchandise_data, setMerchendiseData] = useState([]);

  useEffect(() => {
    fetchMerchandise(id);
  }, [id]);

  const fetchMerchandise = (merchandise_id) => {
    //fetch

    const mock_merchandise = {
      name: "Super Sports",
      brand: "CDS",
      full_brand: "Central Department Store",
      img: supersport_img,
    };

    setMerchendiseData(mock_merchandise);
  };

  const handleButtonClick = () => {
    // Trigger the hidden input element
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Do something with the uploaded file, e.g., send it to a server or process it.
    console.log("Uploaded file:", file);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Setting" />
      <div className="mt-10 mb-5 font-bold text-2xl">
        <text>Create Screen</text>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 p-4">
          <div class="relative">
            <div class="flex items-center">
              <input
                placeholder="CDS"
                class="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold"
                defaultValue={merchandise_data.brand}
              />
              <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
            </div>
          </div>
          <div class="relative mt-4">
            <div class="flex items-center">
              <input
                placeholder="CDS"
                class="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold"
                defaultValue={merchandise_data.full_brand}
              />
              <MdOutlineModeEditOutline className="absolute right-2 w-10 text-[#6425FE]" />
            </div>
          </div>
          <div class="relative mt-28 flex items-center justify-center">
            <img src={supersport_img} className="w-1/2 rounded-xl" />
          </div>
          <div class="mt-4 flex items-center justify-center">
            <button
              onClick={() => handleButtonClick()}
              className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg"
            >
              Upload Image
            </button>
            <input
              type="file"
              accept=".png, .jpg" // Specify allowed file types if necessary
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div class="w-full lg:w-1/2 p-4 lg:pl-8">
          <div class="mt-3 mb-5 font-bold text-2xl">
            <text>Contact Person</text>
          </div>
          <div class="flex items-center">
            <input
              placeholder="Full Name"
              class="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Department"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Position"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Email"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Remark"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex items-center mt-10">
            <input
              placeholder="Full Name"
              class="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Department"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Position"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Email"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Remark"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div class="mt-10 mb-5 font-bold text-2xl">
            <text>Billing Address</text>
          </div>
          <div class="flex items-center">
            <input
              placeholder="Contract Name"
              class="border border-gray-300 rounded-lg p-3 pr-10 w-full font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Phone Number"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Street Address, P.O. Box, Etc"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex items-center mt-3">
            <div class="w-1/2 pr-2">
              <input
                placeholder="Country"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="w-1/2 pl-2">
              <input
                placeholder="Zip, Postal Code"
                class="border border-gray-300 rounded-lg p-3 w-full text-gray-700 font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => alert("Save")}
              className="bg-[#6425FE] text-white font-bold w-[300px] h-[45px] rounded-lg mt-10"
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
