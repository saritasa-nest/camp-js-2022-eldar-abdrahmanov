/** Pagination cell. */
export default class PaginationCell {
  /** Label. */
  public label: number | string;

  /** Click handler.*/
  public clickHandler: (index: number) => void;

  /** Cell. */
  public cell?: HTMLElement;

  /** Is disable. */
  public isDisable?: boolean;

  public constructor(
    label: number | string,
    clickHandler: (index: number) => void,
    isDisable?: boolean,
  ) {
    this.label = label;
    this.clickHandler = clickHandler;
    this.isDisable = isDisable;
  }

  /** Clones the template content and creates a pagination cell.
   * Initiates content and adds an event listener.
   */
  public initiatePaginationCell(): HTMLElement {
    const template = document.querySelector(
      '.pagination-template',
    ) as HTMLTemplateElement;
    const paginationCell = template.content
      .querySelector('.page-item')
      ?.cloneNode(true) as HTMLElement;
    if (paginationCell) {
      const paginationButton = paginationCell.querySelector('.page-link');
      if (typeof this.label === 'number' && paginationButton) {
        paginationButton.textContent = this.label.toString();
      } else if (typeof this.label === 'string' && paginationButton) {
        paginationButton.textContent = this.label;
      }
    }
    this.cell = paginationCell;

    if (!this.cell) {
      throw new Error('Element not found!');
    }

    if (this.isDisable) {
      this.setDisabled();
      return this.cell;
    }
    this.setEventListener();
    return this.cell;
  }

  /** Set cell activated. */
  private setCellActive(): void {
    this.cell?.classList.add('active');
  }

  /** Set event listener. */
  public setEventListener(): void {
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

  /** Check for not HTML element child. */
  private checkForUndefinedChild(): void {
    if (this.cell?.parentNode?.firstChild?.nodeName === '#text') {
      this.cell.parentNode.firstChild.remove();
    }
  }

  /** Change activated status of cell. */
  private changeActiveStatus(): void {
    this.cell?.parentNode?.childNodes.forEach((item: ChildNode) => {
      if ((item as HTMLElement).classList.contains('active')) {
        (item as HTMLElement).classList.remove('active');
      }
    });
    this.setCellActive();
  }

  /** Get previous cell index. */
  protected getPreviousCellIndex(): number {
    return Number(this.cell?.previousSibling?.firstChild?.textContent);
  }

  /** Get next cell index. */
  protected getNextCellIndex(): number {
    return Number(this.cell?.nextSibling?.firstChild?.textContent);
  }

  /** Set pagination cell disable. */
  private setDisabled(): void {
    this.cell?.classList.add('disabled');
  }
}
