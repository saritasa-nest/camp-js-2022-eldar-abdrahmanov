import { createAsyncThunk } from '@reduxjs/toolkit';
import { Registration } from '@js-camp/core/models/registration';

import { AuthService } from '../../api/services/authService';

export const registerUser = createAsyncThunk(
  'register',
  (registerData: Registration) => AuthService.register(registerData),
);
