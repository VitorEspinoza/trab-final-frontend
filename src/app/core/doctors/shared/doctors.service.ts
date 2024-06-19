import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  http = inject(HttpClient);
  constructor() { }

  getDoctors() {
   return this.http.get('http://localhost:3000/doctors').pipe(take(1));
  }

  deleteDoctor(id: string) {
    return this.http.delete(`http://localhost:3000/doctors/${id}`).pipe(take(1));
  }
}
