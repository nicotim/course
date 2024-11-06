import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormSignIn } from '@core/models/interface/auth.interface';
import { AuthService } from '@core/service';
import { AuthButtonComponent } from '@shared/Components/auth-button/auth-button.component';
import { hasEmailError, isRequired } from '@shared/utils/auth.validators';
import { toast } from 'ngx-sonner';

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
  selector: 'app-login',
  standalone: true,
  imports: [MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      await this._authService.signIn(email, password);
      toast.success('Successfully signed in');
      this._router.navigateByUrl('/home');
    } catch (error) {
      toast.error('There was an error signing in, please try again');
      this.form.reset();
    }
  }
  async signUpWithGoogle() {
    try {
      await this._authService.createAccountWithGoogle();
      toast.success('Successfully signed up');
      this._router.navigate(['/home']);
    } catch (error) {
      toast.error('There was an error signing up');
    }
  }
}
