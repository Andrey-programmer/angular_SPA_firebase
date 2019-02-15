import { Subscription } from 'rxjs-compat';
import { combineLatest } from 'rxjs/index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { Bill } from '../shared/models/bill.model';
import { MyEvent } from '../shared/models/event.model';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

@Component({
  selector: 'block-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: MyEvent[] = [];

  sub1: Subscription;

  constructor(private billService: BillService, private categoryService: CategoriesService, private eventsService: EventsService) { }


  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], MyEvent[]]) => {
      // console.log(data);
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(event => event.category === category.id && event.type === 'outcome');
    return categoryEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number  {
    const persent = (100 * this.getCategoryCost(category) / category.capacity);
    return persent > 100 ? 100 : persent;
  }

  getCostsPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getColorCategory(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }
}
