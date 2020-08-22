import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanAddSessionComponent } from './event-plan-add-session.component';

describe('EventPlanAddSessionComponent', () => {
  let component: EventPlanAddSessionComponent;
  let fixture: ComponentFixture<EventPlanAddSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlanAddSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlanAddSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
