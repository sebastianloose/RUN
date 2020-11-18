import React, { useContext, useState, useEffect } from "react";
import firebase, { auth } from "../service/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login() {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    setLoading(true);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged( user => {  
      setCurrentUser(user);
      setLoading(false);
    });

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (!result || !result.user || !firebase.auth().currentUser) {
          return;
        }
        setCurrentUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  const value = {
    loading,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
