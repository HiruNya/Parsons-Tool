import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../data/AuthContext';

export default function Login() {
  const { signIn, auth } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //maybe trigger a loading
      return;
    }
    if (user) navigate('/student');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <h1>LOGIN</h1>
      <button className=" p-3 text-lg mb-3 border-none text-white bg-blue-400 hover:bg-blue-500" onClick={signIn}>
        Login with Google
      </button>
    </div>
  );
}
