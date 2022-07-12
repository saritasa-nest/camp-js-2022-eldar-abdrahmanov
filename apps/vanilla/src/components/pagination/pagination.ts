import Anime from '@js-camp/core/models/anime';

/** Pagination. */
export default class Pagination {
  /** Number. */
  public count: number;

  /** Next. */
  public next: string | null;

  /** Previous. */
  public previous: string | null;

  /** Results. */
  public results?: Anime[] | null;

  public constructor(count: number, next: string | null, previous: string | null, results?: []) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}
