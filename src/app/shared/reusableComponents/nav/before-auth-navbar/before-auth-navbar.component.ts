import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

const MODULES = [MatToolbarModule, RouterModule, CommonModule];

@Component({
  selector: 'app-before-auth-navbar',
  standalone: true,
  imports: [MODULES],
  templateUrl: './before-auth-navbar.component.html',
  styleUrl: './before-auth-navbar.component.css',
})
export class BeforeAuthNavbarComponent {}
