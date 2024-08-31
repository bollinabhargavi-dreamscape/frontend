import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store/store';

const PrivateRoute = (roleName: any) => {
  const isLoggedIn = useSelector(() => store.getState().auth.isAuthenticated);
  const userRole = useSelector(() => store.getState().auth.roleName);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (roleName.roleName && roleName.roleName !== userRole) {
    return <Navigate to="/unauthorizedAccess" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
