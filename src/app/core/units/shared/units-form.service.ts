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
}
