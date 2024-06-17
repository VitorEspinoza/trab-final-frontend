import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Specialty } from '../../../specialties/models/specialty.model';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-specialties-select',
  standalone: true,
  imports: [MatSelectModule, CommonModule, MatCheckboxModule, ReactiveFormsModule, MatOptionModule],
  templateUrl: './specialties-select.component.html',
  styleUrl: './specialties-select.component.scss'
})
export class SpecialtiesSelectComponent implements OnInit {
  @Input({required: true}) parentForm: FormGroup;
  @Input() selectedSpecialties = [];

  specialties = [];
  http = inject(HttpClient);
  notificationService = inject(NotificationService);

  specialtyDetails = {};
  ngOnInit() {
     this.getSpecialties();
  }


  getSpecialties() {
    this.http.get('http://localhost:3000/specialties').pipe(take(1)).subscribe({
      next: (specialties: Specialty[]) => {

        this.specialties = specialties;


        if(this.selectedSpecialties.length > 0)
          this.setSelectedSpecialts();

        this.setSpecialtyDetails();

      },
      error: (error) => {
        this.notificationService.showNotification({message:'Erro ao carregar especialidades', title: 'error', type: 'error'});
      }

    });
  }

  setSelectedSpecialts() {
    this.parentForm.get('specialties').setValue(this.selectedSpecialties.map(specialty => specialty.specialtyId));
    this.parentForm.get('principalSpecialties').setValue(this.selectedSpecialties.map(specialty => specialty.specialtyId));
  }


  isSpecialtySelected(specialtyId: string): boolean {
    return this.selectedSpecialties.some(specialty => specialty.specialtyId === specialtyId);
  }
  setSpecialtyDetails() {
    this.specialties.forEach(specialty => {
      this.specialtyDetails[specialty.specialtyId] = {
        name: specialty.name,
        isPrincipalSpecialty: specialty.isPrincipalSpecialty
      };
    });
  }


  selectSpecialty(event: MatSelectChange) {
    this.parentForm.get('specialties').setValue(event.value);
  }

  selectPrincipalSpecialties(event: MatSelectChange) {
    this.parentForm.get('principalSpecialties').setValue(event.value);
  }

}
