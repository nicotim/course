import { FormControl } from '@angular/forms';

export interface FormSignUp {
  name?: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  role?: FormControl<string | null>;
  creationDate?: FormControl<Date | null>;
}

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
