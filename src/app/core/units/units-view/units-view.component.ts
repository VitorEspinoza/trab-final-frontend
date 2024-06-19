import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CepPipe } from '../../shared/pipes/cep.pipe';
import { Unit } from '../models/unit.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { UnitsFormService } from '../shared/units-form.service';

@Component({
  selector: 'app-units-view',
  standalone: true,
  imports: [CommonModule, CepPipe, MatChipsModule],
  templateUrl: './units-view.component.html',
  styleUrl: './units-view.component.scss'
})
export class UnitsViewComponent {
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  unitsFormService = inject(UnitsFormService);
  unitId = this.route.snapshot.paramMap.get('id');
  unit;
  ngOnInit(): void {
    this.getUnit();
  }

  getUnit() {
     this.unitsFormService.getUnit(this.unitId).subscribe({
        next: (unit: Unit) => {
          this.unit = unit;
        },
        error: (error) => {
          this.notificationService.showNotification({title: 'Error', message: 'Houve um erro ao carregar informações da unidade', type: 'error'});
        }
      });
  }
}
