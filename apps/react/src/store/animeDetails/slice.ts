import { createSlice } from '@reduxjs/toolkit';
import { fetchAnimeDetails } from '@js-camp/react/store/animeDetails/dispatchers';

import { initialState } from './state';

export const animeDetailsSlice = createSlice({
  name: 'animeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeDetails.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchAnimeDetails.rejected, state => {
      state.isLoading = false;
    }),
});
