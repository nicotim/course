import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { User } from '@core/models/interface/user.interface';
import { AuthStateService } from '@core/service/auth-state.service';
import { AfterAuthNavbarComponent } from '@shared/Components/nav/after-auth-navbar/after-auth-navbar.component';
import { BeforeAuthNavbarComponent } from '@shared/Components/nav/before-auth-navbar/before-auth-navbar.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { filter, map, Observable } from 'rxjs';
import { LoadingComponent } from './shared/Components/loading/loading.component';
import { authState } from '@angular/fire/auth';

const MODULES = [
  CommonModule,
  RouterOutlet,
  NgxSonnerToaster,
  BeforeAuthNavbarComponent,
  AfterAuthNavbarComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MODULES, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly _authState = inject(AuthStateService);
  private readonly _router = inject(Router);

  user$: Observable<User | null>;
  isLoggedIn$ = this._authState.isLoggedIn$;

  constructor() {
    this.user$ = this._authState.user$;
  }

  isAuthSection$: Observable<Boolean> = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => {
      if (event instanceof NavigationEnd) {
        return event.url.startsWith('/auth');
      }
      return false;
    })
  );
}
