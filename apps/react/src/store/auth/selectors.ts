import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@js-camp/react/store';

/** Selects user auth state. */
export const selectUserLoggedIn = createSelector(
  (state: RootState) => state.auth.isLoggedIn,
  isLoggedIn => isLoggedIn,
);

/** Selects the state when the user logs in. */
export const selectLoginIsLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Selects login error. */
export const selectLoginError = createSelector(
  (state: RootState) => state.auth.loginError,
  loginError => loginError,
);

/** Selects register error. */
export const selectRegisterError = createSelector(
  (state: RootState) => state.auth.registerError,
  registerError => registerError,
);
