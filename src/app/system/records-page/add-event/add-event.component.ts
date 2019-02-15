import * as moment from 'moment';
import { Subscription } from 'rxjs-compat';
import 'rxjs/add/operator/mergeMap';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from '../../../shared/models/message.model';
import { Bill } from '../../shared/models/bill.model';
import { Category } from '../../shared/models/category.model';
import { MyEvent } from '../../shared/models/event.model';
import { BillService } from '../../shared/services/bill.service';
import { EventsService } from '../../shared/services/events.service';


@Component({
  selector: 'block-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];

  sub1: Subscription;
  sub2: Subscription;

  types = [
    {
    type: 'income', label: 'Доход'
    },
    {
    type: 'outcome', label: 'Расход'
    }
  ];

  message: Message;

  private showMassage(text) {
    this.message.text = text;
    setTimeout(() => {
      this.message.text = '';
    }, 4000);
  }

  constructor(private eventsService: EventsService, private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const  {amount, description, category, type} = form.value;
    const _amount = Math.abs(amount);

    const event = new MyEvent(type, _amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.sub1 = this.billService.getBill().subscribe((bill: Bill) => {

      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMassage(`Превышен лимит! На ${amount - bill.value} рублей`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }

        this.sub2 = this.billService.updateBill({
        value, currency: bill.currency
      }).mergeMap(() => this.eventsService.addEvent(event)).subscribe(() => {
        form.setValue({
          amount: 0,
          description: ' ',
          category: 1,
          type: 'outcome'
        });
      });
    });
    // this.eventsService.addEvent(event);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
