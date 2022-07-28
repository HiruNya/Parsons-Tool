/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { auth, logout, onAuthStateChange, signInWithGoogle } from '../firebase';

const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: '',
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
  const [stateChange, setStateChange] = useState(false);

  function setChangeState() {
    setStateChange(!stateChange);
  }

  async function signIn() {
    await signInWithGoogle(setChangeState);
  }

  function signOut() {
    logout();
    setIsLoggedIn(false);
    setIsLecturer(false);
    setRoles([]);
    setUid('');
  }

  useEffect(() => {
    if (userRecord !== null) {
      const userRoles = [...userRecord.roles];
      if (userRoles !== null) {
        setRoles(userRoles);

        console.log(userRoles);

        if (roles.find((element) => element === 'lecturer')) {
          console.log('[auth]> is lecturer');
          setIsLecturer(true);
        } else {
          console.log('[auth]> is not lecturer');
          setIsLecturer(false);
        }
      }
    }
  }, [userRecord]);

  useEffect(() => {
    if (isLoggedIn) {
      const userRecord = JSON.parse(localStorage.getItem('userRecord'));
      console.log('[auth]>', userRecord);

      if (userRecord) {
        setUserRecord(userRecord);
        console.log('setting uid: ', userRecord.uid);
        setUid(userRecord.uid);
      }
    } else {
      setUserRecord(null);
      setUid('');
    }
  }, [isLoggedIn, stateChange]);

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
