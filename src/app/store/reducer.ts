import { Action } from '@ngrx/store';

import { ApplicationState, INITIAL_APPLICATION_STATE } from './application-state';
import { sortThings } from './sortThings';
import {
  THINGS_FETCHED_ACTION, ThingsFetchedAction,
  THING_RATED_ACTION, ThingRatedAction,
  THING_ADDED_ACTION, ThingAddedAction,
  THING_REMOVED_ACTION, ThingRemovedAction,
  SORT_THINGS_ACTION, SortThingsAction
 } from './actions';
import { Thing } from '../thing-section/thing.model';

export function reducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
  switch (action.type) {
    case THINGS_FETCHED_ACTION:
      return handleThingsFetchedAction(state, <any>action);

    case THING_RATED_ACTION:
      return handleThingRatedAction(state, <any>action);

    case THING_ADDED_ACTION:
      return handleThingAddedAction(state, <any>action);

    case THING_REMOVED_ACTION:
      return handleThingRemovedAction(state, <any>action);

    case SORT_THINGS_ACTION:
      return handleSortThingsAction(state, <any>action);

    default:
      return state;
  }
}

function handleThingsFetchedAction(state: ApplicationState, action: ThingsFetchedAction): ApplicationState {
  return { things: action.payload };
}

function handleThingRatedAction(state: ApplicationState, action: ThingRatedAction) {
  const newState = {...state};

  if (newState.things[action.payload]) {
    newState.things[action.payload].rating++;
  }

  return newState;
}

function handleThingAddedAction(state: ApplicationState, action: ThingAddedAction) {
  const newState = {...state};
  const thing = newState.things.find(t => t.name.toLowerCase() === action.payload.toLowerCase());

  if (thing) {
    thing.rating++;
  } else {
    const newThing: Thing = {
      name: action.payload,
      rating: 0
    };

    newState.things.push(newThing);
  }

  return newState;
}

function handleThingRemovedAction(state: ApplicationState, action: ThingRemovedAction) {
  const newState = {...state};

  newState.things.splice(action.payload, 1);
  return newState;
}

function handleSortThingsAction(state: ApplicationState, action: SortThingsAction) {
  const newState = {...state};

  newState.things.sort(sortThings);
  return newState;
}
