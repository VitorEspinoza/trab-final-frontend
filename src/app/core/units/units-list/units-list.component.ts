import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { switchMap, EMPTY, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { Role } from '../../shared/enums/role.enum';
import { NotificationService } from '../../shared/services/notification.service';
import { Unit } from '../models/unit.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UnitsService } from '../shared/units.service';
import { MatPaginatorIntlPtBr } from '../../shared/settings/mat-paginator-intl-pt-br.settings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule],
  providers: [
   { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr }
  ],
  templateUrl: './units-list.component.html',
  styleUrl: './units-list.component.scss'
})
export class UnitsListComponent {
displayedColumns: string[] = ['displayName', 'address', 'specialties'];
  dataSource: MatTableDataSource<Unit>;
  Role = Role;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isAdmin = false;
  unitsService = inject(UnitsService);
  authService = inject(AuthService);
  dialog = inject(MatDialog)
  notificationService = inject(NotificationService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource<Unit>();
  }

  ngOnInit() {
    this.isAdmin = this.authService.currentUserSig().role === Role.ADMIN;
    this.updateColumns();
    this.fetchUnits();
  }

  updateColumns() {
    let newCollumByRole = this.isAdmin ? 'settings' : 'view';

    if(this.isAdmin)
      this.displayedColumns.unshift('name');
    this.displayedColumns.push(newCollumByRole);
  }

  getSpecialties(specialties) {
  return specialties.map(specialty => specialty.name).join(', ');
}

  fetchUnits() {
    this.unitsService.getUnits().subscribe({
      next: (units: Unit[]) => this.handleUnits(units),
      error: (error) => this.handleError(error)
    });
  }

  handleUnits(units: Unit[]) {
    units = units.map(unit => ({
      ...unit,
      specialtiesStr: this.getSpecialties(unit.specialties)
    }));
    this.dataSource = new MatTableDataSource(units);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        default: return item[property];
      }
    };

    this.dataSource.filterPredicate = (data, filter) => {
      const addressStr = Object.values(data.address).join(' ');
      const specialtiesStr = data.specialties.map(specialty => specialty.name).join(' ');
      const dataStr = data.name + data.displayName + addressStr + specialtiesStr;

      return dataStr.toLowerCase().includes(filter);
    };
  }


  handleError(error: any) {
    this.notificationService.showNotification({ message: 'Erro buscar as unidades', type: 'error', title: 'Erro'});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUnit(id: string) {
    console.log('Edit unit', id);
  }

  deleteUnit(unit: Unit) {
    this.confirmDelete(unit).pipe(
      switchMap(confirm => {
          if (confirm)
            return this.unitsService.deleteUnit(unit.unitId);

          return EMPTY;
        })
      ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(d => d.unitId !== unit.unitId);
        this.notificationService.showNotification({ message: 'Excluída com sucesso!', type: 'success', title: 'Unidade Excluída', duration: 3000});
      },
      error: (error) => {
        this.notificationService.showNotification({ message: 'Erro ao excluir unidade', type: 'error', title: 'Erro'});
      }
    });
  }

  confirmDelete(unit: Unit): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir unidade',
        message: `Deseja realmente excluir a unidade ${unit.displayName}?`
      }
    });

    return dialogRef.afterClosed();
  }

  viewUnit(id: string) {
    this.router.navigate(['units', 'view', `${id}`]);
  }
}
