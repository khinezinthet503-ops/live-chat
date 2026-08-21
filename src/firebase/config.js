import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyCCqIMsBBX4c-PceZhy-PHazmCDD19LI",
  authDomain: "vue-blog-system-5bb62.firebaseapp.com",
  projectId: "vue-blog-system-5bb62",
  storageBucket: "vue-blog-system-5bb62.firebasestorage.app",
  messagingSenderId: "353049653856",
  appId: "1:353049653856:web:6aa80bc5c3f41795c74905",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
