/** Class representing a table. */
export class Table {
  /** Container. */
  public container: HTMLElement;

  public constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement;
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
    this.container.append(element);
  }
}
