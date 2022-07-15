/** Searching component. */
export default class Searching {
  public constructor(
    private readonly form: HTMLFormElement | null,
    private readonly handleClick: (titlePart: string) => void,
  ) {}

  /** Initializes sorting component. */
  public setEventListener(): void {
    if (this.form === null) {
      throw new Error('Cannot find form');
    }

    const input = this.form.querySelector<HTMLInputElement>('.form__input');

    if (input === null) {
      throw new Error('Cannot find some components of the searching');
    }

    this.form.addEventListener('submit', event => {
      event.preventDefault();
      if (input !== null) {
        const { value } = input;
        this.handleClick(value);
      }
    });
  }
}
