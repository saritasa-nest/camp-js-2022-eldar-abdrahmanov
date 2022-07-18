import { Pagination } from '../models/pagination';
import { PaginationDto } from '../dtos/pagination.dto';
import { AnimeMapper } from '../mappers/anime.mapper';
import { AnimeDto } from '../dtos/anime.dto';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination {
    return new Pagination({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(AnimeMapper.fromDto),
    });
  }
}
