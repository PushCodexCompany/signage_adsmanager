import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const gridHeaderTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-poppins text-[#59606C]">
        {props.headerText}
      </span>
    </div>
  );
};

const gridIDTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold ml-1 font-poppins">{props.id}</span>
    </div>
  );
};

const gridUserNameTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold font-poppins">
        {props.username_email[0]}
      </span>{" "}
      <br />
      <span className="text-xs font-poppins">{props.username_email[1]}</span>
    </div>
  );
};

const gridMerchandiseTemplate = (props) => {
  const getImg = (id) => {
    let img;
    if (id === 1) {
      img = topImg;
    } else if (id === 2) {
      img = matsumotoImg;
    } else if (id === 3) {
      img = supersportImg;
    } else if (id === 4) {
      img = powerbuyImg;
    }

    return img;
  };

  return (
    <div className="flex space-x-1 ">
      {props.merchandise.map((items) => (
        <img className="w-[80px] h-[80px] rounded-md" src={getImg(items)} />
      ))}
    </div>
  );
};

const gridStatusTemplate = (props) => {
  return (
    <div class="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
      <select
        name="status"
        id="status"
        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
        defaultValue={props.status}
      >
        <option value="1">Active</option>
        <option value="0">Deactive</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
        <IoIosArrowDown size="18" color="#6425FE" />
      </div>
    </div>
  );
};

const gridRoleTemplate = (props) => {
  return (
    <div class="relative w-full lg:w-[100px] h-[40px] flex items-center justify-center font-bold text-sm lg:text-base ml-3">
      <select
        name="status"
        id="status"
        class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
        defaultValue={props.role}
      >
        <option value="0">Admin</option>
        <option value="1">User</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
        <IoIosArrowDown size="18" color="#6425FE" />
      </div>
    </div>
  );
};

const gridActionTemplate = (props) => {
  const onClickAction = (id) => {
    alert("click:", id);
  };

  return (
    <button onClick={() => onClickAction(props.id)}>
      <RiDeleteBin5Line size={20} className="text-[#6425FE]" />
    </button>
  );
};

// Booking

const gridBookingUserNameTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold font-poppins text-[#6425FE]">
        {props.username_email[0]}
      </span>{" "}
      <br />
      <span className="text-xs font-poppins text-[#59606C]">
        {props.username_email[1]}
      </span>
    </div>
  );
};

const gridContentTemplate = (props) => {
  const get_content_type = (id) => {
    let type;
    if (id === 1) {
      type = "STW Promotion";
    } else if (id === 2) {
      type = "Brand";
    } else if (id === 3) {
      type = "Credit Card";
    } else if (id === 4) {
      type = "Category";
    }

    return type;
  };
  return (
    <div>
      <span className="text-lg font-bold font-poppins">
        {get_content_type(props.content_type)}
      </span>
    </div>
  );
};

const gridBookingMerchandiseTemplate = (props) => {
  const getImg = (id) => {
    let img;
    if (id === 1) {
      img = topImg;
    } else if (id === 2) {
      img = matsumotoImg;
    } else if (id === 3) {
      img = supersportImg;
    } else if (id === 4) {
      img = powerbuyImg;
    }

    return img;
  };

  return (
    <div className="flex justify-center items-center ">
      <img
        className="w-[80px] h-[80px] rounded-md"
        src={getImg(props.merchandise)}
      />
    </div>
  );
};

const gridScreenTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold font-poppins">{props.screen}</span>
    </div>
  );
};

const gridSlotTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold font-poppins">{props.slot}</span>
    </div>
  );
};

const gridBookingTemplate = (props) => {
  const getBooking = (id) => {
    let booking;

    if (id === 1) {
      booking = ["Pending Review", true];
    } else if (id === 2) {
      booking = ["Need Revise", false];
    } else if (id === 3) {
      booking = ["Rejected", false];
    } else if (id === 4) {
      booking = ["Approved", true];
    }

    return booking;
  };

  return (
    <div>
      <span
        className={`text-lg font-bold font-poppins ${
          getBooking(props.booking)[1] ? "text-[#0CA71B]" : "text-[#FF0000]"
        }`}
      >
        {getBooking(props.booking)[0]}
      </span>
    </div>
  );
};

const gridContentBookingTemplate = (props) => {
  const getContentType = (id) => {
    let content;

    if (id === 1) {
      content = ["LOCKED", false];
    } else if (id === 2) {
      content = ["Need Revise", true];
    }

    return content;
  };

  return (
    <div>
      <span
        className={`text-lg font-bold font-poppins ${
          getContentType(props.content)[1] ? "text-[#0CA71B]" : "text-[#B9B7BD]"
        }`}
      >
        {getContentType(props.content)[0]}
      </span>
    </div>
  );
};

const gridBookingActionTemplate = (props) => {
  const onClickAction = (id) => {
    alert("click:", id);
  };

  return (
    <button onClick={() => onClickAction(props.id)}>
      <MdOutlineModeEditOutline size={20} className="text-[#6425FE]" />
    </button>
  );
};

// event

const gridEventNameTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold font-poppins">{props.event_name}</span>
    </div>
  );
};

const gridEventDescriptionTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-poppins">{props.des}</span>
    </div>
  );
};

const gridEventActionTemplate = (props) => {
  const onClickAction = (id) => {
    alert("click:", id);
  };

  return (
    <div className="space-x-2">
      <button onClick={() => onClickAction(props.id)}>
        <MdOutlineModeEditOutline size={30} className="text-[#6425FE]" />
      </button>
      <button onClick={() => onClickAction(props.id)}>
        <RiDeleteBin5Line size={30} className="text-[#6425FE]" />
      </button>
    </div>
  );
};

export const mechendiseData = [
  {
    id: 1,
    username_email: ["User0123", "useradmin@mail.com"],
    merchandise: [1, 2, 3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 2,
    username_email: ["Admin01", "teerachai_14@mail.com"],
    merchandise: [3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 3,
    username_email: ["CDS_Admin", "cdspro_a@mail.com"],
    merchandise: [4],
    status: 1,
    role: 0,
  },
  {
    id: 4,
    username_email: ["CDS_Sale01", "cds_sale41@mail.com"],
    merchandise: [2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchandise: [1, 2],
    status: 1,
    role: 0,
  },
];

export const merchandiseGrid = [
  {
    headerText: "ID",
    field: "id",
    width: "70",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridIDTemplate,
  },
  {
    headerText: "Username",
    field: "username_email",
    width: "150",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridUserNameTemplate,
  },
  {
    headerText: "merchandise",
    field: "merchandise",
    width: "400",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMerchandiseTemplate,
  },
  {
    headerText: "Status",
    field: "status",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridStatusTemplate,
  },
  {
    headerText: "Role",
    field: "role",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridRoleTemplate,
  },
  {
    headerText: "Action",
    field: "id",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridActionTemplate,
  },
];

export const bookingData = [
  {
    id: 1,
    username_email: ["Booking Name 1", "CDS-BT-230101-004"],
    content_type: 1,
    merchandise: 1,
    screen: 7,
    slot: 10,
    booking: 1,
    content: 1,
  },
  {
    id: 2,
    username_email: ["Booking Name 2", "CDS-BT-230101-002"],
    content_type: 2,
    merchandise: 3,
    screen: 4,
    slot: 5,
    booking: 2,
    content: 1,
  },
  {
    id: 3,
    username_email: ["Booking Name 3", "CDS-BT-230101-003"],
    content_type: 3,
    merchandise: 4,
    screen: 6,
    slot: 5,
    booking: 3,
    content: 1,
  },
  {
    id: 4,
    username_email: ["Booking Name 4", "CDS-BT-230101-004"],
    content_type: 4,
    merchandise: 2,
    screen: 7,
    slot: 10,
    booking: 4,
    content: 2,
  },
  {
    id: 5,
    username_email: ["Booking Name 5", "CDS-BT-230101-005"],
    content_type: 2,
    merchandise: 1,
    screen: 12,
    slot: 10,
    booking: 4,
    content: 2,
  },
];

export const bookingGrid = [
  {
    headerText: "ID",
    field: "id",
    width: "50",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridIDTemplate,
  },
  {
    headerText: "Username",
    field: "username_email",
    width: "150",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridBookingUserNameTemplate,
  },
  {
    headerText: "Content Type",
    field: "content_type",
    width: "150",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridContentTemplate,
  },
  {
    headerText: "Merchandise",
    field: "merchandise",
    width: "150",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridBookingMerchandiseTemplate,
  },
  {
    headerText: "Screen",
    field: "screen",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridScreenTemplate,
  },
  {
    headerText: "Slot",
    field: "slot",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridSlotTemplate,
  },
  {
    headerText: "Booking",
    field: "booking",
    width: "150",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridBookingTemplate,
  },
  {
    headerText: "Content",
    field: "content",
    width: "150",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridContentBookingTemplate,
  },
  {
    headerText: "Action",
    field: "id",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridBookingActionTemplate,
  },
];

export const eventData = [
  {
    id: 1,
    event_name: "Event 1",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 2,
    event_name: "Event 2",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 3,
    event_name: "Event 3",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 4,
    event_name: "Event 4",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 5,
    event_name: "Event 5",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 6,
    event_name: "Event 6",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 7,
    event_name: "Event 7",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 8,
    event_name: "Event 8",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 9,
    event_name: "Event 9",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 10,
    event_name: "Event 10",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 11,
    event_name: "Event 11",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 12,
    event_name: "Event 12",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 13,
    event_name: "Event 13",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 14,
    event_name: "Event 14",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 15,
    event_name: "Event 15",
    des: "The event typically includes runway shows, exhibitions ",
  },
  {
    id: 16,
    event_name: "Event 16",
    des: "The event typically includes runway shows, exhibitions ",
  },
];

export const eventGrid = [
  {
    headerText: "Event Name",
    field: "event_name",
    width: "100",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridEventNameTemplate,
  },
  {
    headerText: "Description",
    field: "des",
    width: "400",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridEventDescriptionTemplate,
  },
  {
    headerText: "Action",
    field: "id",
    width: "100",
    textAlign: "Center",
    headerTemplate: gridHeaderTemplate,
    template: gridEventActionTemplate,
  },
];
