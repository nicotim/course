import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-teacher',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard-teacher.component.html',
  styleUrl: './dashboard-teacher.component.css',
})
export class DashboardTeacherComponent {}
