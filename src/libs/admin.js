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
  _post: async function (path, body = null, header = null) {
    return this._axios(path, "post", body, header);
  },
  _get: async function (path, body = null, header = null) {
    return this._axios(path, "get", body, header);
  },
  _delete: async function (path, body) {
    return this._axios(path, "delete", body);
  },
  _axios: async function (path, method, body, config) {
    let options;
    if (config) {
      options = {
        method,
        data: body,
        url: `${process.env.REACT_APP_API_ADSMANAGER}/${path}`,
        headers: config.headers,
        withCredentials: true,
      };
    } else {
      options = {
        method,
        data: body,
        url: `${process.env.REACT_APP_API_ADSMANAGER}/${path}`,
        withCredentials: true,
      };
    }

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
    console.log("data", data);
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

  getUsersList: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_users`, "", config);
    if (data.code !== 404) {
      return data.users;
    } else {
      return false;
    }
  },

  getUserRoles: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_userroles`, "", config);
    if (data.code !== 404) {
      return data.roles;
    } else {
      return false;
    }
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

    return data;
  },

  updateUser: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/update_user?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  deleteUser: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/delete_user?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  createUserRole: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/create_userrole?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  updateUserRole: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/update_userrole?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  deleteUserRole: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/delete_userrole?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  getUserAccount: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_accounts`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createUserAccount: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/create_account?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  editUserAccount: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/update_account?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  deleteUserAccount: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/delete_account?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  saveImgUserAccount: async function (obj, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await this._post(
      `api/v1/upload_logo?target=accountlogo`,
      obj,
      config
    );

    console.log("data", data);

    return data;
  },

  getBrand: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_brands`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createBrand: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/create_brand?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  editBrand: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/update_brand?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  deleteBrand: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/delete_brand?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  saveImgBrand: async function (obj, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await this._post(
      `api/v1/upload_logo?target=accountlogo`,
      obj,
      config
    );

    console.log("data", data);

    return data;
  },

  getMerchandiseList: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_advertisers`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createMerchandise: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/create_advertiser?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  saveImgMerchandise: async function (obj, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await this._post(
      `api/v1/upload_logo?target=advertiserlogo`,
      obj,
      config
    );

    console.log("data", data);

    return data;
  },

  deleteMerchandise: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/delete_advertiser?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  editMerchandise: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await this._post(
      `api/v1/update_advertiser?hash=${hash}`,
      "",
      config
    );

    return data;
  },

  getTagCatagory: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_tagcategories`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createTagCategory: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/create_tagcategory?tagcategoryname=${hash.tagcategoryname}`;

    if (hash.tagcategorydesc !== null && hash.tagcategorydesc !== undefined) {
      urlString += `&tagcategorydesc=${hash.tagcategorydesc}`;
    }

    const { data } = await this._post(urlString, "", config);

    return data;
  },

  updateTagCategory: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/update_tagcategory?tagcategoryid=${hash.tagcategoryid}&tagcategoryname=${hash.tagcategoryname}`;

    if (hash.tagcategorydesc !== null && hash.tagcategorydesc !== undefined) {
      urlString += `&tagcategorydesc=${hash.tagcategorydesc}`;
    }

    const { data } = await this._post(urlString, "", config);

    return data;
  },

  deleteTagCategory: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/delete_tagcategory?tagcategoryid=${hash}`,
      "",
      config
    );

    return data;
  },

  getCategorytags: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_categorytags`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  getTag: async function (id, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(
      `api/v1/get_tags?tagcategoryid=${id}`,
      "",
      config
    );
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createTag: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/create_tag?tagname=${hash.tagname}&tagcategoryid=${hash.tagcategoryid}`,
      "",
      config
    );

    return data;
  },

  updateTag: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/update_tag?tagid=${hash.TagID}&tagname=${hash.TagName}&tagcategoryid=${hash.TagCategoryID}`,
      "",
      config
    );

    return data;
  },

  deleteTag: async function (tagId, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/delete_tag?tagid=${tagId}`,
      "",
      config
    );

    return data;
  },

  getMediaRules: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_mediarules`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createMediaRule: async function (hash, token, isToggle) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/create_mediarule?mediarulename=${hash.mediarulename}&adscapacity=${hash.adscapacity}&activeresolution=${hash.activeresolution}&width=${hash.width}&height=${hash.height}`;

    const { data } = await this._post(urlString, "", config);

    return data;
  },

  updateMediaRule: async function (hash, token, isToggle) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/update_mediarule?mediaruleid=${hash.mediaruleid}&mediarulename=${hash.mediarulename}&adscapacity=${hash.adscapacity}&width=${hash.width}&height=${hash.height}&activeresolution=${hash.activeresolution}`;

    const { data } = await this._post(urlString, "", config);

    return data;
  },

  deleteTag: async function (mediaruleid, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/delete_mediarule?mediaruleid=${mediaruleid}`,
      "",
      config
    );

    return data;
  },

  getScreens: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_screens`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  getScreensWithAdsCapacity: async function (slot, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(
      `api/v1/get_screens?adscapacity=${slot}`,
      "",
      config
    );
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  getScreensOptions: async function (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._get(`api/v1/get_screenoptions`, "", config);
    if (data.code !== 404) {
      return data;
    } else {
      return false;
    }
  },

  createNewScreen: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/create_screen?screenname=${hash.screenname}&mediaruleid=${hash.mediaruleid}&tagids=${hash.tagids}&screenlocation=${hash.screenlocation}&screendesc=${hash.screendesc}&screenresolutionid=${hash.screenresolutionid}&screenphysizeid=${hash.screenphysizeid}&screenorientation=${hash.screenorientation}&screenplacement=${hash.screenplacement}&screenopentime=${hash.screenopentime}&screenclosetime=${hash.screenclosetime}&manotifydelay=${hash.manotifydelay}`;
    const { data } = await this._post(urlString, "", config);

    return data;
  },

  editScreen: async function (hash, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let urlString = `api/v1/update_screen?screenid=${hash.screenid}&screenname=${hash.screenname}&mediaruleid=${hash.mediaruleid}&tagids=${hash.tagids}&screenlocation=${hash.screenlocation}&screendesc=${hash.screendesc}&screenresolutionid=${hash.screenresolutionid}&screenphysizeid=${hash.screenphysizeid}&screenorientation=${hash.screenorientation}&screenplacement=${hash.screenplacement}&screenopentime=${hash.screenopentime}&screenclosetime=${hash.screenclosetime}&manotifydelay=${hash.manotifydelay}`;
    const { data } = await this._post(urlString, "", config);

    return data;
  },

  saveImgAccountScreens: async function (obj, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await this._post(
      `api/v1/upload_logo?target=screenphoto`,
      obj,
      config
    );
    return data;
  },

  deleteScreen: async function (screenid, token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await this._post(
      `api/v1/delete_screen?screenid=${screenid}`,
      "",
      config
    );

    return data;
  },
};
