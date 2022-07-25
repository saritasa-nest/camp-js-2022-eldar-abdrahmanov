import { PaginationCell, PaginationCellConstructorData } from './paginationCell';

/** Pagination next. */
export class PaginationNext extends PaginationCell {
  public constructor(data: PaginationCellConstructorData) {
    super(data);
  }

  /** Set event listener. */
  public override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getPreviousCellIndex());
    });
  }
}
