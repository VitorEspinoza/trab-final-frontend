import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsFormService {
  private http = inject(HttpClient);
  constructor() {

  }

  getDoctor(doctorId: string) {
    return this.http.get(`http://localhost:3000/doctors/${doctorId}`).pipe(take(1));
  }

  saveDoctor(doctor) {
    return this.http.post('http://localhost:3000/doctors', doctor).pipe(take(1));
  }

  updateDoctor(doctorId, doctor) {
    return this.http.put(`http://localhost:3000/doctors/${doctorId}`, doctor).pipe(take(1));
  }

  getUnits() {
    return this.http.get('http://localhost:3000/units').pipe(take(1));
  }

  mountBody(doctor) {
    const specialties = doctor.specialties.map(specialty => {
      return {specialtyId: specialty, isPrincipalSpecialty: doctor.principalSpecialties.includes(specialty)};
    });
    delete doctor.principalSpecialties;
    return {
      ...doctor,
      specialties: specialties,
    };
  }


}
