import { AnimeType } from '../enums/animeType';

import { AnimeStatus } from '../enums/statusType';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

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

  /** AiredStart. */
  public readonly airedStart: Date;

  public constructor(data: Args) {
    super();
    this.id = data.id;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.imageUrl = data.imageUrl;
    this.airedStart = data.airedStart;
    this.type = data.type;
    this.status = data.status;
  }
}

type Args = OmitImmerable<Anime>;
