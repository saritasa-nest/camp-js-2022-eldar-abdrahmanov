import { AnimeStatus } from '../enums/statusType';
import { AnimeType } from '../enums/animeType';

import { StudioDto } from './studio.dto';
import { GenreDto } from './genre.dto';

import { DateTimeRangeDto } from './dateTimeRange.dto';

/** Anime details DTO. */
export interface AnimeDetailsDto {

  /** Id. */
  readonly id: number;

  /** Created date. */
  readonly created: string;

  /** Modified date. */
  readonly modified: string;

  /** Trailer YouTube id. */
  readonly trailer_youtube_id: string;

  /** Source. */
  readonly source: string;

  /** Airing. */
  readonly airing: boolean;

  /** Image url. */
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

  /** Rating. */
  readonly rating: string;

  /** Season. */
  readonly season: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Background. */
  readonly background: string;

  /** Broadcast day. */
  readonly broadcast_day: number;

  /** Broadcast time. */
  readonly broadcast_time: string;

  /** Broadcast timezone. */
  readonly broadcast_timezone: string;

  /** Studios. */
  readonly studios: readonly number[];

  /** Studios list. */
  readonly studios_data: readonly StudioDto[];

  /** Genres. */
  readonly genres: readonly number[];

  /** Genres list. */
  readonly genres_data: readonly GenreDto[];
}
