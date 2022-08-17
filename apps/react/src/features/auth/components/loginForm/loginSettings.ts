import { Login } from '@js-camp/core/models/login';
import * as Yup from 'yup';

export const initValues: Login = new Login({
  email: '',
  password: '',
});

/** Login form. */
export type LoginFormValue = Login;

/** Validation schema. */
export const loginFormSchema: Yup.SchemaOf<LoginFormValue> = Yup.object().shape(
  {
    email: Yup.string().email('Invalid email')
      .required('Required'),
    password: Yup.string().required('Required')
      .min(8, 'Password to short'),
  },
);
