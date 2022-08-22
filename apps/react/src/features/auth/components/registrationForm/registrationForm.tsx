import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { registerUser } from '@js-camp/react/store/auth/dispatchers';
import { selectRegisterError } from '@js-camp/react/store/auth/selectors';

import {
  initValues,
  registerFormSchema,
  RegisterFormValue,
} from './registrationSettings';

const RegistrationFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const registrationError = useAppSelector(selectRegisterError);

  useEffect(() => {
    if (registrationError === undefined) {
      return;
    }
    formik.setErrors(registrationError);

  }, [registrationError]);

  /**
   * Handle registration form submit.
   * @param values Values of auth form fields.
   */
  const handleRegister = (values: RegisterFormValue): void => {
    dispatch(registerUser(values));
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: registerFormSchema,
    validateOnChange: true,
    onSubmit: handleRegister,
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
          width: '100%',
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus
          fullWidth
        />
        <TextField
          margin="normal"
          id="firstName"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          autoFocus
        />
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          autoFocus
        />
        <TextField
          margin="normal"
          id="password"
          type="password"
          label="Password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoFocus
        />
        <TextField
          margin="normal"
          id="reTypePassword"
          type="password"
          label="Re-type password"
          {...formik.getFieldProps('reTypePassword')}
          error={
            formik.touched.reTypePassword &&
            Boolean(formik.errors.reTypePassword)
          }
          helperText={
            formik.touched.reTypePassword && formik.errors.reTypePassword
          }
          autoFocus
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export const RegistrationForm = memo(RegistrationFormComponent);
