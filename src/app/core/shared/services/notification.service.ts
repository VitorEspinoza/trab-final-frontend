import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';


  showNotification(config: notificatioConfig) {
    let snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        title: config.title,
        message: config.message,
        notificationType: config.type,
        dismiss: () => snackBarRef.dismiss()
      },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: config.duration || 3000,
      panelClass: `${config.type}-notification`
    });
  }

}
export interface notificatioConfig {
  message: string;
  title: string;
  type: 'error' | 'success' | 'info' | 'warning';
  duration?: number;
}
