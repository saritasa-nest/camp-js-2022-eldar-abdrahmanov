import AiredDto from './aired.dto';
import {AnimeType} from '../unions/animeType';
import { AnimeStatus } from "@js-camp/core/unions/statusType";

/** Anime DTO. */
export interface AnimeDto {
  /** Id*/
  readonly id: number;

  /** Image*/
  readonly image: string;

  /** TitleEng*/
  readonly title_eng: string;

  /** TitleJpn*/
  readonly title_jpn: string;

  /** Type*/
  readonly type: AnimeType;

  /** Status*/
  readonly status: AnimeStatus;

  /** Aired*/
  readonly aired: AiredDto;
}
