import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  /** */
  public readonly form: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    console.log(this.form.value)
  }

  ngOnInit(): void {}

  /** */
  public getErrorEmail(): string {
    if (this.form.get('email')?.hasError('required')) {
      return 'Field is required';
    } else if (this.form.get('email')?.hasError('email')) {
      return 'Not a valid email address';
    }
    return '';
  }

  /** */
  public getErrorPassword(): string {
    if (this.form.get('password')?.hasError('required')) {
      return 'Field is required';
    }
    if (this.form.get('passwordRepeat')?.hasError('required')) {
      return 'Field is required';
    }
    return '';
  }
}
