import 'bootstrap/dist/css/bootstrap.min.css';
import AnimeCard from '../components/animeCard';
import { getPagination } from '../components/api';
import { Table } from '../components/animeTable/table';
import { PaginationContainer } from '../components/pagination/paginationContainer';
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import Pagination from '../components/pagination/pagination';
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
const numberOfPaginationIndexes = 10;

/** Sorting state variable. Used in request. */
let ordering = 'id';

/** Anime container. */
const animeTable: Table = new Table('#anime-container');

/** Pagination container. */
const paginationContainer: PaginationContainer = new PaginationContainer(
  '#pagination-container',
  0,
  25,
);

/** Pagination state variable. */
let currentPagination: Pagination = new Pagination(0, '', '', []);

/** Instance of header button responsible for sorting by title eng. */
const titleEngSortBtn = new TableHeaderButton('#table-title-eng', () => {
  ordering = 'title_eng';
  renderPage(SORT_BY_TITLE_ENG_URL, numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by aired start. */
const airedStartSortBtn = new TableHeaderButton('#table-aired-start', () => {
  ordering = 'aired__startswith';
  renderPage(SORT_BY_AIRED_START_URL, numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by status. */
const statusSortBtn = new TableHeaderButton('#table-status', () => {
  ordering = 'status';
  renderPage(SORT_BY_STATUS_URL, numberOfPaginationIndexes, 0);
});

/** The handler passed to the constructor when the pagination cell is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfCell Used to calculate offset in request.
 */
function handlePaginationCellClick(indexOfCell: number): void {
  getPagination(`${BASE_URL}${indexOfCell * limitAnimeOnPage}&ordering=${ordering}`)
    .then(res => {
      currentPagination = res;
      animeTable.clearTable();
      renderTable();
    });
}

/** The handler passed to the constructor when the pagination next button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfLastCell Used to calculate offset in request.
 */
function handlePaginationNextClick(indexOfLastCell: number): void {
  renderPage(`${BASE_URL}${indexOfLastCell * limitAnimeOnPage}&ordering=${ordering}`,
    numberOfPaginationIndexes,
    indexOfLastCell);
}

/** The handler passed to the constructor when the pagination previous button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfFirstCell Used to calculate offset in request.
 */
function handlePaginationPreviousClick(indexOfFirstCell: number): void {
  renderPage(`${BASE_URL}${(indexOfFirstCell - numberOfPaginationIndexes) * limitAnimeOnPage}&ordering=${ordering}`,
    numberOfPaginationIndexes,
    indexOfFirstCell - numberOfPaginationIndexes);
}

/** Creates and initializes a pagination cell array. Return array of HTML elements.
 * @param paginationLength Determines the length of the pagination on the page.
 * @param paginationStartIndex Determines the start index of the pagination on the page.
 * */
function createPaginationCellList(
  paginationLength: number,
  paginationStartIndex: number,
): HTMLElement[] {
  const cellsList: HTMLElement[] = [];
  for (
    let i = paginationStartIndex;
    i <= paginationLength + paginationStartIndex;
    i++
  ) {

    // Condition for defining the previous button
    if (i === paginationStartIndex) {
      cellsList.push(
        new PaginationPrevious(
          '<<',
          handlePaginationPreviousClick,
          i === 0,
        ).initiatePaginationCell(),
      );

      // Condition for defining the next button
    } else if (i === paginationLength + paginationStartIndex) {
      const maxPageNumber = currentPagination.count / 25;
      cellsList.push(
        new PaginationNext(
          '>>',
          handlePaginationNextClick,
          i >= maxPageNumber,
        ).initiatePaginationCell(),
      );
      break;
    } else {

      // Initiate simple pagination cell
      cellsList.push(
        new PaginationCell(i, handlePaginationCellClick).initiatePaginationCell(),
      );
    }
  }
  return cellsList;
}

/** Render table. */
function renderTable(): void {
  const animeList = currentPagination.results;
  animeList?.forEach(item => {
    animeTable.renderElement(new AnimeCard(item).createAnimeCard('.anime-template'));
  });
}

/** Sends a request and updates the table and pagination.
 * @param url - Link for request.
 * @param paginationLength Determines the length of the pagination on the page.
 * @param paginationStartIndex Determines the start index of the pagination on the page. */
function renderPage(url: string, paginationLength: number, paginationStartIndex: number): void {
  getPagination(url)
    .then((res: Pagination) => {
      currentPagination = res;
      const paginationCellList: HTMLElement[] = createPaginationCellList(
        paginationLength,
        paginationStartIndex,
      );
      paginationContainer.renderPagination(paginationCellList);
      animeTable.clearTable();
      renderTable();
    })
    .catch(err => {
      throw new Error(err.message);
    });
}

/** Initial page rendering. */
renderPage(SORT_BY_ID_URL, numberOfPaginationIndexes, 0);

/** Set event listeners on sorting buttons. */
statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();
