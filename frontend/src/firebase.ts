
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO6VgyVZtqk4LN9RI5dt46LhZPb9DyoGg",
  authDomain: "medium-94b9d.firebaseapp.com",
  projectId: "medium-94b9d",
  storageBucket: "medium-94b9d.appspot.com",
  messagingSenderId: "969551800121",
  appId: "1:969551800121:web:2df63c3bb3b803284e6ae8"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);