import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `<div class="loading-container">
    <mat-spinner mode="indeterminate"></mat-spinner>
  </div> `,
  styleUrl: './loading.component.css',
})
export class LoadingComponent {}
