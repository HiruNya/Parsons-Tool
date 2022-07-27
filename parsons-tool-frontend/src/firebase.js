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
    const result = await queryDatabase(user.uid);
    // if result is null then create a new user record
    if (result === null) {
      console.log('[firebase.js]> Creating new user for ', user);
      await createUser({ uid: user.uid, email: user.email });
    }
  } catch (error) {
    console.log('Check');

    console.error(error);
  }
};

// query the database for the user id, and return the user or return null
const queryDatabase = async (id) => {
  try {
    const result = await queryUser(id);
    if (result.data !== null) {
      console.log('[firebase.js]> data:', result.data);
      return result.data;
    } else {
      console.log('[firebase.js]> data: null');
      return null;
    }
  } catch (error) {
    console.log('[firebase.js]> error state');
    console.error(error);
    return null;
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, signInWithGoogle, logout };
