import { Immerable, OmitImmerable } from '../models/immerable';

/** Pagination model. */
export class Pagination<T> extends Immerable {

  /** Total count data. */
  public readonly count: number;

  /** Link to next list. */
  public readonly next: string | null;

  /** Link to previous list. */
  public readonly previous: string | null;

  /** Result list. */
  public readonly results: T[];

  public constructor(data: Args<T>) {
    super();
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}

type Args<T> = OmitImmerable<Pagination<T>>;
