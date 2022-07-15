import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeTypeEnum } from '@js-camp/core/unions/animeType';
import Anime from '@js-camp/core/models/anime';

/** A class designed to interact with API. */
export class API {
  /** Base URL. */
  private readonly baseUrl: string;

  /** URL query part. */
  public urlQuery: string;

  public constructor(baseUrl: string, urlQuery: string) {
    this.baseUrl = baseUrl;
    this.urlQuery = urlQuery;
  }

  /** Send request.
   * @param url Link.
   */
  public async getPagination(url: string): Promise<Pagination<Anime>> {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return PaginationMapper.fromDto(data);
    } catch (err: unknown) {
      throw new Error(err.message);
    }
  }

  /** Construct request url.
   * @param offset Use in url.
   */
  public getPaginationWithOffset(offset: number): Promise<Pagination<Anime>> {
    let url: string;
    if (this.urlQuery in AnimeTypeEnum) {
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
