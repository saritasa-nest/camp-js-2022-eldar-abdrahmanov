export class TableHeaderButton {
  element: HTMLElement;
  clickHandler: any

  constructor(id: string, clickHandler: any) {
    this.element = document.querySelector(id) as HTMLElement;
    this.clickHandler = clickHandler;
  }

  setEventListener() {
    this.element.addEventListener('click', this.clickHandler);
  }
}



