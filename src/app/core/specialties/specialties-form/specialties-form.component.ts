import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { finalize } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { Specialty } from '../models/specialty.model';
import { SpecialtiesFormService } from '../shared/specialties-form.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-specialties-form',
  standalone: true,
  imports:  [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './specialties-form.component.html',
  styleUrl: './specialties-form.component.scss'
})
export class SpecialtiesFormComponent {
route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  specialtiesFormService = inject(SpecialtiesFormService);
  notificationService = inject(NotificationService);

  specialtyId = this.route.snapshot.paramMap.get('id');
  isEdit = this.route.snapshot.url[1]?.path === 'edit';
  submittingForm = false;
  specialtiesForm: FormGroup;
  specialties: Specialty[] = [];


  ngOnInit() {
    this.specialtiesForm = this.buildForm();
    this.isEdit ? this.editFlow() : this.createFlow();
  }

   buildForm() {
     return this.fb.group({
      name: ['', Validators.required],
    });

  }

  editFlow() {
    this.specialtiesFormService.getSpecialty(this.specialtyId).subscribe({
      next: (specialty: Specialty) => {
        this.specialtiesForm.patchValue(specialty);
      }
    });

  }

  createFlow() {
  }

  goBack() {
    this.router.navigate(['/specialties']);
  }

  saveSpecialty() {
    const body = this.specialtiesForm.getRawValue();
    this.specialtiesFormService.saveSpecialty(body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'A especialidade foi registrada', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao registrar especialidade', title: 'Erro', type: 'error'});
      }
    });
  }

  updateSpecialty() {
    const body = this.specialtiesForm.getRawValue();
    this.specialtiesFormService.updateSpecialty(this.specialtyId, body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'A especialidade foi atualizada', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao atualizar especialidade', title: 'Erro', type: 'error'});
      }
    });
  }


  onSubmit() {
    this.submittingForm = true;
    if(this.specialtiesForm.valid) {
      this.isEdit ? this.updateSpecialty() : this.saveSpecialty();
    }
  }
}
