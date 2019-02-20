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
      // console.log(categoryVal)
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
}
