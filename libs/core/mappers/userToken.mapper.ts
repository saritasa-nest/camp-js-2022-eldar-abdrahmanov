import { UserToken } from '@js-camp/core/models/userToken';
import { UserTokenDto } from '@js-camp/core/dtos/userToken.dto';

export namespace UserTokenMapper {

  /**
   * Maps model to DTO.
   * @param data User token model.
   */
  export function fromDto(data: UserTokenDto): UserToken {
    return {
      jwt: data.access,
      refreshJwt: data.refresh,
    };
  }
}
