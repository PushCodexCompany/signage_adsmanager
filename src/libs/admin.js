import cookie from "react-cookies";
import Axios from "axios";
import avatar from "../assets/img/avatar.png";

const SIGNAGE_MEMBER_COOKIE = "signage-member";
const SIGNAGE_ACCOUNT_COOKIE = "signage-account";
const SIGNAGE_BRAND_COOKIE = "signage-brand";
const SIGNAGE_MERCHANDISE_COOKIE = "signage-merchandise";
const SIGNAGE_MEMBER_COOKIE_TOKEN = "signage-member-token";

export default {
  /**
   * axios wrappers
   */
  _errorMsg: "",
  _post: async function (path, body, header) {
    return this._axios(path, "post", body, header);
  },
  _get: async function (path) {
    return this._axios(path, "get");
  },
  _delete: async function (path, body) {
    return this._axios(path, "delete", body);
  },
  _axios: async function (path, method, body, config) {
    const options = {
      method,
      data: body,
      url: `${process.env.REACT_APP_API_ADSMANAGER}/${path}`,
      headers: config.headers,
      withCredentials: true,
    };

    const data = await Axios(options);
    if (data.status === 200) {
      return data;
    } else {
      console.log(`User lib error ${path}: ${data.message}`);
      this._errorMsg = data.message;
      return false;
    }
  },

  /**
   * API functions
   */

  // login
  login: async function (hash) {
    const { data } = await this._post(`api/v1/login?hash=${hash}`);

    // const data = {
    //   token:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQVVNIQ09ERVggQ09NUEFOWSBMSU1JVEVEIiwiYXVkIjoiZDQxZDhjZDk4ZjAwYjIwNGU5ODAwOTk4ZWNmODQyN2UiLCJhdXRoIjoiYzRjYTQyMzhhMGI5MjM4MjBkY2M1MDlhNmY3NTg0OWIifQ.loVz8S_JNKD4Smkuan3TSrrcjX568OOSxZcw96xrOP0",
    //   user: {
    //     userid: 1,
    //     username: "spaads",
    //     firstname: "Push Codex",
    //     lastname: "Administrator",
    //     contactnumber: null,
    //     role: "Super Admin",
    //     permission: 1,
    //     lastseen: "2023-11-08 16:33:01",
    //   },
    // };
    if (data.token) {
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
    cookie.remove("redirect_uri", { path: null });
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

  saveSelectedBrand: function (data) {
    if (data) {
      cookie.save(
        SIGNAGE_BRAND_COOKIE,
        { brand_id: data },
        {
          maxAge: 86400,
          path: "/",
        }
      );

      return true;
    }
  },

  saveSelectedAccount: function (data) {
    if (data) {
      cookie.save(
        SIGNAGE_ACCOUNT_COOKIE,
        { account: data },
        {
          maxAge: 86400,
          path: "/",
        }
      );

      return true;
    }
  },

  saveSelectedMerchandise: function (data) {
    if (data) {
      cookie.save(
        SIGNAGE_MERCHANDISE_COOKIE,
        { mwechandise_id: data },
        {
          maxAge: 86400,
          path: "/",
        }
      );

      return true;
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

  getAccount: function () {
    return cookie.load(SIGNAGE_ACCOUNT_COOKIE) || false;
  },

  //get Campaign
  getCampaign: function () {
    return cookie.load(SIGNAGE_BRAND_COOKIE) || false;
  },

  getMerchandise: function () {
    return cookie.load(SIGNAGE_MERCHANDISE_COOKIE) || false;
  },

  getPHP: async function () {
    const data = await this._get("api/hello-nf/");
    return data;
  },

  createUser: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/create_user?hash=${hash}`,
      "",
      config
    );

    if (data.code !== 404) {
      return true;
    } else {
      return false;
    }
  },

  addNewPermissionRole: async function (hash) {
    const { data } = await this._post(`api/v1/create_user?hash=${hash}`);
    if (data) {
      return true;
    } else {
      return false;
    }
  },
};
