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

import { AppConfigService } from './appConfig.service';

/** Provides access to authorization. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  /** Login Url. */
  private readonly loginUrl = new URL('auth/login/', this.appConfig.apiUrl);

  /** Registration Url. */
  private readonly registerUrl = new URL('auth/register/', this.appConfig.apiUrl);

  /** Verify token Url. */
  private readonly verifyUrl = new URL('auth/token/verify/', this.appConfig.apiUrl);

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {}

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

  /**
   * Verify token.
   * @param jwt User token.
   */
  public verifyToken(jwt: string): Observable<UserToken> {
    return this.httpClient.post<UserTokenDto>(this.verifyUrl.toString(), jwt)
      .pipe(map(dto => UserTokenMapper.fromDto(dto)));
  }
}
