import Anime from '../components/models/anime';
import { getAnimeList } from '../components/api';
import { Table } from '../components/animeTable/table';
import {PaginationContainer} from "../components/pagination/paginationContainer";
import { TableHeaderButton } from '../components/animeTable/tableHeaderButton';
import Pagination from '../components/models/pagination';
import { PaginationCell } from "../components/pagination/paginationCell";
import {
  SORT_BY_AIRED_START_URL,
  SORT_BY_STATUS_URL,
  SORT_BY_TITLE_ENG_URL,
  SORT_BY_ID_URL,
  BASE_URL
} from '../components/constants/constants';
import 'bootstrap/dist/css/bootstrap.min.css';

const animeTable: Table = new Table('#anime-container');
const paginationContainer: PaginationContainer = new PaginationContainer('#pagination-container', 0, 25)
let currentPagination: Pagination = new Pagination(0, '', '', [] );

///разобраться с пагинацией при включенной сортировке + сломалась сортировка из за нового метода render

Promise.all([getAnimeList(SORT_BY_ID_URL)])
  .then((res: any) => {
    currentPagination.setPaginationData(
      res[0].count,
      res[0].next,
      res[0].previous,
      transformResToAnimeList(res[0].results)
    );
    paginationContainer.setTotalCount(res[0].count);
    const paginationCellsList = createStartPagination(10);
    paginationCellsList[0].classList.add('active');
    paginationCellsList.forEach((item: HTMLElement) => {
      paginationContainer.prependElement(item)
    });
    renderTable();
  });

//перед вызовом отнять от numberOfCell 1
function handlePaginationClick(numberOfCell: number) {
  setPagination(`${BASE_URL}${numberOfCell*25}&ordering=id`);
}

function setPagination(url: string) {
  Promise.all([getAnimeList(url)])
    .then((res: any) => {
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

function transformResToAnimeList(response: []): Anime[] {
  const animeList: Anime[] = [];
  response.forEach((item: any) => {
    animeList.push(new Anime(item.id,
      item.title_eng,
      item.title_jpn,
      item.image,
      new Date(item.aired.start),
      item.type,
      item.status))
  })
  return animeList;
}

// totalCount!
function createStartPagination(paginationLength: number): HTMLElement[] {
  const cellsList: HTMLElement[] = []
  for (let i = 1; i <= paginationLength; i++) {
    if(i === paginationLength) {
      cellsList.push(new PaginationCell(24200 / 25, handlePaginationClick).createPaginationCell());
      break;
    }
    cellsList.push(new PaginationCell(i, handlePaginationClick).createPaginationCell())
  }
  return cellsList;
}

const titleEngSortBtn = new TableHeaderButton('#table-title-eng', () => {
  animeTable.clearTable();
  renderTable();
});

const airedStartSortBtn = new TableHeaderButton('#table-aired-start', () => {
  animeTable.clearTable();
  renderTable();
});

const statusSortBtn = new TableHeaderButton('#table-status', () => {
  animeTable.clearTable();
  renderTable();
});

statusSortBtn.setEventListener();
airedStartSortBtn.setEventListener();
titleEngSortBtn.setEventListener();

function renderTable() {
  const animeList = currentPagination.getResults();
  console.log(animeList)
  animeList.forEach((item) => {
    animeTable.renderElement(item.createAnimeCard('.anime-template'));
  });
}

/*function renderTable(url: string) {
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
}*/
