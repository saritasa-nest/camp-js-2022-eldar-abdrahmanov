import { Injectable } from '@angular/core';

import { catchError, map, of, Observable, switchMap } from 'rxjs';
import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { HttpClient } from '@angular/common/http';

import { TokenService } from './token.service';
import { AppConfigService } from './appConfig.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. */
  public currentUser$: Observable<User | null>;

  /** User login state. */
  public isLoggedIn$: Observable<boolean>;

  /** User url. */
  private userUrl = new URL('users/profile/', this.appConfig.apiUrl);

  public constructor(
    private readonly tokenService: TokenService,
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfigService,
  ) {
    this.currentUser$ = this.initCurrentUser();
    this.isLoggedIn$ = this.currentUser$.pipe(map(user => user !== null));
  }

  /** Initiate user. */
  private initCurrentUser(): Observable<User | null> {
    return this.tokenService.getToken().pipe(
      switchMap(token => (token ? this.getUser() : of(null))),
    );
  }

  /**
   * Handle user login.
   * @param jwt User authorization token.
   */
  public handleLogin(jwt: string): void {
    this.tokenService.saveToken(jwt);
  }

  /** Handle user logout. */
  public handleLogOut(): void {
    this.tokenService.removeToken();
  }

  /** Get user profile. */
  private getUser(): Observable<User | null> {
    return this.httpClient.get<UserDto>(this.userUrl.toString()).pipe(
      map(data => UserMapper.fromDto(data)),
      catchError(() => of(null)),
    );
  }
}
