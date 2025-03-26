import React, { useState } from "react";
import firebase from "../utils/Firebase";

export default {
  getStatusScreen: async function (selectInfoScreen) {
    const { AccountCode, BrandCode, BranchCode, ScreenCode } = selectInfoScreen;

    if (!AccountCode || !BrandCode || !BranchCode) {
      console.error("Invalid selectInfoScreen data");
      return null;
    }

    var db = firebase
      .database()
      .ref()
      .child(`${AccountCode}/${BrandCode}/${BranchCode}`);

    const screenData = await db
      .once("value")
      .then((snapshot) => snapshot.val())
      .catch((error) => {
        console.error("Error querying Firebase", error);
        return null;
      });

    if (screenData) {
      if (screenData[ScreenCode]) {
        if (screenData[ScreenCode].is_online !== undefined) {
          if (screenData[ScreenCode].is_online === 1) {
            return 1;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  },
};
