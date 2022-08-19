import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

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

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthorizationService,
    private readonly router: Router,
    private change: ChangeDetectorRef,
  ) {
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
    this.auth.register(this.form.value).subscribe({
      next: this.handleSuccessResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  /** Handler of success registration. */
  private handleSuccessResponse(): void {
    this.router.navigate(['/auth']);
  }

  /** Handler of success registration. Sets the error state for the form fields. */
  private handleError(): void {
    if (this.auth.responseError.errorData.email !== undefined) {
      this.form.controls['email'].setErrors({ resError: true });
    }
    if (this.auth.responseError.errorData.password !== undefined) {
      this.form.controls['password'].setErrors({ resError: true });
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
      return this.auth.responseError.errorData.email.join(',');
    }
    return '';
  }

  /**
   * Returns a specific message for password input.
   * Depending on the type of validation error.
   */
  public getErrorPassword(): string {
    if (this.form.get('password')?.hasError('required')) {
      return validationMessages.requiredField;
    }
    if (this.form.get('passwordRepeat')?.hasError('required')) {
      return validationMessages.requiredField;
    }
    if (this.form.get('password')?.hasError('resError')) {
      return this.auth.responseError.errorData.password
        .join(',')
        .replace(',', ' ');
    }
    return '';
  }
}
