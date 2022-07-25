import { Anime } from '@js-camp/core/models/anime';

import { getElement } from '../../utils/utils';

import { NO_INFO, NO_TITLE } from './constants';

/** AnimeCard. */
export class AnimeCard {

  /** Anime model. */
  public readonly anime: Anime;

  public constructor(anime: Anime) {
    this.anime = anime;
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
      ).style.backgroundImage = `url(${this.anime.imageUrl}`;
      getElement(animeCard, '.anime__title_eng').textContent = `${
        this.anime.titleEng ? this.anime.titleEng : NO_TITLE
      }`;
      getElement(animeCard, '.anime__title_jpn').textContent = `${
        this.anime.titleJpn ? this.anime.titleJpn : NO_TITLE
      }`;
      getElement(animeCard, '.anime__type').textContent = `${
        this.anime.type ? this.anime.type : NO_INFO
      }`;
      getElement(animeCard, '.anime__status').textContent = `${
        this.anime.status ? this.anime.status : NO_INFO
      }`;
      getElement(animeCard, '.anime__aired-start').textContent = `${
        this.anime.airedStart ? this.anime.airedStart.getFullYear() : NO_INFO
      }`;
    }
    return animeCard;
  }
}
