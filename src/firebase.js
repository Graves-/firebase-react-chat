import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC6QCBSiIe0wa2bewJSnK_3eoq9_DnsYYw",
    authDomain: "organos-2d6a8.firebaseapp.com",
    databaseURL: "https://organos-2d6a8.firebaseio.com",
    projectId: "organos-2d6a8",
    storageBucket: "organos-2d6a8.appspot.com",
    messagingSenderId: "171579360537"
  };
firebase.initializeApp(config);

export const db = firebase.database().ref();