import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value !== null && value !== "") {
      return value.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
    } else {
      return '-'
    }
  }

}
