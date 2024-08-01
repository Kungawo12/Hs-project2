// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLAJi1uGXpyLEdlZnmmm4wbx4PqKMToyk",
  authDomain: "hspantryapp-a85bd.firebaseapp.com",
  projectId: "hspantryapp-a85bd",
  storageBucket: "hspantryapp-a85bd.appspot.com",
  messagingSenderId: "790950055114",
  appId: "1:790950055114:web:9da92145d3d7c278987833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore};