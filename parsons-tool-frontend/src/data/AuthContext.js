import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logout, signInWithGoogle } from '../firebase';

const AuthContext = React.createContext({
  isLoggedIn: false,
  auth: auth,
  roles: [],
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  async function signIn() {
    const user = await signInWithGoogle();
    setUserRecord(user);
    setIsLoggedIn(true);
  }

  function signOut() {
    logout();
    setIsLoggedIn(false);
    setUserRecord(null);
    navigate('/login');
  }

  useEffect(() => {
    if (userRecord !== null) {
      const userRoles = [...userRecord.roles];
      if (userRoles !== null) {
        setRoles(userRoles);
      }
    }
  }, [userRecord]);

  const context = {
    isLoggedIn,
    auth,
    roles,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
