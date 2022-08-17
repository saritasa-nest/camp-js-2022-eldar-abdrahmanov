import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '@js-camp/react/store/login/state';
import { registerUser } from '@js-camp/react/store/register/dispatchers';

import { LocalStorageService } from '../../api/services/localStorageService';

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(registerUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userToken = action.payload;
      LocalStorageService.saveToken(action.payload.jwt);
    })
    .addCase(registerUser.rejected, (state, action) => {
      console.log(action.error)
    }),
});
