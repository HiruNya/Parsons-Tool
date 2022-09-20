import { auth } from '../firebase';

export const getAuthHeader = async (useAuth) => {
  const authToken = useAuth ? await auth.currentUser.getIdToken() : undefined;
  return authToken ? { Authorization: `Bearer ${authToken}` } : undefined;
};
