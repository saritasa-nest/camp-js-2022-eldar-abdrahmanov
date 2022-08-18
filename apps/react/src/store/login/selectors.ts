import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@js-camp/react/store';

/** Selects user login state. */
export const selectUserLoggedIn = createSelector(
  (state: RootState) => state.login.isLoggedIn,
  isLoggedIn => isLoggedIn,
);

/** Selects the state when the user logs in. */
export const selectLoginIsLoading = createSelector(
  (state: RootState) => state.login.isLoading,
  isLoading => isLoading,
);
