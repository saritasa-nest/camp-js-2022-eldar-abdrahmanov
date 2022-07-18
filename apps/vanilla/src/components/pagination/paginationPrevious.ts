import { PaginationCell } from './paginationCell';

/** Pagination previous. */
export class PaginationPrevious extends PaginationCell {
  public constructor(
    label: number | string,
    clickHandler: (index: number) => Promise<void>,
    isDisable: boolean,
  ) {
    super(label, clickHandler, isDisable);
  }

  /** Set event listener. */
  public override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getNextCellIndex());
    });
  }
}
