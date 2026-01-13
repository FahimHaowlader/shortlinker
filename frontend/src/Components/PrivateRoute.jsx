
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Contexts/AuthContext';
import LoadingSpiner from './LoadingSpiner.jsx';

import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { user, loading, } = useAuth();
  const location = useLocation();

  // This ensures that every time the route changes, 
  // we silently verify the cookie with the backend
  useEffect(() => {
  }, [location.pathname]); 

  if (loading) return <LoadingSpiner />;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
