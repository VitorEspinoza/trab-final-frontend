import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true
})
export class CepPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return '';
    }

    let str = value + '';

    if (str.length === 8) {
      return str.slice(0, 5) + '-' + str.slice(5);
    } else {
      return value;
    }
  }
}
