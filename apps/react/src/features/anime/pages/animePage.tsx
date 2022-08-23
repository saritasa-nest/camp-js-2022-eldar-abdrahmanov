import React, { FC, memo, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchAnime, fetchNextAnime } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnime,
  selectAreAnimeLoading, selectedPagination,
} from '@js-camp/react/store/anime/selectors';
import { Box, Typography } from '@mui/material';

import { AnimeCard } from '../components/animeCard';
import { AnimeDetails } from '../components/animeDetails/animeDetails';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectedPagination);
  const animeList = useAppSelector(selectAnime);
  const isLoading = useAppSelector(selectAreAnimeLoading);
  const lastCard = useRef(null);

  const scrollCallback = entries => {
    const [ entry ] = entries
    if (pagination.next !== null) {
      //dispatch(fetchNextAnime(pagination.next));
    }
    console.log(lastCard.current)
    console.log(entry.isIntersecting);
    console.log(pagination)
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  useEffect(() => {
    dispatch(fetchAnime('25'));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(scrollCallback, options);
    if (lastCard.current) {
      observer.observe(lastCard.current);
    }
  }, [lastCard, options]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const getAnimeList = animeList.map(anime => (
    <AnimeCard anime={anime} key={anime.id}/>
  ));

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
            {getAnimeList}
            <div ref={lastCard}></div>
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
