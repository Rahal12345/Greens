import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";



const firebaseConfig = {
  apiKey: "AIzaSyAN9e7XRdt2vyLdHHeEILlbr5v_vUHd4Qw",
  authDomain: "greens-1d103.firebaseapp.com",
  databaseURL: "https://greens-1d103-default-rtdb.firebaseio.com",
  projectId: "greens-1d103",
  storageBucket: "greens-1d103.appspot.com",
  messagingSenderId: "246256592367",
  appId: "1:246256592367:web:ece6b8c221be9fc704021a",
  measurementId: "G-5SQ7QBLZ3C",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const database = getDatabase();
const storage = getStorage();

export { database, storage };
