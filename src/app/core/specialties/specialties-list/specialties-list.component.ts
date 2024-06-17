import { Component, ViewChild, inject } from '@angular/core';
import { Specialty } from '../models/specialty.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap, EMPTY, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { NotificationService } from '../../shared/services/notification.service';
import { SpecialtiesService } from '../shared/specialties.service';
import { InfoModalComponent } from '../../shared/components/info-modal/info-modal.component';
import { MatPaginatorIntlPtBr } from '../../shared/settings/mat-paginator-intl-pt-br.settings';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-specialties-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, RouterModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr }
  ],
  templateUrl: './specialties-list.component.html',
  styleUrl: './specialties-list.component.scss'
})
export class SpecialtiesListComponent {
  displayedColumns: string[] = ['specialtyId', 'name', 'settings'];
  dataSource: MatTableDataSource<Specialty>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  specialtiesService = inject(SpecialtiesService);
  authService = inject(AuthService);
  dialog = inject(MatDialog)
  notificationService = inject(NotificationService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource<Specialty>();
  }

  ngOnInit() {
    this.fetchSpecialties();
  }

  fetchSpecialties() {
    this.specialtiesService.getSpecialties().subscribe({
      next: (specialties: Specialty[]) => this.handleSpecialties(specialties),
      error: (error) => this.handleError(error)
    });
  }

  handleSpecialties(specialties: Specialty[]) {
    this.dataSource = new MatTableDataSource(specialties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.name + data.specialtyId;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  handleError(error: any) {
    this.notificationService.showNotification({ message: 'Erro buscar as especialidades', type: 'error', title: 'Erro'});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editSpecialty(id: string) {
   this.router.navigate([`/specialties/edit/${id}`]);
  }

  deleteSpecialty(specialty: Specialty) {
    this.confirmDelete(specialty).pipe(
      switchMap(confirm => {
          if (confirm)
            return this.specialtiesService.deleteSpecialty(specialty.specialtyId);
          return EMPTY;
        })
      ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(d => d.specialtyId !== specialty.specialtyId);
        this.notificationService.showNotification({ message: 'Excluída com sucesso!', type: 'success', title: 'Especialidade Excluída', duration: 3000});
      },
      error: (error) => {
        const { message } = error.error;
      const specialtyIsAssociated = message.includes('associated with');
      if(specialtyIsAssociated) {
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: {
            title: 'Erro ao excluir especialidade',
            message: `Esta especialidade está associada a um ou mais médicos ou unidades. Não é possível excluí-la.`
          }
        });
        return;
      }
        this.notificationService.showNotification({ message: 'Erro ao excluir especialidade', type: 'error', title: 'Erro'});
      }
    });
  }

  confirmDelete(specialty: Specialty): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir especialidade',
        message: `Deseja realmente excluir a especialidade ${specialty.name}?`
      }
    });

    return dialogRef.afterClosed();
  }
}
