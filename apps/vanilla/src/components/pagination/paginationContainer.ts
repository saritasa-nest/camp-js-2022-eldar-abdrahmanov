/** Pagination container. */
export class PaginationContainer {
  /** Container. */
  private container: HTMLElement;

  /** Total count. */
  public totalCount: number;

  /** Items per page. */
  public itemsPerPage: number;

  public constructor(selector: string, totalCount: number, itemsPerPage: number) {
    this.container = document.querySelector(selector) as HTMLElement;
    this.totalCount = totalCount;
    this.itemsPerPage = itemsPerPage;
  }
  /** Clear container */
  clearContainer(): void {
    this.container.innerHTML = '';
  }
  /** Render pagination.
   * @param elementList -  pagination cells array */
  renderPagination(elementList: HTMLElement[]): void {
    elementList[1].classList.add('active');
    this.clearContainer();
    elementList.forEach((item: HTMLElement) => {
      this.container.append(item);
    });
  }
}
