import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8UbUh-ju0ZO8oL0dycO7FnHsa6FUYnqU",
  authDomain: "jda-2500.firebaseapp.com",
  projectId: "jda-2500",
  storageBucket: "jda-2500.appspot.com",
  messagingSenderId: "887720145764",
  appId: "1:887720145764:web:c1ed153a26723a3a6fc071",
  measurementId: "G-BGQSJKEZ2X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
