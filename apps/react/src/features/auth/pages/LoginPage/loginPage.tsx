import { FC, memo } from "react";

import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { LoginForm } from "../../components/loginForm";
import { useAppSelector } from "@js-camp/react/store";
import { selectUserLoggedIn } from '@js-camp/react/store/auth/selectors';

const LoginPageComponent: FC = () => {
  const isLoggedIn = useAppSelector(selectUserLoggedIn);
  console.log(isLoggedIn)
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          margin: "auto",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
        <Link href="/register" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Container>
  );
};

export const LoginPage = memo(LoginPageComponent);
