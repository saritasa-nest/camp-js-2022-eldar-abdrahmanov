import Anime from '@js-camp/core/models/anime';

/** AnimeCard. */
export default class AnimeCard {
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

  public constructor(anime: Anime) {
    this.id = anime.id;
    this.titleEng = anime.titleEng;
    this.titleJpn = anime.titleJpn;
    this.image = anime.image;
    this.airedStart = anime.airedStart;
    this.type = anime.type;
    this.status = anime.status;
  }

/** Create and initiate an anime card from a template. Return HTML element.
 * @param templateSelector template selector*/
  public createAnimeCard(templateSelector: string): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(templateSelector);
    const animeCard = template?.content.querySelector('.anime')?.cloneNode(true) as HTMLElement | null;

    this.getElement(animeCard, '.anime__image')

    const animeImage = animeCard?.querySelector('.anime__image') as HTMLElement;
    if(animeImage) animeImage.style.backgroundImage = `url(${this.image}`;

    const animeTitleEng = animeCard?.querySelector('.anime__title_eng') as HTMLElement
    if(animeTitleEng) animeTitleEng.textContent = `${(this.titleEng) ? this.titleEng : 'No title'}`;

    const animeTitleJpn = animeCard?.querySelector('.anime__title_jpn') as HTMLElement
    if(animeTitleJpn) animeTitleEng.textContent = `${(this.titleJpn) ? this.titleJpn : 'タイトルなし'}`;

    const animeType = animeCard?.querySelector('.anime__type') as HTMLElement
    if(animeType) animeTitleEng.textContent = `${(this.type) ? this.type : 'No info'}`;

    const animeStatus = animeCard?.querySelector('.anime__status') as HTMLElement
    if(animeStatus) animeTitleEng.textContent = `${(this.status) ? this.status : 'No info'}`;

    animeCard.querySelector('.anime__status').textContent = `${(this.status) ? this.status : 'No info'}`;
    animeCard.querySelector('.anime__aired-start').textContent = `${(this.airedStart) ? this.airedStart.getFullYear() : 'No info'}`;
    return animeCard;
  }

  getElement(parentElement: HTMLElement | null, selector: string): HTMLElement {
    let element: HTMLElement;
    if(parentElement) {
      element = parentElement.querySelector(selector)
    }
    if(!element) {
      throw new Error("Element not found");
    }
    return element
  }
}
