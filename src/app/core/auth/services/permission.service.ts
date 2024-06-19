import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor() { }

  getMenuItens(Role: string): menuItem[]{
    const menuItens =  [
      {
        label: 'Meu Perfil',
        link: '/profile',
        icon: 'account_circle',
        permission: ['ADMIN', 'ASSOCIATE']
      },
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
      {
        label: 'Especialidades',
        link: '/specialties',
        icon: 'health_and_safety',
        permission: ['ADMIN']
      },
      {
        label: 'Associados',
        link: '/associates',
        icon: 'face',
        permission: ['ADMIN']
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
