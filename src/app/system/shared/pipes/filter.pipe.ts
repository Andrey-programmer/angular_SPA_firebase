import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((item) => {
      const t = Object.assign({}, item);


      if (typeof(t[field]) === 'number' ) {
        t[field] = String(t[field]);
      }
      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        t[field] = t.categoryName;
      }
      return t[field].toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1;
    } );
  }

}
