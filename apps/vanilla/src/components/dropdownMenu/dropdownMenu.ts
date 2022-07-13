/**  Class representing a dropdown menu. */
export class DropdownMenu {
  /** Container */
  public readonly container: HTMLElement;

  public constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement;
  }

  /** Render element.
   * @param element - HTML element.
   */
  public renderElement(element: HTMLElement): void {
    this.container.append(element);
  }
}
