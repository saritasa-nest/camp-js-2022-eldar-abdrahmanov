import Anime from '../components/models/anime';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAnimeList } from '../components/api';
import { Table } from '../components/animeTable/table';
import { PaginationContainer } from '../components/pagination/paginationContainer';
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import Pagination from '../components/models/pagination';
import PaginationCell from '../components/pagination/paginationCell';
import PaginationNext from '../components/pagination/paginationNext';
import PaginationPrevious from '../components/pagination/paginationPrevious';
import {
  SORT_BY_TITLE_ENG_URL,
  SORT_BY_AIRED_START_URL,
  SORT_BY_STATUS_URL,
  SORT_BY_ID_URL,
  BASE_URL,
} from '../components/constants/constants';

const limitAnimeOnPage = 25;
const paginationLength = 10;
let ordering = 'id';
const animeTable: Table = new Table('#anime-container');
const paginationContainer: PaginationContainer = new PaginationContainer(
  '#pagination-container',
  0,
  25
);
let currentPagination: Pagination = new Pagination(0, '', '', []);

const titleEngSortBtn = new TableHeaderButton('#table-title-eng', () => {
  ordering = 'title_eng';
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    0
  );
  paginationContainer.renderPagination(paginationCellList);
  refreshTableAndPagination(SORT_BY_TITLE_ENG_URL);
});

const airedStartSortBtn = new TableHeaderButton('#table-aired-start', () => {
  ordering = 'aired__startswith';
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    0
  );
  paginationContainer.renderPagination(paginationCellList);
  refreshTableAndPagination(SORT_BY_AIRED_START_URL);
});

const statusSortBtn = new TableHeaderButton('#table-status', () => {
  ordering = 'status';
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    0
  );
  paginationContainer.renderPagination(paginationCellList);
  refreshTableAndPagination(SORT_BY_STATUS_URL);
});

function refreshTableAndPagination(url: string) {
  Promise.all([getAnimeList(url)]).then((res: any) => {
    currentPagination.setPaginationData(
      res[0].count,
      res[0].next,
      res[0].previous,
      transformResToAnimeList(res[0].results)
    );
    animeTable.clearTable();
    renderTable();
  });
}

function handlePaginationNumClick(indexOfCell: number) {
  refreshTableAndPagination(
    `${BASE_URL}${indexOfCell * limitAnimeOnPage}&ordering=${ordering}`
  );
}

function handlePaginationNextClick(indexOfLastCell: number) {
  refreshTableAndPagination(
    `${BASE_URL}${indexOfLastCell * limitAnimeOnPage}&ordering=${ordering}`
  );
  const paginationCellList = createPaginationCellList(
    paginationLength,
    indexOfLastCell
  );
  paginationContainer.renderPagination(paginationCellList);
}

function handlePaginationPreviousClick(indexOfFirstCell: number) {
  refreshTableAndPagination(
    `${BASE_URL}${
      (indexOfFirstCell - paginationLength) * limitAnimeOnPage
    }&ordering=${ordering}`
  );
  const paginationCellList = createPaginationCellList(
    paginationLength,
    indexOfFirstCell - paginationLength
  );
  paginationContainer.renderPagination(paginationCellList);
}

function createPaginationCellList(
  paginationLength: number,
  paginationStartIndex: number
): HTMLElement[] {
  const cellsList: HTMLElement[] = [];
  for (
    let i = paginationStartIndex;
    i <= paginationLength + paginationStartIndex;
    i++
  ) {
    if (i === paginationStartIndex) {
      cellsList.push(
        new PaginationPrevious(
          '<<',
          handlePaginationPreviousClick,
          i === 0
        ).initiatePaginationCell()
      );
    } else if (i === paginationLength + paginationStartIndex) {
      const maxPageNumber = currentPagination.count / 25;
      cellsList.push(
        new PaginationNext(
          '>>',
          handlePaginationNextClick,
          i >= maxPageNumber
        ).initiatePaginationCell()
      );
      break;
    } else
      cellsList.push(
        new PaginationCell(i, handlePaginationNumClick).initiatePaginationCell()
      );
  }
  return cellsList;
}

function transformResToAnimeList(response: []): Anime[] {
  const animeList: Anime[] = [];
  response.forEach((item: any) => {
    animeList.push(
      new Anime(
        item.id,
        item.title_eng,
        item.title_jpn,
        item.image,
        new Date(item.aired.start),
        item.type,
        item.status
      )
    );
  });
  return animeList;
}

function renderTable() {
  const animeList = currentPagination.getResults();
  // @ts-ignore
  animeList.forEach((item) => {
    animeTable.renderElement(item.createAnimeCard('.anime-template'));
  });
}

Promise.all([getAnimeList(SORT_BY_ID_URL)]).then((res: any) => {
  currentPagination.setPaginationData(
    res[0].count,
    res[0].next,
    res[0].previous,
    transformResToAnimeList(res[0].results)
  );
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    0
  );
  paginationContainer.renderPagination(paginationCellList);
  renderTable();
});

statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();
