import { Injectable } from '@angular/core';
import { AppConfigService } from './appConfigService';
import { HttpClient } from '@angular/common/http';
import { Registration } from '@js-camp/core/models/registration';
import { catchError, map, Observable } from "rxjs";
import { UserToken } from '@js-camp/core/models/userToken';
import { Login } from '@js-camp/core/models/login';
import { RegisterMapper } from '@js-camp/core/mappers/registration.mapper';
import { UserTokenMapper } from '@js-camp/core/mappers/userToken.mapper';
import { UserTokenDto } from '@js-camp/core/dtos/userToken.dto';
import { LoginMapper } from "@js-camp/core/mappers/login.mapper";

/** Provides access to environment variables. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  /** */
  private readonly loginUrl: URL;

  /** */
  private readonly registerUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.registerUrl = new URL('auth/register/', this.appConfig.apiUrl);
    this.loginUrl = new URL('auth/login', this.appConfig.apiUrl);
  }

  /**
   *
   * @param registrationData .
   */
  public register(registrationData: Registration): Observable<UserToken> {
    return this.httpClient
      .post<UserTokenDto>(this.registerUrl.toString(), RegisterMapper.toDto(registrationData))
      .pipe(map((dto => UserTokenMapper.fromDto(dto))));
  }

  /**
   *
   * @param loginData .
   */
  public login(loginData: Login): Observable<UserToken> {
    return this.httpClient.post<UserTokenDto>(this.loginUrl.toString(), LoginMapper.toDto((loginData)))
      .pipe(map(dto => UserTokenMapper.fromDto(dto)))
  }
}
