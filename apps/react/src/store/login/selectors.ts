import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@js-camp/react/store';

/** Selects user login state. */
export const selectAreUserLogin = createSelector(
  (state: RootState) => state.user,
  isLoading => isLoading,
);
