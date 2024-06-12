import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  http = inject(HttpClient);
  constructor() { }

  getUnits() {
   return this.http.get('http://localhost:3000/units').pipe(take(1));
  }

  deleteUnit(id: string) {
    return this.http.delete(`http://localhost:3000/units/${id}`).pipe(take(1));
  }
}
