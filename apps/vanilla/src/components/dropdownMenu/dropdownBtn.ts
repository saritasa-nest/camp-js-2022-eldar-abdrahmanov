/** Dropdown button. */
export class DropdownBtn {
  /** Label. */
  public animeType: string;

  /** Click handler.*/
  public clickHandler: (animeType: string) => void;

  /** Button. */
  public button?: HTMLElement;

  public constructor(label: string, clickHandler: (animeType: string) => void) {
    this.animeType = label;
    this.clickHandler = clickHandler;
  }

  /** Clones the template content and creates a dropdown button.
   * Initiates content and adds an event listener.
   */
  public initiateDropdownBtn(): HTMLElement {
    const template = document.querySelector(
      '.dropdown-template'
    ) as HTMLTemplateElement;
    const dropdownElement = template.content
      .querySelector('.dropdown-element')
      ?.cloneNode(true) as HTMLElement;
    if (dropdownElement) {
      const dropdownBtn = dropdownElement.querySelector('.dropdown-item');
      if(dropdownBtn) {
        dropdownBtn.textContent = this.animeType;
      }
    }
    this.button = dropdownElement;

    if (!this.button) {
      throw new Error('Element not found!');
    }
    this.setEventListener();
    return this.button;
  }

  /** Set cell activated. */
  private setButtonActive(): void {
    this.button?.classList.add('active');
  }

  /** Set event listener*/
  public setEventListener(): void {
    this.button?.addEventListener('click', () => {
      this.setButtonActive();
      this.clickHandler(this.animeType)
    })
  }
}
