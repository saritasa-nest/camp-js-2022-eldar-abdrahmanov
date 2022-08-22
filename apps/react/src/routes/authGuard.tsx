import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';

import { LocalStorageService } from '../api/services/localStorageService';

export const AuthGuard: FC = () => {
  const token = LocalStorageService.getTokenFromStorage();
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };
  if (token === null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
