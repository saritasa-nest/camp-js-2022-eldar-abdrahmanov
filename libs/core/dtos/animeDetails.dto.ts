import { StudioDto } from '@js-camp/core/dtos/studio.dto';

import { GenreDto } from '@js-camp/core/dtos/genre.dto';

import { AnimeStatus } from '../enums/statusType';
import { AnimeType } from '../enums/animeType';

import { DateTimeRangeDto } from './dateTimeRange.dto';

/** Anime details DTO. */
export interface AnimeDetailsDto {

  /** Id. */
  readonly id: number;

  /** */
  readonly created: string;

  /** */
  readonly modified: string;

  /** */
  readonly trailer_youtube_id: string;

  /** */
  readonly source: string;

  /** */
  readonly airing: boolean;

  /** Image. */
  readonly image: string;

  /** Title english. */
  readonly title_eng: string;

  /** Title japanese. */
  readonly title_jpn: string;

  /** Type. */
  readonly type: AnimeType;

  /** Status. */
  readonly status: AnimeStatus;

  /** Aired. */
  readonly aired: DateTimeRangeDto;

  /** */
  readonly rating: string;

  /** */
  readonly season: string;

  /** */
  readonly synopsis: string;

  /** */
  readonly background: string;

  /** */
  readonly broadcast_day: number;

  /** */
  readonly broadcast_time: string;

  /** */
  readonly broadcast_timezone: string;

  /** */
  readonly studios: readonly number[];

  /** */
  readonly studios_data: readonly StudioDto[];

  /** */
  readonly genres: readonly number[];

  /** */
  readonly genres_data: readonly GenreDto[];
}
