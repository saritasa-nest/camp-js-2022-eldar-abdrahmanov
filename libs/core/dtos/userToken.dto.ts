/** User token DTO. */
export interface UserTokenDto {

  /** Access token. */
  readonly access: string;

  /** Refresh token. */
  readonly refresh: string;
}
