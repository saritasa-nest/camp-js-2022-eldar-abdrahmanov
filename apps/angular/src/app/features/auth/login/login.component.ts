import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthorizationService } from '../../../../core/services/auth.service';

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

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthorizationService,
    private readonly router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Returns a specific message for email input.
   * Depending on the type of validation error.
   */
  public getErrorEmail(): string {
    if (this.form.get('email')?.hasError('required')) {
      return 'Field is required';
    } else if (this.form.get('email')?.hasError('email')) {
      return 'Not a valid email address';
    }
    return '';
  }

  /**
   * Returns a specific message for password input.
   * Depending on the type of validation error.
   */
  public getErrorPassword(): string {
    if (this.form.get('password')?.hasError('required')) {
      return 'Field is required';
    }
    return '';
  }

  /** Handle login form submit. */
  public submitLogin(): void {
    this.auth.login(this.form.value)
      .subscribe(res => {
        this.router.navigate(['anime']);
        localStorage.setItem('jwt', res.jwt);
      });
  }
}
