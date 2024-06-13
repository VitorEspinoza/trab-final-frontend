import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data.model';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}


