import { Login } from '../models/login';
import { LoginDto } from '../dtos/login.dto';

export namespace LoginMapper {

  /**
   * Maps model to DTO.
   * @param data Login model.
   */
  export function toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }
}
