import React from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_logs_grid";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";

const Media_Log = () => {
  useCheckPermission();

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Media log
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() =>
                  (window.location.href = "/setting/media_rule/create")
                }
                className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md"
              >
                Export
              </button>
            </div>
          </div>
        </div>
        <Filter />
      </div>

      <div className="m-1 md:m-5 p-2 md:p-5 bg-white rounded-3xl">
        <div className="w-auto  h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </div>
    </>
  );
};

export default Media_Log;
