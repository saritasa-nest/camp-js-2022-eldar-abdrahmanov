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
   * @param templateSelector Template selector.*/
  public createAnimeCard(templateSelector: string): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(templateSelector);
    const animeCard = template?.content.querySelector('.anime')?.cloneNode(true) as HTMLElement;
    if (animeCard) {
      this.getElement(
        animeCard,
        '.anime__image',
      ).style.backgroundImage = `url(${this.image}`;
      this.getElement(animeCard, '.anime__title_eng').textContent = `${
        this.titleEng ? this.titleEng : 'No title'
      }`;
      this.getElement(animeCard, '.anime__title_jpn').textContent = `${
        this.titleJpn ? this.titleJpn : 'タイトルなし'
      }`;
      this.getElement(animeCard, '.anime__type').textContent = `${
        this.type ? this.type : 'No info'
      }`;
      this.getElement(animeCard, '.anime__status').textContent = `${
        this.status ? this.status : 'No info'
      }`;
      this.getElement(animeCard, '.anime__aired-start').textContent = `${
        this.airedStart ? this.airedStart.getFullYear() : 'No info'
      }`;
    }
    return animeCard;
  }

  /** Checking if an element exists.
   * @param parentElement Looking for in this element.
   * @param selector The element selector we are looking for.*/
  private getElement(parentElement: HTMLElement, selector: string): HTMLElement {
    const element: HTMLElement = parentElement.querySelector(
      selector,
    ) as HTMLElement;
    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }
    return element;
  }
}
