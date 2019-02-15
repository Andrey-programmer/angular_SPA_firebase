import { Subscription } from 'rxjs-compat';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../../../shared/models/message.model';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'block-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() categoryEdit: EventEmitter<Category> = new EventEmitter<Category>();
  currentCategoryId = 1; /* Получаем Id из шаблона через байдинг */
  currentCategory: Category;
  message: Message;

  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.changeCategory();
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    const {name, capacity} = form.value;
    const _capacity = Math.abs(capacity);
    const category = new Category(name, _capacity, +this.currentCategoryId);


    this.sub1 = this.categoriesService.updateCategory(category).subscribe((caTegory: Category) => {
      console.log(caTegory);
      this.categoryEdit.emit(caTegory);
      this.message.text = 'Категория успешно отредактирована!';
      setTimeout(() => {
        this.message.text = '';
      }, 3000);
    });
    // this.changeCategory();
  }

  changeCategory() {
    // console.log(this.currentCategoryId);
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
    console.log(this.currentCategory);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
