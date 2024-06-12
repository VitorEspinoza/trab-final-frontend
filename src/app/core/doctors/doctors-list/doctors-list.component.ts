import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { Doctor } from '../models/doctor.model';
import { DoctorsService } from '../shared/doctors.service';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorIntlPtBr } from '../../shared/settings/mat-paginator-intl-pt-br.settings';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from '../../shared/enums/role.enum';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr }
  ],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.scss'
})
export class DoctorsListComponent implements OnInit {
  displayedColumns: string[] = ['document', 'name', 'unit'];
  dataSource: MatTableDataSource<Doctor>;
  Role = Role;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isAdmin = false;
  doctorsService = inject(DoctorsService);
  authService = inject(AuthService);
  dialog = inject(MatDialog)

  constructor() {
    this.dataSource = new MatTableDataSource<Doctor>();
  }

  ngOnInit() {
    this.isAdmin = this.authService.currentUserSig().role === Role.ADMIN;
    this.updateColumns();
    this.fetchDoctors();
  }

  updateColumns() {
    let newCollumByRole = this.isAdmin ? 'settings' : 'view';
    this.displayedColumns.push(newCollumByRole);
  }

  fetchDoctors() {
    this.doctorsService.getDoctors().subscribe({
      next: (doctors: Doctor[]) => this.handleDoctors(doctors),
      error: (error) => this.handleError(error)
    });
  }

  handleDoctors(doctors: Doctor[]) {
    this.dataSource = new MatTableDataSource(doctors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'unit': return item.unit.displayName;
        default: return item[property];
      }
    };

    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.name + data.document + data.unit.displayName;
      return dataStr.toLowerCase().includes(filter);
    };
  }


  handleError(error: any) {
    console.error('Ocorreu um erro ao buscar os médicos', error);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDoctor(id: string) {
    console.log('Edit doctor', id);
  }

  deleteDoctor(doctor: Doctor) {
    this.confirmDelete(doctor).pipe(
      switchMap(confirm => {
          if (confirm)
            return this.doctorsService.deleteDoctor(doctor.doctorId);

          return EMPTY;
        })
      ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(d => d.doctorId !== doctor.doctorId);
      },
      error: (error) => {
        console.error('Ocorreu um erro ao excluir o médico', error);
      }
    });
  }

  confirmDelete(doctor: Doctor): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir médico',
        message: `Deseja realmente excluir o médico ${doctor.name}?`
      }
    });

    return dialogRef.afterClosed();
  }

  viewDoctor(id: string) {
    console.log('View doctor', id);
  }

}



