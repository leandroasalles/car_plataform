import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH0a43_mPLR9HAm4CEnOLKjx_5OV8WO60",
  authDomain: "web-cars-leandro.firebaseapp.com",
  projectId: "web-cars-leandro",
  storageBucket: "web-cars-leandro.firebasestorage.app",
  messagingSenderId: "788972649681",
  appId: "1:788972649681:web:3d0980191ee4d8002719f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, storage, db };
