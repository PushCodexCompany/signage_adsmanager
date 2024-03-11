import React, { useState } from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/activities_log_grid";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";

const Activity_Log = () => {
  useCheckPermission();
  const ListComponent = () => {
    return (
      <>
        <div className="w-auto  h-[600px] border border-[#DBDBDB] rounded-lg">
          <GridTable />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Activities log
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end space-x-1">
              <button
                onClick={() => alert("export")}
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
        <ListComponent />
      </div>
    </>
  );
};

export default Activity_Log;
