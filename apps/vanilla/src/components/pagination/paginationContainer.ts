import { PaginationCell } from "./paginationCell";

export class PaginationContainer {
  container: HTMLElement;
  totalCount: number;
  itemsPerPAge: number;
  cellsList: any;

  constructor(selector: string, totalCount: number, itemsPerPage: number) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.totalCount = totalCount;
    this.itemsPerPAge = itemsPerPage;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  clearContainer(): void {
    const animeList = document.querySelectorAll('.anime');
    animeList.forEach(element => {
      if(element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }

  prependElement(element: HTMLElement): void {
    this.container.append(element);
  }

  appendElement(element: HTMLElement): void {
    this.container.append(element);
  }

  createStartPagination(paginationLength: number): HTMLElement[] {
    const cellsList: HTMLElement[] = []
    for (let i = 1; i <= paginationLength; i++) {
      if(i === paginationLength) {
        cellsList.push(new PaginationCell(this.totalCount / this.itemsPerPAge).createPaginationCell());
        break;
      }
      cellsList.push(new PaginationCell(i).createPaginationCell())
    }
    return cellsList;
  }
}
