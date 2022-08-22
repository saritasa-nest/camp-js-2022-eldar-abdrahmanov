import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@js-camp/react/store/auth/dispatchers';
import { initialState } from '@js-camp/react/store/auth/state';
import { ErrorData } from '@js-camp/core/models/errorData';

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userToken = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userToken = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.payload as ErrorData;
      }),
});
