import * as fromApplicationState from './application-state';
import * as fromReducer from './reducer';
import * as fromActions from './actions';
import { sortThings } from './sortThings';
import { things } from '../thing-section/things.mock';

describe('Reducer', () => {
  let INITIAL_APPLICATION_STATE: fromApplicationState.ApplicationState;
  let validIndex: number;
  let invalidIndex: number;

  beforeEach(() => {
    INITIAL_APPLICATION_STATE = fromApplicationState.INITIAL_APPLICATION_STATE;
    validIndex = Math.floor(Math.random() * things.length + 0);
    invalidIndex = 99999;
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: undefined };
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(INITIAL_APPLICATION_STATE);
    });
  });

  describe('THINGS_FETCHED action', () => {
    it('should populate things list', () => {
      const action = new fromActions.ThingsFetchedAction(things);
      const state = fromReducer.reducer(INITIAL_APPLICATION_STATE, action);

      expect(state.things).toEqual(things);
    });
  });

  describe('THING_RATED action', () => {
    it('should return a clone of original state when can not find the thing', () => {
      const action = new fromActions.ThingRatedAction(invalidIndex);
      const state = fromReducer.reducer({things: things}, action);

      expect(state.things).toEqual(things);
    });

    it('should increase the rating of thing given its index', () => {
      const action = new fromActions.ThingRatedAction(validIndex);
      const state = fromReducer.reducer({things: things}, action);
      const thing = state.things[validIndex];

      expect(thing.rating).toBe(1);
    });
  });

  describe('THING_ADDED action', () => {
    it('should increase the rating when thing already exists', () => {
      const payload = things[validIndex].name;
      const action = new fromActions.ThingAddedAction(payload);
      const state = fromReducer.reducer({things: things}, action);
      const thing = state.things[validIndex];

      expect(thing.rating).toBe(1);
    });

    it('should append a new item to the list', () => {
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
    it('should return a clone of original state when can not find the thing', () => {
      const action = new fromActions.ThingRatedAction(invalidIndex);
      const state = fromReducer.reducer({things: things}, action);

      expect(state.things).toEqual(things);
    });

    it ('should remove a item from list given its index', () => {
      const action = new fromActions.ThingRemovedAction(validIndex);
      const state = fromReducer.reducer({things: things}, action);

      expect(state.things).toEqual(things);
    });
  });

  describe('SORT_THINGS action', () => {
    const action = new fromActions.SortThingsAction();

    it('should sort by name if two or more things have same rating value', () => {
      const store = fromReducer.reducer({things: things}, action);

      expect(store.things).toEqual(things.sort(sortThings));
    });

    it('should sort by the highest rated item to the lowest rated item', () => {
      things[validIndex].rating = 1;

      const store = fromReducer.reducer({things: things}, action);

      expect(store.things).toEqual(things);
    });
  });
});
