// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFOESdfFRqnKc5MFe3gqGoISgRFzUGeJo",
  authDomain: "reactjs-softuni-project-92dc4.firebaseapp.com",
  projectId: "reactjs-softuni-project-92dc4",
  storageBucket: "reactjs-softuni-project-92dc4.appspot.com",
  messagingSenderId: "714551680320",
  appId: "1:714551680320:web:21aae7b4e34857c824eea5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };