import {
  FetchThingsAction, FETCH_THINGS_ACTION,
  ThingsFetchedAction, THINGS_FETCHED_ACTION,
  ThingRatedAction, THING_RATED_ACTION,
  ThingRemovedAction, THING_REMOVED_ACTION,
  ThingAddedAction, THING_ADDED_ACTION, SortThingsAction, SORT_THINGS_ACTION
} from './actions';
import { Thing } from '../thing-section/thing.model';

describe('FetchThingsAction', () => {
  it('should create an action', () => {
    const action = new FetchThingsAction();

    expect({...action}).toEqual({ type: FETCH_THINGS_ACTION });
  });
});

describe('ThingsFetchedAction', () => {
  it('should create an action', () => {
    const payload: Thing[] = [
      {
        name: 'Javascript',
        rating: 0
      },
      {
        name: 'Angular',
        rating: 0
      }
    ];
    const action = new ThingsFetchedAction(payload);

    expect({...action}).toEqual({
      type: THINGS_FETCHED_ACTION,
      payload: payload
    });
  });
});

describe('ThingRatedAction', () => {
  it('should create an action', () => {
    const payload = 0;
    const action = new ThingRatedAction(payload);

    expect({...action}).toEqual({
      type: THING_RATED_ACTION,
      payload
    });
  });
});

describe('ThingRemovedAction', () => {
  it('should create an action', () => {
    const payload = 0;
    const action = new ThingRemovedAction(payload);

    expect({...action}).toEqual({
      type: THING_REMOVED_ACTION,
      payload
    });
  });
});

describe('ThingAddedAction', () => {
  it('should create an action', () => {
    const payload = 'Angular';
    const action = new ThingAddedAction(payload);

    expect({...action}).toEqual({
      type: THING_ADDED_ACTION,
      payload
    });
  });
});

describe('SortThingsAction', () => {
  const action = new SortThingsAction();

  it('should create an action', () => {
    expect({...action}).toEqual({ type: SORT_THINGS_ACTION });
  });
});


