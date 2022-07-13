import {Immerable, OmitImmerable} from "@js-camp/core/models/immerable";
import Anime from "@js-camp/core/models/anime";

export class Pagination extends Immerable{

  /** Total count Anime. */
  public count: number;

  /** Link next list Anime */
  public next: string | null;

  /** Link previous list Anime */
  public previous: string | null;

  /** List Anime */
  public results: Anime[] | null;

  constructor(data: Args) {
    super();
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}

type Args = OmitImmerable<Pagination>;
