import React from 'react';
import firebase from '../utils/Firebase';

class FirebaseHelper extends React.Component {
    static clearScreenUnpairRequest = (screenData) => {
        const { AccountCode = "", BrandCode = "", BranchCode = "", ScreenCode = "" } = screenData;
        const db = firebase.database().ref().child(`${AccountCode}/${BrandCode}/${BranchCode}/${ScreenCode}`);

        // console.log(roomId + " set " + key + " " + value );
        if (db) {
            db.child("needs_unpair").set(0);
        }
    }

    static setScreenFlag = (screenData, key, value) => {

        const { AccountCode = "", BrandCode = "", BranchCode = "", ScreenCode = "" } = screenData;
        const db = firebase.database().ref().child(`${AccountCode}/${BrandCode}/${BranchCode}/${ScreenCode}`);

        // console.log(roomId + " set " + key + " " + value );
        if (db) db.child(key).set(value);
    }
}

export default FirebaseHelper;