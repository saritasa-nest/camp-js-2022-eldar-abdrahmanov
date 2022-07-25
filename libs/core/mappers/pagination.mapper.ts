import { Pagination } from '../models/pagination';
import { PaginationDto } from '../dtos/pagination.dto';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Some dto.
   * @param mapper Mapper.
   */
  export function fromDto<Dto, Model>(dto: PaginationDto<Dto>, mapper: (Dto: Dto) => Model): Pagination<Model> {
    return new Pagination({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(res => mapper(res)),
    });
  }
}
