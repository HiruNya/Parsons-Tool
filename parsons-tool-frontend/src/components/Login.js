import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';
import update from 'immutability-helper';
import Modal from '../components/Modal';

export default function Login() {
  const { signIn, userRecord } = useAuth();
  const navigate = useNavigate();

  const [modals, setModals] = useState({});
  const addModal = useCallback(
    (key, modal) => setModals((modals) => update(modals, { [key]: { $set: modal } })),
    [setModals],
  );
  const removeModal = useCallback((key) => setModals((modals) => update(modals, { $unset: [key] })), [setModals]);

  useEffect(() => {
    if (userRecord) {
      console.log('[Login.js]> User Record found: ', userRecord);
      navigate('/intro');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRecord]);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        addModal('invalidDomain', {
          title: 'Invalid Email Domain',
          description:
            'Only emails with the domain "@aucklanduni.ac.nz" work for this site. Please login again using a University of Auckland email address',
          buttons: {
            yes: {
              name: 'I understand',
              classes: ['bg-orange-300 border-none'],
              onClick: () => {
                removeModal('invalidDomain');
              },
            },
          },
        });
      }
    }
  };

  return (
    <div>
      <button
        className=" px-4 py-3 text-lg my-3 border-none rounded-full text-white bg-blue-400 hover:bg-blue-500"
        onClick={async () => {
          await handleLogin();
        }}
      >
        Login with Google
      </button>
      {Object.entries(modals).map(([k, v]) => (
        <Modal key={k} open={true} {...v} />
      ))}
    </div>
  );
}
