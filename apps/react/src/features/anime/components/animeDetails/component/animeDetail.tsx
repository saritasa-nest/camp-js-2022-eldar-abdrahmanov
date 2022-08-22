import { FC, memo } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';

interface Props {

  /** Anime detail title. */
  readonly detailTitle: string;

  /** Anime detail content. */
  readonly detailContent: string;
}

const AnimeDetailComponent: FC<Props> = ({ detailTitle, detailContent }) => (
  <>
    <ListItem alignItems="flex-start">
      <ListItemText
        sx={{ display: 'flex', flexDirection: 'column' }}
        primary={
          <Typography component="span" variant="h6" color="text.primary">
            {detailTitle}
          </Typography>
        }
        secondary={
          <Typography component="span" variant="subtitle2" color="text.primary">
            {detailContent}
          </Typography>
        }
      />
    </ListItem>
  </>
);

export const AnimeDetail = memo(AnimeDetailComponent);
