import React, { useState, useEffect } from "react";
import User from "../libs/admin";

const Brands = () => {
  const user = User.getCookieData();
  const select_campaign = User.getCampaign();

  useEffect(() => {
    if (select_campaign) {
      console.log("redirect");
      window.location.href = "/dashboard";
    }
  }, []);

  return <div>Brands</div>;
};

export default Brands;
