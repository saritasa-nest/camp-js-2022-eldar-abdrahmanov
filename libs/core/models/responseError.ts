import { Immerable, OmitImmerable } from './immerable';
import { ErrorData } from './errorData';

/** Response error  model. */
export class ResponseError extends Immerable {

  /** Fields with errors and messages. */
  public errorData: ErrorData;

  public constructor(data: Args) {
    super();
    this.errorData = data.errorData;
  }
}

type Args = OmitImmerable<ResponseError>;
