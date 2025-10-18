// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  databaseURL: `${process.env.DATA_BASE}`,
  projectId: "howdyhack2025",
  storageBucket: "howdyhack2025.firebasestorage.app",
  messagingSenderId: `${process.env.MESSAGE_ID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: "G-862RG0M40D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);