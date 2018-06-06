import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { ThingSectionComponent } from './thing-section.component';
import { things } from './things.mock';
import * as fromApplicationState from '../store/application-state';
import * as fromReducer from '../store/reducer';
import * as fromActions from '../store/actions';

const reducerFactory = () => fromReducer.reducer;

describe('ThingSectionComponent', () => {
  let component: ThingSectionComponent;
  let fixture: ComponentFixture<ThingSectionComponent>;
  let store: Store<fromApplicationState.ApplicationState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(null, {reducerFactory}),
      ],
      declarations: [ ThingSectionComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ThingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load data when created', () => {
    const action = new fromActions.FetchThingsAction();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of things after the data is loaded', () => {
    const action = new fromActions.ThingsFetchedAction(things);

    store.dispatch(action);

    component.things$.subscribe(items => {
      expect(items).toEqual(things);
    });
  });

  describe('onThingRated', () => {
    it('should dispatch an action', () => {
      const index = 1;
      const action = new fromActions.ThingRatedAction(index);

      component.onThingRated(index);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('onThingRemoved', () => {
    it('should dispatch an actio', () => {
      const index = 1;
      const action = new fromActions.ThingRemovedAction(index);

      component.onThingRemoved(index);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('addThing', () => {
    it('should do nothing if input is blank', () => {
      const inputEl = fixture.debugElement.query(By.css('.form-control')).nativeElement;
      const event = new KeyboardEvent('keyup', {
        'key': 'Enter'
      });

      inputEl.value = '';

      expect(inputEl.dispatchEvent(event)).toBeFalsy();
    });

    it('should dispatch an action if input value is filled', () => {
      const name = 'Angular';
      const action = new fromActions.ThingAddedAction(name);
      const inputEl = fixture.debugElement.query(By.css('.form-control')).nativeElement;
      const event = new KeyboardEvent('keyup', {
        'key': 'Enter'
      });

      inputEl.value = name;
      inputEl.dispatchEvent(event);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(inputEl.value).toBe('');
    });
  });
});
