import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '@core/service';

const MODULES = [MatProgressSpinnerModule];

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MODULES],
  template: `
    @if (isLoading()) {
    <div class="loading-container">
      <mat-spinner mode="indeterminate"></mat-spinner>
    </div>
    }
  `,
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  private readonly _spinnerService = inject(SpinnerService);

  isLoading = this._spinnerService.isLoading;
}
