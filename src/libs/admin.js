import cookie from "react-cookies";
import Axios from "axios";
import avatar from "../assets/img/avatar.png";

const SIGNAGE_MEMBER_COOKIE = "signage-member";
const SIGNAGE_CAMPAIGN_COOKIE = "signage-campaign";
const SIGNAGE_MEMBER_COOKIE_TOKEN = "signage-member-token";

export default {
  /**
   * axios wrappers
   */
  _errorMsg: "",
  _post: async function (path, body) {
    return this._axios(path, "post", body);
  },
  _get: async function (path) {
    return this._axios(path);
  },
  _delete: async function (path, body) {
    return this._axios(path, "delete", body);
  },
  _axios: async function (path, method, body) {
    const options = {
      method,
      data: body,
      url: `${process.env.REACT_APP_API_ROOT}/${path}`,
      withCredentials: true,
    };
    const { data } = await Axios(options);
    if (data.status === 200) {
      return data;
    } else {
      console.log(`User lib error ${path}: ${data.message}`);
      this._errorMsg = data.message;
      return data;
    }
  },

  /**
   * API functions
   */

  // login
  login: async function (username, password) {
    // const { data } = await this._post("/login", { username, password })
    const data = {
      _id: "12314123123",
      name: "John Doe",
      img: avatar,
      role: 1,
      brand: [1, 4],
      email: "test@mail.com",
    };

    if (data && data._id) {
      this.saveCookie(data);
      return true;
    } else {
      return false;
    }
  },

  // logout
  logout: async function () {
    // this._post("/logout", {})
    this.deleteCookie();
    return true;
  },

  /**
   * Cookie functions
   */
  // delete cookie
  deleteCookie: function () {
    cookie.remove(SIGNAGE_MEMBER_COOKIE, { path: "/" });
    cookie.remove(SIGNAGE_MEMBER_COOKIE_TOKEN, { path: "/" });
    cookie.remove("redirect_uri", { path: "/" });
  },
  // save cookie
  saveCookie: function (data) {
    if (data) {
      const options = { path: "/" };
      if (data.expires) {
        options.expires = new Date(data.expires);
      }
      cookie.save(SIGNAGE_MEMBER_COOKIE, data, options);
    }
  },

  saveRedirect: function () {
    const redirect_cookie = cookie.load("redirect_uri");
    if (redirect_cookie && redirect_cookie !== "Lw==") {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let redirect = "/";

    const ignoreRedirectPath = ["/login"];

    // regular redirect url
    if (urlParams.get("redirect")) {
      redirect = urlParams.get("redirect");

      // base64 encode redirect url
    } else if (urlParams.get("redirect_encode")) {
      redirect = urlParams;
    } else if (ignoreRedirectPath.includes(window.location.pathname)) {
      redirect = "/";
    } else {
      redirect = window.location.pathname;
    }

    cookie.save("redirect_uri", redirect, {
      maxAge: 60 * 10,
      path: "/",
    });
  },

  // get cookie
  getCookieData: function () {
    return cookie.load(SIGNAGE_MEMBER_COOKIE) || false;
  },

  //get Campaign
  getCampaign: function () {
    return cookie.load(SIGNAGE_CAMPAIGN_COOKIE) || false;
  },
};
