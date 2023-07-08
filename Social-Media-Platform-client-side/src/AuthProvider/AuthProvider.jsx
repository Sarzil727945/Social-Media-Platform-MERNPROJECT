import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebaseConfig/firebase.config';
import axios from 'axios';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null)
     const [loading, setLoading] = useState(true)

     const createUser = (email, password) => {
          setLoading(true)
          return createUserWithEmailAndPassword(auth, email, password)
     }

     const signIn = (email, password) => {
          setLoading(true)
          return signInWithEmailAndPassword(auth, email, password)
     }

     const googlSignIn = () => {
          setLoading(true)
          return signInWithPopup(auth, googleProvider)
     }

     useEffect(() => {
          const unSubScript = onAuthStateChanged(auth, currentUser => {
               setUser(currentUser)
               setLoading(false)


               // // jwt part start
               // if (currentUser) {
               //      axios.post('http://localhost:5000/jwt', { email: currentUser.email })
               //           .then(data => {
               //                console.log(data.data.token);
               //                localStorage.setItem('access-token', data.data.token);
               //                setLoading(false)
               //           })
               // }
               // else {
               //      localStorage.removeItem('access-token');
               // }
               // // jwt part end

          })
          return () => {
               unSubScript()
          }
     }, [])

     const logOut = () => {
          return signOut(auth)
     }

     const resetPassword = (email) => {
          return sendPasswordResetEmail(auth, email)
     }

     const authInfo = {
          user,
          loading,
          logOut,
          createUser,
          signIn,
          googlSignIn,
          resetPassword,
     }
     return (
          <div>
               <AuthContext.Provider value={authInfo}>
                    {children}
               </AuthContext.Provider>
          </div>
     );
};

export default AuthProvider;