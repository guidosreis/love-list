import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of, timer } from 'rxjs';
import { switchMap, repeat, mapTo } from 'rxjs/operators';

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
  randomizer$: Observable<any>;

  constructor(private store: Store<ApplicationState>) {
    this.things$ = store.select(stateToThingsSelector);
  }

  ngOnInit() {
    this.store.dispatch(new FetchThingsAction());
    this.things$.subscribe(things => {
      if (things.length) {
        of('').pipe(
          switchMap(
            () => timer(this.getRandomNumber(1000, 5000)).pipe(
              mapTo(this.getRandomNumber(0, (things.length - 1)))
            )
          ),
          repeat()
        )
        .subscribe(index => this.store.dispatch(new ThingRatedAction(index)));
      }
    });
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onThingRated(index: number) {
    this.store.dispatch(new ThingRatedAction(index));
  }

  onThingRemoved(index: number) {
    this.store.dispatch(new ThingRemovedAction(index));
  }

  addThing(event) {
    const name = event.target.value;

    if (!name) { return false; }

    this.store.dispatch(new ThingAddedAction(event.target.value));
    event.target.value = '';
  }

}
