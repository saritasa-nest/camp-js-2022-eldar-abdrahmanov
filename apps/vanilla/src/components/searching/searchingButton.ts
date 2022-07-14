export default class Searching {
  public constructor(
    private readonly input: HTMLInputElement | null,
    private readonly button: HTMLButtonElement | null,
    private readonly handleClick: (titlePart: string) => void,
  ) {}

  public initialize() {
    if (this.input === null || this.button === null) {
      throw new Error('Some components of the searching is undefined');
    }
    this.button.onclick = () => {
      const { value } = this.input;
      this.handleClick(value);
    }
  }
}
