import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  THING_RATED_ACTION,
  THING_ADDED_ACTION,
  SortThingsAction,
} from '../actions';

@Injectable({
  providedIn: 'root'
})
export class RateThingEffectService {

  constructor(private actions$: Actions) { }

  @Effect() things$: Observable<Action> = this.actions$
    .ofType(THING_RATED_ACTION, THING_ADDED_ACTION)
    .pipe(
      map(() => new SortThingsAction())
    );
}
