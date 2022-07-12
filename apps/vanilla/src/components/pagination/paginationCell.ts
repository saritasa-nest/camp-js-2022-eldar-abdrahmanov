/** Pagination cell */
export default class PaginationCell {
  /** Label. */
  public label: number | string;

  /** Click handler.*/
  public clickHandler: (index: number) => void

  /** Cell. */
  public cell?: HTMLElement;

  /** Is disable. */
  public isDisable?: boolean;

  public constructor(
    label: number | string,
    clickHandler: (index: number) => void,
    isDisable?: boolean,
    cell?: HTMLElement
  ) {
    this.label = label;
    this.clickHandler = clickHandler;
    this.cell = cell;
    this.isDisable = isDisable;
  }
/**  */
  public initiatePaginationCell(): HTMLElement {
    const template = document.querySelector(
      '.pagination-template'
    ) as HTMLTemplateElement;
    const paginationCell = template.content
      .querySelector('.page-item')?.cloneNode(true);
    paginationCell.querySelector('.page-link').textContent = this.label;
    this.cell = paginationCell;

    if (!this.cell) {
      throw new Error('Element not found!')
    }

  if (this.isDisable) {
      this.setDisabled();
      return this.cell;
    }
    this.setEventListener();
    return this.cell;
  }

  private setCellActive(): void {
    this.cell?.classList.add('active');
  }

  setEventListener(): void {
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

  private checkForUndefinedChild(): void {
    // @ts-ignore
    if (this.cell.parentNode.firstChild.nodeName === '#text') {
      // @ts-ignore
      this.cell.parentNode.firstChild.remove();
    }
  }

  private changeActiveStatus(): void {
    // @ts-ignore
    this.cell.parentNode.childNodes.forEach((item: HTMLElement) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    this.setCellActive();
  }

  protected getPreviousCellIndex(): number {
    return Number(this.cell?.previousSibling?.firstChild?.textContent);
  }

  protected getNextCellIndex(): number {
    return Number(this.cell?.nextSibling?.firstChild?.textContent);
  }

  private setDisabled(): void {
    // @ts-ignore
    this.cell?.classList.add('disabled');
  }
}
