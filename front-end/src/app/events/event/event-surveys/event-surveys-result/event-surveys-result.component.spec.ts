import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSurveysResultComponent } from './event-surveys-result.component';

describe('EventSurveysResultComponent', () => {
  let component: EventSurveysResultComponent;
  let fixture: ComponentFixture<EventSurveysResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSurveysResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSurveysResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
