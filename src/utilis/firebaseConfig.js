import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAROyrEIBdNviP8fO2m7B0jJsVkJRhiUc",
  authDomain: "shorturl-6a616.firebaseapp.com",
  projectId: "shorturl-6a616",
  storageBucket: "shorturl-6a616.firebasestorage.app",
  messagingSenderId: "293928891777",
  appId: "1:293928891777:web:31c4f927595db6a7e26480",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
