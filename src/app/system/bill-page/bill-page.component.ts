import { combineLatest } from 'rxjs/index';
import { Subscription } from 'rxjs-compat';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'block-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;
  isLoaded =  false;

  constructor(private billServise: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billServise.getBill(),
      this.billServise.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefrash() {
    this.isLoaded = false;
    this.sub2 = this.billServise.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
