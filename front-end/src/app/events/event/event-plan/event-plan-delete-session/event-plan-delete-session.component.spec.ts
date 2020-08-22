import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanDeleteSessionComponent } from './event-plan-delete-session.component';

describe('EventPlanDeleteSessionComponent', () => {
  let component: EventPlanDeleteSessionComponent;
  let fixture: ComponentFixture<EventPlanDeleteSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanDeleteSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanDeleteSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
