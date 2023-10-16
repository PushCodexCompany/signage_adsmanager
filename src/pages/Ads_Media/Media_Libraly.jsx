import React from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_libraly_grid";

const Media_Libraly = () => {
  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />
      <div class="grid grid-cols-5 gap-4 mt-10">
        <div class="col-span-4">
          <div className="font-poppins font-semibold text-2xl">
            <text>Media Libraly</text>
          </div>
        </div>
        <div class="">
          <button className="bg-[#6425FE] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md">
            New Media
          </button>
        </div>
      </div>
      <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
        <GridTable />
      </div>
    </div>
  );
};

export default Media_Libraly;
