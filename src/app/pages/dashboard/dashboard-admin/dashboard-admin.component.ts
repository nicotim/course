import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const MODULES = [RouterOutlet];

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MODULES],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent {}
