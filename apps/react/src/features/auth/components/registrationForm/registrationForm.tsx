import { FC, memo } from 'react';
import { useAppDispatch } from '@js-camp/react/store';

import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { registerUser } from '@js-camp/react/store/register/dispatchers';

import {
  initValues,
  registerFormSchema,
  RegisterFormValue,
} from './registrationSettings';

const RegistrationFormComponent: FC = () => {
  const dispatch = useAppDispatch();

  /**
   * Handle registration form submit.
   * @param values Values of login form fields.
   */
  const handleRegister = (values: RegisterFormValue): void => {
    console.log(values)
    dispatch(registerUser(values));
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: registerFormSchema,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
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
            id="password"
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoFocus
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, width: '40%' }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </div>
  );
};

export const RegistrationForm = memo(RegistrationFormComponent);
