import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_TZcVzLCLfg3ym9GtgbjAVC5TJLtAtos",
  authDomain: "trip-planner-22d64.firebaseapp.com",
  projectId: "trip-planner-22d64",
  storageBucket: "trip-planner-22d64.appspot.com",
  messagingSenderId: "690505309075",
  appId: "1:690505309075:web:c5cb63a4c56f1f92716666",
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
