import { PaginationCell, PaginationCellConstructorData } from './paginationCell';

/** Pagination previous. */
export class PaginationPrevious extends PaginationCell {
  public constructor(data: PaginationCellConstructorData) {
    super(data);
  }

  /** Set event listener. */
  public override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getNextCellIndex());
    });
  }

  /** Get next cell index. */
  protected getNextCellIndex(): number {
    return Number(this.cell?.nextSibling?.firstChild?.textContent);
  }
}
