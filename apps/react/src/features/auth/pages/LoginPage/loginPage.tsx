import { FC, memo } from 'react';

import { LoginForm } from '../../components/loginForm';

const LoginPageComponent: FC = () => (
  <LoginForm />
);

export const LoginPage = memo(LoginPageComponent);
