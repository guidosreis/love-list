import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingSectionComponent } from './thing-section.component';

describe('ThingSectionComponent', () => {
  let component: ThingSectionComponent;
  let fixture: ComponentFixture<ThingSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
