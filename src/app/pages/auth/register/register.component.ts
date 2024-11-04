import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSignUp } from '../../../core/models/interface/auth.interface';
import { hasEmailError, isRequired } from '@shared/utils/auth.validators';
import { AuthService } from 'src/app/core/service/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { AuthButtonComponent } from '@shared/Components/auth-button/auth-button.component';

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
      const { email, password, displayName } = this.form.value;
      if (!email || !password || !displayName) return;

      await this._authService.signUp(email, password, displayName);

      toast.success('Successfully signed up');
      this._router.navigateByUrl('/home');
    } catch (error: unknown) {
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
