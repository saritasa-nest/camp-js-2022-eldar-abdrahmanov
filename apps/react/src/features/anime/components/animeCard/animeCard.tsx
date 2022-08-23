import { FC, memo } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Anime } from "@js-camp/core/models/anime";

interface Props {
  /** Anime. */
  readonly anime: Anime;
}

const AnimeCardComponent: FC<Props> = ({ anime }) => (
  <List
    sx={{
      width: "100%",
      maxWidth: 360,
      bgcolor: "background.paper",
      borderRadius: 1,
      border: 1,
      mb: 1,
    }}
  >
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          sx={{ width: 80, height: 80, mr: 2 }}
          alt={anime.titleEng}
          src={anime.imageUrl}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.primary"
            >
              {anime.titleEng}
            </Typography>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.primary"
            >
              {anime.titleJpn}
            </Typography>
          </Box>
        }
        secondary={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.primary"
            >
              {anime.type}
            </Typography>
            <Typography
              component="span"
              variant="subtitle2"
              color="text.primary"
            >
              {anime.status}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  </List>
);

export const AnimeCard = memo(AnimeCardComponent);
