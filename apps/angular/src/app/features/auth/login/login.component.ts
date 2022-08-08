import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { UserToken } from '@js-camp/core/models/userToken';

import { AuthorizationService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

const validationMessages = {
  invalidEmail: 'Not a valid email address',
  requiredField: 'Field is required',
} as const;

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** Login form. */
  public readonly form: FormGroup;

  /** Error message received from the server. */
  public responseErrorMessage: string;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthorizationService,
    private readonly router: Router,
    private readonly userService: UserService,
    private change: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.responseErrorMessage = '';
  }

  /** Handle login form submit. */
  public submitLogin(): void {
    this.auth.login(this.form.value).subscribe({
      next: this.handleSuccessResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  /**
   * Handler of success response after registration.
   * @param userToken Authorization token.
   */
  private handleSuccessResponse(userToken: UserToken): void {
    this.router.navigate(['/anime']);
    this.userService.saveJwtInLocalStorage(userToken.jwt);
  }

  /**
   * Error response handler. Sets the form to an error state.
   * @param errors Http error response.
   */
  private handleError(errors: HttpErrorResponse): void {
    this.responseErrorMessage = errors.error.detail;
    this.form.setErrors({ resError: true });
    this.change.markForCheck();
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
    return '';
  }
}
