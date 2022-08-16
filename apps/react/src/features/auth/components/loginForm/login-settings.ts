import { LoginDto } from '@js-camp/core/dtos/login.dto';

export const initValues: LoginFormValue = {
  email: '',
  password: '',
};

/** Login form. */
export type LoginFormValue = LoginDto;
