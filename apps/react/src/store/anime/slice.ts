import { createSlice } from '@reduxjs/toolkit';

import { fetchAnime, fetchNextAnime } from '@js-camp/react/store/anime/dispatchers';

import { initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchAnime.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.anime = action.payload.results;
        state.pagination = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.isLoading = false;
      })
      .addCase(fetchNextAnime.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchNextAnime.fulfilled, (state, action) => {
        state.anime = [...state.anime, ...action.payload.results];
        state.pagination = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNextAnime.rejected, (state, action) => {
        if (action.error.message) {
          state.error = action.error.message;
        }
        state.isLoading = false;
      }),
});
