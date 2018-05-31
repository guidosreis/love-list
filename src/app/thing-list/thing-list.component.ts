import { Component, OnInit } from '@angular/core';

import { ThingsService } from '../services/things.service';
import { Thing } from './thing.model';

@Component({
  selector: 'thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss']
})
export class ThingListComponent implements OnInit {
  things: Thing[];

  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    this.thingsService.getThings()
      .subscribe(things => this.things = things);
  }

  rate(thing) {
    console.log('thing: ', thing);
  }

}
