import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { AuthStateService } from 'src/app/core/service/auth-state.service';
import { UserService } from '@core/service/user.service';
import { User } from '@core/models/interface/user.interface';
import { lastValueFrom } from 'rxjs';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  RouterModule,
  CommonModule,
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _authState = inject(AuthStateService);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);

  user: User | null = null;

  showRegisterLink = false;
  showLoginLink = false;
  showLogoutButton = false;
  showDashboardLink = false;
  showCustomTitle = false;

  ngOnInit(): void {
    this._authState.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.showRegisterLink = !isLoggedIn;
      this.showLoginLink = !isLoggedIn;
      this.showDashboardLink = isLoggedIn;
      this.showLogoutButton = isLoggedIn;
      this.showCustomTitle = isLoggedIn;
    });
    this._userService.getCurrentUserData().subscribe((userData) => {
      this.user = userData;
    });
  }

  async logOut() {
    return await this._authService.logOut();
  }

  navigateToFAQ() {
    return this._router.navigateByUrl('faq');
  }
}
