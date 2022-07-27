import { useAuth } from '../data/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, roles } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (
    roles.find((element) => {
      if (element.includes(requiredRole)) {
        return true;
      }
      return false;
    })
  ) {
    return children;
  }
  return <Navigate to="/" />;
};
