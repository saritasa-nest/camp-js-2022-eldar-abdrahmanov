import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AnimeCard from '../components/animeCard';
import {
  getAnimeByAiredStart,
  getAnimeById, getAnimeByOffset,
  getAnimeByStatus,
  getAnimeByTitleEng,
  getPagination
} from "../components/api";
import { Table } from '../components/animeTable/table';
import { PaginationContainer } from '../components/pagination/paginationContainer';
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import Pagination from '../components/pagination/pagination';
import PaginationCell from '../components/pagination/paginationCell';
import PaginationNext from '../components/pagination/paginationNext';
import PaginationPrevious from '../components/pagination/paginationPrevious';
import { animeTypeList } from "@js-camp/core/unions/animeType";
import {
  SORT_BY_TITLE_ENG_URL,
  SORT_BY_AIRED_START_URL,
  SORT_BY_STATUS_URL,
  SORT_BY_ID_URL,
  BASE_URL,
} from '../components/constants/constants';
import { DropdownBtn } from "../components/dropdownMenu/dropdownBtn";
import { DropdownMenu } from "../components/dropdownMenu/dropdownMenu";

const limitAnimeOnPage = 25;
const numberOfPaginationIndexes = 10;

/** Sorting state variable. Used in request. */
let selectorState = 'id';

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
  selectorState = 'title_eng';
  currentPagination = await getAnimeByTitleEng();
  renderPage2(numberOfPaginationIndexes, 0);
  //renderPage(SORT_BY_TITLE_ENG_URL, numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by aired start. */
const airedStartSortBtn = new TableHeaderButton('#table-aired-start', async () => {
  selectorState = 'aired__startswith';
  currentPagination = await getAnimeByAiredStart();
  renderPage2(numberOfPaginationIndexes, 0);
  //renderPage(SORT_BY_AIRED_START_URL, numberOfPaginationIndexes, 0);
});

/** Instance of header button responsible for sorting by status. */
const statusSortBtn = new TableHeaderButton('#table-status', async () => {
  selectorState = 'status';
  currentPagination = await getAnimeByStatus();
  renderPage2(numberOfPaginationIndexes, 0);
  //renderPage(SORT_BY_STATUS_URL, numberOfPaginationIndexes, 0);
});

/** The handler passed to the constructor when the pagination cell is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfCell Used to calculate offset in request.
 *  @param selector
 */
async function handlePaginationCellClick(indexOfCell: number, selector: string): Promise<void> {
  currentPagination = await getAnimeByOffset(indexOfCell, limitAnimeOnPage, selector);
  selectorState = selector;// не работает!!!
  animeTable.clearTable();
  renderTable();
  /*getPagination(`${BASE_URL}?offset=${indexOfCell * limitAnimeOnPage}&ordering=${selector}`)
    .then(res => {
      currentPagination = res;
      animeTable.clearTable();
      renderTable();
    });*/
}

/** The handler passed to the constructor when the pagination next button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfLastCell Used to calculate offset in request.
 */
function handlePaginationNextClick(indexOfLastCell: number): void {
  renderPage(`${BASE_URL}?offset=${indexOfLastCell * limitAnimeOnPage}&ordering=${selectorState}`,
    numberOfPaginationIndexes,
    indexOfLastCell);
}

/** The handler passed to the constructor when the pagination previous button is instantiated.
 *  Updates the pagination state and the table.
 *  @param indexOfFirstCell Used to calculate offset in request.
 */
function handlePaginationPreviousClick(indexOfFirstCell: number): void {
  renderPage(`${BASE_URL}?offset=${(indexOfFirstCell - numberOfPaginationIndexes) * limitAnimeOnPage}&ordering=${selectorState}`,
    numberOfPaginationIndexes,
    indexOfFirstCell - numberOfPaginationIndexes);
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

async function loadStartPage(): Promise<void> {
  currentPagination = await getAnimeById();
  renderPage2(numberOfPaginationIndexes, 0);
}

function renderPage2(paginationLength: number, paginationStartIndex: number) {
  const paginationCellList: HTMLElement[] = createPaginationCellList(
    paginationLength,
    paginationStartIndex,
  );
  paginationContainer.renderPagination(paginationCellList);
  animeTable.clearTable();
  renderTable();
}


//'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?type=TV'
function handleTypeBtnClick(type: string) {
  getPagination(`${BASE_URL}?type=${type}`)
    .then(res => {
      selectorState = type;
      currentPagination = res;
      animeTable.clearTable();
      renderTable();
    });
}

/***/
function initializeSortByTypeBtn() {
  animeTypeList.forEach(item => {
    const dropDownBtn: DropdownBtn = new DropdownBtn(item, handleTypeBtnClick);
    typeDropdownMenu.renderElement(dropDownBtn.initiateDropdownBtn())
  })
}

/** Initial page rendering. */
/*renderPage(SORT_BY_ID_URL, numberOfPaginationIndexes, 0);*/

initializeSortByTypeBtn();

loadStartPage();

/** Set event listeners on sorting buttons. */
statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();
