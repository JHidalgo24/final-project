// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAD6HK3945d4q89erSaa1j8wA2qiOeXMMo",
    authDomain: "react-anime-final.firebaseapp.com",
    projectId: "react-anime-final",
    storageBucket: "react-anime-final.appspot.com",
    messagingSenderId: "982936186735",
    appId: "1:982936186735:web:b3b80658a2f3d56367029a",
    measurementId: "G-EBH3J364ZC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export { firebase, db, auth, storage };
