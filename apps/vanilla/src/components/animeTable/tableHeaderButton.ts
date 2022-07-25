/** TableHeaderButton. */
export class TableHeaderButton {
  /** Button element. */
  public readonly buttonElement: HTMLElement;

  /** Click handler. */
  public readonly clickHandler: () => void;

  public constructor(id: string, clickHandler: () => void) {
    this.buttonElement = document.querySelector(id) as HTMLElement;
    this.clickHandler = clickHandler;
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.buttonElement.addEventListener('click', () => {
      this.toggleActiveStatus();
      this.clickHandler();
    });
  }

  /** Toggle activated status. */
  private toggleActiveStatus(): void {
    this.buttonElement.classList.toggle('activated');
  }
}
