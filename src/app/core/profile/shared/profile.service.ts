import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  private http = inject(HttpClient);

  getData(id: string, isAdmin: boolean) {
    const route = isAdmin ? `http://localhost:3000/users/${id}` : `http://localhost:3000/associates/by-user/${id}`;
    return this.http.get(route).pipe(take(1));
  }


  getAdminData() {

  }

}
