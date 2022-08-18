import * as Yup from 'yup';
import { Registration } from '@js-camp/core/models/registration';

export const initValues: Registration = new Registration({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  reTypePassword: '',
});

/** Register form. */
export type RegisterFormValue = Registration;

/** Validation schema. */
export const registerFormSchema: Yup.SchemaOf<RegisterFormValue> = Yup.object().shape(
  {
    email: Yup.string().email('Invalid email')
      .required('Required'),
    password: Yup.string().required('Required')
      .min(8, 'Password to short'),
    reTypePassword: Yup.string().required('Required')
      .min(8, 'Password to short')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  },
);
