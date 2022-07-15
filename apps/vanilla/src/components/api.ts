import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeTypeEnum } from '@js-camp/core/unions/animeType';
import { AnimeOrderingEnum } from '@js-camp/core/unions/orderingType';

export class API {
  private readonly baseUrl: string;
  urlQuery: string;

  constructor(baseUrl: string, urlQuery: string) {
    this.baseUrl = baseUrl;
    this.urlQuery = urlQuery;
  }

  /** Send request.
   * @param url Link.
   */
  async getPagination(url: string): Promise<Pagination> {
    try {
      let res = await fetch(url);
      let data = await res.json();
      return PaginationMapper.fromDto(data);
    }
    catch (err: any) {
      throw new Error(err.message)
    }
  }

  /** Construct request url  */
  public getPaginationWithOffset(offset: number): Promise<Pagination> {
    let url: string;
    if (this.urlQuery in AnimeTypeEnum) {
      url = `${this.baseUrl}?offset=${offset}&type=${this.urlQuery}`;
    } else if (this.urlQuery in AnimeOrderingEnum) {
      url = `${this.baseUrl}?offset=${offset}&ordering=${this.urlQuery}`;
    } else {
      url = `${this.baseUrl}?offset=${offset}&title_eng__icontains=${this.urlQuery}`;
    }
    return this.getPagination(url);
  }

  public setUrlQuery(urlQuery: string) {
    this.urlQuery = urlQuery;
  }
}
