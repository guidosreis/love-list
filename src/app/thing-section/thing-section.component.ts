import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Thing } from './thing.model';
import { ThingsService } from '../services/things.service';
import { ApplicationState } from '../store/application-state';
import { FetchThingsAction, ThingRatedAction, ThingRemovedAction, ThingAddedAction } from '../store/actions';

function stateToThingsSelector(state: ApplicationState): Thing[] {
  return state.things;
}

@Component({
  selector: 'thing-section',
  templateUrl: './thing-section.component.html',
  styleUrls: ['./thing-section.component.scss']
})
export class ThingSectionComponent implements OnInit {
  things$: Observable<Thing[]>;

  constructor(private store: Store<ApplicationState>) {
    this.things$ = store.select(stateToThingsSelector);
  }

  ngOnInit() {
    this.store.dispatch(new FetchThingsAction());
  }

  onThingRated(thing: Thing) {
    this.store.dispatch(new ThingRatedAction(thing));
  }

  onThingRemoved(thing: Thing) {
    this.store.dispatch(new ThingRemovedAction(thing));
  }

  addThing(event) {
    this.store.dispatch(new ThingAddedAction(event.target.value));
    event.target.value = '';
  }

}
