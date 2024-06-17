import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociatesFormService {
  http = inject(HttpClient);
  constructor() { }

  createAssociate(associateForm, photo) {
    const body = this.mountBody(associateForm, photo);
    return this.http.post('http://localhost:3000/associates', body).pipe(take(1));
  }

  updateAssociate(id, associateForm, photo) {
    const body = this.mountMultiPartFormData(associateForm, photo);
    return this.http.put(`http://localhost:3000/associates/${id}`, body).pipe(take(1));
  }

  mountMultiPartFormData(associateForm, photo) {
    let formData = new FormData();

    formData.append('document', associateForm.get('document').value);
    formData.append('birthAt', associateForm.get('birthAt').value);
    formData.append('phone', associateForm.get('phone').value);
    if(photo != null)
    formData.append('photo', photo);
    formData.append('user', JSON.stringify({
      name: associateForm.get('name').value,
      email: associateForm.get('email').value,
    }));
    formData.append('address', JSON.stringify({
      street: associateForm.get('street').value,
      number: associateForm.get('number').value,
      neighborhood: associateForm.get('neighborhood').value,
      city: associateForm.get('city').value,
      state: associateForm.get('state').value,
      zipCode: associateForm.get('zipCode').value
    }));

    return formData;
  }

  mountBody(associateForm, photo) {
    return this.mountMultiPartFormData(associateForm, photo);
  }
}
