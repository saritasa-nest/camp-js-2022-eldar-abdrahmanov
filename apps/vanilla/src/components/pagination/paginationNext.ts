import PaginationCell from "./paginationCell";

export default class PaginationNext extends PaginationCell {
  constructor(label: number | string, clickHandler: any, isDisabled?: boolean, cell?: HTMLElement,) {
    super(label, clickHandler, isDisabled, cell);
  }

  override setEventListener() {
    this.cell?.addEventListener('click', () => {
      this.clickHandler(this.getPreviousCellIndex())
    });
  }
}
