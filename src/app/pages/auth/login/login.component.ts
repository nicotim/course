import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '@shared/reusableComponents/auth-button/auth-button.component';
import { hasEmailError, isRequired } from '@shared/utils/auth.validators';
import { toast } from 'ngx-sonner';
import { FormSignIn } from 'src/app/core/models/interface/auth.interface';
import { AuthService } from 'src/app/core/service/auth.service';

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

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;

      await this._authService.signIn({
        email,
        password,
        role: 'user',
        creationDate: new Date(),
      });

      toast.success('Successfully signed in');
      this._router.navigateByUrl('/dashboard/student');
    } catch (error: unknown) {
      toast.error('There was an error signing in');
    }
  }

  async signUpWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Successfully signed up');
      this._router.navigateByUrl('/dashboard/student');
    } catch (error) {
      toast.error('There was an error signing up');
    }
  }
}
