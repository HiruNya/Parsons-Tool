import { useAuth } from '../data/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, isLecturer } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/home" />;
  }
  if (requiredRole) {
    if (isLecturer) {
      return children;
    }
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};
