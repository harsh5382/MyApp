import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9DRWUVT1QhRNMZRv7wLg8Ak_Nl6qPcYo",
  authDomain: "my-village-4f7af.firebaseapp.com",
  projectId: "my-village-4f7af",
  storageBucket: "my-village-4f7af.firebasestorage.app",
  messagingSenderId: "216225384579",
  appId: "1:216225384579:web:c3e572d620beaad3c633b6",
  measurementId: "G-SN8H36HHX3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
