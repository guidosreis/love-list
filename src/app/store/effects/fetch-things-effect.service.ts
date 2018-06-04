import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FETCH_THINGS_ACTION, FetchThingsAction, ThingsFetchedAction } from '../actions';
import { ThingsService } from '../../services/things.service';

@Injectable({
  providedIn: 'root'
})
export class FetchThingsEffectService {

  constructor(private actions$: Actions, private thingsService: ThingsService) { }

  @Effect() things$: Observable<Action> = this.actions$
    .ofType<FetchThingsAction>(FETCH_THINGS_ACTION)
    .pipe(
      switchMap(action => this.thingsService.getThings()),
      map(things => new ThingsFetchedAction(things))
    );

}
