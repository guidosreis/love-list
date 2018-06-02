import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { THING_RATED_ACTION, ThingRatedAction, SortThingsAction } from '../actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RateThingEffectService {

  constructor(private actions$: Actions) { }

  @Effect() things$: Observable<Action> = this.actions$
    .ofType<ThingRatedAction>(THING_RATED_ACTION)
    .pipe(
      map(() => new SortThingsAction())
    );
}
