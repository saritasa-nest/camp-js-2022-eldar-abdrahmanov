import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnime,
  selectAreAnimeLoading,
} from '@js-camp/react/store/anime/selectors';

import { AnimeCard } from '../components/animeCard';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnime);
  const isLoading = useAppSelector(selectAreAnimeLoading);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const getAnimeList = () =>
    animeList.map(anime => <AnimeCard anime={anime} key={anime.id} />);

  return (
    <>
      <h1>Anime</h1>
      {getAnimeList()}
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
