import { Injectable } from '@angular/core';

/** Token service. */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /**
   * Save token.
   * @param key Token key in storage.
   * @param token Token.
   */
  public saveToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  /**
   * Remove token.
   * @param token Token.
   */
  public removeToken(token: string): void {
    localStorage.removeItem(token);
  }

  /** Get token from local storage. */
  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}
