import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { AssociatesService } from '../shared/associates.service';
import { AssociatesFormService } from '../shared/associates-form.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { BrazilianDateAdapter, BRAZILIAN_DATE_FORMATS } from '../../shared/settings/brazilian-date-adapter';
import { passwordValidator } from '../../shared/validators/password.validator';
import { Associate } from '../models/associate.model';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from '../../shared/enums/role.enum';

@Component({
  selector: 'app-associates-form',
    providers: [
    { provide: DateAdapter, useClass: BrazilianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: BRAZILIAN_DATE_FORMATS },
  ],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,  CommonModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatNativeDateModule, MatDatepickerModule],
  templateUrl: './associates-form.component.html',
  styleUrl: './associates-form.component.scss'
})


export class AssociatesFormComponent implements OnInit{

  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  notificationService = inject(NotificationService);
  associatesService = inject(AssociatesService);
  associatesFormService = inject(AssociatesFormService);
  authService = inject(AuthService);

  associateId = this.route.snapshot.paramMap.get('id');
  isEdit = this.route.snapshot.url[1]?.path === 'edit';
  submittingForm = false;
  associatesForm: FormGroup;

  visible = false;
  visibilityIcon = 'visibility';
  visibilityInfo = "Mostrar Senha"
  inputType = 'password';
  selectedFile = null;
  photoLabel = 'Enviar foto';
  isAdmin = this.authService.currentUserSig().role === Role.ADMIN;

  ngOnInit() {
    this.associatesForm = this.buildForm();
    this.isEdit ? this.editFlow() : this.createFlow();
  }

buildForm() {
    let formGroup = {
      name: ['', Validators.required],
      email: ['', Validators.required],
      document: ['', Validators.required],
      birthAt: [null, Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    };

    if (!this.isEdit) {
      formGroup['password'] = ['', [Validators.required, passwordValidator()]];
    }

    return this.fb.group(formGroup);
}

  editFlow() {
    this.associatesService.getAssociateById(this.associateId).subscribe({
      next: (associate: Associate) => this.setValueInForm(associate),
      error: (error) => this.notificationService.showNotification({ message: 'Erro ao buscar associado', type: 'error', title: 'Erro!'})
    });
  }

  createFlow() {

  }

  setValueInForm(associate: Associate) {

    const { address } = associate;
    const { user } = associate;
    this.associatesForm.patchValue({...associate, ...address, ...user});
  }

  onSubmit() {
    this.submittingForm = true;
    this.isEdit ? this.update() : this.create();
  }


  create() {
    this.associatesFormService.createAssociate(this.associatesForm, this.selectedFile).subscribe({
      next: () => {
        this.notificationService.showNotification({ message: 'Associado criado com sucesso!', type: 'success', title: 'Sucesso!'});
        this.goBack();
      },
      error: (error) => {
        this.notificationService.showNotification({ message: 'Erro ao criar associado', type: 'error', title: 'Erro!'});
        this.submittingForm = false;
      }
    });

  }

  update() {
    this.associatesFormService.updateAssociate(this.associateId, this.associatesForm, this.selectedFile).subscribe({
      next: () => {
        this.notificationService.showNotification({ message: 'Associado atualizado com sucesso!', type: 'success', title: 'Sucesso!'});
        this.goBack();
      },
      error: (error) => {
        this.notificationService.showNotification({ message: 'Erro ao atualizar associado', type: 'error', title: 'Erro!'});
        this.submittingForm = false;
      }
    });

  }
  goBack() {
    if(this.isAdmin)
    return this.router.navigate(['/associates']);

    return this.router.navigate(['/profile']);

  }

  toggleVisibility() {
    if (this.visible) {
      this.visible = false;
      this.inputType = 'password';
      this.visibilityInfo = "Mostrar Senha";
      this.visibilityIcon = 'visibility';
      return;
    }

    this.inputType = 'text';
    this.visibilityInfo = "Ocultar Senha";
    this.visible = true;
    this.visibilityIcon = 'visibility_off';

  }

  onFileSelected(event) {
    this.photoLabel = 'Alterar foto';
    this.selectedFile = event.target.files[0];
  }

}
