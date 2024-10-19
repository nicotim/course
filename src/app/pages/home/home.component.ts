import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

const MODULES = [MatToolbarModule, MatIconModule, MatListModule, RouterModule];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  list = [
    { name: 'Sign up', isActive: false },
    { name: 'Sign in', isActive: false },
  ];
}
