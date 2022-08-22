import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnime,
  selectAreAnimeLoading,
} from '@js-camp/react/store/anime/selectors';
import { Box, Typography } from '@mui/material';

import { AnimeCard } from '../components/animeCard';
import { AnimeDetails } from '../components/animeDetails/animeDetails';

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
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box>
          <Typography component="span" variant="h4" color="text.primary">
            Anime List
          </Typography>
          <Box sx={{
            mt: 5,
          }}>
            {getAnimeList()}
          </Box>
        </Box>
        <Box
          sx={{
            width: 1,
            pl: 7,
            position: 'fixed',
            left: 350,
          }}
        >
          <Typography component="span" variant="h4" color="text.primary">
            Anime Details
          </Typography>
          <AnimeDetails/>
        </Box>
      </Box>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
