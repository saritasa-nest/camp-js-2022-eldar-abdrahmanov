import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import {
  fetchAnime,
  fetchNextAnime,
} from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnime,
  selectAreAnimeLoading,
  selectedPagination,
} from '@js-camp/react/store/anime/selectors';
import {
  Box,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { InView } from 'react-intersection-observer';

import { AnimeCard } from '../components/animeCard';
import { AnimeDetails } from '../components/animeDetails/animeDetails';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectedPagination);
  const animeList = useAppSelector(selectAnime);
  const isLoading = useAppSelector(selectAreAnimeLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({});
  const [isLastCard, setIsLastCard] = useState(false);
  const lastCard = useRef(null);
  const [isTitleSortActive, setTitleSortActive] = useState(false);
  const [titleSortDirection, setTitleSortDirection] = useState('asc');
  const [isStatusSortActive, setStatusSortActive] = useState(false);
  const [statusSortDirection, setStatusSortDirection] = useState('asc');

  useEffect(() => {
    setParams({ order: 'id', offset: '25', limit: '25' });
    setSearchParams({ order: 'id', offset: '0', limit: '25' });
  },[]);

  function getParams() {
    const mappedParams: Record<string, string> = {};
    for (const key of searchParams.keys()) {
      mappedParams[key] = searchParams.get(key) as string
    }
    console.log(mappedParams)
  }

  useEffect(() => {

    if (isLastCard && pagination.next !== null) {
      dispatch(fetchNextAnime(pagination.next));
    }
  }, [isLastCard]);

  useEffect(() => {
    dispatch(fetchAnime(params));
  }, []);

  const getAnimeList = animeList.map((anime, index) => {
    const animeCard = <AnimeCard anime={anime} key={anime.id} />;
    if (index + 1 === animeList.length) {
      return (
        <InView
          key={anime.id}
          threshold={0.5}
          root={null}
          rootMargin="0px"
          onChange={inView => {
            setIsLastCard(inView);
          }}
        >
          {({ ref }) => <div ref={ref}>{animeCard}</div>}
        </InView>
      );
    }
    return animeCard;
  });

  const onTitleSortClick = () => {
    if (isTitleSortActive) {
      setTitleSortDirection(titleSortDirection === 'asc' ? 'desc' : 'asc');
    }
    setTitleSortActive(true);
    setStatusSortActive(false);
  };

  const onStatusSortClick = () => {
    if (isStatusSortActive) {
      setStatusSortDirection(statusSortDirection === 'asc' ? 'desc' : 'asc');
    }
    setStatusSortActive(true);
    setTitleSortActive(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box>
          <Box>
            <Typography component="span" variant="h4" color="text.primary">
              Anime List
            </Typography>
            <Box>
              <TableSortLabel
                active={isTitleSortActive}
                direction={titleSortDirection}
                onClick={onTitleSortClick}
              >
                TITLE
              </TableSortLabel>
              <TableSortLabel
                active={isStatusSortActive}
                direction={statusSortDirection}
                onClick={onStatusSortClick}
              >
                STATUS
              </TableSortLabel>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 5,
            }}
          >
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
          <AnimeDetails />
        </Box>
      </Box>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
