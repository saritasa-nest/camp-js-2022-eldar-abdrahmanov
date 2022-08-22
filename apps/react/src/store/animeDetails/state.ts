import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { AnimeType } from '@js-camp/core/enums/animeType';
import { AnimeStatus } from '@js-camp/core/enums/statusType';
import { DateTimeRange } from '@js-camp/core/models/dateTimeRange';

/** Anime details. */
export interface AnimeDetailsState {

  /** Details. */
  readonly details: AnimeDetails;

  /** Whether the anime details are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AnimeDetailsState = {
  isLoading: false,
  details: new AnimeDetails({
    id: 0,
    imageUrl: '',
    titleEng: '',
    titleJpn: '',
    type: AnimeType.TV,
    status: AnimeStatus.NotYetAired,
    airing: false,
    synopsis: '',
    listOfStudios: [],
    listOfGenres: [],
    aired: new DateTimeRange({ start: new Date(), end: new Date() }),
  }),
};
