import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MODULES = [MatProgressSpinnerModule];

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MODULES],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {}
