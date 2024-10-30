import { FormGroup } from '@angular/forms';

export const isRequired = (
  field: 'email' | 'password' | 'displayName',
  form: FormGroup
) => {
  const control = form.get(field);

  return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');

  return control && control.hasError && control.hasError('email');
};