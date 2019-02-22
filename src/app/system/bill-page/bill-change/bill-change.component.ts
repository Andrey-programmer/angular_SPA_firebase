import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'block-bill-change',
  templateUrl: './bill-change.component.html',
  styleUrls: ['./bill-change.component.scss']
})
export class BillChangeComponent implements OnInit, OnDestroy {

  
  sub1: Subscription;
  message: Message;
  toggler = false

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    const bill: Bill = new Bill(Math.abs(form.form.controls.bill.value), 'Валюта'); 
    this.toggler = false
    // console.log(bill)
    this.sub1 = this.billService.updateBill(bill).subscribe((bill) => {
      console.log(bill)
    })
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe()
    }
  }

}
