import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export default class Anime extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** TitleEng. */
  public readonly titleEng: string;

  /** TitleJpn. */
  public readonly titleJpn: string;

  /** Type. */
  public readonly type: string;

  /** Status. */
  public readonly status: string;

  /** AiredStart. */
  public readonly airedStart: Date;

  public constructor(data: Args) {
    super();
    this.id = data.id;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.image = data.image;
    this.airedStart = data.airedStart;
    this.type = data.type;
    this.status = data.status;
  }
}

type Args = OmitImmerable<Anime>;
