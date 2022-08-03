import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      avatar: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submitRegister() {
    console.log(this.form.value)

  }
}
