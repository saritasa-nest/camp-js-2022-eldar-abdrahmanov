export default class PaginationCell {
  public label: number | string;
  public clickHandler: any;
  public cell?: HTMLElement;
  public isDisable?: boolean;

  constructor(
    label: number | string,
    clickHandler: any,
    isDisable?: boolean,
    cell?: HTMLElement
  ) {
    this.label = label;
    this.clickHandler = clickHandler;
    this.cell = cell;
    this.isDisable = isDisable;
  }

  initiatePaginationCell(): HTMLElement {
    const template = document.querySelector(
      '.pagination-template'
    ) as HTMLElement;
    // @ts-ignore
    const paginationCell = template.content
      .querySelector('.page-item')
      .cloneNode(true);
    paginationCell.querySelector('.page-link').textContent = this.label;
    this.cell = paginationCell;
    if (this.isDisable) {
      this.setDisabled();
      return <HTMLElement>this.cell;
    }
    this.setEventListener();
    return <HTMLElement>this.cell;
  }

  setCellActive() {
    this.cell?.classList.add('active');
  }

  setEventListener() {
    this.cell?.addEventListener('click', () => {
      this.checkForUndefinedChild();
      this.changeActiveStatus();
      if (typeof this.label === 'number') {
        this.clickHandler(this.label - 1);
      }
      if (typeof this.label === 'string') {
        this.clickHandler(this.getPreviousCellIndex());
      }
    });
  }

  private checkForUndefinedChild() {
    // @ts-ignore
    if (this.cell.parentNode.firstChild.nodeName === '#text') {
      // @ts-ignore
      this.cell.parentNode.firstChild.remove();
    }
  }

  private changeActiveStatus() {
    // @ts-ignore
    this.cell.parentNode.childNodes.forEach((item: HTMLElement) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    this.setCellActive();
  }

  getPreviousCellIndex(): number {
    return Number(this.cell?.previousSibling?.firstChild?.textContent);
  }

  getNextCellIndex(): number {
    return Number(this.cell?.nextSibling?.firstChild?.textContent);
  }

  setDisabled() {
    // @ts-ignore
    this.cell?.classList.add('disabled');
  }
}
