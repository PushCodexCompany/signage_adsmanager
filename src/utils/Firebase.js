import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyA2acNDNP0nrppPYhar9obRlcw1LYjFwUA",
    authDomain: "cdspushsignage.firebaseapp.com",
    databaseURL: "https://cdspushsignage-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cdspushsignage",
    storageBucket: "cdspushsignage.appspot.com",
    messagingSenderId: "55724643610",
    appId: "1:55724643610:web:61e01d767e545ce85508a3",
    measurementId: "G-0VXHPXB7D7"
};
firebase.initializeApp(config);

export default firebase;