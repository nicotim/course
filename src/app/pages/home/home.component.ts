import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  RouterModule,
  CommonModule,
  NgOptimizedImage,
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly _router = inject(Router);

  navigateToFAQ() {
    return this._router.navigateByUrl('faq');
  }
}
