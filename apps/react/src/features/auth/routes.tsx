import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() =>
  import('./pages/LoginPage/loginPage').then(module => ({ default: module.LoginPage })));

const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/registrationPage').then(module => ({ default: module.RegistrationPage })));
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
