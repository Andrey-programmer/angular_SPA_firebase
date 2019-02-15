import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeTrigger } from '../shared/animations/fade.animation';

@Component({
  selector: 'block-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [fadeTrigger]
})
export class SystemComponent implements OnInit {
  @HostBinding('@fadeBlock') a = true;

  constructor() { }

  ngOnInit() {
  }

}
