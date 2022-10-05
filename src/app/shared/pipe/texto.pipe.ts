import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'texto'
})
export class TextoPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value !== null && value !=="" ) {
      return value
    } else {
      return '-'
    }
  }

}
