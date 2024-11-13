import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { filter, map, Observable, take } from 'rxjs';
import { PreAuthNavComponent } from './shared/components/pre-auth-nav/pre-auth-nav.component';
import { LoadingService, UserService } from '@core/service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

const MODULES = [
  RouterOutlet,
  NgxSonnerToaster,
  NavbarComponent,
  CommonModule,
  LoadingComponent,
  PreAuthNavComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  _loading = inject(LoadingService);

  isLoggedIn$ = this._userService.loginStatus$;
  user$ = this._userService.user$;

  ngOnInit(): void {
    this._loading.show();
    this._userService.user$.pipe(take(1)).subscribe({
      next: () => {
        console.log(this.user$);
        this._loading.hide();
      },
      error: () => {
        this._loading.hide();
      },
    });
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
