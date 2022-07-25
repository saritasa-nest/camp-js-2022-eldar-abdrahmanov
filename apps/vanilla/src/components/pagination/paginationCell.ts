/** Pagination Cell Constructor Data. */
export interface PaginationCellConstructorData {

  /** Label of cell. */
  label: string;

  /** Cell click handler. */
  clickHandler: (index: number) => Promise<void>;

  /** Flag by which the decision is made to disable the cell. */
  isDisable?: boolean;
}

/** Pagination cell. */
export class PaginationCell {
  /** Label. */
  public readonly label: string;

  /** Click handler.*/
  public readonly clickHandler: (index: number) => Promise<void>;

  /** Cell. */
  public cell?: Element;

  /** Is disable. */
  public readonly isDisable?: boolean;

  public constructor(data: PaginationCellConstructorData) {
    this.label = data.label;
    this.clickHandler = data.clickHandler;
    this.isDisable = data.isDisable;
  }

  /**
   * Clones the template content and creates a pagination cell.
   * Initiates content and adds an event listener.
   */
  public initiatePaginationCell(): HTMLElement {
    const template = document.querySelector(
      '.pagination-template',
    ) as HTMLTemplateElement;
    const paginationCell = template.content
      .querySelector('.page-item')
      ?.cloneNode(true) as Element;
    if (paginationCell !== null) {
      const paginationButton = paginationCell.querySelector('.page-link');
      if (paginationButton !== null) {
        paginationButton.textContent = this.label;
      }
    }
    this.cell = paginationCell;

    if (this.cell === null) {
      throw new Error('Element not found!');
    }

    if (this.isDisable) {
      this.setDisabled();
      return this.cell as HTMLElement;
    }
    this.setEventListener();
    return this.cell as HTMLElement;
  }

  /** Set cell activated. */
  private setCellActive(): void {
    this.cell?.classList.add('active');
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.cell?.addEventListener('click', () => {
      this.removeIfTextNode();
      this.changeActiveStatus();
      this.clickHandler(this.getPreviousCellIndex());
    });
  }

  /** Check for not HTML element child and remove it. */
  private removeIfTextNode(): void {
    const element = this.cell?.parentNode?.firstChild;
    if (element?.nodeName === '#text') {
      element.remove();
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

  /** Set pagination cell disable. */
  private setDisabled(): void {
    this.cell?.classList.add('disabled');
  }
}
