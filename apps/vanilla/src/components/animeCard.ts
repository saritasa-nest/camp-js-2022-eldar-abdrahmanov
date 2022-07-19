import { Anime } from '@js-camp/core/models/anime';
import { AnimeStatus } from '@js-camp/core/enums/statusType';

import { getElement } from '../utils/utils';

/** AnimeCard. */
export class AnimeCard {
  /** Id. */
  public readonly id: number;

  /** Image URL. */
  public readonly imageURL: string;

  /** TitleEng. */
  public readonly titleEng: string;

  /** TitleJpn. */
  public readonly titleJpn: string;

  /** Type. */
  public readonly type: string;

  /** Status. */
  public readonly status: AnimeStatus;

  /** AiredStart. */
  public readonly airedStart: Date;

  public constructor(anime: Anime) {
    this.id = anime.id;
    this.titleEng = anime.titleEng;
    this.titleJpn = anime.titleJpn;
    this.imageURL = anime.image;
    this.airedStart = anime.airedStart;
    this.type = anime.type;
    this.status = anime.status;
  }

  /**
   * Create and initiate an anime card from a template. Return HTML element.
   * @param templateSelector Template selector.
   */
  public createAnimeCard(templateSelector: string): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(templateSelector);
    if (template === null) {
      throw new Error('Template not found');
    }
    const templateContent = template.content.querySelector('.anime');
    if (templateContent === null) {
      throw new Error('Template not found');
    }
    const animeCard = templateContent.cloneNode(true) as HTMLElement;
    if (animeCard !== null) {
      getElement<HTMLElement>(
        animeCard,
        '.anime__image',
      ).style.backgroundImage = `url(${this.imageURL}`;
      getElement(animeCard, '.anime__title_eng').textContent = `${
        this.titleEng ? this.titleEng : 'No title'
      }`;
      getElement(animeCard, '.anime__title_jpn').textContent = `${
        this.titleJpn ? this.titleJpn : 'タイトルなし'
      }`;
      getElement(animeCard, '.anime__type').textContent = `${
        this.type ? this.type : 'No info'
      }`;
      getElement(animeCard, '.anime__status').textContent = `${
        this.status ? this.status : 'No info'
      }`;
      getElement(animeCard, '.anime__aired-start').textContent = `${
        this.airedStart ? this.airedStart.getFullYear() : 'No info'
      }`;
    }
    return animeCard;
  }
}
