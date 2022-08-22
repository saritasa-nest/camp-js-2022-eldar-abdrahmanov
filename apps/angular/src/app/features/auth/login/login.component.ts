import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

const validationMessages = {
  invalidEmail: 'Not a valid email address',
  requiredField: 'Field is required',
} as const;

/** Login component. */
@Component({
  selector: 'camp-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  /** Login form. */
  public readonly form: FormGroup;

  /** Error message received from the server. */
  public responseErrorMessage: string;

  /** Subscription on auth. */
  private subscriptionOnLogin = new Subscription();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthorizationService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly change: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.responseErrorMessage = '';
  }

  /** Handle auth form submit. */
  public submitLogin(): void {
    this.subscriptionOnLogin = this.auth.login(this.form.value).subscribe({
      next: this.handleSuccessLogin.bind(this),
      error: this.handleError.bind(this),
    });
  }

  /** Handler of success auth. */
  private handleSuccessLogin(): void {
    this.router.navigate(['/anime']);
  }

  /** Handler of unsuccessful auth. Sets the form to an error state. */
  private handleError(): void {
    this.responseErrorMessage = this.auth.loginErrorMessage;
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

  /** Unsubscribe observables. */
  public ngOnDestroy(): void {
    this.subscriptionOnLogin.unsubscribe();
  }
}
