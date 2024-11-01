import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

const MODULES = [MatSidenavModule, MatButtonModule];

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MODULES],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  showFiller = false;
}
