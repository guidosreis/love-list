import { Action } from '@ngrx/store';

import { ApplicationState, INITIAL_APPLICATION_STATE } from './application-state';
import {
  THINGS_FETCHED_ACTION, ThingsFetchedAction,
  THING_RATED_ACTION, ThingRatedAction,
  THING_ADDED_ACTION, ThingAddedAction,
  THING_REMOVED_ACTION, ThingRemovedAction
 } from './actions';
import { Thing } from '../thing-section/thing.model';

export function reducer(state: ApplicationState, action: Action): ApplicationState {
  switch (action.type) {
    case THINGS_FETCHED_ACTION:
      return handleThingsFetchedAction(state, <any>action);

    case THING_RATED_ACTION:
      return handleThingRatedAction(state, <any>action);

    case THING_ADDED_ACTION:
      return handleThingAddedAction(state, <any>action);

    case THING_REMOVED_ACTION:
      return handleThingRemovedAction(state, <any>action);

    default:
      return state;
  }
}

function handleThingsFetchedAction(state: ApplicationState, action: ThingsFetchedAction): ApplicationState {
  return { things: action.payload };
}

function handleThingRatedAction(state: ApplicationState, action: ThingRatedAction) {
  const newState: ApplicationState = {...state};
  const { things } = newState;
  const index = things.findIndex(t => t.name === action.payload.name);
  const rating = things[index].rating;

  things[index].rating = rating + 1;

  return newState;
}

function handleThingAddedAction(state: ApplicationState, action: ThingAddedAction) {
  const newState: ApplicationState = {...state};
  const thing = newState.things.find(t => t.name === action.payload);

  if (thing) {
    const rating = thing.rating;
    thing.rating = rating + 1;
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
  const newState: ApplicationState = {...state};
  const index = newState.things.findIndex(t => t.name === action.payload.name);

  newState.things.splice(index, 1);
  return newState;
}
