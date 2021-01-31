import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2g8zSK_ipyl67Bl3236xJtqyu6EDtGGQ",
  authDomain: "ribboned-50daf.firebaseapp.com",
  projectId: "ribboned-50daf",
  storageBucket: "ribboned-50daf.appspot.com",
  messagingSenderId: "647820333187",
  appId: "1:647820333187:web:0ab96175f1d651e575cbb6",
  measurementId: "G-90MEWGCZV7",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
