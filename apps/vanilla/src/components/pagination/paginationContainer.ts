export class PaginationContainer {
  private container: HTMLElement;
  public totalCount: number;
  public itemsPerPAge: number;

  public constructor(selector: string, totalCount: number, itemsPerPage: number) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.totalCount = totalCount;
    this.itemsPerPAge = itemsPerPage;
  }

  clearContainer(): void {
    this.container.innerHTML = '';
  }

  renderPagination(elementList: HTMLElement[]): void {
    elementList[1].classList.add('active');
    this.clearContainer();
    elementList.forEach((item: HTMLElement) => {
      this.container.append(item);
    });
  }
}
