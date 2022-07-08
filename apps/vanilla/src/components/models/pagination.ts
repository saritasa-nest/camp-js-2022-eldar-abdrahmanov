import Anime from "./anime";

export default class Pagination {
  public count: number;
  public  next: string | null;
  public previous: string | null;
  public results?: Anime[] | null;

  constructor(count: number, next: string | null, previous: string | null, results?: []) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  setPaginationData(count: number, next: string | null, previous: string | null, results: Anime[]) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  getResults() {
    return this.results;
  }

  setEventListener() {

  }
}
