import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [NgClass, MatIconModule]
})
export class NotificationComponent {
  icon = 'error';
  notificationClass = 'error-notification';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    const correspondingMatIcon =
    {
      'error': 'error',
      'success': 'check_circle',
      'info': 'info',
      'warning': 'warning'
    }

    const correspondingNotificationClass = {
      'error': 'error-notification',
      'success': 'success-notification',
      'info': 'info-notification',
      'warning': 'warning-notification'
    }

    this.notificationClass = correspondingNotificationClass[data.notificationType];
    this.icon = correspondingMatIcon[data.notificationType];
   }
}
