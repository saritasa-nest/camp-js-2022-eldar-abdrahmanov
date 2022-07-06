import Anime from '../components/models/anime';
import { getAnimeList } from '../components/api';
import { Table } from '../components/table';
import { TableHeaderButton } from '../components/models/tableHeaderButton';
import {
  SORT_BY_AIRED_START_URL,
  SORT_BY_STATUS_URL,
  SORT_BY_TITLE_ENG_URL,
  SORT_BY_ID_URL,
} from '../components/constants/constants';

const animeTable: Table = new Table('#anime-container');

const titleEngSortBtn = new TableHeaderButton('#table-title-eng', () => {
  animeTable.clearTable();
  renderTable(SORT_BY_TITLE_ENG_URL);
});

const airedStartSortBtn = new TableHeaderButton('#table-aired-start', () => {
  animeTable.clearTable();
  renderTable(SORT_BY_AIRED_START_URL);
});

const statusSortBtn = new TableHeaderButton('#table-status', () => {
  animeTable.clearTable();
  renderTable(SORT_BY_STATUS_URL);
});

statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();

renderTable(SORT_BY_ID_URL);

function renderTable(url: string) {
  getAnimeList(url).then((res) => {
    res.results.forEach((item: any) => {
      animeTable.renderElement(
        new Anime(
          item.id,
          item.title_eng,
          item.title_jpn,
          item.image,
          new Date(item.aired.start),
          item.type,
          item.status
        ).createAnimeCard('.anime-template')
      );
    });
  });
}
