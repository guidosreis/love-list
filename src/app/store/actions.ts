import { Action } from '@ngrx/store';

import { Thing } from '../thing-section/thing.model';

export const FETCH_THINGS_ACTION = 'FETCH_THINGS_ACTION';
export const THINGS_FETCHED_ACTION = 'THINGS_FETCHED_ACTION';
export const THING_RATED_ACTION = 'THING_RATED_ACTION';
export const THING_ADDED_ACTION = 'THING_ADDED_ACTION';
export const THING_REMOVED_ACTION = 'THING_REMOVED_ACTION';
export const SORT_THINGS_ACTION = 'SORT_THINGS_ACTION';

export class FetchThingsAction implements Action {
  readonly type = FETCH_THINGS_ACTION;
}

export class ThingsFetchedAction implements Action {
  readonly type = THINGS_FETCHED_ACTION;

  constructor(public payload: Thing[]) { }
}

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

export class SortThingsAction implements Action {
  readonly type = SORT_THINGS_ACTION;

  constructor(public payload: Thing[]) { }
}
