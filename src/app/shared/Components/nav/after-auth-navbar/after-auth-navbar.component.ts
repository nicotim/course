import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { UserService } from '@core/service/user.service';

const MODULES = [MatToolbarModule, RouterModule, CommonModule];

@Component({
  selector: 'app-after-auth-navbar',
  standalone: true,
  imports: [MODULES],
  templateUrl: './after-auth-navbar.component.html',
  styleUrl: './after-auth-navbar.component.css',
})
export class AfterAuthNavbarComponent implements OnDestroy {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  currentUserRole$ = this._userService.fetchCurrentUserRole$;

  ngOnDestroy(): void {}

  async logOut() {
    this._userService.clearCache();
    return await this._authService.logOut();
  }
}
