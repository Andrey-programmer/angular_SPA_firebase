import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'block-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) {  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => {
      // console.log(categories)
      const categoryVal = Object.values(categories)
      const ids = Object.keys(categories)
      // console.log(ids)
      categoryVal.forEach((category, index) => {
        category.id = ids[index]
      })
      
      categoryVal.sort(this.compare('name'))
      console.log(categoryVal)
      
      this.categories = categoryVal;
      // console.log(this.categories)
      this.isLoaded = true;
    });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
    console.log('================================================')
    console.log(category)
  }

  categoryEdited(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }

  // Функция сортировки массива объектов по их свойству
  compare(field: any, order: any = 1) {
    var len = arguments.length;
    if(len === 0) {
        return (a, b) => (a < b && -1) || (a > b && 1) || 0;
    }
    if(len === 1) {
        switch(typeof field) {
            case 'number':
                return field < 0 ?
                    ((a, b) => (a < b && 1) || (a > b && -1) || 0) :
                    ((a, b) => (a < b && -1) || (a > b && 1) || 0);
            case 'string':
                return (a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
        }
    }
    if(len === 2 && typeof order === 'number') {
        return order < 0 ?
            ((a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
            ((a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
    }
    var fields, orders;
    if(typeof field === 'object') {
        fields = Object.getOwnPropertyNames(field);
        orders = fields.map(key => field[key]);
        len = fields.length;
    } else {
        fields = new Array(len);
        orders = new Array(len);
        for(let i = len; i--;) {
            fields[i] = arguments[i];
            orders[i] = 1;
        }
    }
    return (a, b) => {
        for(let i = 0; i < len; i++) {
            if(a[fields[i]] < b[fields[i]]) return orders[i];
            if(a[fields[i]] > b[fields[i]]) return -orders[i];
        }
        return 0;
    };
}

}
