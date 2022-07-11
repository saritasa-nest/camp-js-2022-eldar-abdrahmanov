export class PaginationContainer {
  container: HTMLElement;
  totalCount: number;
  itemsPerPAge: number;

  constructor(selector: string, totalCount: number, itemsPerPage: number) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.totalCount = totalCount;
    this.itemsPerPAge = itemsPerPage;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  clearContainer(): void {
    this.container.innerHTML = '';
  }

  renderPagination(elementList: HTMLElement[]) {
    elementList[1].classList.add('active');
    this.clearContainer();
    elementList.forEach((item: HTMLElement) => {
      this.container.append(item);
    });
  }
}
