import { Component, ViewChild, inject } from '@angular/core';
import { Associate } from '../models/associate.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap, EMPTY, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { NotificationService } from '../../shared/services/notification.service';
import { AssociatesService } from '../shared/associates.service';
import { cpfPipe } from '../../shared/pipes/cpf.pipe';

@Component({
  selector: 'app-associates',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatMenuModule, MatTooltipModule, cpfPipe],
  templateUrl: './associates-list.component.html',
  styleUrl: './associates-list.component.scss'
})
export class AssociatesListComponent {
  displayedColumns: string[] = ['phone', 'name', 'document', 'birthAt', 'healthInsuranceIdentifier', 'settings'];
  dataSource: MatTableDataSource<Associate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  associatesService = inject(AssociatesService);
  authService = inject(AuthService);
  dialog = inject(MatDialog)
  notificationService = inject(NotificationService);

  constructor() {
    this.dataSource = new MatTableDataSource<Associate>();
  }

  ngOnInit() {
    this.fetchAssociates();
  }

  fetchAssociates() {
    this.associatesService.getAssociates().subscribe({
      next: (associates: Associate[]) => this.handleAssociates(associates),
      error: (error) => this.handleError(error)
    });
  }

  handleAssociates(associates: Associate[]) {
    this.dataSource = new MatTableDataSource(associates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.phone + data.user.name + data.document + data.birthAt + data.healthInsuranceIdentifier;
      return dataStr.toLowerCase().includes(filter);
    };
  }

  handleError(error: any) {
    this.notificationService.showNotification({ message: 'Erro buscar os associados', type: 'error', title: 'Erro'});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editAssociate(id: string) {
    console.log('Edit associate', id);
  }

  deleteAssociate(associate: Associate) {
    this.confirmDelete(associate).pipe(
      switchMap(confirm => {
          if (confirm)
            return this.associatesService.deleteAssociate(associate.associateId);
          return EMPTY;
        })
      ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(d => d.associateId !== associate.associateId);
        this.notificationService.showNotification({ message: 'Excluído com sucesso!', type: 'success', title: 'Associado Excluído', duration: 3000});
      },
      error: (error) => {
        this.notificationService.showNotification({ message: 'Erro ao excluir associado', type: 'error', title: 'Erro'});
      }
    });
  }

  confirmDelete(associate: Associate): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Excluir associado',
        message: `Deseja realmente excluir o associado ${associate.user.name}?`
      }
    });

    return dialogRef.afterClosed();
  }
}
