import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Registration } from '@js-camp/core/models/registration';
import { map, Observable } from 'rxjs';
import { UserToken } from '@js-camp/core/models/userToken';
import { Login } from '@js-camp/core/models/login';
import { RegisterMapper } from '@js-camp/core/mappers/registration.mapper';
import { UserTokenMapper } from '@js-camp/core/mappers/userToken.mapper';
import { UserTokenDto } from '@js-camp/core/dtos/userToken.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';

import { AppConfigService } from './appConfigService';

/** Provides access to authorization. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  /** Login Url. */
  private readonly loginUrl: URL;

  /** Registration Url. */
  private readonly registerUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.registerUrl = new URL('auth/register/', this.appConfig.apiUrl);
    this.loginUrl = new URL('auth/login/', this.appConfig.apiUrl);
  }

  /**
   * Register user.
   * @param registrationData Data used during registration.
   */
  public register(registrationData: Registration): Observable<UserToken> {
    return this.httpClient
      .post<UserTokenDto>(this.registerUrl.toString(), RegisterMapper.toDto(registrationData))
      .pipe(map(dto => UserTokenMapper.fromDto(dto)));
  }

  /**
   * Login user.
   * @param loginData Data used during login.
   */
  public login(loginData: Login): Observable<UserToken> {
    return this.httpClient.post<UserTokenDto>(this.loginUrl.toString(), LoginMapper.toDto(loginData))
      .pipe(map(dto => UserTokenMapper.fromDto(dto)));
  }
}
