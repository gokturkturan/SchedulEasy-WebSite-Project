// Import the functions you need from the SDKs you need

import { initializeApp,getApps,getApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

//First one

const firebaseConfig = {

  apiKey: "AIzaSyCiGtA9NHnFJ4TN1PxAbDgHl7UXfcjMoRM",

  authDomain: "scheduleasy-d17f5.firebaseapp.com",

  projectId: "scheduleasy-d17f5",

  storageBucket: "scheduleasy-d17f5.appspot.com",

  messagingSenderId: "645588070028",

  appId: "1:645588070028:web:b8d041823b7e552c9995a9"

};



//Second One (for presentation)
// const firebaseConfig = {

//   apiKey: "AIzaSyCquiYBemUf1DPT4PAIwhnENQZAdvuCT6E",

//   authDomain: "scheduleasy2.firebaseapp.com",

//   databaseURL: "https://scheduleasy2-default-rtdb.firebaseio.com",

//   projectId: "scheduleasy2",

//   storageBucket: "scheduleasy2.appspot.com",

//   messagingSenderId: "331607045820",

//   appId: "1:331607045820:web:32d38e86e4a613aecd02b9"

// };


// Initialize Firebase

//const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();