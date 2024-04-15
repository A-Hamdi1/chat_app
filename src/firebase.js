import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCpooXLj99z1ogqbEBFRp4sc46Pgwjr6Fg",
//     authDomain: "chatting-2f3a3.firebaseapp.com",
//     projectId: "chatting-2f3a3",
//     storageBucket: "chatting-2f3a3.appspot.com",
//     messagingSenderId: "303496833385",
//     appId: "1:303496833385:web:f3992a853234f2f10d35f8",
//     measurementId: "G-EVBLGVR76L"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDsXZQDVVPb-ksmcwL1XE9sx_2DAu6VQkI",
  authDomain: "chat-app-stage1.firebaseapp.com",
  databaseURL: "https://chat-app-stage1-default-rtdb.firebaseio.com",
  projectId: "chat-app-stage1",
  storageBucket: "chat-app-stage1.appspot.com",
  messagingSenderId: "589046182217",
  appId: "1:589046182217:web:3ae55ec63662f7ff42ea98",
  measurementId: "G-PDZPLYWPWH",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
