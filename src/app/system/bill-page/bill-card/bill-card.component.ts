import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'block-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.currency['USD']['Value'];
    this.euro = this.bill.value / this.currency['EUR']['Value'];
    // console.log(this.currency);
    // console.log(this.dollar);
  }

}
