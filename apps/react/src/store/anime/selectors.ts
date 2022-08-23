import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects anime from store. */
export const selectAnime = createSelector(
  (state: RootState) => state.anime.anime,
  anime => anime,
);

/** Selects genres loading state. */
export const selectAreAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

/** Selects pagination from store. */
export const selectedPagination = createSelector(
  (state: RootState) => state.anime.pagination,
  pagination => pagination,
);
