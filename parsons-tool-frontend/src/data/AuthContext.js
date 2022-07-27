/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { auth, logout, onAuthStateChange, signInWithGoogle } from '../firebase';

const AuthContext = React.createContext({
  isLoggedIn: false,
  auth: auth,
  roles: [],
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
  const [isLecturer, setIsLecturer] = useState(false);
  const [roles, setRoles] = useState([]);
  const [uid, setUid] = useState('');

  async function signIn() {
    await signInWithGoogle();
    setIsLoggedIn(true);
  }

  function signOut() {
    logout();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (userRecord !== null) {
      const userRoles = [...userRecord.roles];
      if (userRoles !== null) {
        setRoles(userRoles);

        if (
          roles.find((element) => {
            if (element.includes('lecturer')) {
              return true;
            }
            return false;
          })
        ) {
          setIsLecturer(true);
        }
        setIsLecturer(false);
      }
    }
  }, [userRecord]);

  useEffect(() => {
    if (isLoggedIn && (userRecord === undefined || userRecord === null)) {
      const userRecord = JSON.parse(localStorage.getItem('userRecord'));
      if (userRecord) {
        setUserRecord(userRecord);
        setUid(userRecord.uid);
      }
    } else {
      setUserRecord(null);
      setUid('');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setIsLoggedIn);
    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    isLoggedIn,
    isLecturer,
    uid,
    auth,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
