import PaginationCell from "./paginationCell";

export default class PaginationPrevious extends PaginationCell {
  constructor(label: number | string, clickHandler: any, isDisable: boolean, cell?: HTMLElement,) {
    super(label, clickHandler, isDisable, cell);
  }

  override setEventListener() {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getNextCellIndex())
    });
  }
}
