/** Dropdown button. */
export class DropdownButton {
  /** Label. */
  public readonly animeType: string;

  /** Click handler.*/
  public readonly clickHandler: (animeType: string) => void;

  /** Button. */
  public button?: HTMLElement;

  public constructor(label: string, clickHandler: (animeType: string) => void) {
    this.animeType = label;
    this.clickHandler = clickHandler;
  }

  /**
   * Clones the template content and creates a dropdown button.
   * Initiates content and adds an event listener.
   */
  public initiateDropdownButton(): HTMLElement {
    const template = document.querySelector(
      '.dropdown-template',
    ) as HTMLTemplateElement;
    const dropdownElement = template.content
      .querySelector('.dropdown-element')
      ?.cloneNode(true) as HTMLElement;
    if (dropdownElement !== null) {
      const dropdownButton = dropdownElement.querySelector('.dropdown-item');
      if (dropdownButton !== null) {
        dropdownButton.textContent = this.animeType;
      }
    }
    this.button = dropdownElement;

    if (this.button === null) {
      throw new Error('Element not found!');
    }
    this.setEventListener();
    return this.button;
  }

  /** Set cell activated. */
  private setButtonActive(): void {
    this.button?.classList.add('active');
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.button?.addEventListener('click', () => {
      this.setButtonActive();
      this.clickHandler(this.animeType);
    });
  }
}
