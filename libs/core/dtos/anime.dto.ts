import { AnimeStatus } from '@js-camp/core/enums/animeStatus';

import { AnimeType } from '../enums/animeType';

import { DateTimeRange } from './dateTimeRange';

/** Anime DTO. */
export interface AnimeDto {

  /** Id. */
  readonly id: number;

  /** Image. */
  readonly image: string;

  /** TitleEng. */
  readonly title_eng: string;

  /** TitleJpn. */
  readonly title_jpn: string;

  /** Type. */
  readonly type: AnimeType;

  /** Status. */
  readonly status: AnimeStatus;

  /** Aired. */
  readonly aired: DateTimeRange;
}
