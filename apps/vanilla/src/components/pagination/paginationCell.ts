export class PaginationCell {
  public number: number;
  public cell?: HTMLElement;
  public clickHandler: any;

  constructor(number: number, clickHandler: any, cell?: HTMLElement, ) {
    this.number = number;
    this.cell = cell;
    this.clickHandler = clickHandler;
  }

  createPaginationCell(): HTMLElement {
    const template = document.querySelector(
      '.pagination-template'
    ) as HTMLElement;
    const paginationCell = template.content
      .querySelector('.page-item')
      .cloneNode(true);
    paginationCell.querySelector('.page-link').textContent = this.number;
    this.cell = paginationCell;
    this.setEventListener();
    return <HTMLElement>this.cell;
  }

  setCellActive() {
    this.cell?.classList.add('active');
  }

  setEventListener() {
    this.cell?.addEventListener('click', () => {
      this.checkForUndefinedChild();
      this.changeActiveStatus();
      this.clickHandler(this.number-1);
    });
  }

  //удаляет #text который появляется по непонятной причине. разобраться
  private checkForUndefinedChild() {
    // @ts-ignore
    if(this.cell.parentNode.firstChild.nodeName === '#text') {
      // @ts-ignore
      this.cell.parentNode.firstChild.remove();
    }
  }

//меняет статус ячейки пагинации у активной на неактивную и наоборот
  private changeActiveStatus() {
    // @ts-ignore
    this.cell.parentNode.childNodes.forEach((item: HTMLElement) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    this.setCellActive();
  }
}
