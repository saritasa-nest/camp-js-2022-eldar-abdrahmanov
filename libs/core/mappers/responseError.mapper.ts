import { HttpErrorResponse } from '@angular/common/http';

import { ErrorDataDto } from '../dtos/errorDataDto';

import { ResponseError } from '../models/responseError';
import { ErrorData } from '..//models/errorData';

export namespace ResponseErrorMapper {

  /**
   * Maps dto to model.
   * @param res  HttpResponseError dto.
   */
  export function fromDto(res: HttpErrorResponse): ResponseError {
    return new ResponseError({
      errorData: new ErrorData({
        email: res.error.data.email,
        password: res.error.data.password,
      }),
    });
  }

  /**
   * Maps axios error response to model.
   * @param res  Axios error data.
   */
  export function fromAxiosDto(res: ErrorDataDto): ErrorData {
    return new ErrorData({
      email: res.email,
      password: res.password,
    });
  }
}
