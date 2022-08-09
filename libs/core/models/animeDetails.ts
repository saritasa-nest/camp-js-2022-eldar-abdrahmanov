import { DateTimeRange } from '@js-camp/core/models/dateTimeRange';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';

import { AnimeType } from '../enums/animeType';
import { AnimeStatus } from '../enums/statusType';

import { Immerable, OmitImmerable } from './immerable';

/** Anime details. */
export class AnimeDetails extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Url of image. */
  public readonly imageUrl: string;

  /** English title. */
  public readonly titleEng: string;

  /** Japanese title. */
  public readonly titleJpn: string;

  /** Type. */
  public readonly type: AnimeType;

  /** Status. */
  public readonly status: AnimeStatus;

  /** Synopsis. */
  public readonly synopsis: string;

  /** Airing. */
  public readonly airing: boolean;

  /** Aired. */
  public readonly aired: DateTimeRange;

  /** List of studios. */
  public readonly listOfStudios: Studio[];

  /** */
  public readonly listOfGenres: Genre[];

  public constructor(data: Args) {
    super();
    this.id = data.id;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.imageUrl = data.imageUrl;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.listOfStudios = data.listOfStudios;
    this.listOfGenres = data.listOfGenres;
  }
}

type Args = OmitImmerable<AnimeDetails>;
