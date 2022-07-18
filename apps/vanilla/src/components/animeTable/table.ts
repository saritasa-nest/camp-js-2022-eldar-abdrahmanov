/** Class representing a table. */
export class Table {
  /** Table element. */
  public readonly tableElement: HTMLElement;

  public constructor(selector: string) {
    this.tableElement = document.querySelector(selector) as HTMLElement;
  }

  /** Clears the content of the table. */
  public clearTable(): void {
    const animeList = document.querySelectorAll('.anime');
    animeList.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }

  /** Render element.
   * @param element - HTML element.*/
  public renderElement(element: HTMLElement): void {
    this.tableElement.append(element);
  }
}
