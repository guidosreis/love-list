import * as fromApplicationState from './application-state';
import * as fromReducer from './reducer';
import * as fromActions from './actions';
import { sortThings } from './sortThings';
import { Thing } from '../thing-section/thing.model';

describe('Reducer', () => {
  let INITIAL_APPLICATION_STATE: fromApplicationState.ApplicationState;
  let mock: Thing[];
  let validIndex: number;
  let invalidIndex: number;

  beforeEach(() => {
    INITIAL_APPLICATION_STATE = fromApplicationState.INITIAL_APPLICATION_STATE;
    mock = [
      {
        name: 'Javascript',
        rating: 0
      },
      {
        name: 'Angular',
        rating: 0
      }
    ];

    validIndex = Math.floor(Math.random() * mock.length + 0);
    invalidIndex = 99999;
  });

  describe('undefined action', () => {
    fit('should return the default state', () => {
      const action = { type: undefined };
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(INITIAL_APPLICATION_STATE);
    });
  });

  describe('THINGS_FETCHED action', () => {
    fit('should populate things list', () => {
      const action = new fromActions.ThingsFetchedAction(mock);
      const state = fromReducer.reducer(INITIAL_APPLICATION_STATE, action);

      expect(state.things).toEqual(mock);
    });
  });

  describe('THING_RATED action', () => {
    fit('should return a clone of original state when can not find the thing', () => {
      const action = new fromActions.ThingRatedAction(invalidIndex);
      const state = fromReducer.reducer({things: mock}, action);

      expect(state.things).toEqual(mock);
    });

    fit('should increase the rating of thing given its index', () => {
      const action = new fromActions.ThingRatedAction(validIndex);
      const state = fromReducer.reducer({things: mock}, action);
      const thing = state.things[validIndex];

      expect(thing.rating).toBe(1);
    });
  });

  describe('THING_ADDED action', () => {
    fit('should increase the rating when thing already exists', () => {
      const payload = mock[validIndex].name;
      const action = new fromActions.ThingAddedAction(payload);
      const state = fromReducer.reducer({things: mock}, action);
      const thing = state.things[validIndex];

      expect(thing.rating).toBe(1);
    });

    fit('should append a new item to the list', () => {
      const payload = 'Typescript';
      const action = new fromActions.ThingAddedAction(payload);
      const state = fromReducer.reducer(INITIAL_APPLICATION_STATE, action);

      expect(state.things).toContain({
        name: payload,
        rating: 0
      });
    });
  });

  describe('THING_REMOVE action', () => {
    fit('should return a clone of original state when can not find the thing', () => {
      const action = new fromActions.ThingRatedAction(invalidIndex);
      const state = fromReducer.reducer({things: mock}, action);

      expect(state.things).toEqual(mock);
    });

    fit ('should remove a item from list given its index', () => {
      const action = new fromActions.ThingRemovedAction(validIndex);
      const state = fromReducer.reducer({things: mock}, action);

      expect(state.things).toEqual(mock);
    });
  });

  describe('SORT_THINGS action', () => {
    const action = new fromActions.SortThingsAction();

    fit('should sort by name if two or more things have same rating value', () => {
      const store = fromReducer.reducer({things: mock}, action);

      expect(store.things).toEqual(mock.sort(sortThings));
    });

    fit('should sort by the highest rated item to the lowest rated item', () => {
      mock[validIndex].rating = 1;

      const store = fromReducer.reducer({things: mock}, action);

      expect(store.things).toEqual(mock);
    });
  });
});
