import React from "react";

const Setting = () => {
  const onEdit = (merchandise_id) => {
    window.location.href = `/edit_merchandise/${merchandise_id}`;
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      {/* <Header category="Page" title="Setting" />
      <div className="mt-10 font-bold text-2xl">
        Create Screen
      </div> */}
      <div className="grid grid-rows-4 grid-flow-col gap-4 mt-10">
        <button
          onClick={() => onEdit(1)}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px] "
        >
          TEST EDIT 1
        </button>
        <button
          onClick={() => onEdit(2)}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px]"
        >
          TEST EDIT 2
        </button>
        <button
          onClick={() => onEdit(3)}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px]"
        >
          TEST EDIT 3
        </button>
      </div>
    </div>
  );
};

export default Setting;
