import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPlanSubsessionComponent } from './create-event-plan-subsession.component';

describe('CreateEventPlanSubsessionComponent', () => {
  let component: CreateEventPlanSubsessionComponent;
  let fixture: ComponentFixture<CreateEventPlanSubsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventPlanSubsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPlanSubsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
