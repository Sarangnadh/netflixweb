import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from"firebase/auth"
 import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {

  authDomain: "netflix-45b23.firebaseapp.com",
  projectId: "netflix-45b23",
  storageBucket: "netflix-45b23.appspot.com",
  messagingSenderId: "651580077470",
  appId: "1:651580077470:web:50f6de8bf453c14305528f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleauth = new GoogleAuthProvider()
 export const database = getFirestore(app)

