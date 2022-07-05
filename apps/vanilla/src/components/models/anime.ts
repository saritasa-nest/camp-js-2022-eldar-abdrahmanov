export default class Anime {
  public readonly id: number;
  public readonly image: string;
  public readonly titleEng: string;
  public readonly titleJpn: string;
  public readonly type: string;
  public readonly status: string;
  public readonly airedStart: Date;
  constructor(
    id: number,
    titleEng: string,
    titleJpn: string,
    image: string,
    airedStart: Date,
    type: string,
    status: string
  ) {
    this.id = id;
    this.titleEng = titleEng;
    this.titleJpn = titleJpn;
    this.image = image;
    this.airedStart = airedStart;
    this.type = type;
    this.status = status;
  }
}


