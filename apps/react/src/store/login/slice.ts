import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '@js-camp/react/store/login/dispatchers';
import { initialState } from '@js-camp/react/store/login/state';

import { LocalStorageService } from '../../api/services/localStorageService';

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(loginUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userToken = action.payload;
      LocalStorageService.saveToken(action.payload.jwt);
    })
    .addCase(loginUser.rejected, (state, action) => {
      console.log(action.error)
    }),
});
