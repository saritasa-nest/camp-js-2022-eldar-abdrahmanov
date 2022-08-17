import { UserToken } from '@js-camp/core/models/userToken';
import { UserTokenDto } from '@js-camp/core/dtos/userToken.dto';
import { UserTokenMapper } from '@js-camp/core/mappers/userToken.mapper';
import { Login } from '@js-camp/core/models/login';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { Registration } from '@js-camp/core/models/registration';

import { http } from '..';

const url = 'auth/login/';

export namespace AuthService {

  /**
   * Login user.
   * @param loginData User login data.
   */
  export async function login(loginData: Login): Promise<UserToken> {
    const { data } = await http.post<UserTokenDto>(url, LoginMapper.toDto(loginData));
    return UserTokenMapper.fromDto(data);
  }

  /**
   * Register user.
   * @param registerData User register data.
   */
  export async function register(registerData: Registration): Promise<UserToken> {
    const { data } = await http.post<UserTokenDto>(url, LoginMapper.toDto(registerData));
    return UserTokenMapper.fromDto(data);
  }
}
