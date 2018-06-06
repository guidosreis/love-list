import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingListComponent } from './thing-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { things } from '../thing-section/things.mock';

describe('ThingListComponent', () => {
  let component: ThingListComponent;
  let fixture: ComponentFixture<ThingListComponent>;
  let thingsDe: DebugElement;
  let thingsEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingListComponent);
    component = fixture.componentInstance;
    component.things = things;

    fixture.detectChanges();

    thingsDe = fixture.debugElement.query(By.css('.thing-list'));
    thingsEl = thingsDe.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display ${things.length} items`, () => {
    expect(thingsEl.getElementsByClassName('thing').length).toBe(things.length);
  });

  it('should list contains', () => {
    component.things.forEach((thing, index) => {
      const thingEl = thingsEl.getElementsByClassName('thing').item(index);
      const nameEl = thingEl.getElementsByClassName('thing-name').item(0);
      expect(nameEl.textContent).toBe(thing.name);
    });
  });

  it('should emit thingRated event when rate button is clicked', () => {
    let index: number;
    const buttonsDe = fixture.debugElement.queryAll(By.css('.btn-like'));

    component.thingRated.subscribe(value => index = value);

    buttonsDe.forEach((buttonDe, i) => {
      buttonDe.triggerEventHandler('click', null);
      expect(i).toBe(index);
    });
  });

  it('should emit thingRemoved event when remove button is clicked', () => {
    let index: number;
    const buttonsDe = fixture.debugElement.queryAll(By.css('.btn-remove'));

    component.thingRemoved.subscribe(value => index = value);

    buttonsDe.forEach((buttonDe, i) => {
      buttonDe.triggerEventHandler('click', null);
      expect(i).toBe(index);
    });
  });
});
