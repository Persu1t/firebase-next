// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABuhSGMBuzw0UV6mtoRCw4vWD4P3VWfdc",
  authDomain: "fir-homes.firebaseapp.com",
  projectId: "fir-homes",
  storageBucket: "fir-homes.firebasestorage.app",
  messagingSenderId: "782377820795",
  appId: "1:782377820795:web:a81a88a3401d6b3dd738de"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage
if(!currentApps.length){
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app);
    storage = getStorage(app);
}else{
   const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };