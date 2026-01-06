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
    const userStatus = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios.get(`https://book-courier-backend-six.vercel.app/users/${user.email}`)
        .then((res) => {
          // console.log("Fetched user from DB:", res.data);
          user.role =  res.data.role; // Assign role to user object
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(user); // Set user even if role fetch fails
          setLoading(false);
        });
  
      } else {
        setUser(null);
        setLoading(false);
      }
    });
      return () => userStatus();
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
  };
   return (<context.Provider value={authInfo}>
    {children}
    </context.Provider>)
}

export default AuthContext