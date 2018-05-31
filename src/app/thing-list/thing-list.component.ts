import { Component, Input } from '@angular/core';

import { Thing } from '../thing-section/thing.model';

@Component({
  selector: 'thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss']
})
export class ThingListComponent {
  @Input() things: Thing[];

  constructor() { }

  rate(thing) {
    console.log('thing: ', thing);
  }

}
