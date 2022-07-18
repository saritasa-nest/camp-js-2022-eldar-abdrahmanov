/** TableHeaderButton. */
export class TableHeaderButton {
  /** Button element. */
  public readonly buttonElement: HTMLElement;

  /** Click handler. */
  public clickHandler: () => void;

  public constructor(id: string, clickHandler: () => void) {
    this.buttonElement = document.querySelector(id) as HTMLElement;
    this.clickHandler = clickHandler;
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.buttonElement.addEventListener('click', () => {
      this.changeActiveStatus();
      this.clickHandler();
    });
  }

  /** Change activated status. */
  private changeActiveStatus(): void {
    this.buttonElement.parentNode?.childNodes.forEach(item => {
      if (item.nodeName !== '#text') {
        if ((item as HTMLElement).classList.contains('activated')) {
          (item as HTMLElement).classList.remove('activated');
        }
      }
    });
    this.setButtonActive();
  }

  /** Set button activated. */
  public setButtonActive(): void {
    this.buttonElement.classList.add('activated');
  }
}
