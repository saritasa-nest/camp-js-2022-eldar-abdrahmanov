import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnime = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.getAnime(),
);
