import { getElement } from '../../utils/utils';

export interface FormConstructorData {

  /** Form selector. */
  formSelector: string;

  /** Form submit handler. */
  handleFormSubmit: () => void;
}

/**  */
export interface InputValues {

  /** Input name. */
  [inputName: string]: string;
}

/** Form. */
export class Form {

  /** Form element. */
  private readonly formElement: HTMLFormElement;

  /** Form input list. */
  private readonly inputs: HTMLInputElement[];

  /** Submit button. */
  private readonly submitButton: HTMLButtonElement;

  /** Submit form handler. */
  private readonly handleFormSubmit: (inputValues: InputValues) => void;

  public constructor(data: FormConstructorData) {
    this.formElement = getElement(document, data.formSelector);
    this.handleFormSubmit = data.handleFormSubmit;
    this.submitButton = getElement(this.formElement, '.form__submit-button');
    this.inputs = Array.from(this.formElement.querySelectorAll('.form-control'));
    this.setEventListener();
  }

  /** Iterates through all inputs and returns their values as an object. */
  public getInputsValue(): InputValues {
    const inputValues: InputValues = {};
    this.inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  /** Set event listener. */
  private setEventListener(): void {
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.handleFormSubmit(this.getInputsValue());
    });
  }
}
