import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '@core/service/notifications/notification.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {
  private readonly _notificationService = inject(NotificationService);

  roleChangeRequests: any[] = [];

  ngOnInit(): void {
    this._notificationService.listenForRoleChangeRequests((req) => {
      this.roleChangeRequests = req;
    });
  }

  approveReq() {}

  denyReq() {}
}
