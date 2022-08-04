/** User token. */
export interface UserToken {

  /** Access token. */
  readonly jwt: string;

  /** Refresh token. */
  readonly refreshJwt: string;
}
