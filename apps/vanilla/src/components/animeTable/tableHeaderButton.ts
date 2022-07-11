export class TableHeaderButton {
  element: HTMLElement;
  clickHandler: any

  constructor(id: string, clickHandler: any) {
    this.element = document.querySelector(id) as HTMLElement;
    this.clickHandler = clickHandler;
  }

  setEventListener() {
    this.element.addEventListener('click', () => {
      this.setButtonActive();
      this.changeActiveStatus();
      this.clickHandler();
      this.setButtonActive();
    });
  }

  private changeActiveStatus() {
    // @ts-ignore
    this.element.parentNode?.childNodes.forEach((item: HTMLElement) => {
      if(item.nodeName !== '#text') {
        if (item.classList.contains('activated')) {
          item.classList.remove('activated');
        }
      }
    });
    this.setButtonActive();
  }

  setButtonActive() {
    this.element.classList.add('activated');
  }
}
