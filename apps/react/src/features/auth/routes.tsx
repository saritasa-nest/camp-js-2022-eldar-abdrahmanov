import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { RegistrationPage } from './pages/RegistrationPage';

const LoginPage = lazy(() =>
  import('./pages/LoginPage/loginPage').then(module => ({ default: module.LoginPage })));

export const loginRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegistrationPage />,
  },
];
