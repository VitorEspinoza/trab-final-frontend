import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { Unit } from '../models/unit.model';
import { UnitsFormService } from '../shared/units-form.service';
import { SpecialtiesSelectComponent } from '../../shared/components/specialties-select/specialties-select.component';

@Component({
  selector: 'app-units-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, RouterModule, ReactiveFormsModule, SpecialtiesSelectComponent],
  templateUrl: './units-form.component.html',
  styleUrl: './units-form.component.scss'
})
export class UnitsFormComponent {
   route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  unitsFormService = inject(UnitsFormService);
  notificationService = inject(NotificationService);

  unitId = this.route.snapshot.paramMap.get('id');
  isEdit = this.route.snapshot.url[1]?.path === 'edit';
  submittingForm = false;
  unitsForm: FormGroup;
  units: Unit[] = [];
  savedSpecialties = [];


  ngOnInit() {
    this.unitsForm = this.buildForm();
    this.isEdit ? this.editFlow() : this.createFlow();
  }

   buildForm() {
     return this.fb.group({
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        number: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      specialties: ['', Validators.required],
      principalSpecialties: ['', Validators.required]
    });

  }

  editFlow() {
    this.unitsFormService.getUnit(this.unitId).subscribe({
      next: (unit: Unit) => {
        this.unitsForm.patchValue(unit);
        this.savedSpecialties = unit.specialties;
      }
    });

  }

  createFlow() {

  }

  goBack() {
    this.router.navigate(['/units']);
  }

  saveUnit() {
    const body = this.unitsFormService.mountBody(this.unitsForm.getRawValue());
    this.unitsFormService.saveUnit(body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'A unidade foi registrada', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao registrar unidade', title: 'Erro', type: 'error'});
      }
    });
  }

  updateUnit() {
    const body = this.unitsFormService.mountBody(this.unitsForm.getRawValue());
    this.unitsFormService.updateUnit(this.unitId, body).pipe(finalize(() => this.submittingForm = false)).subscribe({
      next: () => {
        this.notificationService.showNotification({message: 'A unidade foi atualizada', title: 'Sucesso!', type: 'success'});
        this.goBack();
      },
      error: (e) => {
        this.notificationService.showNotification({message: 'Erro ao atualizar unidade', title: 'Erro', type: 'error'});
      }
    });
  }


  onSubmit() {
    this.submittingForm = true;
    if(this.unitsForm.valid) {
      this.isEdit ? this.updateUnit() : this.saveUnit();
    }
  }
}
