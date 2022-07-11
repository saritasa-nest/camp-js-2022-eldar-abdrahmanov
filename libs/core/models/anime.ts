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

  createAnimeCard(templateSelector: string): HTMLElement {
    const template = document.querySelector(templateSelector) as HTMLElement;
    const animeCard = template.content.querySelector('.anime').cloneNode(true);
    animeCard.querySelector('.anime__image').style.backgroundImage = `url(${this.image}`;
    animeCard.querySelector('.anime__title_eng').textContent = `${(this.titleEng)? this.titleEng: 'No title'}`;
    animeCard.querySelector('.anime__title_jpn').textContent = `${(this.titleJpn)? this.titleJpn: 'タイトルなし'}`;
    animeCard.querySelector('.anime__type').textContent = `${(this.type)? this.type: 'No info'}`;
    animeCard.querySelector('.anime__status').textContent = `${(this.status)? this.status: 'No info'}`;
    animeCard.querySelector('.anime__aired-start').textContent = `${(this.airedStart)? this.airedStart.getFullYear(): 'No info'}`;
    return animeCard;
  }
}
