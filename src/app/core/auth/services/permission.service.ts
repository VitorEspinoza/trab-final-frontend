import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor() { }

  getMenuItens(Role: string): menuItem[]{
    const menuItens =  [
      {
        label: 'Médicos',
        link: '/doctors',
        icon: 'medical_information',
        permission: ['ADMIN', 'ASSOCIATE']
      },
      {
        label: 'Unidades',
        link: '/units',
        icon: 'apartment',
        permission: ['ADMIN', 'ASSOCIATE']
      },

    ];
    return menuItens.filter(item => item.permission.includes(Role));
  }

}

export interface menuItem {
  label: string;
  link: string;
  icon: string;
  permission: string[];
}
