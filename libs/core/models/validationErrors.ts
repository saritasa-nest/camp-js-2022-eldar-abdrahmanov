import { Immerable, OmitImmerable } from '../models/immerable';

/** Validation errors model. */
export class ValidationErrors extends Immerable {

  /** Errors for email field. */
  public readonly email?: string[];

  /** Errors for password field. */
  public readonly password?: string[];

  /** Error details. */
  public readonly details?: string;

  public constructor(data: Args) {
    super();
    this.email = data.email;
    this.password = data.password;
    this.details = data.details;
  }
}

type Args = OmitImmerable<ValidationErrors>;
