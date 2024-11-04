import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UserRole } from '@core/models/interface/user.interface';
import { AuthService } from '@core/service/auth.service';
import { UserService } from '@core/service/user.service';
import { take } from 'rxjs';

const MODULES = [MatToolbarModule, RouterModule, CommonModule];

@Component({
  selector: 'app-after-auth-navbar',
  standalone: true,
  imports: [MODULES],
  templateUrl: './after-auth-navbar.component.html',
  styleUrl: './after-auth-navbar.component.css',
})
export class AfterAuthNavbarComponent implements OnInit, OnDestroy {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  currentUserRole: UserRole | null = null;

  ngOnInit(): void {
    this._userService.currentUserRole$.pipe(take(1)).subscribe((data) => {
      this.currentUserRole = data;
      console.log(this.currentUserRole);
    });
  }

  ngOnDestroy(): void {}

  async logOut() {
    this._userService.clearCache();
    return await this._authService.logOut();
  }
}
