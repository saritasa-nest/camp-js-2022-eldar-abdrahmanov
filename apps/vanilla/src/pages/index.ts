import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AnimeCard from '../components/animeCard';
import { API } from "../components/api";
import { Table } from '../components/animeTable/table';
import { PaginationContainer } from '../components/pagination/paginationContainer';
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import Pagination from '../components/pagination/pagination';
import PaginationCell from '../components/pagination/paginationCell';
import PaginationNext from '../components/pagination/paginationNext';
import PaginationPrevious from '../components/pagination/paginationPrevious';
import { animeTypeList } from "@js-camp/core/unions/animeType";
import {
  BASE_URL,
} from '../components/constants/constants';
import { DropdownBtn } from "../components/dropdownMenu/dropdownBtn";
import { DropdownMenu } from "../components/dropdownMenu/dropdownMenu";

const limitAnimeOnPage = 25;
const numberOfPaginationIndexes = 10;

const api = new API(BASE_URL, "id")

/** Anime container. */
const animeTable: Table = new Table('#anime-container');

/** Pagination container. */
const paginationContainer: PaginationContainer = new PaginationContainer(
  '#pagination-container',
  0,
  25,
);

/** Type button dropdown menu container */
const typeDropdownMenu: DropdownMenu = new DropdownMenu('.dropdown-menu');

/** Pagination state variable. */
let currentPagination: Pagination = new Pagination(0, '', '', []);

/** Instance of header button responsible for sorting by title eng. */
const titleEngSortBtn = new TableHeaderButton('#table-title-eng', async () => {
  api.setUrlQuery('title_eng');
  currentPagination = await api.getPaginationWithOffset(0)
  renderPage(numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by aired start. */
const airedStartSortBtn = new TableHeaderButton('#table-aired-start', async () => {
  api.setUrlQuery('aired__startswith');
  currentPagination = await api.getPaginationWithOffset(0)
  renderPage(numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by status. */
const statusSortBtn = new TableHeaderButton('#table-status', async () => {
  api.setUrlQuery('status');
  currentPagination = await api.getPaginationWithOffset(0)
  renderPage(numberOfPaginationIndexes, 0);
});

/***/
function initializeSortByTypeBtn() {
  animeTypeList.forEach(item => {//пробовать enum
    const dropDownBtn: DropdownBtn = new DropdownBtn(item, handleTypeBtnClick);
    typeDropdownMenu.renderElement(dropDownBtn.initiateDropdownBtn());
  })
}

/***/
async function handleTypeBtnClick(type: string) {
  api.setUrlQuery(type);
  currentPagination = await api.getPaginationWithOffset(0);
  renderPage(numberOfPaginationIndexes, 0);
}

/** The handler passed to the constructor when the pagination cell is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfCell Used to calculate offset in request.
 */
async function handlePaginationCellClick(indexOfCell: number): Promise<void> {
  const offset = indexOfCell * limitAnimeOnPage;
  currentPagination = await api.getPaginationWithOffset(offset);
  animeTable.clearTable();
  renderTable();
}

/** The handler passed to the constructor when the pagination next button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfLastCell Used to calculate offset in request.
 */
async function handlePaginationNextClick(indexOfLastCell: number): Promise<void> {
  const offset = indexOfLastCell * limitAnimeOnPage;
  currentPagination = await api.getPaginationWithOffset(offset);
  renderPage(numberOfPaginationIndexes, indexOfLastCell);
}

/** The handler passed to the constructor when the pagination previous button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfFirstCell Used to calculate offset in request.
 */
async function handlePaginationPreviousClick(indexOfFirstCell: number): Promise<void> {
  const offset = indexOfFirstCell * limitAnimeOnPage;
  currentPagination = await api.getPaginationWithOffset(offset);
  renderPage(numberOfPaginationIndexes, indexOfFirstCell);
}

/** Creates and initializes a pagination cell array. Return array of HTML elements.
 * @param paginationLength Determines the length of the pagination on the page.
 * @param paginationStartIndex Determines the start index of the pagination on the page.
 */
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
 * @param paginationStartIndex Determines the start index of the pagination on the page.
 */
function renderPage(paginationLength: number, paginationStartIndex: number) {
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    paginationStartIndex,
  );
  paginationContainer.renderPagination(paginationCellList);
  animeTable.clearTable();
  renderTable();
}

async function loadStartPage(): Promise<void> {
  currentPagination = await api.getPaginationWithOffset(0);
  renderPage(numberOfPaginationIndexes, 0);
}

initializeSortByTypeBtn();

loadStartPage();

/** Set event listeners on sorting buttons. */
statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();
