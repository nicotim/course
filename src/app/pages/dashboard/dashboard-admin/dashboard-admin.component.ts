import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../shared/reusableComponents/info-card/info-card.component';

const MODULES = [InfoCardComponent];

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MODULES],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent {}
