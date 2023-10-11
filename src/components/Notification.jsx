import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const Notification = () => {
  const { currentColor } = useStateContext();

  const chatData = [
    {
      message: "Booking Name 1",
      desc: "Awaiting admin ...",
      time: "5 min ago",
    },
    {
      message: "Booking Name 2",
      desc: "Awaiting admin ...",
      time: "12 min ago",
    },
    {
      message: "Booking Name 3",
      desc: "Awaiting admin ...",
      time: "1 day ago",
    },
    {
      message: "Booking Name 4",
      desc: "Awaiting admin ...",
      time: "1 day ago",
    },
  ];

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-xs dark:text-gray-400">
                {item.time}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          {/* <button
            onClick={() => (window.location.href = "/inbox")}
            color="white"
            bgColor={currentColor}
            text="test"
            borderRadius="10px"
            width="full"
          /> */}
          <button
            onClick={() => (window.location.href = "/inbox")}
            className="bg-[#4ba8ff] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
          >
            See All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
