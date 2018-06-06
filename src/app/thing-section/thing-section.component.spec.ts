import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { ThingSectionComponent } from './thing-section.component';
import { Thing } from './thing.model';
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

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should dispatch an action to load data when created', () => {
    const action = new fromActions.FetchThingsAction();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  fit('should display a list of things after the data is loaded', () => {
    const mock: Thing[] = [
      {
        name: 'Javascript',
        rating: 0
      },
      {
        name: 'Angular',
        rating: 0
      }
    ];

    const action = new fromActions.ThingsFetchedAction(mock);

    store.dispatch(action);

    component.things$.subscribe(things => {
      expect(things).toEqual(mock);
    });
  });

  describe('onThingRated', () => {
    fit('should dispatch an action', () => {
      const index = 1;
      const action = new fromActions.ThingRatedAction(index);

      component.onThingRated(index);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('onThingRemoved', () => {
    fit('should dispatch an actio', () => {
      const index = 1;
      const action = new fromActions.ThingRemovedAction(index);

      component.onThingRemoved(index);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('addThing', () => {
    fit('should do nothing if input is blank', () => {
      const inputEl = fixture.debugElement.query(By.css('.form-control')).nativeElement;
      const event = new KeyboardEvent('keyup', {
        'key': 'Enter'
      });

      inputEl.value = '';

      expect(inputEl.dispatchEvent(event)).toBeFalsy();
    });

    fit('should dispatch an action if input value is filled', () => {
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
