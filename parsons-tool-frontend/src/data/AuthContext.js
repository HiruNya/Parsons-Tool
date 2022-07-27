import React, { useContext, useState } from 'react';
import { auth, logout, signInWithGoogle } from '../firebase';

const AuthContext = React.createContext({
  isLoggedIn: false,
  auth: auth,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function signIn() {
    await signInWithGoogle();
    setIsLoggedIn(true);
  }

  function signOut() {
    logout();
    setIsLoggedIn(false);
  }

  const context = {
    isLoggedIn,
    auth,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
