import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store/store';
import { ROLES } from '@app/constants/var';

const PublicRoute = () => {
  const user = useSelector(() => store.getState().auth);
  if (!user.isAuthenticated) return <Outlet />;
  else if (user.roleName === ROLES.ADMIN) return <Navigate to="/admin-jobs" />;
  else if (user.roleName == ROLES.CLIENT) return <Navigate to="/client-jobs" />;
  else return <Navigate to="/" />;
};

export default PublicRoute;
