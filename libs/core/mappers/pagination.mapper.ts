import { Pagination } from '../models/pagination';
import { PaginationDto } from '../dtos/pagination.dto';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Some dto.
   */
  export function fromDto<T>(dto: PaginationDto<T>): Pagination<T> {
    return new Pagination({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results,
    });
  }
}
