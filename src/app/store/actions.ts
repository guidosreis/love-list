import { Action } from '@ngrx/store';

import { Thing } from '../thing-section/thing.model';

export const FETCH_THINGS = 'FETCH_THINGS';
export const THING_RATED_ACTION = 'THING_RATED_ACTION';
export const THING_ADDED_ACTION = 'THING_ADDED_ACTION';
export const THING_REMOVED_ACTION = 'THING_REMOVED_ACTION';

export class ThingRatedAction implements Action {
  readonly type = THING_RATED_ACTION;

  constructor(public payload: Thing) { }
}

export class ThingAddedAction implements Action {
  readonly type = THING_ADDED_ACTION;

  constructor(public payload: string) { }
}

export class ThingRemovedAction implements Action {
  readonly type = THING_REMOVED_ACTION;

  constructor(public payload: Thing) { }
}