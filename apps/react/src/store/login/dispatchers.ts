import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login } from '@js-camp/core/models/login';

import { AuthService } from '../../api/services/authService';

export const loginUser = createAsyncThunk(
  'login',
  (loginData: Login) => AuthService.login(loginData),
);
