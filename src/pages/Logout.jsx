import React, { useEffect } from "react";
import User from "../libs/admin";
import cookie from "react-cookies";
const Logout = () => {
  useEffect(async () => {
    const status = await User.logout();
    if (status) {
      window.location.href = "/adsmanager";
      cookie.remove("signage-brand", { path: false });
      cookie.remove("signage-account", { path: false });
      cookie.remove("signage-merchandise", { path: false });
      cookie.remove("signage-brand-code", { path: false });
      cookie.remove("signage-member", { path: false });
      return false;
    }
  }, []);

  return <>Log out...</>;
};

export default Logout;
