import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

export default function Login() {
  const { signIn, userRecord } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRecord) {
      console.log('[Login.js]> User Record found: ', userRecord);
      navigate('/intro');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRecord]);
  return (
    <div>
      <button
        className=" px-4 py-3 text-lg my-3 border-none rounded-full text-white bg-blue-400 hover:bg-blue-500"
        onClick={signIn}
      >
        Login with Google
      </button>
    </div>
  );
}
