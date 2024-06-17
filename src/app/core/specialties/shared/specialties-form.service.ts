import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesFormService {
  http = inject(HttpClient);
  constructor() { }

  getSpecialty(id: string) {
    return this.http.get(`http://localhost:3000/specialties/${id}`).pipe(take(1));
  }

  saveSpecialty(specialty) {
    return this.http.post('http://localhost:3000/specialties', specialty).pipe(take(1));
  }

  updateSpecialty(specialtyId, specialty) {
    return this.http.put(`http://localhost:3000/specialties/${specialtyId}`, specialty).pipe(take(1));
  }
}
