import { AnimeDetailsDto } from '../dtos/animeDetails.dto';
import { AnimeDetails } from '../models/animeDetails';

import { DateTimeRangeMapper } from './dateTimeRange.mapper';
import { StudioMapper } from './studio.mapper';
import { GenreMapper } from './genre.mapper';

export namespace AnimeDetailsMapper {

  /**
   * Maps dto to model.
   * @param dto AnimeDetails dto.
   * @param airedMapper Maps airedDto to aired model.
   * @param studioMapper Maps studioDto to studio model.
   * @param genreMapper Maps genreDto to genre model.
   */
  export function fromDto(
    dto: AnimeDetailsDto,
    airedMapper: typeof DateTimeRangeMapper.fromDto,
    studioMapper: typeof StudioMapper.fromDto,
    genreMapper: typeof GenreMapper.fromDto,
  ): AnimeDetails {
    return new AnimeDetails({
      id: dto.id,
      imageUrl: dto.image,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      aired: airedMapper(dto.aired),
      airing: dto.airing,
      type: dto.type,
      status: dto.status,
      synopsis: dto.synopsis,
      listOfStudios: dto.studios_data.map(res => studioMapper(res)),
      listOfGenres: dto.genres_data.map(res => genreMapper(res)),
    });
  }
}
