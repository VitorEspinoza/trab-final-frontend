import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';
 import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  activatedRoute = inject(ActivatedRoute)
  http = inject(HttpClient);
  router = inject(Router);
  currentUserSig = signal<User | undefined | null>(undefined);
  constructor() { }



  login(credentials: { email: string, password: string}): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', credentials).pipe(
      map((response: LoginResponse) => {
        this.setAuthentication(response.accessToken, response.user);
        return true;
      }),
      catchError((error) => {
        this.currentUserSig.set(null);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }


  setAuthentication(token, user) {
      localStorage.setItem('token', token);
      this.currentUserSig.set(user);
  }

}

