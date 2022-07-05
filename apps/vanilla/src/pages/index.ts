import Anime from '../components/models/anime';
import { getAnimeList } from '../components/Api';


const animeContainer = document.querySelector('.anime-container');

getAnimeList('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/list-cursor/?ordering=id').then(
  (res) => {
    res.results.forEach((item: any) => {
      if (animeContainer) {
        animeContainer.append(
          createAnimeCard(
            new Anime(
              item.id,
              item.title_eng,
              item.title_jpn,
              item.image,
              new Date(item.aired.start),
              item.type,
              item.status
            )
          )
        );
      }
    });
  }
);

  function createAnimeCard(anime: Anime) {
    const template = document.querySelector(
      '.anime-template'
    ) as HTMLInputElement;
    const animeTemplate = template.content
      .querySelector('.anime')
      .cloneNode(true);

    animeTemplate.querySelector('.anime__image').style.backgroundImage = `url(${anime.image}`;
    animeTemplate.querySelector('.anime__title_eng').textContent = `${(anime.titleEng)? anime.titleEng: 'No title'}`;
    animeTemplate.querySelector('.anime__title_jpn').textContent = `${(anime.titleJpn)? anime.titleJpn: 'タイトルなし'}`;
    animeTemplate.querySelector('.anime__type').textContent = `Type: ${(anime.type)? anime.type: 'No info'}`;
    animeTemplate.querySelector('.anime__status').textContent = `Status: ${(anime.status)? anime.status: 'No info'}`;
    animeTemplate.querySelector('.anime__aired-start').textContent = `Aired start: ${(anime.airedStart)? anime.airedStart.getFullYear(): 'No info'}`;
    return animeTemplate;
  }

