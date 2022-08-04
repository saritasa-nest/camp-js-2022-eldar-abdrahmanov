import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private readonly authService: AuthorizationService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      avatar: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitRegister() {
    console.log(RegisterMapper.toDto(this.form.value));
    this.authService.register(this.form.value).subscribe(res => console.log(res))
  }
}
