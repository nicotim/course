import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from '@core/models/interface/user.interface';
import { AuthService } from '@core/service/auth.service';
import { UserService } from '@core/service/user.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

const MODULES = [MatToolbarModule, RouterModule, CommonModule];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  currentUserRole$ = this._userService.fetchCurrentUserRole$;

  ngOnDestroy(): void {}

  async logOut() {
    this._userService.clearCache();
    this._router.navigateByUrl('/home');
    return await this._authService.logOut();
  }
}
