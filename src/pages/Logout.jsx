import React, { useEffect } from "react";
import User from "../libs/admin";
import cookie from "react-cookies";
const Logout = () => {
  useEffect(async () => {
    const status = await User.logout();
    if (status) {
      window.location.href = process.env.MAIN_DIR;
      cookie.remove("signage-brand", { path: false });
      cookie.remove("signage-merchandise", { path: false });
      return false;
    }
  }, []);

  return <>TEST</>;
};

export default Logout;
