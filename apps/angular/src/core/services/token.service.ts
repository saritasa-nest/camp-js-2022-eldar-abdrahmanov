import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_STORAGE_KEY = 'token';

/** Token service. */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /** Token observable. */
  private _token$: BehaviorSubject<string | null>;

  public constructor() {
    this._token$ = new BehaviorSubject(localStorage.getItem(TOKEN_STORAGE_KEY));
  }

  /** Token getter. */
  public getToken(): Observable<string | null> {
    return this._token$.asObservable();
  }

  /**
   * Save token.
   * @param token Token.
   */
  public saveToken(token: string): void {
    this._token$.next(token);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  /** Remove token. */
  public removeToken(): void {
    this._token$.next(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
