import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSurveysAddComponent } from './event-surveys-add.component';

describe('EventSurveysAddComponent', () => {
  let component: EventSurveysAddComponent;
  let fixture: ComponentFixture<EventSurveysAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSurveysAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSurveysAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
