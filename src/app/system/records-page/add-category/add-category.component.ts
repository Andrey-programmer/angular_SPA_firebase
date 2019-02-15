import { Subscription } from 'rxjs-compat';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';


@Component({
  selector: 'block-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent implements OnDestroy {

  sub1: Subscription;

  @Output() categoryAdd: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }


  onSubmit(form: NgForm) {
    // console.log(form.form);
    const name = form.form.controls.name.value;
    const capacity = Math.abs(form.form.controls.capacity.value);
    const category = new Category(name, capacity);
    // console.log(category, name, capacity);



    this.sub1 = this.categoriesService.addCategory(category).subscribe((caTegory: Category) => {
      // console.log('caTegory', caTegory);
      form.reset();
      form.form.patchValue({capacity: 1/* , name: 'Vasya' */});
      this.categoryAdd.emit(caTegory);
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
       this.sub1.unsubscribe();
    }
  }
}
