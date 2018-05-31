import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Thing } from '../thing-section/thing.model';

@Component({
  selector: 'thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss']
})
export class ThingListComponent {
  @Input() things: Thing[];

  @Output() thingRated = new EventEmitter();

  constructor() { }

  rate(thing) {
    this.thingRated.next(thing);
  }

}
