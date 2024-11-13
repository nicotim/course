import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

const MODULES = [MatToolbarModule, RouterModule, CommonModule];

@Component({
  selector: 'app-pre-auth-nav',
  standalone: true,
  imports: [MODULES],
  templateUrl: './pre-auth-nav.component.html',
  styleUrl: './pre-auth-nav.component.css',
})
export class PreAuthNavComponent {}
