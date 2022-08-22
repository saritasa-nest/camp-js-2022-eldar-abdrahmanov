import { UserToken } from '@js-camp/core/models/userToken';
import { ErrorData } from '@js-camp/core/models/errorData';

/** Login state. */
export interface AuthState {

  /** User logged in. */
  readonly isLoggedIn: boolean;

  /** User Token. */
  readonly userToken: UserToken;

  /** Login error. */
  readonly loginError?: string;

  /** Register error. */
  readonly registerError?: ErrorData;

  /** Whether auth or not. */
  readonly isLoading: boolean;
}

export const initialState: AuthState = {
  userToken: { jwt: '', refreshJwt: '' },
  isLoading: false,
  isLoggedIn: false,
};
