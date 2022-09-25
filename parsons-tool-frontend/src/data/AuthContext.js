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
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState(0);
  const [uid, setUid] = useState('');
  const [stateChange, setStateChange] = useState(false);

  function setChangeState() {
    setStateChange(!stateChange);
  }

  async function signIn() {
    try {
      await signInWithGoogle(setChangeState);
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    logout();
    setIsLoggedIn(false);
    setIsLecturer(false);
    setEmail('');
    setUid('');
    setGroup(0);
  }

  useEffect(() => {
    if (userRecord !== null) {
      const userRoles = [...userRecord.roles];
      if (userRoles !== null) {
        if (userRoles.find((element) => element === 'lecturer')) {
          setIsLecturer(true);
        } else {
          setIsLecturer(false);
        }
      }
      const userGroup = userRecord.group;
      if (userGroup !== null) {
        setGroup(userGroup);
      } else {
        setGroup(0);
      }
      const email = userRecord.email;
      if (email !== null) {
        setEmail(email);
      } else {
        setEmail('');
      }
    }
  }, [userRecord]);

  useEffect(() => {
    if (isLoggedIn) {
      const userRecord = JSON.parse(localStorage.getItem('userRecord'));
      console.log('[auth]>', userRecord);

      if (userRecord) {
        setUserRecord(userRecord);
        setEmail(userRecord.email);
        setUid(userRecord.uid);
      }
    } else {
      setUserRecord(null);
      setEmail('');
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
    userRecord,
    email,
    group,
    uid,
    auth,
    signIn,
    signOut,
    stateChange,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
