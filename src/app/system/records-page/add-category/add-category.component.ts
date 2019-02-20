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
  sub2: Subscription;
  
  loading = false

  idCategory: string;

  @Output() categoryAdd: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private categoriesService: CategoriesService) { }


  onSubmit(form: NgForm) {
    // console.log(form.form);
    const name = form.form.controls.name.value;
    const capacity = Math.abs(form.form.controls.capacity.value);
    const category = new Category(name, capacity);
    // console.log(category, name, capacity);



    this.sub1 = this.categoriesService.addCategory(category).subscribe((caTegory: any) => {
      this.idCategory = caTegory.name
      console.log('caTegory', caTegory);
      this.sub2 = this.categoriesService.getCategoriyById(this.idCategory).subscribe(
        (category) => {
          console.log(category)
          category.id = this.idCategory;
          this.categoryAdd.emit(category);
        }
      )
      form.reset();
      form.form.patchValue({capacity: 1});
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
       this.sub1.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
