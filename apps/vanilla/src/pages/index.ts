import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Anime } from '@js-camp/core/models/anime';

import { AnimeCard } from '../components/animeCard/animeCard';
import { API } from '../components/api';
import { Table } from '../components/animeTable/table';
import { PaginationContainer } from '../components/pagination/paginationContainer';
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import { PaginationCell } from '../components/pagination/paginationCell';
import { PaginationNext } from '../components/pagination/paginationNext';
import { PaginationPrevious } from '../components/pagination/paginationPrevious';

const limitAnimeOnPage = 25;
const numberOfPaginationIndexes = 10;

/** Initial instance Api. */
const api = new API();

/** Anime container. */
const animeTable = new Table('#anime-container');

/** Pagination container. */
const paginationContainer: PaginationContainer = new PaginationContainer(
  '#pagination-container',
  0,
  limitAnimeOnPage,
);

/** Pagination state variable. */
let currentPagination = await api.getPaginationAndAnimeList();

/** Instance of header button responsible for sorting by title eng. */
const titleEngSortButton = new TableHeaderButton('#table-title-eng', async() => {
  api.setSortParameter('title_eng');
  currentPagination = await api.getPaginationAndAnimeList();
  renderPage(numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by aired start. */
const airedStartSortButton = new TableHeaderButton('#table-aired-start', async() => {
  api.setSortParameter('aired__startswith');
  currentPagination = await api.getPaginationAndAnimeList();
  renderPage(numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by status. */
const statusSortButton = new TableHeaderButton('#table-status', async() => {
  api.setSortParameter('status');
  currentPagination = await api.getPaginationAndAnimeList();
  renderPage(numberOfPaginationIndexes, 0);
});

/**
 * The handler passed to the constructor when the pagination cell is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfCell Used to calculate offset in request.
 */
async function handlePaginationCellClick(indexOfCell: number): Promise<void> {
  const offset = indexOfCell * limitAnimeOnPage;
  api.setOffsetParameter(offset);
  currentPagination = await api.getPaginationAndAnimeList();
  animeTable.clearTable();
  renderTable();
}

/**
 * The handler passed to the constructor when the pagination next button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfLastCell Used to calculate offset in request.
 */
async function handlePaginationNextClick(indexOfLastCell: number): Promise<void> {
  const offset = indexOfLastCell * limitAnimeOnPage;
  api.setOffsetParameter(offset);
  currentPagination = await api.getPaginationAndAnimeList();
  renderPage(numberOfPaginationIndexes, indexOfLastCell);
}

/**
 * The handler passed to the constructor when the pagination previous button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfFirstCell Used to calculate offset in request.
 */
async function handlePaginationPreviousClick(indexOfFirstCell: number): Promise<void> {
  const offset = indexOfFirstCell * limitAnimeOnPage;
  api.setOffsetParameter(offset);
  currentPagination = await api.getPaginationAndAnimeList();
  renderPage(numberOfPaginationIndexes, indexOfFirstCell - numberOfPaginationIndexes);
}

/**
 * Creates and initializes a pagination cell array. Return array of HTML elements.
 * @param paginationLength Determines the length of the pagination on the page.
 * @param paginationStartIndex Determines the start index of the pagination on the page.
 */
function createPaginationCellList(
  paginationLength: number,
  paginationStartIndex: number,
): HTMLElement[] {
  const cellList: HTMLElement[] = [];
  for (
    let i = paginationStartIndex;
    i <= paginationLength + paginationStartIndex;
    i++
  ) {
    // Condition for defining the previous button
    if (i === paginationStartIndex) {
      cellList.push(
        new PaginationPrevious({
          label: '<<',
          clickHandler: handlePaginationPreviousClick,
          isDisable: i === 0,
        }).initiatePaginationCell(),
      );

      // Condition for defining the next button
    } else if (i === paginationLength + paginationStartIndex) {
      const maxPageNumber = currentPagination.count / 25;
      cellList.push(
        new PaginationNext({
          label: '>>',
          clickHandler: handlePaginationNextClick,
          isDisable: i >= maxPageNumber,
        }).initiatePaginationCell(),
      );
      break;
    } else {
      // Initiate simple pagination cell
      cellList.push(
        new PaginationCell({
          label: i.toString(),
          clickHandler: handlePaginationCellClick,
        }).initiatePaginationCell(),
      );
    }
  }
  return cellList;
}

/** Render table. */
function renderTable(): void {
  const animeList = currentPagination.results;
  animeList?.forEach((item: Anime) => {
    animeTable.renderElement(new AnimeCard(item).createAnimeCard('.anime-template'));
  });
}

/**
 * Sends a request and updates the table and pagination.
 * @param paginationLength Determines the length of the pagination on the page.
 * @param paginationStartIndex Determines the start index of the pagination on the page.
 */
function renderPage(paginationLength: number, paginationStartIndex: number): void {
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    paginationStartIndex,
  );
  paginationContainer.renderPagination(paginationCellList);
  animeTable.clearTable();
  renderTable();
}

renderPage(numberOfPaginationIndexes, 0);

/** Set event listeners on sorting buttons. */
statusSortButton.setEventListener();
airedStartSortButton.setEventListener();
titleEngSortButton.setEventListener();
