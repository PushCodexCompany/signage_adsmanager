import React, { useEffect } from "react";
import User, { SIGNAGE_ACCOUNT_COOKIE, SIGNAGE_BRAND_CODE_COOKIE, SIGNAGE_BRAND_COOKIE, SIGNAGE_MEMBER_COOKIE, SIGNAGE_MERCHANDISE_COOKIE } from "../libs/admin";
import cookie from "react-cookies";
const Logout = () => {
  useEffect(async () => {
    const status = await User.logout();
    if (status) {
      window.location.href = "/adsmanager";
      cookie.remove(SIGNAGE_BRAND_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_ACCOUNT_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_MERCHANDISE_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_BRAND_CODE_COOKIE, { path: "/" });
      cookie.remove(SIGNAGE_MEMBER_COOKIE, { path: "/" });
      return false;
    }
  }, []);

  return <>Log out...</>;
};

export default Logout;
