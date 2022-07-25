/** Class representing a table. */
export class Table {
  /** Table element. */
  public readonly tableElement: HTMLElement;

  public constructor(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element === null) {
      throw new Error('No table element found by passed selector');
    }
    this.tableElement = element;
  }

  /** Clears the content of the table. */
  public clearTable(): void {
    const animeList = document.querySelectorAll('.anime');
    animeList.forEach(element => {
      element?.remove();
    });
  }

  /**
   * Render element.
   * @param element - HTML element.
   */
  public renderElement(element: HTMLElement): void {
    this.tableElement.append(element);
  }
}
