
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Context/Auth.Context.jsx';
import GeneralShkeleton from '../Components/GeneralSkeleton';

const PrivateRoute = ({ children }) => {
  const { user, loading, checkSession } = useAuth();
  const location = useLocation();

  // This ensures that every time the route changes, 
  // we silently verify the cookie with the backend
  useEffect(() => {
    checkSession();
  }, [location.pathname]); 

  if (loading) return <GeneralShkeleton />;

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
