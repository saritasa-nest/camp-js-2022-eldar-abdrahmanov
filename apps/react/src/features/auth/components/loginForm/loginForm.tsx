import { FC, memo } from 'react';
import { useFormik } from "formik";
import { Box, Button, TextField } from '@mui/material';

import { useAppDispatch } from '@js-camp/react/store';
import { loginUser } from '@js-camp/react/store/login/dispatchers';

import { initValues, LoginFormValue, loginFormSchema } from './loginSettings';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();

  /**
   * Handle login form submit.
   * @param values Values of login form fields.
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
        <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export const LoginForm = memo(LoginFormComponent);
