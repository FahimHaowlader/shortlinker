import { createContext, useContext, useState, useEffect } from "react";
import auth from "../Firebase";
import axios from "axios";
import {
    onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from   "firebase/auth";


const context = createContext();
export const useAuth = () => useContext(context);

export const AuthContext = ({children}) => {
 const[limit, setLimit] = useState(0);
 const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  const createEmailUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailUserSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userInfoUpdate = (info) => {
    setLoading(true);
    return updateProfile(auth.currentUser, info);
  };

  const googleUser = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setLoading(true);
    if (user) {
      // console.log("Auth state changed, user logged in:", user);
      setUser(user);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return unsubscribe;
}, []);


  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    adminLoading,
    setAdminLoading,
    createEmailUser,
    emailUserSignIn,
    userInfoUpdate,
    googleUser,
    userSignOut,
    limit,
    setLimit,
  };
   return (<context.Provider value={authInfo}>
    {children}
    </context.Provider>)
}

export default AuthContext