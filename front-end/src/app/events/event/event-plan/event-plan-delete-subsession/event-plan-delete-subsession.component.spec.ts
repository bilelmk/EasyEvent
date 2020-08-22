import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanDeleteSubsessionComponent } from './event-plan-delete-subsession.component';

describe('EventPlanDeleteSubsessionComponent', () => {
  let component: EventPlanDeleteSubsessionComponent;
  let fixture: ComponentFixture<EventPlanDeleteSubsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanDeleteSubsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanDeleteSubsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
