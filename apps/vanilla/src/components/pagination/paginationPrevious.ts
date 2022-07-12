import PaginationCell from './paginationCell';

export default class PaginationPrevious extends PaginationCell {
  constructor(label: number | string, clickHandler: Function, isDisable: boolean, cell?: HTMLElement,) {
    super(label, clickHandler, isDisable, cell);
  }

  override setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getNextCellIndex());
    });
  }
}
