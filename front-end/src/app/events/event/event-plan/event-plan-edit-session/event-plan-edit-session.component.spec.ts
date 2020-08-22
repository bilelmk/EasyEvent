import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanEditSessionComponent } from './event-plan-edit-session.component';

describe('EventPlanEditSessionComponent', () => {
  let component: EventPlanEditSessionComponent;
  let fixture: ComponentFixture<EventPlanEditSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanEditSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanEditSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
