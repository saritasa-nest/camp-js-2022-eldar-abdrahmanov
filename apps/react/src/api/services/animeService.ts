import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/animeDetails.mapper';
import { DateTimeRangeMapper } from '@js-camp/core/mappers/dateTimeRange.mapper';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

  /** Fetches a pagination with anime list. */
  export async function getAnime(): Promise<Pagination<Anime>> {
    const { data } = await http.get<PaginationDto<AnimeDto>>(url, {
      params: { ordering: 'id' },
    });
    return PaginationMapper.fromDto(data, AnimeMapper.fromDto);
  }

  /**
   * Fetches an anime details.
   * @param id Anime id.
   */
  export async function getAnimeDetails(id: number) {
    const { data } = await http.get<AnimeDetailsDto>(`${url}/${id}`);
    return AnimeDetailsMapper.fromDto(
      data,
      DateTimeRangeMapper.fromDto,
      StudioMapper.fromDto,
      GenreMapper.fromDto,
    );
  }
}
