import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'block-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

  /* data = [
    {
      'name': 'Germany',
      'value': 8940000
    },
    {
      'name': 'USA',
      'value': 5000000
    }
  ]; */

  @Input() data;
  constructor() { }



}
