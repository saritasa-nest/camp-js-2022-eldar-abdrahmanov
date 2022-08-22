import { FC, memo } from 'react';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { useAppSelector } from '@js-camp/react/store';
import { selectAnimeDetails } from '@js-camp/react/store/animeDetails/selectors';

import { AnimeDetail } from './component/animeDetail';

const AnimeDetailsComponent: FC = () => {
  const selectedAnime = useAppSelector(selectAnimeDetails);

  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 1,
          bgcolor: 'background.paper',
          ml: 1,
          mt: 2,
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              sx={{ width: 80, height: 80, mr: 2 }}
              alt={selectedAnime.titleEng}
              src={selectedAnime.imageUrl}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography component="span" variant="h5" color="text.primary">
                  {selectedAnime.titleEng}
                </Typography>
                <Typography component="span" variant="h5" color="text.primary">
                  {selectedAnime.titleJpn}
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <AnimeDetail detailTitle='Anime type' detailContent={selectedAnime.type}/>
        <AnimeDetail detailTitle='Anime status' detailContent={selectedAnime.status}/>
        <AnimeDetail detailTitle='Airing' detailContent={selectedAnime.airing ? 'Is on air' : 'Broadcasting ended'}/>
        <AnimeDetail detailTitle='Aired start' detailContent={selectedAnime.aired.start.toDateString()}/>
        <AnimeDetail detailTitle='Aired end' detailContent={selectedAnime.aired.end.toDateString()}/>
        <AnimeDetail detailTitle='Studios' detailContent={selectedAnime.listOfStudios.join(',')}/>
        <AnimeDetail detailTitle='Genres' detailContent={selectedAnime.listOfGenres.join(',')}/>
      </List>
    </>
  );
};

export const AnimeDetails = memo(AnimeDetailsComponent);
