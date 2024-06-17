import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '';
    }

    let str = value + '';
    if (str.length === 10) {
      return '(' + str.slice(0, 2) + ') ' + str.slice(2, 6) + '-' + str.slice(6);
    } else if (str.length === 11) {
      return '(' + str.slice(0, 2) + ') ' + str.slice(2, 7) + '-' + str.slice(7);
    } else {
      return value;
    }
  }
}
