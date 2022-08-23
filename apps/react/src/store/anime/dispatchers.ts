import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnime = createAsyncThunk(
  'anime/fetch',
  (offsetParam: string) => AnimeService.getAnime(offsetParam),
);

export const fetchNextAnime = createAsyncThunk(
  'animeNext/fetch',
  (nextUrl: string) => AnimeService.getNextAnimeList(nextUrl),
);
