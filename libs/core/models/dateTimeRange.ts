import { Immerable, OmitImmerable } from './immerable';

/** Date time range model. */
export class DateTimeRange extends Immerable {

  /** Beginning. */
  public readonly start: Date;

  /** End. */
  public readonly end: Date;

  public constructor(data: Args) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type Args = OmitImmerable<DateTimeRange>;
