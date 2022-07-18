/**  Class representing a dropdown menu. */
export class DropdownMenu {
  /** Container. */
  public readonly menuElement: HTMLElement;

  public constructor(selector: string) {
    this.menuElement = document.querySelector(selector) as HTMLElement;
  }

  /** Render element.
   * @param element - HTML element.
   */
  public renderElement(element: HTMLElement): void {
    this.menuElement.append(element);
  }
}
