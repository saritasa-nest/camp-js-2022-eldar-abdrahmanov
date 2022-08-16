import { FC, memo } from 'react';
import { Field, Form, Formik } from 'formik';

import { Box, Button, TextField } from '@mui/material';

import { initValues, LoginFormValue } from './login-settings';

const LoginFormComponent: FC = () => {
  /**
   *
   * @param values
   */
  const handleLogin = async (values: LoginFormValue): void => {
    console.log(values);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Formik initialValues={initValues} onSubmit={handleLogin}>
        <Box
          component={Form}
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '30%',
          }}
        >
          <Field
            component={TextField}
            required
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <Field
            component={TextField}
            required
            id="password"
            type="password"
            label="Password"
            name="password"
            autoFocus
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, width: '40%' }}
          >
            Sign In
          </Button>
        </Box>
      </Formik>
    </div>
  );
};

export const LoginForm = memo(LoginFormComponent);
