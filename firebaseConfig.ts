// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAlAmdMT8v8vwpzrWnPwdJtZV-fI40zE4",
  authDomain: "codepencil-5253.firebaseapp.com",
  projectId: "codepencil-5253",
  storageBucket: "codepencil-5253.appspot.com",
  messagingSenderId: "324500366114",
  appId: "1:324500366114:web:4f12aabd128ead8675bb7b",
  measurementId: "G-QZCW5RHH3R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
