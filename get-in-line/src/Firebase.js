import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5hWcoSC3x8g5UqTp3xim_Mwjt9frXmt0",
    authDomain: "get-in-line-1cf94.firebaseapp.com",
    projectId: "get-in-line-1cf94",
    storageBucket: "get-in-line-1cf94.appspot.com",
    messagingSenderId: "1066319320699",
    appId: "1:1066319320699:web:38f3e2fd4ca83e944874de",
    measurementId: "G-EF4ZXWEFHH"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };