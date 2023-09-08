import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components";
import { MdModeEditOutline } from "react-icons/md";
import supersport_img from "../assets/img/merchandise/Super_Sports.png";

const Edit_Merchandises = () => {
  const { id } = useParams();

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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Setting" />
      <div className="mt-10 mb-5 font-bold text-2xl">
        <text>Create Screen</text>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-rows-6 grid-flow-col gap-4">
          <div>
            <input
              placeholder="CDS"
              className="border border-gray-400 rounded-lg p-4 w-2/3"
              value={merchandise_data.brand}
            />
          </div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div className="grid grid-rows-6 grid-flow-col gap-4">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
      </div>

      {/* <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
        <div class="w-4/5 flex justify-end items-center relative">
          <input
            placeholder="CDS"
            class="border border-gray-400 rounded-lg p-4 w-full"
          />
          <MdModeEditOutline className="absolute mr-2 w-10" />
        </div>

        <div>02</div>
      </div> */}
    </div>
  );
};

export default Edit_Merchandises;
