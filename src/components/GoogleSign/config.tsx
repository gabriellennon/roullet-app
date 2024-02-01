import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRMXyJN0WnMNDb4_ve4BZGrTkfA8jalfw",
  authDomain: "yourspin-7b16c.firebaseapp.com",
  projectId: "yourspin-7b16c",
  storageBucket: "yourspin-7b16c.appspot.com",
  messagingSenderId: "769102280161",
  appId: "1:769102280161:web:2a26fbe842a1ef343c8ea0",
  measurementId: "G-DPMVZ2PRMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  analytics,
  auth,
  provider
}