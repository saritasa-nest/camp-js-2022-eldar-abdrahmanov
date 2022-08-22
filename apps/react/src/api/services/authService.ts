import { UserToken } from '@js-camp/core/models/userToken';
import { UserTokenDto } from '@js-camp/core/dtos/userToken.dto';
import { UserTokenMapper } from '@js-camp/core/mappers/userToken.mapper';
import { Login } from '@js-camp/core/models/login';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { Registration } from '@js-camp/core/models/registration';
import { AxiosError } from 'axios';
import { ResponseErrorMapper } from '@js-camp/core/mappers/responseError.mapper';

import { http } from '..';

import { LocalStorageService } from './localStorageService';

const loginUrl = 'auth/login/';
const registerUrl = 'auth/register/';

export namespace AuthService {

  /**
   * Login user.
   * @param loginData User auth data.
   */
  export async function login(loginData: Login): Promise<UserToken> {
    try {
      const { data } = await http.post<UserTokenDto>(
        loginUrl,
        LoginMapper.toDto(loginData),
      );
      LocalStorageService.saveToken(data.access);
      return UserTokenMapper.fromDto(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw error.response?.data.detail;
      }
      throw error;
    }
  }

  /**
   * Register user.
   * @param registerData User register data.
   */
  export async function register(
    registerData: Registration,
  ): Promise<UserToken> {
    try {
      const { data } = await http.post<UserTokenDto>(
        registerUrl,
        LoginMapper.toDto(registerData),
      );
      return UserTokenMapper.fromDto(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw ResponseErrorMapper.fromAxiosDto(error.response?.data.data);
      }
      throw error;
    }
  }
}
