import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsXrccStW9laY0p0bYx-y5_Cvhj-U5zDU",
  authDomain: "auction-5a27f.firebaseapp.com",
  projectId: "auction-5a27f",
  storageBucket: "auction-5a27f.appspot.com",
  messagingSenderId: "339489604109",
  appId: "1:339489604109:web:2844ee8fa45ef173a4cb44",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
