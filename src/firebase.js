import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBs4CQOjXCVOWxOPe0Kxdkw0Dyms7wRHLo",
  authDomain: "netflix-clone-6be62.firebaseapp.com",
  projectId: "netflix-clone-6be62",
  storageBucket: "netflix-clone-6be62.firebasestorage.app",
  messagingSenderId: "1049543983247",
  appId: "1:1049543983247:web:e88baa30a7ea0b7e7170fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db,"user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    } catch (error) {
          console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));     
    }
}

const login = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));   
    }
}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signup, logout};