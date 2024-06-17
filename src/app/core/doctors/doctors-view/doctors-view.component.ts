import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { NotificationService } from '../../shared/services/notification.service';
import { DoctorsFormService } from '../shared/doctors-form.service';
import { CommonModule } from '@angular/common';
import { CepPipe } from '../../shared/pipes/cep.pipe';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-doctors-view',
  standalone: true,
  imports: [CommonModule, CepPipe, MatChipsModule],
  templateUrl: './doctors-view.component.html',
  styleUrl: './doctors-view.component.scss'
})

export class DoctorsViewComponent implements OnInit{
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  doctorsFormService = inject(DoctorsFormService);
  doctorId = this.route.snapshot.paramMap.get('id');
  doctor;
  ngOnInit(): void {
    this.getDoctor();
  }

  getDoctor() {
     this.doctorsFormService.getDoctor(this.doctorId).subscribe({
        next: (doctor: Doctor) => {
          this.doctor = doctor;
        },
        error: (error) => {
          this.notificationService.showNotification({title: 'Error', message: 'Houve um erro ao carregar informações do médico', type: 'error'});
        }
      });
  }

}
