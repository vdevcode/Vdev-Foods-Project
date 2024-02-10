/* eslint-disable react/prop-types */
import { React, createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import axios from "axios";

import app from "../firebase/firebase.config.js";

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGmail = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userInfor = { email: currentUser.email };
        axios
          .post("https://be-vdev-foods-project.vercel.app/jwt", userInfor)
          .then(function (response) {
            if (response.data.token) {
              localStorage.setItem("access-token", response.data.token);
            }
          })
          .catch(function (error) {
            console.error("Error during token request:", error);
          });
  
        console.log("Đã đăng nhập");
        setLoading(false);
      } else {
        console.log("Chưa đăng nhập");
        localStorage.removeItem("access-token");
      }
    });
  
    return unsubscribe;
  }, []);
  

  const authInfor = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logout,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfor}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
