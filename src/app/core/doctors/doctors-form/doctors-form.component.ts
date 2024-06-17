import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsFormService } from '../shared/doctors-form.service';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../shared/services/notification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Unit } from '../../units/models/unit.model';
import { Specialty } from '../../specialties/models/specialty.model';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SpecialtiesSelectComponent } from '../../shared/components/specialties-select/specialties-select.component';
import { finalize } from 'rxjs';
import { Doctor } from '../models/doctor.model';
@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, SpecialtiesSelectComponent],
  templateUrl: './doctors-form.component.html',
  styleUrl: './doctors-form.component.scss'
})
export class DoctorsFormComponent {
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  doctorsFormService = inject(DoctorsFormService);
  notificationService = inject(NotificationService);

  doctorId = this.route.snapshot.paramMap.get('id');
  isEdit = this.route.snapshot.url[1]?.path === 'edit';
  submittingForm = false;
  doctorsForm: FormGroup;
  units: Unit[] = [];
  savedSpecialties = [];


  ngOnInit() {
    this.doctorsForm = this.buildForm();
    this.getUnits();
    this.isEdit ? this.editFlow() : this.createFlow();
  }

   buildForm() {
    return this.fb.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      unitId: ['', Validators.required],
      medicalRegistrationNumber: ['', Validators.required],
      specialties: ['', Validators.required],
      principalSpecialties: ['', Validators.required]
    });
  }


  getUnits() {
    this.doctorsFormService.getUnits().subscribe({
      next: (units: Unit[]) => {
        this.units = units;
      }
    });
  }

  editFlow() {
    this.doctorsFormService.getDoctor(this.doctorId).subscribe({
      next: (doctor: Doctor) => {
        this.doctorsForm.patchValue(doctor);
        this.doctorsForm.get('unitId').setValue(doctor.unit.unitId);
        this.savedSpecialties = doctor.specialties;
      }
    });

  }

  createFlow() {

  }

  goBack() {
    this.router.navigate(['/doctors']);
  }

  saveDoctor() {
    const body = this.doctorsFormService.mountBody(this.doctorsForm.getRawValue());
    this.doctorsFormService.saveDoctor(body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'O médico foi registrado', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao registrar médico', title: 'Erro', type: 'error'});
      }
    });
  }

  updateDoctor() {
    const body = this.doctorsFormService.mountBody(this.doctorsForm.getRawValue());
    this.doctorsFormService.updateDoctor(this.doctorId, body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'O médico foi atualizado', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao atualizar médico', title: 'Erro', type: 'error'});
      }
    });
  }


  onSubmit() {
    this.submittingForm = true;
    if(this.doctorsForm.valid) {
      this.isEdit ? this.updateDoctor() : this.saveDoctor();
    }
  }
}
