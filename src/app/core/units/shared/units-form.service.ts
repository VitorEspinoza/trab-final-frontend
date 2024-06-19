import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsFormService{
  http = inject(HttpClient);
  constructor() { }

  getUnit(id: string) {
    return this.http.get(`http://localhost:3000/units/${id}`).pipe(take(1));
  }

  saveUnit(unit) {
    return this.http.post('http://localhost:3000/units', unit).pipe(take(1));
  }

  updateUnit(unitId, unit) {
    return this.http.put(`http://localhost:3000/units/${unitId}`, unit).pipe(take(1));
  }

  getUnits() {
    return this.http.get('http://localhost:3000/units').pipe(take(1));
  }

  mountBody(unit) {
    const specialties = unit.specialties.map(specialty => {
      return {specialtyId: specialty, isPrincipalSpecialty: unit.principalSpecialties.includes(specialty)};
    });
    delete unit.principalSpecialties;
    return {
      ...unit,
      specialties: specialties,
    };
  }
}
