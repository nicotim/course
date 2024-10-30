import { FormControl } from '@angular/forms';

export interface FormSignUp {
  displayName?: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  role?: FormControl<string | null>;
}

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
