import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noSpace'
})
export class NoSpacePipe implements PipeTransform {

  transform(item: string,): string {
       return item.replace(/ /g, '_')
    }
}
