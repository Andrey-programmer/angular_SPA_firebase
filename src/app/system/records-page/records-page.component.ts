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
      this.categories = categories;
      this.isLoaded = true;
    });
  }

  newCategoryAdded(category: Category) {
      this.categories.push(category);
  }

  categoryEdited(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }
}
