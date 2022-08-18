import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

/** Anime state. */
export interface AnimeState {

  /** Pagination. */
  readonly pagination: Pagination<Anime>;

  /** Anime list. */
  readonly anime: Anime[];

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AnimeState = {
  isLoading: false,
  pagination: new Pagination<Anime>({ next: '', previous: '', count: 0, results: [] }),
  anime: [],
};
