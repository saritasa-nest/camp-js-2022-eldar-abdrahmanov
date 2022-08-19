import { FC, memo, useEffect } from 'react';
import { useFormik } from 'formik';
import { Alert, Box, Button, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { loginUser } from '@js-camp/react/store/auth/dispatchers';

import { selectLoginError } from '@js-camp/react/store/auth/selectors';

import { initValues, LoginFormValue, loginFormSchema } from './loginSettings';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);

  useEffect(() => {
    if (error === undefined) {
      return;
    }
    formik.setStatus(error);
  }, [error]);

  /**
   * Handle auth form submit.
   * @param values Values of auth form fields.
   */
  const handleLogin = (values: LoginFormValue): void => {
    dispatch(loginUser(values));
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: loginFormSchema,
    validateOnChange: true,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    formik.setStatus(null);
  }, [formik.values]);

  return (
    <div>
      <Box
        component="form"
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email !== undefined}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus
          autoComplete="email"
        />
        <TextField
          margin="normal"
          id="password"
          type="password"
          label="Password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password !== undefined}
          helperText={formik.touched.password && formik.errors.password}
          autoFocus
          autoComplete="current-password"
        />
        {formik.status ? <Alert severity="error">{formik.status}</Alert> : null}
        <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export const LoginForm = memo(LoginFormComponent);
