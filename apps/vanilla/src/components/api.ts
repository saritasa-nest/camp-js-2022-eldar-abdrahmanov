import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

/** Sending requests to the API. */
export class API {
  private readonly baseUrl: string;

  private readonly urlQuery: URLSearchParams;

  public constructor(baseUrl: string, limit: number) {
    this.baseUrl = baseUrl;
    this.urlQuery = new URLSearchParams();
    this.urlQuery.set('limit', String(limit));
    this.urlQuery.set('offset', '0');
  }

  /**
   * Construct request url.
   */
  public async getPagination(): Promise<Pagination> {
    const url = `${this.baseUrl}?${this.urlQuery.toString()}`;

    try {
      const data = await fetch(url).then(response => response.json());
      return PaginationMapper.fromDto(data);
    } catch (err: unknown) {
      console.error(err);
      throw new Error('Error');
    }
  }

  /**
   * Sets the value of the parameter.
   * @param queryParamName Query parameter name.
   * @param value Query parameter value.
   */
  public setQueryParam(queryParamName: string, value: string): void {
    this.urlQuery.set(queryParamName, value);
  }
}
