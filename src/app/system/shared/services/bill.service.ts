import { Observable } from 'rxjs-compat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/core/base-api';
import { Bill } from '../models/bill.model';

@Injectable(/* {
  providedIn: 'root'
} */)
export class BillService extends BaseApi {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
   }

  /* getBill(): Observable<Bill> {
    return this.httpClient.get<Bill>('http://localhost:3000/bill', {
      responseType: 'json'
    });
  }
   */

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.httpClient.get('https://www.cbr-xml-daily.ru/daily_json.js', {
      responseType: 'json'
    }).map((curs) => curs['Valute']);
  }


  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
