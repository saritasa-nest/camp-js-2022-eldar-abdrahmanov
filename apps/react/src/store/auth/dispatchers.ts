import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

import { AuthService } from '../../api/services/authService';
import { ErrorData } from '@js-camp/core/models/ErrorsData';

export const loginUser = createAsyncThunk(
  'login',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  'register',
  async(registerData: Registration, { rejectWithValue }) => {
    try {
      return await AuthService.register(registerData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
