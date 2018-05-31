import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Thing } from './thing.model';
import { ThingsService } from '../services/things.service';

@Component({
  selector: 'thing-section',
  templateUrl: './thing-section.component.html',
  styleUrls: ['./thing-section.component.scss']
})
export class ThingSectionComponent implements OnInit {
  things$: Observable<Thing[]>;

  constructor(private thingsService: ThingsService) { }

  ngOnInit() {
    this.things$ = this.thingsService.getThings();
  }

  onThingRated(thing: Thing) {
    console.log('thing:', thing);
  }

}
