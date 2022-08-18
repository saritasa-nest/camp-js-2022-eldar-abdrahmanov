import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';
import { selectUserLoggedIn } from '@js-camp/react/store/login/selectors';

export const AuthGuard: FC = () => {
  const isLoggedIn = useAppSelector(selectUserLoggedIn);
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!isLoggedIn) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
