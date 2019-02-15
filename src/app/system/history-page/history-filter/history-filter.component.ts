import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { CheckType } from '@angular/core/src/view';

@Component({
  selector: 'block-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();

  @Input() categories: Category[];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'},
    {type: 'y', label: 'Год'}
  ];


  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  constructor() { }

  ngOnInit() {
  }


  private calculateInputParams(field: string, target) {
    if (target.checked) {
      if (this[field].indexOf(target.value) === -1) {
        this[field].push(target.value);
        console.log(this[field]);
      }
    } else {
      this[field] = this[field].filter((item) => item !== target.value);
      console.log(this[field]);
    }
  }

  changeType(target) {
   this.calculateInputParams('selectedTypes', target);
  }

  changeCategory(target) {
    this.calculateInputParams('selectedCategories', target);
    /* if (target.checked) {
      if (this.selectedCategories.indexOf(target.value) === -1) {
        this.selectedCategories.push(target.value);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter((item) => item !== target.value);
    } */
  }

  applyFilter() {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];

    this.filterCancel.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
