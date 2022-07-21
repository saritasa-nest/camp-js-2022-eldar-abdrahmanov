import axios from 'axios';

import { Anime } from '@js-camp/core/models/anime';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

/** A class designed to interact with API. */
export class API {
  /** Parameters in url query. */
  public urlParams: URLSearchParams;

  public constructor(
    private readonly baseUrl: string,
  ) {
    this.urlParams = new URLSearchParams('offset=0');
  }

  /** Send request and return anime list and pagination. */
  public async getPaginationAndAnimeList(): Promise<Pagination<Anime>> {
    const url = `${this.baseUrl}?${this.urlParams.toString()}`;
    const response = await axios.get(url);
    return PaginationMapper.fromDto(response.data);
  }

  /**
   * Toggle the sorting parameter. Update 'ordering' parameter value.
   * If 'ordering' parameter contains value remove it.
   * @param parameterValue Value of 'ordering' parameter.
   */
  public setSortParameter(parameterValue: string): void {
    const currentOrderingValue = this.urlParams.get('ordering');
    if (currentOrderingValue === null) {
      this.urlParams.set('ordering', parameterValue);
      return;
    }
    if (currentOrderingValue?.includes(parameterValue)) {
      this.urlParams.set('ordering', currentOrderingValue.replace(parameterValue, ''));
      return;
    }
    this.urlParams.set('ordering', `${currentOrderingValue},${parameterValue}`);
  }

  /**
   * Set the type filtering parameter.
   * @param parameterValue Value of 'type' parameter.
   */
  public setTypeParameter(parameterValue: string): void {
    this.urlParams.set('type', parameterValue);
  }

  /**
   * Set the offset parameter.
   * @param offset Value of 'offset' parameter.
   */
  public setOffsetParameter(offset: number): void {
    this.urlParams.set('offset', offset.toString());
  }
}
