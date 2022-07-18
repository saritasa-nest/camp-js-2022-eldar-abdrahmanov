import { PaginationCell } from './paginationCell';

/** Pagination next. */
export class PaginationNext extends PaginationCell {
  public constructor(
    label: number | string,
    clickHandler: (index: number) => Promise<void>,
    isDisabled?: boolean,
  ) {
    super(label, clickHandler, isDisabled);
  }

  /** Set event listener. */
  public override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getPreviousCellIndex());
    });
  }
}
