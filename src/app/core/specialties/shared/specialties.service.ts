import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  http = inject(HttpClient);
  constructor() { }

  getSpecialties() {
   return this.http.get('http://localhost:3000/specialties').pipe(take(1));
  }

  deleteSpecialty(id: string) {
    return this.http.delete(`http://localhost:3000/specialties/${id}`).pipe(take(1));
  }
}
