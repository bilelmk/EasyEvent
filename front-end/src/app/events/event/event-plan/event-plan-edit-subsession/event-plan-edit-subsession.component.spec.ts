import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanEditSubsessionComponent } from './event-plan-edit-subsession.component';

describe('EventPlanEditSubsessionComponent', () => {
  let component: EventPlanEditSubsessionComponent;
  let fixture: ComponentFixture<EventPlanEditSubsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanEditSubsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanEditSubsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
