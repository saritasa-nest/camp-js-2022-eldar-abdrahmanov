import axios from 'axios';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeType } from '@js-camp/core/enums/animeType';
import { Anime } from '@js-camp/core/models/anime';

/** A class designed to interact with API. */
export class API {
  public constructor(
    private readonly baseUrl: string,
    public urlQuery: string,
  ) {}

  /** Send request.
   * @param url Link.
   */
  public async getPagination(url: string): Promise<Pagination<Anime>> {
    try {
      const response = await axios.get(url);
      return PaginationMapper.fromDto(response.data);
    } catch (err: unknown) {
      throw new Error(err.message);
    }
  }

  /** Construct request url.
   * @param offset Use in url.
   */
  public getPaginationWithOffset(offset: number): Promise<Pagination<Anime>> {
    let url: string;
    if (this.urlQuery in AnimeType) {
      url = `${this.baseUrl}?offset=${offset}&type=${this.urlQuery}`;
    } else {
      url = `${this.baseUrl}?offset=${offset}&ordering=${this.urlQuery}`;
    }
    return this.getPagination(url);
  }

  /** Set the field urlQuery of API instance.
   * @param urlQuery String.
   */
  public setUrlQuery(urlQuery: string): void {
    this.urlQuery = urlQuery;
  }
}
