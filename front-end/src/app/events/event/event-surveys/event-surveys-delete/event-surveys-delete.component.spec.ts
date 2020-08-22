import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSurveysDeleteComponent } from './event-surveys-delete.component';

describe('EventSurveysDeleteComponent', () => {
  let component: EventSurveysDeleteComponent;
  let fixture: ComponentFixture<EventSurveysDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSurveysDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSurveysDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
