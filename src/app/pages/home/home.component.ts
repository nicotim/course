import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStateService } from 'src/app/core/service/auth-state.service';
import { UserService } from '@core/service/user.service';
import { User } from '@core/models/interface/user.interface';
import { Subscription } from 'rxjs';

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
  private readonly _authState = inject(AuthStateService);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private subscriptions: Subscription[] = [];

  user: User | null = null;

  showRegisterLink = false;
  showLoginLink = false;
  showLogoutButton = false;
  showDashboardLink = false;
  showCustomTitle = false;

  ngOnInit(): void {
    this.subscriptions.push(
      this._authState.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
        this.showRegisterLink = !isLoggedIn;
        this.showLoginLink = !isLoggedIn;
        this.showDashboardLink = isLoggedIn;
        this.showLogoutButton = isLoggedIn;
        this.showCustomTitle = isLoggedIn;
      })
    );
    this.subscriptions.push(
      this._userService.getCurrentUserData$.subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToFAQ() {
    return this._router.navigateByUrl('faq');
  }
}
