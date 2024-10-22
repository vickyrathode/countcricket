import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAjmdP-_kmc3nl_0-1y_5dKtS5FiZzBNgg",
  authDomain: "livecricket-e4f84.firebaseapp.com",
  projectId: "livecricket-e4f84",
  storageBucket: "livecricket-e4f84.appspot.com",
  messagingSenderId: "66501304551",
  appId: "1:66501304551:web:82bdfa56ac831a9a9b4242",
  measurementId: "G-Q2JNSE8RKM"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

export default app;

