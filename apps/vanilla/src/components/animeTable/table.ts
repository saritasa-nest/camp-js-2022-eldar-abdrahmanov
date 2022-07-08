export class Table {
  container: HTMLElement;
  constructor(selector: string) {
    this.container = document.querySelector(selector) as HTMLElement;
  }

  clearTable(): void {
    const animeList = document.querySelectorAll('.anime');
    animeList.forEach(element => {
      if(element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }

  renderElement(element: HTMLElement): void {
    this.container.append(element);
  }
}
