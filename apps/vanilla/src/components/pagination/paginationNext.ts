import PaginationCell from './paginationCell';

export default class PaginationNext extends PaginationCell {
  constructor(label: number | string, clickHandler: Function, isDisabled?: boolean, cell?: HTMLElement) {
    super(label, clickHandler, isDisabled, cell);
  }

  override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getPreviousCellIndex());
    });
  }
}
