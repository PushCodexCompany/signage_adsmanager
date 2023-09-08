import React from "react";
import { Header } from "../components";

const Setting = () => {
  const onEdit = () => {};

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Setting" />

      <div className="grid grid-rows-4 grid-flow-col gap-4 mt-10">
        <button
          onClick={() => onEdit()}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px] "
        >
          TEST EDIT 1
        </button>
        <button
          onClick={() => onEdit()}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px]"
        >
          TEST EDIT 2
        </button>
        <button
          onClick={() => onEdit()}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px]"
        >
          TEST EDIT 3
        </button>
      </div>
    </div>
  );
};

export default Setting;
