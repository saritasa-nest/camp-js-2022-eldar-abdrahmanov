import { UserToken } from '@js-camp/core/models/userToken';

/** Register state. */
export interface RegisterState {

  /** User Token. */
  readonly userToken: UserToken;

  /** Error. */
  readonly error?: string;

  /** Whether register or not. */
  readonly isLoading: boolean;
}

export const initialState: RegisterState = {
  userToken: { jwt: '', refreshJwt: '' },
  isLoading: false,
};
