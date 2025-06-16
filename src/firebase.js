// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2SFBNX8Ie5fqo6iLoq6LHI3oeFm0AWIQ",
  authDomain: "app-gastos-d748d.firebaseapp.com",
  projectId: "app-gastos-d748d",
  storageBucket: "app-gastos-d748d.firebasestorage.app",
  messagingSenderId: "539917218774",
  appId: "1:539917218774:web:a0b1057be7810b709baa77",
  measurementId: "G-1KC5S8Y9BC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
