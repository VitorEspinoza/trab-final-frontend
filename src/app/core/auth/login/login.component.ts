import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize, take } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      RouterModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  inputType = 'password';
  fb = inject(FormBuilder);
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthService);
  cd = inject(ChangeDetectorRef)
  notificationService = inject(NotificationService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    });

  visible = false;
  visibilityIcon = 'visibility';
  visibilityInfo = "Mostrar Senha"
  submittingForm: boolean = false;

  onSubmit() {
    this.submittingForm = true;
    this.authService.login(this.loginForm.getRawValue()).pipe(
      take(1),
      finalize(() => {
      this.submittingForm = false
      this.cd.detectChanges();
    })
  ).subscribe({
      next: (success: boolean) => {
        if (success)
          this.router.navigate(['']);
        else
         this.notificationService.showNotification({ message: 'Usuário ou senha inválidos', title: 'Erro', type: 'error', duration: 3000 });
      }
    });
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

}

