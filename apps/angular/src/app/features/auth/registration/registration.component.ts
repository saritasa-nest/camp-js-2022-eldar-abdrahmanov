import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AuthorizationService } from '../../../../core/services/auth.service';
import { RegisterMapper } from '@js-camp/core/mappers/registration.mapper';

/** */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  /** */
  public readonly form: FormGroup;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthorizationService,
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      firstName: ['', Validators.maxLength(30)],
      lastName: [''],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    }, { validators: this.passwordIdentityValidation });
  }

  ngOnInit(): void {}

  /** */
  submitRegister() {
    console.log(RegisterMapper.toDto(this.form.value));
    this.authService
      .register(this.form.value)
      .subscribe(res => console.log(res));
  }

  /** */
  public passwordIdentityValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    return password?.value === passwordRepeat?.value ? null : { passwordsDifferent: true };
  }

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
