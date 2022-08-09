import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails.dto';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { DateTimeRangeMapper } from '@js-camp/core/mappers/dateTimeRange.mapper';
import { DateTimeRangeDto } from '@js-camp/core/dtos/dateTimeRange.dto';
import { DateTimeRange } from '@js-camp/core/models/dateTimeRange';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';

export namespace AnimeDetailsMapper {
  /**
   * Maps dto to model.
   * @param dto AnimeDetails dto.
   * @param airedMapper
   * @param studioMapper
   * @param genreMapper
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
