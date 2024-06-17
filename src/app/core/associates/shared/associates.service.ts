import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociatesService {
  http = inject(HttpClient);
  constructor() { }

  getAssociates() {
   return this.http.get('http://localhost:3000/associates').pipe(take(1));
  }

  deleteAssociate(id: string) {
    return this.http.delete(`http://localhost:3000/associates/${id}`).pipe(take(1));
  }

  getAssociateById(id: string) {
    return this.http.get(`http://localhost:3000/associates/${id}`).pipe(take(1));
  }
}
