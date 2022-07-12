/** TableHeaderButton */
export class TableHeaderButton {
  /** Element. */
  element: HTMLElement;

  /** Click handler */
  clickHandler: Function;

  constructor(id: string, clickHandler: Function): void {
    this.element = document.querySelector(id) as HTMLElement;
    this.clickHandler = clickHandler;
  }

  public setEventListener(): void {
    this.element.addEventListener('click', () => {
      this.setButtonActive();
      this.changeActiveStatus();
      this.clickHandler();
      this.setButtonActive();
    });
  }

  private changeActiveStatus(): void {
    // @ts-ignore
    this.element.parentNode?.childNodes.forEach((item: HTMLElement) => {
      if (item.nodeName !== '#text') {
        if (item.classList.contains('activated')) {
          item.classList.remove('activated');
        }
      }
    });
    this.setButtonActive();
  }

  setButtonActive(): void {
    this.element.classList.add('activated');
  }
}
