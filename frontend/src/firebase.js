// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_aH7CjdmMqRyjxfllw6zVHvzhZMEuEpc",
  authDomain: "ddlm-e8932.firebaseapp.com",
  projectId: "ddlm-e8932",
  storageBucket: "ddlm-e8932.firebasestorage.app",
  messagingSenderId: "355502975297",
  appId: "1:355502975297:web:6550e97c71c7d29ca159c0",
  measurementId: "G-G0959S890Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the `auth` object so it can be used in other files
export { auth };
