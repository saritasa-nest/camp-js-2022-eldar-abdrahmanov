import { Injectable } from '@angular/core';

/** Anime service to interact with API. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /**
   * Save jwt in local storage.
   * @param jwt Authorization token.
   */
  public saveJwtInLocalStorage(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  /**
   * Save jwt in local storage.
   */
  public removeJwtFromLocalStorage(): void {
    localStorage.removeItem('jwt');
  }
}
