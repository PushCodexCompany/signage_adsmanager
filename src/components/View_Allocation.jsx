import React from "react";
import { IoIosClose } from "react-icons/io";

const View_Allocation = ({
  setOpenViewAllocation,
  openViewAllocation,
  itemsPanel1,
  setItemsPanel1,
}) => {
  const handleCloseViewAllocation = () => {
    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        medias: [],
      },
    }));
    setOpenViewAllocation(!openViewAllocation);
  };

  console.log("itemsPanel1", itemsPanel1);
  return (
    <div
      className={`fixed -top-7 left-0 right-0 bottom-0 flex h-[1000px] items-center justify-center z-20`}
    >
      <div className="absolute right-12 top-12 lg:top-12 lg:right-[120px] m-4 z-30">
        <div className="bg-[#E8E8E8] border-3 border-black  rounded-full w-10 h-10 flex justify-center items-center">
          <button onClick={() => handleCloseViewAllocation()}>
            <IoIosClose size={25} color={"#6425FE"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default View_Allocation;
