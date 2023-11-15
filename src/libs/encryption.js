import CryptoJS from "crypto-js";
const key = "puShc0d3x778899";

const CryptoJSAesJson = {
  stringify: function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    j.ts = Date.now();
    return JSON.stringify(j).replace(/\s/g, "");
  },
  parse: function (jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

export default {
  encryption: async function (data, type, condition) {
    // condition
    // false = local test
    // true = https

    const date = Date.now() + 1;
    const pp = key.concat("", date);
    let encrypt;

    if (condition) {
      const obj = {
        action: type,
        data: data,
        hash: true,
      };

      encrypt = CryptoJS.AES.encrypt(JSON.stringify(obj), pp, {
        format: CryptoJSAesJson,
      }).toString();
    } else {
      const obj = {
        action: type,
        data: data,
        hash: false,
      };

      encrypt = JSON.stringify(obj);
    }
    const encrypted = btoa(encrypt);

    return encrypted;
  },
};
