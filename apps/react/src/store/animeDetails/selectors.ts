import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects details from store. */
export const selectAnimeDetails = createSelector(
  (state: RootState) => state.animeDetails.details,
  animeDetails => animeDetails,
);

/** Selects genres loading state. */
export const selectAreAnimeLoading = createSelector(
  (state: RootState) => state.animeDetails.isLoading,
  isLoading => isLoading,
);
