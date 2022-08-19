import { Immerable, OmitImmerable } from './immerable';

/** Data error  model. */
export class ErrorData extends Immerable {

  /** Email. */
  public email: string[];

  /** Password. */
  public password: string[];

  public constructor(data: Args) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

type Args = OmitImmerable<ErrorData>;
