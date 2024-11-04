import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

const MODULES = [MatCardModule];

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MODULES],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  title = 'Python';
  numericalInfo = 0;
}
