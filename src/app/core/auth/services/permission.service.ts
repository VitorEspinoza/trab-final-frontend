import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor() { }

  getMenuItens(Role: string): menuItem[]{
    const menuItens =  [];
    return menuItens.filter(item => item.permission.includes(Role));
  }

}

export interface menuItem {
  label: string;
  link: string;
  icon: string;
  permission: string[];
}
