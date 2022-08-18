import React, { FC, memo } from 'react';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Anime } from '@js-camp/core/models/anime';

interface Props {

  /** Anime. */
  readonly anime: Anime;
}

const AnimeCardComponent: FC<Props> = ({ anime }) => (
  <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={anime.titleEng} src={anime.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={anime.titleEng}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                  Ali Connors
              </Typography>
              {' — I\'ll be in your neighborhood doing errands this…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  </>
);

export const AnimeCard = memo(AnimeCardComponent);
