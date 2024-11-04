import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  RouterModule,
  CommonModule,
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _router = inject(Router);

  ngOnInit(): void {}

  navigateToFAQ() {
    return this._router.navigateByUrl('faq');
  }
}
