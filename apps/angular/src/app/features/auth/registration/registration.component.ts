import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthorizationService } from '../../../../core/services/auth.service';

const validationMessages = {
  invalidEmail: 'Not a valid email address',
  requiredField: 'Field is required',
} as const;

/** Registration component. */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  /** Registration form. */
  public readonly form: FormGroup;

  /** Contains error from error response.  */
  public responseErrors: ValidationErrors;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthorizationService,
    private readonly router: Router,
    private change: ChangeDetectorRef,
  ) {
    this.responseErrors = {};
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: [''],
        lastName: [''],
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required],
      },
      { validators: this.passwordIdentityValidation },
    );
  }

  /** Handle register form submit. */
  public submitRegister(): void {
    this.authService.register(this.form.value).subscribe({
      next: this.handleSuccessResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  /** Handler of success response after registration. */
  private handleSuccessResponse(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Error response handler. Iterates over an object containing error messages.
   * And sets the error state for the form fields.
   * @param errors Http error response.
   */
  private handleError(errors: HttpErrorResponse): void {
    const responseErrors = errors.error.data;
    for (const key in responseErrors) {
      this.form.controls[key].setErrors({ resError: true });
      this.responseErrors[key] = responseErrors[key];
    }
    this.change.markForCheck();
  }

  /**
   * Custom validator. Checks password and re-type password entry fields for identity.
   * @param control AbstractControl.
   */
  public passwordIdentityValidation(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    return password?.value === passwordRepeat?.value ?
      null :
      { passwordsDifferent: true };
  }

  /**
   * Returns a specific message for email input.
   * Depending on the type of validation error.
   */
  public getErrorEmail(): string {
    if (this.form.get('email')?.hasError('required')) {
      return validationMessages.requiredField;
    } else if (this.form.get('email')?.hasError('email')) {
      return validationMessages.invalidEmail;
    }
    if (this.form.get('email')?.hasError('resError')) {
      return this.responseErrors['email'];
    }
    return '';
  }

  /**
   * Returns a specific message for password input.
   * Depending on the type of validation error.
   */
  public getErrorPassword(): string {
    const errorMessage = this.responseErrors['password'];
    if (this.form.get('password')?.hasError('required')) {
      return validationMessages.requiredField;
    }
    if (this.form.get('passwordRepeat')?.hasError('required')) {
      return validationMessages.requiredField;
    }
    if (this.form.get('password')?.hasError('resError')) {
      return errorMessage.join(',').replace(',', ' ');
    }
    return '';
  }
}
