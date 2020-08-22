import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanAddSubsessionComponent } from './event-plan-add-subsession.component';

describe('EventPlanAddSubsessionComponent', () => {
  let component: EventPlanAddSubsessionComponent;
  let fixture: ComponentFixture<EventPlanAddSubsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanAddSubsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanAddSubsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
