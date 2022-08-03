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
      email: ['', Validators.required, Validators.email, Validators.minLength(1)],
      password: ['', Validators.required, Validators.minLength(1)],
    });
  }

  submitLogin() {
    console.log(this.form.value)
  }

  ngOnInit(): void {}
}
