import { FC, memo } from 'react';

import { RegistrationForm } from '../../components/registrationForm';
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegistrationPageComponent: FC = () => (
  <Container>
    <Box sx={{
      margin: 'auto',
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '60%',
    }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <RegistrationForm />
    </Box>
  </Container>
);

export const RegistrationPage = memo(RegistrationPageComponent);
