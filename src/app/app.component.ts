import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AfterAuthNavbarComponent } from '@shared/Components/nav/after-auth-navbar/after-auth-navbar.component';
import { BeforeAuthNavbarComponent } from '@shared/Components/nav/before-auth-navbar/before-auth-navbar.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { filter, map, Observable } from 'rxjs';
import { UserService } from '@core/service';

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
export class AppComponent {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);

  isLoggedIn$ = this._userService.isLoggedIn$;
  user$ = this._userService.user$;

  constructor() {
    this.isLoggedIn$.subscribe((data) => console.log('Is logged in', data));
    this.user$.subscribe((data) =>
      console.log('Is user observable data', data)
    );
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
