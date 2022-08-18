import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

  /** Fetches a pagination with anime list. */
  export async function getAnime(): Promise<Pagination<Anime>> {
    const { data } = await http.get<PaginationDto<AnimeDto>>(url, { params: { ordering: 'id' } });
    return PaginationMapper.fromDto(data, AnimeMapper.fromDto);
  }
}
