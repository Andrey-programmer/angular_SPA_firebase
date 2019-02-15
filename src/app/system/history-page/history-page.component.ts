import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs-compat';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { Category } from '../shared/models/category.model';
import { MyEvent } from '../shared/models/event.model';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

@Component({
  selector: 'block-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  events: MyEvent[] = [];
  filteredEvents: MyEvent[] = [];
  chartData = [];

  isLoaded = false;
  isFilterVisible = false;

  sub1: Subscription;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit() {
   this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], MyEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOrigionalEvents();
      this.calculateChatData();

      this.isLoaded = true;
    });
  }

  calculateChatData(): void {
    this.chartData = [];
    this.categories.forEach((category) => {
        const categoryEvents = this.filteredEvents.filter((event) => event.category === category.id && event.type === 'outcome');
        this.chartData.push({
          name: category.name,
          value: categoryEvents.reduce((total, event) => {
            total += event.amount;
            return total;
          }, 0)
        });
    });
  }

  private setOrigionalEvents() {
    this.filteredEvents = this.events.slice();
  }


  private toggleFilterVisible(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisible(true);
  }


  onFilterApply(filterData) {
    this.toggleFilterVisible(false);
    this.setOrigionalEvents();
    // console.log(filterData);
    // console.log(this.events);
    // console.log(this.filteredEvents);

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    const data = this.filteredEvents = this.filteredEvents.filter((event) => {
      // console.log('Event-1', event);
      return filterData.types.indexOf(event.type) !== -1;
    })
    .filter((event) => {
      // console.log('Event-2', event );
      return filterData.categories.indexOf(event.category.toString()) !== -1;
    })
    .filter((event) => {
      // console.log('Event-3', event);
      const momentDate = moment(event.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });

    console.log('DATA', data);

    this.calculateChatData();
  }

  onFilterCancel() {
    this.toggleFilterVisible(false);
    this.setOrigionalEvents();
    this.calculateChatData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
