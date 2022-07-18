import { Pagination } from "@js-camp/core/models/pagination";
import { PaginationDto } from "@js-camp/core/dtos/pagination.dto";
import { AnimeMapper } from "@js-camp/core/mappers/anime.mapper";
import { AnimeDto } from "@js-camp/core/dtos/anime.dto";

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<any> {
    return new Pagination({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(AnimeMapper.fromDto)
      }
    )
  }
}
