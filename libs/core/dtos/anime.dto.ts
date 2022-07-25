import { AnimeStatus } from '../enums/statusType';
import { AnimeType } from '../enums/animeType';

import { DateTimeRangeDto } from './dateTimeRange.dto';

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
  readonly aired: DateTimeRangeDto;
}
