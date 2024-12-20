import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSignUp } from '@core/models/interface/auth.interface';
import {
  EmailRegx,
  hasEmailError,
  isRequired,
  StrongPasswordRegx,
} from '@shared/utils/auth.validators';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '@shared/components/auth-button/auth-button.component';
import { AuthService } from '@core/service';

const MODULES = [
  RouterLink,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  CommonModule,
  ReactiveFormsModule,
  AuthButtonComponent,
];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MODULES],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isRequired(field: 'email' | 'password' | 'displayName') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
    displayName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.pattern(EmailRegx),
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.pattern(StrongPasswordRegx),
    ]),
  });

  get emailFormField() {
    return this.form.get('email');
  }

  get passwordFormField() {
    return this.form.get('password');
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      const { email, password, displayName } = this.form.value;
      if (!email || !password || !displayName) return;
      await this._authService.createAccount(email, password, displayName);
      toast.success('Successfully signed up');
      this._router.navigateByUrl('/home');
    } catch (error) {
      toast.error('There was an error signing up');
    }
  }

  async signInWithGoogle() {
    try {
      await this._authService.createAccountWithGoogle();
      toast.success('Successfully signed up');
      this._router.navigateByUrl('/home');
    } catch (error) {
      toast.error('There was an error signing up');
    }
  }
}
