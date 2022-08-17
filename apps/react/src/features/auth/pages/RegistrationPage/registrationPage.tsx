import { FC, memo } from 'react';

import { RegistrationForm } from '../../components/registrationForm';

const RegistrationPageComponent: FC = () => (
  <RegistrationForm />
);

export const RegistrationPage = memo(RegistrationPageComponent);
