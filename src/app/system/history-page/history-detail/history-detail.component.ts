import { Subscription } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MyEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { EventsService } from '../../shared/services/events.service';


@Component({
  selector: 'block-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: MyEvent;
  category: Category;

  isLoaded = false;

  sub1: Subscription;

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.sub1 = this.route.params
                .subscribe((params: Params) => {
                  // console.log(params['id']);
                  this.eventsService.getEventById(params['id']).subscribe((event: MyEvent) => {
                    // console.log(event);
                    this.event = event;
                    this.categoriesService.getCategoriyById(String(event.category)).subscribe((category: Category) => {
                      this.category = category;
                      // console.log(category);
                      this.isLoaded = true;
                    });
                  });
                });
  /* this.sub1 = this.route.params
                .mergeMap((params: Params) => {
                  this.eventsService.getEventById(params['id']);
                })
                 .mergeMap((event: MyEvent) => {
                  this.event = event;
                  return this.categoriesService.getCategoriyById(event.category);
                })
                .subscribe((category: Category) => {
                  this.category = category;
                  console.log(category);
                  this.isLoaded = true;
                  }); */
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
