import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User, UserRole } from '@core/models/interface/user.interface';
import { LoadingService, UserService } from '@core/service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { TimestampToDatePipe } from '@shared/pipes/time.pipe';
import { take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

const MODULES = [MatCardModule, CommonModule, TimestampToDatePipe];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MODULES, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly _userService = inject(UserService);
  _loading = inject(LoadingService);
  user: User | null = null;

  ngOnInit(): void {
    this._userService.user$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  isUser(role: UserRole | undefined): boolean {
    return this.user?.role === 'user';
  }
}
