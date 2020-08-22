import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSurveysComponent } from './event-surveys.component';

describe('EventSurveysComponent', () => {
  let component: EventSurveysComponent;
  let fixture: ComponentFixture<EventSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
