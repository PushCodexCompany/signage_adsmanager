import topImg from "../assets/img/merchandise/tops.png";
import matsumotoImg from "../assets/img/merchandise/Matsumoto_KiYoshi.png";
import supersportImg from "../assets/img/merchandise/Super_Sports.png";
import powerbuyImg from "../assets/img/merchandise/Power_Buy.png";

import { RiDeleteBin5Line } from "react-icons/ri";

const gridHeaderTemplate = (props) => {
  return (
    <div>
      <span className="text-lg">{props.headerText}</span>
    </div>
  );
};

const gridIDTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold ml-1">{props.id}</span>
    </div>
  );
};

const gridUserNameTemplate = (props) => {
  return (
    <div>
      <span className="text-lg font-bold">{props.username_email[0]}</span>{" "}
      <br />
      <span className="text-xs ">{props.username_email[1]}</span>
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
      {props.merchendise.map((items) => (
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
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
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
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#6425FE] font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
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

export const mechendiseData = [
  {
    id: 1,
    username_email: ["User0123", "useradmin@mail.com"],
    merchendise: [1, 2, 3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 2,
    username_email: ["Admin01", "teerachai_14@mail.com"],
    merchendise: [3, 4],
    status: 1,
    role: 0,
  },
  {
    id: 3,
    username_email: ["CDS_Admin", "cdspro_a@mail.com"],
    merchendise: [4],
    status: 1,
    role: 0,
  },
  {
    id: 4,
    username_email: ["CDS_Sale01", "cds_sale41@mail.com"],
    merchendise: [2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
  {
    id: 5,
    username_email: ["Marketing_22", "cds_marketing_cc@mail.com"],
    merchendise: [1, 2],
    status: 1,
    role: 0,
  },
];

export const merchendiseGrid = [
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
    headerText: "Merchendise",
    field: "merchendise",
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
