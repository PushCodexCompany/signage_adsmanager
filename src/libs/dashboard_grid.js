import central_logo from "../assets/img/central.png";
import robinson_logo from "../assets/img/robinson.png";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const gridHeaderTemplate = (props) => {
  return (
    <div>
      <div className="text-sm font-poppins text-[#59606C]">
        {props.headerText}
      </div>
    </div>
  );
};

const gridIDTemplate = (props) => {
  return (
    <div>
      <div className="text-sm font-bold font-poppins">{props.id}</div>
    </div>
  );
};

const gridStoreTemplate = (props) => {
  const getImg = (id) => {
    let img;
    if (id === 1) {
      img = central_logo;
    } else if (id === 2) {
      img = robinson_logo;
    }

    return img;
  };

  return (
    <div className="flex">
      <img className="w-[40px] h-[40px] rounded-md" src={getImg(props.store)} />
    </div>
  );
};

const gridMonthJanTemplate = (props) => {
  return <GenerateMonth month={props.jan} />;
};

const gridMonthFebTemplate = (props) => {
  return <GenerateMonth month={props.feb} />;
};

const gridMonthMarTemplate = (props) => {
  return <GenerateMonth month={props.mar} />;
};

const gridMonthAprTemplate = (props) => {
  return <GenerateMonth month={props.apr} />;
};

const gridMonthMayTemplate = (props) => {
  return <GenerateMonth month={props.may} />;
};

const gridMonthJunTemplate = (props) => {
  return <GenerateMonth month={props.jun} />;
};

const gridMonthJulTemplate = (props) => {
  return <GenerateMonth month={props.jul} />;
};

const gridMonthAugTemplate = (props) => {
  return <GenerateMonth month={props.aug} />;
};

const gridMonthSepTemplate = (props) => {
  return <GenerateMonth month={props.sep} />;
};

const gridMonthOctTemplate = (props) => {
  return <GenerateMonth month={props.oct} />;
};

const gridMonthNovTemplate = (props) => {
  return <GenerateMonth month={props.nov} />;
};

const gridMonthDecTemplate = (props) => {
  return <GenerateMonth month={props.dec} />;
};

const GenerateMonth = (data) => {
  return (
    <div>
      <div className="flex ">
        <div className="text-sm font-bold font-poppins">{data.month.value}</div>
        <div className="flex items-end ">
          {data.month.is_up ? (
            <div className="flex text-[#008A1E] font-bold text-[10px]">
              <ImArrowUp size={10} className="relative top-[5px]" />
              <div className="relative top-[1px]">{data.month.percent}%</div>
            </div>
          ) : (
            <div className="flex text-red-500 font-bold text-[10px]">
              <ImArrowDown size={10} className="relative top-[6px]" />
              <div className="relative top-[2px]">{data.month.percent}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const dashboardData = [
  {
    id: 1,
    store: 1,
    jan: {
      value: 22,
      is_up: false,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 2,
    store: 2,
    jan: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 41,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 11,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 19,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 10,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 3,
    store: 2,
    jan: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 4,
    store: 1,
    jan: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 41,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 11,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 19,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 10,
      is_up: true,
      percent: 10,
    },
  },
  {
    id: 5,
    store: 1,
    jan: {
      value: 22,
      is_up: true,
      percent: 10,
    },
    feb: {
      value: 15,
      is_up: true,
      percent: 10,
    },
    mar: {
      value: 18,
      is_up: true,
      percent: 10,
    },
    apr: {
      value: 25,
      is_up: true,
      percent: 10,
    },
    may: {
      value: 32,
      is_up: true,
      percent: 10,
    },
    jun: {
      value: 20,
      is_up: true,
      percent: 10,
    },
    jul: {
      value: 34,
      is_up: true,
      percent: 10,
    },
    aug: {
      value: 36,
      is_up: true,
      percent: 10,
    },
    sep: {
      value: 14,
      is_up: true,
      percent: 10,
    },
    oct: {
      value: 52,
      is_up: true,
      percent: 10,
    },
    nov: {
      value: 55,
      is_up: true,
      percent: 10,
    },
    dec: {
      value: 71,
      is_up: true,
      percent: 10,
    },
  },
];

export const dashboardGrid = [
  {
    headerText: "ID",
    field: "id",
    width: "60",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridIDTemplate,
  },
  {
    headerText: "Store",
    field: "store",
    width: "120",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridStoreTemplate,
  },
  {
    headerText: "Jan",
    field: "jan",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthJanTemplate,
  },
  {
    headerText: "Feb",
    field: "feb",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthFebTemplate,
  },
  {
    headerText: "Mar",
    field: "mar",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthMarTemplate,
  },
  {
    headerText: "Apr",
    field: "apr",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthAprTemplate,
  },
  {
    headerText: "May",
    field: "may",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthMayTemplate,
  },
  {
    headerText: "Jun",
    field: "jun",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthJunTemplate,
  },
  {
    headerText: "Jul",
    field: "jul",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthJulTemplate,
  },
  {
    headerText: "Aug",
    field: "aug",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthAugTemplate,
  },
  {
    headerText: "Sep",
    field: "sep",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthSepTemplate,
  },
  {
    headerText: "Oct",
    field: "oct",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthOctTemplate,
  },
  {
    headerText: "Nov",
    field: "nov",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthNovTemplate,
  },
  {
    headerText: "Dec",
    field: "dec",
    width: "90",
    textAlign: "Left",
    headerTemplate: gridHeaderTemplate,
    template: gridMonthDecTemplate,
  },
];
