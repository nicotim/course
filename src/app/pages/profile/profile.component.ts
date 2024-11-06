import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '@core/models/interface/user.interface';
import { AuthStateService } from '@core/service/auth-state.service';
import { TimestampToDatePipe } from '@shared/pipes/time.pipe';
import { take } from 'rxjs';

const MODULES = [CommonModule];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MODULES, TimestampToDatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly _authState = inject(AuthStateService);
  user: User | null = null;

  ngOnInit(): void {
    this._authState.user$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }
}
