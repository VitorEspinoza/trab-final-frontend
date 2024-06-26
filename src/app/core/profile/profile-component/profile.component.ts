import { User } from './../../auth/models/user.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from '../../shared/enums/role.enum';
import { ProfileService } from '../shared/profile.service';
import { Associate } from '../../associates/models/associate.model';
import { MatButtonModule } from '@angular/material/button';
import { cpfPipe } from '../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../shared/pipes/phone.pipe';
import { CepPipe } from '../../shared/pipes/cep.pipe';
import { NotificationService } from '../../shared/services/notification.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, cpfPipe, PhonePipe, CepPipe, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  role = Role;
  actualUser = this.authService.currentUserSig();
  isAdmin = this.actualUser.role === Role.ADMIN;
  profile;

  imgUrl = 'assets/sem_foto.png';
  constructor() {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profileService.getData(this.actualUser.userId, this.isAdmin).subscribe({
        next: (data: User | Associate) => {
          this.profile = data;
          console.log(this.profile.photo_url,  this.profile.user.photo_url, this.profile.photo_url || this.profile.user.photo_url);
          this.setProfileImage(this.profile.photo_url || this.profile.user.photo_url);

        },
        error: () => {
          this.notificationService.showNotification({ message: 'Houve um problema ao carregar seus dados', title: "Erro", type: 'error'});
        }
    });
  }

  setProfileImage(url) {
    if(!url) return;

    this.imgUrl = 'https://' + url;
  }
  editAssociate() {
    this.router.navigate(['associates', 'edit', this.profile.associateId]);
  }

  setDefaultImage() {
  this.imgUrl = 'assets/sem_foto.png';
}
}
