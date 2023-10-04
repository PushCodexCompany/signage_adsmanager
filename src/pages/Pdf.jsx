import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import CentralLogo from "../assets/img/central.jpeg";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal:
      "https://raw.githubusercontent.com/blinkz333/Sarabun-webfont/main/THSarabunNew.ttf",
    bold: "https://raw.githubusercontent.com/blinkz333/Sarabun-webfont/main/THSarabunNew-Bold.ttf",
    italics:
      "https://raw.githubusercontent.com/blinkz333/Sarabun-webfont/main/THSarabunNew-Italic.ttf",
    bolditalics:
      "https://raw.githubusercontent.com/blinkz333/Sarabun-webfont/main/THSarabunNewBoldItalic.ttf",
  },
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const Pdf = () => {
  const { currentColor, currentMode } = useStateContext();
  const [img_logo, setImgLogo] = useState(null);
  const [booking_data, setBookingData] = useState([]);

  const testObj = {
    qoute_name: "QOUTE",
    company_name: "<Company Name>",
    logo: img_logo,
    address: "<123 Street Address,City,State,Zip/Post>",
    email: "<Website,Email Address>",
    phone: "<Phone Number>",
    bill_to: {
      contact_name: "<Contact Name>",
      company_name: "<Client Company Name>",
      address: "<Address>",
      phone: "<Phone,Email>",
    },
    ship_to: {
      ship_name: "<Name/Dept>",
      ship_company_name: "<Client Company Name>",
      address: "<Address>",
      phone: "<Phone>",
    },
    qoute_no: "#INV00001",
    date: "11/11/11",
    valid_for: "14 days",
    booking_value: [
      {
        description: "Screen 1,CTW,main screen 1, 26/06/23 - 28/06/23",
        qty: "xxx",
        unit_price: "xxx",
        total: "xxx",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
      {
        description: null,
        qty: null,
        unit_price: null,
        total: "0.00",
      },
    ],
    subtotal: 0.0,
    discount: 0.0,
    subtotal_less_discount: 0.0,
    tax_rate: 0.0,
    total_tax: 0.0,
    shipping_handling: 0.0,
    qoute_total: 0.0,
  };

  useEffect(() => {
    generateImgLogo();
    buildTableBody();
  }, []);

  const generateImgLogo = async () => {
    const base64Img = await convertImageToBase64(CentralLogo);
    setImgLogo(base64Img);
  };

  const buildTableBody = () => {
    let rows = [
      [
        {
          text: "DESCRIPTION",
          bold: true,
          fontSize: 10,
          alignment: "center",
        },
        {
          text: "QTY",
          fontSize: 10,
          bold: true,
          alignment: "center",
        },
        {
          text: "UNIT PRICE",
          fontSize: 10,
          bold: true,
          alignment: "center",
        },
        {
          text: "TOTAL",
          fontSize: 10,
          bold: true,
          alignment: "center",
        },
      ],
    ];

    for (let i = 0; i < testObj.booking_value.length; i += 1) {
      rows.push([
        {
          text: testObj.booking_value[i].description,
          fontSize: 10,
          alignment: "center",
        },
        {
          text: testObj.booking_value[i].qty,
          fontSize: 10,
          alignment: "center",
        },
        {
          text: testObj.booking_value[i].unit_price,
          fontSize: 10,
          alignment: "center",
        },
        {
          text: testObj.booking_value[i].total,
          fontSize: 10,
          alignment: "center",
        },
      ]);
    }

    setBookingData(rows);
  };

  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const img = new Image();
      img.src = objectURL;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      const base64 = canvas.toDataURL("image/png");
      URL.revokeObjectURL(objectURL);

      return base64;
    } catch (error) {
      throw error;
    }
  };

  const docDefination = {
    info: {
      title: `invoice quotation : ${testObj.qoute_no}`,
    },
    content: [
      {
        columns: [
          {
            width: "80%",
            text: testObj.company_name,
            style: "Header",
          },
          {
            width: "*",
            text: testObj.qoute_name,
            style: "qoute",
          },
        ],
      },
      {
        columns: [
          {
            width: "85%",
            text: testObj.address + "\n" + testObj.email + "\n" + testObj.phone,
            style: "address",
          },
          {
            image: testObj.logo,
            width: 80,
          },
        ],
      },
      {
        columns: [
          {
            width: "35%",
            text: "BILL TO",
            style: "header2",
          },
          {
            width: "35%",
            text: "SHIP TO",
            style: "header2",
          },
          {
            width: "15%",
            text: "Qoute No:",
            style: "qoute_no",
          },
          {
            width: "15%",
            text: testObj.qoute_no,
            style: "qoute_no_value",
          },
        ],
      },
      {
        columns: [
          {
            width: "35%",
            text: "______________________________",
            style: "dash",
          },
          {
            width: "35%",
            text: "__________________________",
            style: "dash",
          },
        ],
      },
      {
        columns: [
          {
            width: "35%",
            text:
              testObj.bill_to.contact_name +
              "\n" +
              testObj.bill_to.company_name +
              "\n" +
              testObj.bill_to.address +
              "\n" +
              testObj.bill_to.phone,
            style: "bill_ship_to_value",
          },
          {
            width: "35%",
            text:
              testObj.ship_to.ship_name +
              "\n" +
              testObj.ship_to.ship_company_name +
              "\n" +
              testObj.ship_to.address +
              "\n" +
              testObj.ship_to.phone,
            style: "bill_ship_to_value",
          },
          {
            width: "15%",
            text: "Date : " + "\n" + "Valid For :",
            style: "date_valid",
          },
          {
            width: "15%",
            text: testObj.date + "\n" + testObj.valid_for,
            style: "date_valid_value",
          },
        ],
      },
      {
        table: {
          headerRows: 2,
          widths: ["50%", "20%", "20%", "10%"],
          body: booking_data,
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex % 2 === 0 ? "#CCCCCC" : null;
          },
        },
      },
      {
        columns: [
          {
            width: "50%",
            text: "",
            style: "summary_header",
          },
          {
            width: "30%",
            text:
              "SUBTOTAL" +
              "\n" +
              "DISCOUNT" +
              "\n" +
              "SUBTOTAL LESS DISCOUNT" +
              "\n" +
              "TAX RATE" +
              "\n" +
              "TOTAL TAX" +
              "\n" +
              "SHIPPING/HANDLING",
            style: "summary_header",
          },
          {
            width: "20%",
            text:
              testObj.subtotal.toFixed(2) +
              "\n" +
              testObj.discount.toFixed(2) +
              "\n" +
              testObj.subtotal_less_discount.toFixed(2) +
              "\n" +
              `${testObj.tax_rate.toFixed(2)}%` +
              "\n" +
              testObj.total_tax.toFixed(2) +
              "\n" +
              testObj.shipping_handling.toFixed(2),
            style: "summary_value",
          },
        ],
      },
      {
        text: "________________________________________",
        style: "dash_summary",
      },
      {
        columns: [
          {
            width: "50%",
            text: "",
            style: "summary_header",
          },
          {
            width: "30%",
            text: "Qoute Total",
            style: "qoute_summary_header",
          },
          {
            width: "20%",
            text: `฿${testObj.qoute_total.toFixed(2)}`,
            style: "summary_value",
            font: "THSarabunNew",
          },
        ],
      },
      {
        text: "Note & Terms",
        style: "note_term",
      },
      {
        text: "__________________________________",
        style: "note_term_dash",
      },
      {
        text:
          "<Add payment requirements here, for example deposit amount and payment method>" +
          "\n" +
          "<Add terms here, e.g: warranty , returns policy...>" +
          "\n" +
          "<Include project timeline>",
        style: "note_term_description",
      },
    ],
    defaultStyle: {
      font: "THSarabunNew",
    },
    styles: {
      Header: {
        alignment: "left",
        fontSize: 22,
        lineHeight: 1.5,
      },
      qoute: {
        alignment: "right",
        fontSize: 22,
        bold: true,
      },
      address: {
        fontSize: 14,
        textColor: "#000000",
        aligment: "left",
        lineHeight: 1.5,
      },
      header2: {
        fontSize: 14,
        color: "#203d72",
        bold: true,
        lineHeight: 1,
        margin: [0, 30, 0, 30],
      },
      dash: {
        color: "#b5b5b5",
        margin: [0, -40, 0, 50],
      },
      qoute_no: {
        fontSize: 14,
        bold: true,
        lineHeight: 1,
        margin: [20, 30, 0, 30],
      },
      qoute_no_value: {
        fontSize: 12,
        lineHeight: 1,
        margin: [0, 31, 0, 30],
      },
      bill_ship_to_value: {
        fontSize: 14,
        lineHeight: 1.5,
        margin: [0, -50, 0, 30],
      },
      date_valid: {
        fontSize: 14,
        bold: true,
        lineHeight: 1.5,
        margin: [20, -50, 0, 0],
      },
      date_valid_value: {
        fontSize: 12,
        lineHeight: 1.5,
        margin: [0, -45, 0, 0],
      },
      summary_header: {
        fontSize: 12,
        bold: true,
        alignment: "right",
        margin: [30, 10, 0, 0],
        lineHeight: 1,
      },
      qoute_summary_header: {
        fontSize: 16,
        bold: true,
        alignment: "right",
        margin: [30, 10, 0, 0],
        lineHeight: 1,
      },
      summary_value: {
        fontSize: 12,
        alignment: "right",
        margin: [30, 10, 0, 0],
        lineHeight: 1,
        decoration: "underline",
      },
      dash_summary: {
        argin: [0, 50, 0, 0],
        alignment: "right",
      },
      note_term: {
        alignment: "left",
        bold: true,
      },
      note_term_dash: {
        margin: [0, -10, 0, 0],
      },
      note_term_description: {
        margin: [0, 0, 0, 0],
      },
    },
  };

  const handlePrint = () => {
    const pdfGenerate = pdfMake.createPdf(docDefination);

    pdfGenerate.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  };

  return (
    <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Page" title="Home" />

      <div className="mt-6">
        {/* <Button
          onClick={() => handlePrint()}
          color="white"
          bgColor={currentColor}
          text="Download"
          borderRadius="10px"
        /> */}
        <button
          onClick={() => handlePrint()}
          className="text-white bg-cyan-400 rounded-[10px] w-[100px] h-[50px]"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Pdf;
