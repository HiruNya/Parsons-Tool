import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { createUser, queryUser } from './data/BackendContext';

const firebaseConfig = {
  apiKey: 'AIzaSyBhui9Z9rMWx8jDAAPRvcr1rPQ6F87YuoM',
  authDomain: 'unamed-parsons-problems.firebaseapp.com',
  projectId: 'unamed-parsons-problems',
  storageBucket: 'unamed-parsons-problems.appspot.com',
  messagingSenderId: '1084557798122',
  appId: '1:1084557798122:web:a83b20ddf84e46b7260593',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // Check if the user exists in database
    let result = await queryDatabase(user.uid);
    // if result is null then create a new user record
    if (result === null) {
      console.log('[firebase.js]> Creating new user for ', user);
      await createUser({ uid: user.uid, email: user.email });
      result = await queryDatabase(user.uid);
    }
    localStorage.setItem('userRecord', JSON.stringify({ group: result.experimentGroup, roles: result.roles }));
    return result;
  } catch (error) {
    console.log('Check');

    console.error(error);
  }
};

function onAuthStateChange(setIsLoggedIn) {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
}

const logout = () => {
  localStorage.removeItem('userRecord');
  signOut(auth);
};

// query the database for the user id, and return the user or return null
const queryDatabase = async (id) => {
  try {
    const result = await queryUser(id);
    if (result.data !== null) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { auth, signInWithGoogle, onAuthStateChange, logout, queryDatabase };
