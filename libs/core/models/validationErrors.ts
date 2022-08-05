import { Immerable, OmitImmerable } from '../models/immerable';

/**  Model. */
export class ValidationErrors extends Immerable {

  /** . */
  public readonly email: string[];

  /** . */
  public readonly password: string[];

  public constructor(data: Args) {
    super();
    this.email = data.email;
    this.password = data.password;
  }
}

type Args = OmitImmerable<ValidationErrors>;
