import { getElement } from '../../utils/utils';

/** Pagination container. */
export class PaginationContainer {
  /** Container. */
  private readonly container: HTMLElement;

  /** Total count. */
  public readonly totalCount: number;

  /** Items per page. */
  public itemsPerPage: number;

  public constructor(selector: string, totalCount: number, itemsPerPage: number) {
    this.container = getElement(document, selector);
    this.totalCount = totalCount;
    this.itemsPerPage = itemsPerPage;
  }

  /** Clear container. */
  public clearContainer(): void {
    this.container.innerHTML = '';
  }

  /**
   * Render pagination. And set style first pagination cell active.
   * @param elementList -  pagination cells array.
   */
  public renderPagination(elementList: readonly HTMLElement[]): void {
    const indexOfFirstPaginationCell = 1;
    elementList[indexOfFirstPaginationCell].classList.add('active');
    this.clearContainer();
    elementList.forEach((item: HTMLElement) => {
      this.container.append(item);
    });
  }
}
