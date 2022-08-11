import { HttpErrorResponse } from '@angular/common/http';

import { ResponseError } from '../models/responseError';
import { ErrorData } from '..//models/ErrorsData';

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
}
