import { FC, memo } from 'react';

import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

import { LoginForm } from '../../components/loginForm';

const LoginPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Box
      sx={{
          margin: 'auto',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
          Sign in
      </Typography>
      <LoginForm />
      <Link to="/register">
        {'Don\'t have an account? Sign Up'}
      </Link>
    </Box>
  </Container>
);

export const LoginPage = memo(LoginPageComponent);
