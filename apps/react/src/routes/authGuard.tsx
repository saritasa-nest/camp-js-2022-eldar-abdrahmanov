import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';
import { selectUserLoggedIn } from '@js-camp/react/store/auth/selectors';

import { LocalStorageService } from '../api/services/localStorageService';

export const AuthGuard: FC = () => {
  const isLoggedIn = useAppSelector(selectUserLoggedIn);
  const token = LocalStorageService.getTokenFromStorage();
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };
  if (!isLoggedIn || token === null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
