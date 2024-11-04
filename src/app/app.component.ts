import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthStateService } from '@core/service/auth-state.service';
import { NgxSonnerToaster } from 'ngx-sonner';
import { filter, map, Observable } from 'rxjs';
import { BeforeAuthNavbarComponent } from './shared/reusableComponents/nav/before-auth-navbar/before-auth-navbar.component';
import { AfterAuthNavbarComponent } from './shared/reusableComponents/nav/after-auth-navbar/after-auth-navbar.component';

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
  imports: [MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _authState = inject(AuthStateService);
  private readonly _router = inject(Router);

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  isLoggedIn: Observable<Boolean> = this._authState.isLoggedIn$;

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
